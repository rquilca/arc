import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ColumnistPremium from './_childen/columnist-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import {
  includeCredits,
  includePrimarySection,
  includeCreditsImage,
} from '../../../utilities/included-fields'

const FeaturedStoryColumnist = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties,
  } = useFusionContext()
  const {
    assets: {
      premium: { logo },
    },
  } = siteProperties || {}
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const includedFields = `content_restrictions.content_code,websites.${arcSite}.website_url,subheadlines.basic,${includeCredits},${includeCreditsImage},${includePrimarySection}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    authorImage,
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    subTitle,
    isPremium,
    websiteLink,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const lazyImage = deployment(
    `${contextPath}/resources/assets/author-grid/author.png`
  )

  const params = {
    lazyImage,
    authorImage,
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    subTitle,
    isPremium,
    websiteLink,
    isAdmin,
    logo: deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`),
  }
  return <ColumnistPremium {...params} />
}

FeaturedStoryColumnist.propTypes = {
  customFields,
}

FeaturedStoryColumnist.label = 'Columnista Premium'
// FeaturedStoryColumnist.static = true

export default FeaturedStoryColumnist
