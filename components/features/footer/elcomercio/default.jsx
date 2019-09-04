import React from 'react'

import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import ElComercioChildFooter from './children/footer'

const FooterElComercio = () => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const {
    assets: { footer: { logo } = {} } = {},
    legalLinks = [],
    footer: { siteLegal = [], directors = [], contacts = [] },
    gecSites = [],
    gda = false,
  } = getProperties(arcSite)

  const logoUrl =
    deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`) || ''

  const gdaLogo =
    deployment(`${contextPath}/resources/assets/footer/logo-gda.png`) || ''

  const params = {
    legalLinks,
    siteLegal,
    directors,
    contacts,
    logoUrl,
    gdaLogo,
    gecSites,
    gda,
    arcSite,
    isAdmin,
  }

  return <ElComercioChildFooter {...params} />
}

FooterElComercio.label = 'Pié de página - El Comercio'
FooterElComercio.static = true

export default FooterElComercio
