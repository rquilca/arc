import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'

import FooterChildStandardG21 from './_children/footer-g21'
import { getAssetsPath } from '../../../utilities/constants'

const DEFAULT_HIERARCHY = 'footer-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const SCHEMA = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
  }
}`

const FooterStandardG21 = props => {
  const {
    customFields: {
      sectionsHierarchyConfig: {
        contentConfigValues: { hierarchy: sectionsHierarchy = '' } = {},
      } = {},
    } = {},
  } = props

  const { deployment, contextPath, arcSite } = useFusionContext()

  const {
    gecSites,
    legalLinks,
    footer: { socialNetworks = [], siteLegal, story },
    assets: { footer: { logo } = {} } = {},
  } = getProperties(arcSite)

  const sections = useContent({
    source: CONTENT_SOURCE,
    query: {
      hierarchy: sectionsHierarchy || DEFAULT_HIERARCHY,
    },
    filter: SCHEMA,
  })

  const formatData = res => {
    const { children = [] } = res || {}
    const auxList = children.map(el => {
      if (el.node_type === 'link') {
        return {
          name: el.display_name,
          url: el.url,
          node_type: el.node_type,
        }
      }
      return {
        name: el.name,
        url: el._id,
        node_type: el.node_type,
      }
    })
    return auxList
  }

  const logoUrl =
    deployment(
      `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${logo}`
    ) || ''

  const formattedSections = sections && formatData(sections)

  const params = {
    socialNetworks,
    gecSites,
    legalLinks,
    siteLegal,
    logoUrl,
    sections: formattedSections,
    arcSite,
    story,
  }

  return <FooterChildStandardG21 {...params} />
}

FooterStandardG21.label = 'Pie de Página - G21'
FooterStandardG21.static = true

FooterStandardG21.propTypes = {
  customFields: PropTypes.shape({
    sectionsHierarchyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación de "secciones"',
      group: 'Configuración del contenido',
    }),
  }),
}

export default FooterStandardG21
