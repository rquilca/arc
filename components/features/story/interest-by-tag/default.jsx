import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorChildItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import customFields from './_dependencies/custom-fields'
import {
  includePromoItems,
  includePrimarySection,
} from '../../../utilities/included-fields'

const classes = {
  storyInterest: 'story-interest w-full h-auto pr-20 pl-20',
  container: 'story-interest__container block w-full h-auto ',

  title:
    'story-interest__titleList block w-full h-auto font-bold mb-10 uppercase p-20 text-center md:text-left',
  list: 'story-interest__list flex pl-20 pr-20',
}

const CONTENT_SOURCE = 'story-feed-by-tag'

const InterestByTag = props => {
  const { customFields: { section = '', isWeb = '' } = {} } = props
  const {
    arcSite,
    globalContent: dataContent,
    contextPath,
    deployment,
    isAdmin,
    outputType: isAmp,
  } = useFusionContext()

  const presets = 'landscape_l:648x374,landscape_md:314x157'
  const includedFields = `_id,headlines.basic,${includePromoItems},websites.${arcSite}.website_url,canonical_url,${includePrimarySection}`

  const { tags: [{ slug = 'peru' } = {}] = [], id: excluir } = new StoryData({
    data: dataContent,
    contextPath,
  })

  const urlTag = section || `/${slug}/`
  const { content_elements: storyData = [] } =
    useContent({
      source: CONTENT_SOURCE,
      query: {
        website: arcSite,
        name: urlTag,
        size: 5,
        presets,
        includedFields,
      },
      filter: schemaFilter,
    }) || ''

  const instance =
    storyData &&
    new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

  let key = 0

  const dataInterest = storyData
    .map(story => {
      return story && story._id !== excluir ? story : ''
    })
    .filter(String)

  return (
    <>
      {isAmp !== 'amp' && isWeb && dataInterest && dataInterest[0] && (
        <div className={classes.storyInterest}>
          <div className={classes.container}>
            <div className={classes.title}>Te puede interesar:</div>
            <ul className={classes.list}>
              {dataInterest.map((story, i) => {
                if (key === 4) return false
                instance.__data = story
                key += 1

                const data = {
                  title: instance.title,
                  link: instance.websiteLink,
                  section: instance.primarySection,
                  sectionLink: instance.primarySectionLink,
                  lazyImage: instance.multimediaLazyDefault,
                  multimediaLandscapeMD: instance.multimediaLandscapeMD,
                  multimediaLandscapeL: instance.multimediaLandscapeL,
                  multimediaType: instance.multimediaType,
                  isAdmin,
                }
                return (
                  <StorySeparatorChildItem
                    data={data}
                    key={UtilListKey(i)}
                    arcSite={arcSite}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

InterestByTag.propTypes = {
  customFields,
}

InterestByTag.label = 'Artículo - Te puede interesar'
InterestByTag.static = true

export default InterestByTag
