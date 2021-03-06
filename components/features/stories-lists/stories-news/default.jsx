import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { reduceWord } from '../../../utilities/helpers'
import StoryItem from '../../../global-components/story-new'
import Ads from '../../../global-components/ads'
import ConfigParams from '../../../utilities/config-params'
import {
  includePromoItems,
  includePromoItemsCaptions,
  includePrimarySection,
  includeCredits,
} from '../../../utilities/included-fields'

const classes = {
  listado: 'w-full',
  listadoSeeMore: 'story-item__btn flex justify-center mt-20 uppercase',
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const StoriesListNew = (props) => {
  const hasAds = (index, adsList) => adsList.filter((el) => el.pos === index)
  const {
    arcSite,
    contextPath,
    deployment,

    isAdmin,
    siteProperties: { isDfp = false },
  } = useFusionContext()

  const presets = 'landscape_md:314x157,landscape_s:234x161,landscape_xs:118x72'
  const includedFields = `headlines.basic,subheadlines.basic,${includeCredits},credits.by.image.url,promo_items.basic_html.content,${includePromoItems},${includePromoItemsCaptions},websites.${arcSite}.website_url,${includePrimarySection(
    { arcSite }
  )},display_date`

  const { customFields: customFieldsProps = {} } = props
  const {
    storyConfig: { contentService = '', contentConfigValues = {} } = {},
    seeMoreLink,
  } = customFieldsProps

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const { content_elements: contentElements } = data
  const stories = contentElements || []

  const activeAds = Object.keys(customFieldsProps)
    .filter((prop) => prop.match(/adsMobile(\d)/))
    .filter((key) => customFieldsProps[key] === true)

  const typeSpace = isDfp ? 'caja' : 'movil'

  const activeAdsArray = activeAds.map((el) => {
    return {
      name: `${typeSpace}${el.slice(-1)}`,
      pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
      inserted: false,
    }
  })

  const Story = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })
  return (
    <div className={classes.listado}>
      <div>
        {stories &&
          stories.map((story, index) => {
            const ads = hasAds(index + 1, activeAdsArray)
            Story.__data = story
            const {
              primarySectionLink,
              primarySection,
              date,
              websiteLink,
              title,
              subTitle,
              authorLink,
              author,
              authorImage,
              multimediaType,
              multimediaLandscapeXS,
              multimediaLazyDefault,
              multimediaLandscapeS,
            } = Story

            const isOpinionCorreo =
              primarySectionLink === '/opinion/' &&
              arcSite === ConfigParams.SITE_DIARIOCORREO

            const imgItemLandscapeXS = isOpinionCorreo
              ? authorImage
              : multimediaLandscapeXS
            const imgItemLandscapeS = isOpinionCorreo
              ? authorImage
              : multimediaLandscapeS

            return (
              <>
                <StoryItem
                  {...{
                    isAdmin,
                    primarySectionLink,
                    primarySection,
                    date,
                    websiteLink,
                    title: reduceWord(title),
                    subTitle: reduceWord(subTitle),
                    authorLink,
                    author,
                    authorImage,
                    multimediaType,
                    multimediaLandscapeXS: imgItemLandscapeXS,
                    multimediaLazyDefault,
                    multimediaLandscapeS: imgItemLandscapeS,
                    formato: 'row',
                  }}
                />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads
                      adElement={ads[0].name}
                      isDesktop={false}
                      isMobile
                      isDfp={isDfp}
                    />
                  </div>
                )}
              </>
            )
          })}
      </div>
      <div className={classes.listadoSeeMore}>
        <a itemProp="url" href={seeMoreLink} tabIndex="0" role="button">
          Ver m??s
        </a>
      </div>
    </div>
  )
}

StoriesListNew.propTypes = {
  customFields,
}

StoriesListNew.label = 'Listado de Noticia'
StoriesListNew.static = true

export default StoriesListNew
