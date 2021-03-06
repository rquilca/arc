import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment'
import getProperties from 'fusion:properties'
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'

import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
} from '../../components/utilities/included-fields'
import RedirectError from '../../components/utilities/redirect-error'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const schemaName = 'stories-dev'

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const params = [
  {
    name: 'sort',
    displayName: 'Orden',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'section',
    displayName: 'Sección / Categoría (sin slash)',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
  {
    name: 'query',
    displayName: 'Búsqueda',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos',
    type: 'text',
  },
]

const getQueryFilter = (query, section, website) => {
  let queryAll = query
  queryAll = query.replace(/\+/g, ' ')
  queryAll = decodeURIComponent(queryAll)
  queryAll = queryAll
    .replace(/%/g, '%25')
    .replace(/&/g, '%26')
    // .replace(/\|/g, '%7C')
    .replace(/€/g, '%E2%82%AC')

  let queryFilter = ''

  // Si se filtra por seccion se usa ?body, sino, se usa ?q
  if (section === 'todas') {
    // let queryAll = query
    if (query !== '') {
      // queryAll = query.replace(/ /g, '+AND+')
      /* queryAll = query.replace(/\+/g, ' ')
      queryAll = decodeURIComponent(queryAll)
      queryAll = queryAll.replace(/&/g, '%26').replace(/€/g, '%E2%82%AC') */
      // .replace(/\?/g, '%3F')
      // .replace(/%/g, '%25')
      queryAll = `("${queryAll}")`
    }
    queryFilter = `q=canonical_website:${website}+AND+type:story+AND+${queryAll}`
  } else {
    /* let valueQuery = query.replace(/\+/g, ' ')
    valueQuery = valueQuery.replace(/-/g, '+') || '*' */

    queryAll = queryAll.replace(/-/g, '+') || '*'

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
              simple_query_string: {
                query: `"${decodeURI(queryAll)}"`, // El navegador encodea las tildes
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
                          'taxonomy.sections._id': [`/${section}`],
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

    queryFilter = `body=${encodeURIComponent(JSON.stringify(body))}`
  }

  return queryFilter
}

/**
 * @description - calcula, usando el número de página y la cantidad de
 * historias, el índice de la historia desde la cual se debe iniciar la
 * solicitud.
 *
 * @param {*} page - número de página que se quiere consultar
 * @param {*} size - cantidad de noticias que se quiere consultar
 *
 * @returns {*} índice de la historia inicial para la solicitud
 */
const validateFrom = (page, size) => {
  if (page !== '1' && page) {
    return (page - 1) * size
  }
  return '0'
}

const fetch = async ({
  'arc-site': website,
  query,
  section: rawSection,
  size: rawSize,
  from: page,
  sort: rawSort,
  includedFields,
}) => {
  const sort = rawSort === 'ascendente' ? 'asc' : 'desc'
  const from = `${validateFrom(page, rawSize)}`
  const size = `${rawSize || 15}`
  const section = rawSection || 'todas'

  const queryFilter = getQueryFilter(query, section, website)

  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : `&_sourceInclude=${includePrimarySection({
        arcSite: website,
      })},display_date,website_url,websites.${website}.website_url,headlines.basic,subheadlines.basic,${includeCredits},${includePromoItems}`

  /* Legacy
    const sourceExclude =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website' */

  const requestUri = `${CONTENT_BASE}/content/v4/search/published?sort=display_date:${sort}&from=${from}&size=${size}&website=${website}&${queryFilter}${sourceInclude}`

  if (section === 'todas') {
    const responseDefult = await request({
      uri: requestUri,
      ...options,
    }).catch(() => {
      throw new RedirectError('/404', 404)
    })
    return responseDefult
  }

  /**
   * Si se esta buscando por seccion, primero se verifica que la seccion existe.
   * Si la seccino no existe debe devolver 404.
   */
  const sectionResponse = await request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=/${section}`,
    ...options,
  }).catch(() => {
    throw new RedirectError('/404', 404)
  })

  if (Object.prototype.hasOwnProperty.call(sectionResponse, 'status')) {
    throw new Error('Sección no encontrada')
  }

  const responseWithFilter = await request({
    uri: requestUri,
    ...options,
  }).catch(() => {
    throw new RedirectError('/404', 404)
  })

  return responseWithFilter
}

const transform = (
  data,
  { 'arc-site': website, query, from: page, presets: customPresets }
) => {
  const pageNumber = !page || page === 0 ? 1 : page
  const presets = customPresets || 'landscape_s:234x161,landscape_xs:118x72'
  const dataStories = getResizedImageData(data, presets, website)
  const { siteName } = getProperties(website)
  dataStories.siteName = siteName

  return {
    ...dataStories,
    query,
    decoded_query: decodeURIComponent(decodeURIComponent(query)).replace(
      /\+/g,
      ' '
    ),
    page_number: pageNumber,
  }
}

const source = {
  fetch,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
