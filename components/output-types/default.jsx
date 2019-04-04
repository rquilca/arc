import React from 'react'
import MetaSite from './_children/MetaSite'
import TwitterCards from './_children/twitter-cards'
import OpenGraph from './_children/open-graph'
// import GoogleTagManager from './_children/googleTagManager'

import MetaAutor from './_children/MetaAutor'

export default ({
  children,
  globalContent,
  contextPath,
  deployment,
  arcSite,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
  siteProperties,
  requestUri,
  metaValue,
}) => {
  const properties = {
    ...siteProperties,
    requestUri,
    arcSite,
    contextPath,
    deployment,
  }
  return (
    <html lang="es">
      <head>
        <MetaTags/>
        <Libs />
        <CssLinks />
        <MetaAutor  globalContent ={globalContent} properties ={properties}/>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="dns-prefetch" href="//ecoid.pe" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//ajax.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <script async="" src="//static.chartbeat.com/js/chartbeat_mab.js" />

        
        <MetaAutor  globalContent ={globalContent} properties ={properties}/>
        <MetaSite data={properties} />
        <TwitterCards
          twitterUser={siteProperties.social.twitter.user}
          siteUrl={siteProperties.siteUrl}
          arcSite={arcSite}
          title="title" // check data origin
          description="" // check data origin
          twitterCreator={siteProperties.social.twitter.user}
          article // check data origin - Boolean
        />
        <OpenGraph
          fbAppId={siteProperties.fbAppId}
          title="" // check data origin
          description="" // check data origin
          siteUrl={siteProperties.siteUrl}
          arcSite={arcSite}
          requestUri={requestUri}
          siteName={siteProperties.siteName}
          article // check data origin - Boolean
        />
        <link
          rel="canonical"
          href={`https://${siteProperties.siteUrl}${requestUri}`}
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/favicon.ico`
          )}
        />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/style.css`
          )}
        />
        <title>{metaValue('title') || siteProperties.siteName}</title>
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <script
          src={deployment(
            `${contextPath}/resources/dist/${arcSite}/js/index.js`
          )}
        />
        <Fusion />
      </body>
    </html>
  )
}
