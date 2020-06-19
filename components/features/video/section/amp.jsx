import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import React from 'react'
import { storyTagsBbc } from '../../../utilities/helpers'

import StorySocialChildAmpSocial from '../../story/social/_children/amp-social'
import ElePrincipal from '../../story/contents/_children/amp-ele-principal'
import StoryData from '../../../utilities/story-data'
import StoryContentChildTags from '../../story/contents/_children/tags'
import StoryContentChildRelated from '../../story/contents/_children/related'
import ConfigParams from '../../../utilities/config-params'
import { getAssetsPath } from '../../../utilities/constants'
import {
  publicidadAmp,
  publicidadAmpAd,
} from '../../../utilities/story/helpers-amp'

const classes = {
  content: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto',
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  titleAmp:
    'amp-sh__title font-bold secondary-font title-md text-gray-300 line-h-xs',
  datetime: 'amp-sh__datetime mt-15 mb-15 block secondary-font text-lg',
  description: 'amp-sh__description mt-0 text-md text-gray-300 secondary-font',
  adsAmp: 'text-center ad-amp-movil',
  author: 'amp-story-content__author mt-15 mb-15 secondary-font',
  bbcHead: 'bbc-head',
}
const VideoSectionAmp = () => {
  const {
    globalContent: data,
    arcSite,
    contextPath,
    deployment,
    isAmp,
    siteProperties: { adsAmp },
  } = useFusionContext()

  const {
    id,
    title,
    subTitle,
    tags,
    promoItems,
    authorLink,
    author,
  } = new StoryData({
    data,
    contextPath,
  })

  const { basic: relatedContent = [] } =
    useContent({
      source: 'related-content',
      query: {
        _id: id,
        presets: 'no-presets',
      },
    }) || {}

  const dataSlotNa = `/${adsAmp.dataSlot}/${
    arcSite !== 'peru21g21' ? arcSite : 'peru21'
  }/amp/post/default/caja1`
  const width = '320'
  const height = '50'
  const parametersCaja1 = {
    // top
    dataSlot: dataSlotNa,
    width,
    height,
    movil1: true,
  }

  const namePublicidad = arcSite !== 'peru21g21' ? arcSite : 'peru21'

  const dataSlot = `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja2` // movil2

  const parametersCaja2 = { dataSlot, width, height, movil1: true }

  const parametersCaja3 = {
    // movil4 caja4 caja3
    dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja3`,
    width,
    height,
    movil1: true,
  }
  const parametersCaja4 = {
    // movil5 caja5 caja4
    dataSlot: `/${adsAmp.dataSlot}/${namePublicidad}/amp/post/default/caja4`,
    width,
    height,
    movil1: true,
  }

  const URL_BBC = 'http://www.bbc.co.uk/mundo/?ref=ec_top'
  const imgBbc =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/bbc_head.png?d=1` || ''

  return (
    <>
      <div className={classes.stories}>
        <header>
          <div
            className={classes.adsAmp}
            dangerouslySetInnerHTML={publicidadAmp(parametersCaja1)}
          />
          {storyTagsBbc(tags) && (
            <div className={classes.bbcHead}>
              <a
                href={URL_BBC}
                rel="nofollow noopener noreferrer"
                target="_blank">
                <amp-img
                  alt="BBC"
                  layout="responsive"
                  width="500"
                  height="30"
                  src={imgBbc}
                  data-src={imgBbc}
                />
              </a>
            </div>
          )}
          <h1 className={classes.titleAmp}>{title}</h1>
        </header>
        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmp(parametersCaja2)}
        />

        <div className={classes.description}> {subTitle}</div>
        <StorySocialChildAmpSocial />
      </div>
      <div className={classes.content}>
        <ElePrincipal data={promoItems} />

        <p className={classes.author}>
          <a href={authorLink}>{author}</a>
        </p>

        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja3)}
        />
        <div
          className={classes.adsAmp}
          dangerouslySetInnerHTML={publicidadAmpAd(parametersCaja4)}
        />
        <StoryContentChildTags data={tags} {...isAmp} />
        {relatedContent.length > 0 && (
          <div className={classes.related}>
            <div className={classes.relatedTitle}>Relacionadas </div>
            {relatedContent.map((item, i) => {
              const { type } = item
              const key = `related-${i}`
              return type !== ConfigParams.ELEMENT_STORY ? (
                ''
              ) : (
                <StoryContentChildRelated
                  key={key}
                  {...item}
                  contextPath={contextPath}
                  arcSite={arcSite}
                  deployment={deployment}
                  isAmp="true"
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

VideoSectionAmp.static = true
export default VideoSectionAmp
