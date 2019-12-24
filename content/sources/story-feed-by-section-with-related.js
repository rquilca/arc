// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'

import {
  addResizedUrlsToStory,
  removeLastSlash,
} from '../../components/utilities/helpers'

const SCHEMA_NAME = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
  {
    name: 'relatedSize',
    displayName: 'Número de historias con relacionadas',
    type: 'number',
  },
]

const options = {
  gzip: true,
  json: true,
}

/* const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => item.replace(/"/g, ''))
} */

const getRequtestTags = ({ tag, website, size = 4 }) => {
  const includedFields = `&_sourceInclude=websites.${website}.website_url`
  return request({
    uri: `${CONTENT_BASE}/content/v4/search/published?q=canonical_website:${website}+AND+taxonomy.tags.slug:${decodeURIComponent(
      tag
    ).toLowerCase()}+AND+type:story+AND+revision.published:true&size=${size}&from=0&sort=display_date:desc&website=${website}${includedFields}`,
    ...options,
  })
}
const addRelatedTags = ({ data, size = 10, website }) => {
  const { content_elements: rawContentElements = [] } = data || {}
  const contentElements = rawContentElements.slice(0, size)
  const requestArray = contentElements
  .map(story => {
    const { taxonomy: { tags = [] } = {} } = story || {}
    const { slug = '' } = tags[0] || {}
    if (slug) return getRequtestTags({ tag: slug, website })
    return Promise.resolve([])
  })
  return Promise.all(requestArray).then(related => {
    const newData = data
    contentElements.forEach((_, i) => {
      newData.content_elements[i].related_by_tags = related[i]
    })
    return newData
  })
}

const fetch = (key = {}) => {
  const {
    section: rawSection,
    feedOffset,
    stories_qty: storiesQty,
    website: rawWebsite = '',
    relatedSize = 10,
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
        ],
      },
    },
  }

  if (section && section !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [section],
                },
              },
              {
                term: {
                  'taxonomy.sections._website': website,
                },
              },
            ],
          },
        },
      },
    })
  }

  const encodedBody = encodeURI(JSON.stringify(body))

  return request({
    uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
      10}&from=${feedOffset || 0}&sort=display_date:desc`,
    ...options,
  }).then(data => {
    if (
      !data ||
      (data && data.content_elements && !data.content_elements.length > 0)
    ) {
      throw new RedirectError('/404', 404)
    }
    const dataStory = data
    const { resizerUrl, siteName } = getProperties(website)
    dataStory.content_elements = addResizedUrlsToStory(
      dataStory.content_elements,
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )
    dataStory.siteName = siteName

    const {
      content_elements: [{ taxonomy: { sections = [] } = {} } = {}] = [],
    } = dataStory || {}

    let sectionName = ''
    sections.forEach(({ _id, name }) => {
      if (_id === section) sectionName = name
    })

    const formatedData = {
      ...dataStory,
      section_name: sectionName || 'Sección',
    }

    return addRelatedTags({
      data: formatedData,
      website,
      size: relatedSize === null || !relatedSize ? 10 : relatedSize,
    })
  })
}

const source = {
  fetch,
  schemaName: SCHEMA_NAME,
  params,
  ttl: 300,
}

export default source
