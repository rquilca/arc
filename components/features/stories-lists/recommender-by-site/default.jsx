/* eslint-disable import/no-unresolved */
import React from 'react'
import Static from 'fusion:static'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { includePromoItems } from '../../../utilities/included-fields'

import StoriesListRecommenderBySiteChild from './_children/linked-by-site'

import { getResizedUrl } from '../../../utilities/resizer'

const StoriesListRecommenderBySite = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      enabledContentManual,
      storiesManualConfig: {
        contentService: contentServiceManual = '',
        contentConfigValues: contentConfigManualValues = {},
      } = {},
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
      isTargetBlank = false,
      titleField,
      subtitleField,
    } = {},
  } = props
  /**
   * TODO: Se podria agregar caso por defecto para que haga fetch
   * de las ultimas notas de Mag o del sitio actual.
   */

  const { website } = contentConfigValues
  const { siteUrl, siteName } = getProperties(website || arcSite) || {}

  // const presets = 'landscape_s:234x161,square_s:150x150'
  const presets = 'no-presets'
  const includedFields = `headlines.basic,promo_items.basic_html.content,${includePromoItems},websites.${website ||
    arcSite}.website_url`

  const dataManual =
    (enabledContentManual &&
      useContent({
        source: contentServiceManual,
        query: Object.assign(contentConfigManualValues, {
          presets,
          includedFields,
        }),
        filter: schemaFilter(website || arcSite),
      })) ||
    {}

  console.log('contentConfigManualValues', contentConfigManualValues)

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(website || arcSite),
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const process = contentElements => {
    const stories = contentElements.map(story => {
      storyData._data = story

      const { websites = {} } = story || {}
      const site = websites[website] || {}
      const websiteUrl = site.website_url || ''

      const {
        title,
        websiteLink,
        multimedia,
        multimediaLazyDefault,
      } = storyData

      const { landscape_s: landscapeS, square_s: squareS } =
        typeof window === 'undefined'
          ? getResizedUrl({
              url: multimedia,
              presets: 'landscape_s:234x161,square_s:150x150',
              arcSite: website || arcSite,
            }) || {}
          : {}

      return {
        title,
        websiteLink: `${siteUrl}${websiteUrl ||
          websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
        multimediaLazyDefault,
        multimediaSquareS: squareS || multimedia,
        multimediaLandscapeS: landscapeS || multimedia,
      }
    })
    return stories
  }

  const { content_elements: resaizedContentElementsManual = [] } =
    dataManual || {}
  const storiesManual = process(resaizedContentElementsManual)

  const { content_elements: resaizedContentElements = [] } = data || {}
  const stories = process(resaizedContentElements)

  console.log('dataManual', dataManual)
  console.log('data', data)
  console.log('storiesManual', storiesManual)
  console.log('stories', stories)

  const params = {
    isAdmin,
    siteName,
    stories: [...storiesManual, ...stories],
    isTargetBlank: isTargetBlank ? { target: '_blank', rel: 'noopener' } : {},
    titleField,
    subtitleField,
  }

  return (
    <Static>
      <StoriesListRecommenderBySiteChild {...params} />
    </Static>
  )
}

StoriesListRecommenderBySite.propTypes = {
  customFields,
}

StoriesListRecommenderBySite.label = 'Recomendados Por Marca'
StoriesListRecommenderBySite.static = true

export default StoriesListRecommenderBySite
