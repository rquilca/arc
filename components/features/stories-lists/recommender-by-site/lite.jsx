/* eslint-disable import/no-unresolved */
import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'
import { includePromoItems } from '../../../utilities/included-fields'

import StoriesListRecommenderBySiteChild from './_lite/_children/linked-by-site'

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

  const { website } = contentConfigValues
  const { siteUrl, siteName } = getProperties(website || arcSite) || {}

  const presets = 'landscape_s:234x161,square_s:150x150'

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
      })) ||
    {}

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
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
        multimediaLazyDefault,
        multimediaSquareS,
        multimediaLandscapeS,
      } = storyData

      return {
        title,
        websiteLink: `${siteUrl}${websiteUrl ||
          websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
        multimediaLazyDefault,
        multimediaSquareS,
        multimediaLandscapeS,
      }
    })
    return stories
  }

  const { content_elements: resaizedContentElementsManual = [] } =
    dataManual || {}
  const storiesManual = process(resaizedContentElementsManual)

  const { content_elements: resaizedContentElements = [] } = data || {}
  const stories = process(resaizedContentElements)

  const params = {
    isAdmin,
    siteName,
    stories: [...storiesManual, ...stories],
    isTargetBlank: isTargetBlank ? { target: '_blank', rel: 'noopener' } : {},
    titleField,
    subtitleField,
  }

  return <StoriesListRecommenderBySiteChild {...params} />
}

StoriesListRecommenderBySite.propTypes = {
  customFields,
}

StoriesListRecommenderBySite.label = 'Recomendados Por Marca'
StoriesListRecommenderBySite.static = true

export default StoriesListRecommenderBySite
