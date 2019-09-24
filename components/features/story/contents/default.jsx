// file path: StoryContentContent.js
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import ArcStoryContent, {
  Oembed,
  /* RawHtml, */
  Text,
} from '@arc-core-components/feature_article-body'
import {
  appendToBody,
  createLink,
  createScript,
  replaceTags,
  /* replaceHtmlMigracion, */
} from '../../../utilities/helpers'

import StoryContentsChildVideo from './_children/video'
import StoryContentsChildImage from './_children/image'
import StoryHeaderChildGallery from '../gallery/_children/gallery'
import StoryContentChildRawHTML from './_children/rawHtml'
import StoryContentsChildBlockQuote from './_children/blockquote'
import StoryContentsChildTable from '../../../global-components/story-table'
import StoryContentsChildAuthor from './_children/author'
import StoryContentsChildMultimedia from './_children/multimedia'
import StoryContentsChildRelatedInternal from './_children/related-internal'
import StoryContentsChildIcon from './_children/icon-list'
import ConfigParams from '../../../utilities/config-params'
import StoryData from '../../../utilities/story-data'
import StoryContentsChildImpresa from './_children/impresa'
import StoryContentsChildVideoNativo from './_children/video-nativo'

const classes = {
  news: 'story-content w-full pr-20 pl-20',
  content: 'story-content__content position-relative flex flex-row-reverse',
  textClasses:
    'story-content__font--secondary mb-25 title-xs line-h-md mt-20 secondary-font pr-20',
  newsImage: 'story-content__image w-full m-0 story-content__image--cover ',
  newsEmbed: 'story-content__embed',
  tags: 'story-content',
  section: 'w-full',
  listClasses: 'story-content__paragraph-list',
  alignmentClasses: 'story-content__alignment',
}

@Consumer
class StoryContents extends PureComponent {
  componentDidMount() {
    const { arcSite } = this.props
    if (arcSite === ConfigParams.SITE_ELCOMERCIO) {
      appendToBody(
        createScript({
          src:
            'https://w.ecodigital.pe/components/elcomercio/mxm/mxm.bundle.js?v=1.7',
          defer: true,
        })
      )
    }
  }

  handleOptaWidget = ({ id, css, js, defer }) => {
    // eslint-disable-next-line camelcase
    if (typeof opta_settings === 'undefined') {
      appendToBody(
        createScript({
          textContent: `
        var opta_settings={
            subscription_id: '${id}',
            language: 'es_CO',
            timezone: 'America/Lima'
        };`,
        })
      )
      appendToBody(
        createScript({
          src: js,
          defer,
        })
      )
      appendToBody(createLink(css))
    }
  }

  render() {
    const {
      globalContent,
      arcSite,
      contextPath,
      deployment,
      siteProperties: {
        ids: { opta },
      },
    } = this.props
    const { related_content: { basic: relatedContent } = {} } =
      globalContent || {}

    const {
      publishDate: date,
      promoItems,
      displayDate: updatedDate,
      contentElements,
      authorImage,
      authorLink,
      author,
      primarySection,
      authorEmail,
      primarySectionLink,
      subtype,
      isPremium,
    } = new StoryData({
      data: globalContent,
      contextPath,
      deployment,
      arcSite,
    })

    const params = {
      authorImage,
      author,
      authorLink,
      updatedDate,
      date,
      primarySectionLink,
      authorEmail,
      primarySection,
      subtype,
      ...promoItems,
    }

    return (
      <div className={classes.news}>
        {primarySection === 'Impresa'
          ? promoItems && <StoryContentsChildImpresa data={promoItems} />
          : promoItems &&
            subtype !== ConfigParams.BIG_IMAGE &&
            subtype !== ConfigParams.SPECIAL_BASIC &&
            subtype !== ConfigParams.SPECIAL && (
              <StoryContentsChildMultimedia data={params} />
            )}

        <StoryContentsChildAuthor {...params} />

        <div id="ads_m_movil2" />
        <div
          className={`${classes.content} ${isPremium && 'paywall'} `}
          id="contenedor">
          <StoryContentsChildIcon />
          <div id="ads_d_inline" />
          <div id="ads_m_movil_video" />
          <div id="ads_m_movil3" />
          {contentElements && (
            <ArcStoryContent
              data={contentElements}
              elementClasses={classes}
              renderElement={element => {
                const {
                  _id,
                  type,
                  subtype,
                  raw_oembed: rawOembed,
                  content,
                  alignment = '',
                } = element
                if (type === ConfigParams.ELEMENT_IMAGE) {
                  return (
                    <StoryContentsChildImage
                      data={element}
                      className={classes.newsImage}
                      resizer="true"
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_VIDEO) {
                  return (
                    <>
                      {element && element.embed_html ? (
                        <StoryContentsChildVideo
                          data={element.embed_html}
                          className={classes.newsImage}
                        />
                      ) : (
                        <StoryContentsChildVideoNativo
                          streams={element && element.streams}
                        />
                      )}
                    </>
                  )
                }
                if (type === ConfigParams.ELEMENT_GALLERY) {
                  return (
                    <StoryHeaderChildGallery
                      contentElementGallery={element}
                      type={type}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_TABLE) {
                  return <StoryContentsChildTable data={element} type={type} />
                }
                if (type === ConfigParams.ELEMENT_QUOTE) {
                  return <StoryContentsChildBlockQuote data={element} />
                }
                if (type === ConfigParams.ELEMENT_OEMBED) {
                  return (
                    <Oembed
                      rawOembed={rawOembed}
                      subtype={subtype}
                      className={classes.newsEmbed}
                    />
                  )
                }
                if (type === ConfigParams.ELEMENT_STORY) {
                  return (
                    <StoryContentsChildRelatedInternal
                      stories={relatedContent}
                      id={_id}
                    />
                  )
                }

                if (type === ConfigParams.ELEMENT_TEXT) {
                  const alignmentClass = alignment
                    ? `${classes.textClasses} ${
                        classes.alignmentClasses
                      }-${alignment}`
                    : classes.textClasses
                  return (
                    <Text
                      content={replaceTags(content)}
                      className={alignmentClass}
                    />
                  )
                }

                if (type === ConfigParams.ELEMENT_RAW_HTML) {
                  /* Si encuentra opta-widget agrega scripts a <head> */
                  if (content.includes('opta-widget'))
                    this.handleOptaWidget({
                      id: opta,
                      css: ConfigParams.OPTA_CSS_LINK,
                      js: ConfigParams.OPTA_JS_LINK,
                      defer: true,
                    })

                  let htmlReturn = ''
                  let contentVideo = content
                  if (contentVideo.includes('id="powa-')) {
                    if (arcSite === ConfigParams.ARC_SITE_PERU21) {
                      contentVideo = content.replace(
                        /peru21.pe\/upload/gi,
                        'img.peru21.pe/upload'
                      )
                    }
                    htmlReturn = (
                      <StoryContentsChildVideo
                        data={contentVideo}
                        className={classes.newsImage}
                      />
                    )
                  } else {
                    htmlReturn = (
                      <StoryContentChildRawHTML content={contentVideo} />
                    )
                  }
                  return htmlReturn
                  /* return content.includes('id="powa-') ? (
                    <StoryContentsChildVideo
                      data={content}
                      className={classes.newsImage}
                    />
                  ) : (
                    <StoryContentChildRawHTML content={content} />
                  ) */
                }
                return ''
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

StoryContents.label = 'Artículo - contenidos'

export default StoryContents
