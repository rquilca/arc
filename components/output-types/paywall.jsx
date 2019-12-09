// import React from 'react'
// import PropTypes from 'prop-types'
// import * as Meta from './_children/meta'
// import TagManager from './_children/tag-manager'
// import { interpolateUrl } from '../features/paywall/_dependencies/domains'
// import './paywall.css'

// const Paywall = props => {
//   const {
//     metaValue,
//     contextPath,
//     children,
//     arcSite,
//     siteProperties,
//     deployment,
//   } = props

//   const {
//     siteName,
//     paywall: { urls, title, description },
//   } = siteProperties

//   const canonicalUrl = deployment(interpolateUrl(urls.canonical))
//   const imageUrl = deployment(interpolateUrl(urls.image))

//   return (
//     <html lang="es" className={arcSite}>
//       <head>
//         <TagManager {...siteProperties} />
//         <meta charSet="utf-8" />
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, maximum-scale=1"
//         />
//         <title>{metaValue('title') || title}</title>

//         {/* METAS SUGERIDOS */}
//         <meta name="description" content={description} />
//         <link rel="canonical" href={canonicalUrl} />
//         <meta name="theme-color" content="#444444" />
//         <meta name="msapplication-TileColor" content="#444444" />
//         <meta name="twitter:card" content="summary" />
//         <meta name="twitter:site" content="@Gestionpe" />
//         <meta name="twitter:title" content="Suscripciones Digitales" />
//         <meta name="twitter:image" content={imageUrl} />
//         <meta name="twitter:description" content={description} />
//         <meta property="og:title" content="Suscripciones Digitales" />
//         <meta property="og:description" content={description} />
//         <meta property="og:image" content={imageUrl} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:site_name" content={siteName} />
//         <meta property="og:type" content="website" />
//         {/* METAS SUGERIDOS */}

//         <props.Libs />
//         <props.CssLinks />
//         <Meta.Icon {...props} />
//         <link
//           rel="stylesheet"
//           href={deployment(
//             `${contextPath}/resources/dist/${arcSite}/css/paywall.css`
//           )}
//         />
//         <props.MetaTags />
//         <link rel="dns-prefetch" href="//fonts.gstatic.com" />
//         <link rel="dns-prefetch" href="//fonts.googleapis.com" />
//         <link rel="dns-prefetch" href="//www.google-analytics.com" />
//         <link
//           href="https://fonts.googleapis.com/css?family=Open+Sans:300,700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body onbeforeunload={() => 'message'}>
//         <noscript>
//           <iframe
//             title="Google Tag Manager - No Script"
//             src={`https://www.googletagmanager.com/ns.html?id=${siteProperties.googleTagManagerId}`}
//             height="0"
//             width="0"
//             style={{ display: 'none', visibility: 'hidden' }}
//           />
//         </noscript>
//         <div id="fusion-app" role="application" className="layout-paywall">
//           {children}
//         </div>
//         <props.Fusion />
//       </body>
//     </html>
//   )
// }

// Paywall.fallback = false

// Paywall.propTypes = {
//   children: PropTypes.node,
// }

// export default Paywall
