import {
  getActualDate,
  getYYYYMMDDfromISO,
} from '../../components/utilities/date-time/dates'
import {
  includePrimarySection,
  includeSections,
} from '../../components/utilities/included-fields'
import RedirectError from '../../components/utilities/redirect-error'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const schemaName = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'date',
    displayName: 'Fecha Inicial',
    type: 'text',
  },
  {
    name: 'date2',
    displayName: 'Fecha Final',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos (opcional)',
    type: 'text',
  },
  {
    name: 'excludedSections',
    displayName: 'Secciones excluidas',
    type: 'text',
  },
]

const getNextDate = (date2) => {
  const requestedDate = new Date(date2)
  // requestedDate.setDate(requestedDate.getDate() + 1)
  return getYYYYMMDDfromISO(requestedDate)
}

const getQueryFilter = (section, excludedSections, website, date, date2) => {
  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
          {
            range: {
              display_date: {
                gte: `${date}T05:00:00`,
                lte: `${getNextDate(date2)}T04:59:59`,
              },
            },
          },
        ],
      },
    },
  }

  if (section !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': section.includes(',')
                    ? section.split(',')
                    : [section],
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

  if (excludedSections !== '/') {
    body.query.bool = {
      ...body.query.bool,
      must_not: [
        {
          nested: {
            path: 'taxonomy.sections',
            query: {
              bool: {
                must: [
                  {
                    terms: {
                      'taxonomy.sections._id': excludedSections,
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
    }
  }

  const queryFilter = `body=${encodeURI(JSON.stringify(body))}`

  return queryFilter
}

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section: auxSection = '/',
    date: auxDate = getActualDate(),
    date2,
    from = 0,
    size = 10,
    includedFields,
    excludedSections: auxExcludedSec = '/',
  } = key

  if (new Date(auxDate).getFullYear() < 2009)
    throw new RedirectError(`/410`, 410)

  const section = auxSection === null || !auxSection ? '/' : auxSection
  const date = auxDate === null || auxDate === '' ? getActualDate() : auxDate

  const excSections =
    auxExcludedSec === null || !auxExcludedSec ? '/' : auxExcludedSec.split(',')

  const queryFilter = getQueryFilter(section, excSections, website, date, date2)

  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : `&_sourceInclude=websites.${website}.website_url,_id,headlines.basic,subheadlines.basic,display_date,${includePrimarySection(
        { arcSite: website }
      )},${includeSections},promo_items.basic_html.content`

  const requestUri = `/content/v4/search/published?${queryFilter}&sort=display_date:desc&website=${website}&from=${from}&size=${size}${sourceInclude}`

  return requestUri
}

const transform = (data, { 'arc-site': website, presets: customPresets }) => {
  const presets = customPresets || 'landscape_s:234x161,landscape_xs:118x72'
  return getResizedImageData(data, presets, website)
}

const source = {
  resolve,
  schemaName,
  transform,
  params,
  ttl: 120,
}

export default source
