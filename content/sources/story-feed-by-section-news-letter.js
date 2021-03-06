// eslint-disable-next-line import/no-extraneous-dependencies
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { removeLastSlash } from '../../components/utilities/parse/strings'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

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
]

const getQueryFilter = (section, website) => {
  let queryFilter = ''
  let body = { query: { bool: {} } }

  if (section === '/') {
    /**
     *
     * Si se filtra por seccion se usa ?body, sino, se usa ?q
     * esto se hace por mejorar PERFORMANCE
     *
     */
    queryFilter = `q=canonical_website:${website}+AND+type:story+AND+publish_date:%7Bnow-15d%20TO%20*%7D`
  } else {
    body = {
      query: {
        bool: {
          must: [
            {
              term: {
                type: 'story',
              },
            },
            {
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
            },
          ],
        },
      },
    }

    queryFilter = `body=${encodeURI(JSON.stringify(body))}`
  }

  return queryFilter
}

const resolve = (key = {}) => {
  const {
    section: rawSection,
    feedOffset,
    stories_qty: storiesQty,
    website: rawWebsite = '',
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  const queryFilter = getQueryFilter(section, website)

  return `/content/v4/search/published?${queryFilter}&website=${website}&size=${storiesQty ||
    10}&from=${feedOffset || 0}&sort=display_date:desc`
}

const transform = (data, { 'arc-site': arcSite, section: rawSection }) => {
  const section = removeLastSlash(
    rawSection === '' || rawSection === undefined || rawSection === null
      ? '/'
      : rawSection
  )

  if (
    !data ||
    (data && data.content_elements && !data.content_elements.length > 0)
  ) {
    throw new RedirectError('/404', 404)
  }
  const { siteName } = getProperties(arcSite)
  const dataStory = getResizedImageData(data, 'newsletter', arcSite)
  dataStory.siteName = siteName

  const { content_elements: [{ taxonomy: { sites = [] } = {} } = {}] = [] } =
    dataStory || {}

  let sectionName = ''
  sites.forEach(({ _id, name }) => {
    if (_id === section) sectionName = name
  })

  return {
    ...dataStory,
    section_name: sectionName || 'Sección',
  }
}

const source = {
  resolve,
  schemaName: SCHEMA_NAME,
  params,
  transform,
  ttl: 300,
}

export default source
