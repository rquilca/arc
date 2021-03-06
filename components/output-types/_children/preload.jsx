import React from 'react'

import {
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21,
  SITE_TROME,
} from '../../utilities/constants/sitenames'

export default ({ arcSite }) => (
  <>
    {arcSite === SITE_ELCOMERCIO && (
      <>
        <link
          rel="preload"
          href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/georgia-latin-regular.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/roboto-v20-latin-700.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/roboto-v20-latin-regular.woff2"
          as="font"
          type="font/woff2"
        />
      </>
    )}
    {arcSite === SITE_DEPOR && (
      <>
        <link
          rel="preload"
          href="https://cdna.depor.com/resources/dist/depor/fonts/roboto-v20-latin-700.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.depor.com/resources/dist/depor/fonts/roboto-v20-latin-regular.woff2"
          as="font"
          type="font/woff2"
        />
      </>
    )}
    {arcSite === SITE_PERU21 && (
      <>
        <link
          rel="preload"
          href="https://cdna.peru21.pe/resources/dist/peru21/fonts/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.peru21.pe/resources/dist/peru21/fonts/Exo.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.peru21.pe/resources/dist/peru21/fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
        />
      </>
    )}

    {arcSite === SITE_TROME && (
      <>
        <link
          rel="preload"
          href="https://cdna.trome.pe/resources/dist/trome/fonts/Roboto-Regular.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.trome.pe/resources/dist/trome/fonts/Roboto-Bold.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.trome.pe/resources/dist/trome/fonts/roboto-v20-latin-500.woff2"
          as="font"
          type="font/woff2"
        />
      </>
    )}
    {arcSite === SITE_ELBOCON && (
      <>
        <link
          rel="preload"
          href="https://cdna.elbocon.pe/resources/dist/elbocon/fonts/TitilliumWeb-Bold.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.elbocon.pe/resources/dist/elbocon/fonts/Roboto-Slab.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.elbocon.pe/resources/dist/elbocon/fonts/TitilliumWeb-Regular.woff2"
          as="font"
          type="font/woff2"
        />
      </>
    )}
    {arcSite === SITE_ELCOMERCIOMAG && (
      <>
        <link
          rel="preload"
          href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/roboto-v20-latin-700.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/roboto-v20-latin-regular.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/Lato-Regular.woff2"
          as="font"
          type="font/woff2"
        />
      </>
    )}
  </>
)
