import Consumer from 'fusion:consumer'
import md5 from 'md5'
import StoryData from '../../../utilities/story-data'
import {
  localISODate,
  getMultimedia,
  nbspToSpace,
  getActualDate,
  formattedTime,
} from '../../../utilities/helpers'
import buildHtml from './_dependencies/build-html'

/**
 * @description Feed para Facebook Instant Articles.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir Feed de noticias para Facebook Instant Articles.
 */

const DESCRIPTION = 'Todas las Noticias'
const SOURCE = 'story-feed-by-section-mag'

@Consumer
class XmlFacebookInstantArticles {
  constructor(props) {
    this.props = props
    const {
      globalContent,
      siteProperties: { siteDomain = '' },
    } = props
    const { content_elements: stories = [] } = globalContent || {}
    this.stories = stories
    if (siteDomain === 'elcomercio.pe') {
      this.fetchContent({
        magStories: {
          source: SOURCE,
          transform: data => {
            if (!data) return []
            const { content_elements: magStories } = data
            return magStories
          },
        },
      })
    }
  }

  render() {
    const { magStories } = this.state || {}
    if (magStories) this.stories = [...this.stories, ...magStories]

    const {
      deployment,
      contextPath,
      arcSite,
      siteProperties: {
        siteName = '',
        siteUrl = '',
        siteDomain = '',
        idGoogleAnalitics = '',
        fbArticleStyle = '',
        listUrlAdvertisings = [],
        ids: { opta },
      } = {},
    } = this.props

    if (!this.stories) {
      return null
    }

    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    const fbInstantArticlesFeed = {
      rss: {
        '@version': '2.0',
        '@xmlns:atom': 'http://www.w3.org/2005/Atom',
        '@xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
        '@xmlns:slash': 'http://purl.org/rss/1.0/modules/slash/',
        channel: [
          { language: 'es' },
          { title: siteName },
          { description: DESCRIPTION },
          { lastBuildDate: localISODate() },
          { link: siteUrl },
          ...this.stories.map(story => {
            storyData.__data = story

            const {
              related_by_tags: { content_elements: rawTagsUrls = [] } = {},
            } = story || {}
            const websiteUrlsBytag = rawTagsUrls.map(({ websites = {} }) => {
              const { website_url: websiteUrlBytag = '' } =
                websites[arcSite] || {}
              return `${siteUrl}${websiteUrlBytag}`
            })

            let storyLink = ''
            let fiaContent = ''
            if (storyData.fiaOrigen === true) {
              if (storyData.canonicalWebsite === 'elcomerciomag') {
                fiaContent = 'MAG'
                /* const {
                  websites: {
                    elcomerciomag: { website_url: magWebsiteUrl = '' } = {},
                  } = {},
                } = story || {} */
                storyLink = `${siteUrl}/mag${storyData.websiteLink}`
              } else {
                storyLink = `${siteUrl}${storyData.websiteLink}`
                fiaContent = fbArticleStyle
              }
              const pageview = `${storyLink.replace(
                siteUrl,
                ''
              )}?outputType=fia`

              const propsScriptHeader = {
                siteDomain,
                title: nbspToSpace(storyData.title),
                sections: storyData.allSections,
                tags: storyData.tags,
                author: nbspToSpace(storyData.author),
                typeNews: storyData.multimediaType,
                premium: storyData.isPremium,
              }

              const scriptAnaliticaProps = {
                siteDomain,
                idGoogleAnalitics,
                name: siteDomain,
                section: storyData.sectionsFIA.section,
                subsection: storyData.sectionsFIA.subsection,
                newsId: storyData.id,
                author: nbspToSpace(storyData.author),
                newsType: getMultimedia(storyData.multimediaType),
                pageview,
                newsTitle: nbspToSpace(storyData.title),
                nucleoOrigen: storyData.nucleoOrigen,
                formatOrigen: storyData.formatOrigen,
                contentOrigen: storyData.contentOrigen,
                genderOrigen: storyData.genderOrigen,
                arcSite,
              }

              const buildHtmlProps = {
                scriptAnaliticaProps,
                propsScriptHeader,
                title: nbspToSpace(storyData.title),
                subTitle: nbspToSpace(storyData.subTitle),
                canonical: storyLink,
                oppublished: localISODate(storyData.date || ''),
                multimedia: storyData.multimediaNews,
                author: nbspToSpace(storyData.author),
                paragraphsNews: storyData.paragraphsNews,
                fbArticleStyle: fiaContent,
                listUrlAdvertisings,
                websiteUrlsBytag,
                arcSite,
                section: storyData.sectionsFIA.section,
                getPremiumValue: storyData.getPremiumValue,
                siteUrl,
                opta,
                defaultImage: storyData.defaultImg,
              }

              const today = new Date()
              const localTime = new Date(today.setHours(today.getHours() - 5))

              return {
                item: {
                  title: {
                    '#cdata': storyData.title,
                  },
                  pubDate: localISODate(storyData.date || ''),
                  link: storyLink,
                  guid: md5(storyData.id),
                  author: nbspToSpace(storyData.author),
                  premium: storyData.isPremium,
                  captureDate: `${getActualDate()}, ${formattedTime(
                    localTime
                  )}`,
                  'content:encoded': {
                    '#cdata': buildHtml(buildHtmlProps),
                  },
                  'slash:comments': '0',
                },
              }
            }
            return { '#text': '' }
          }),
        ],
      },
    }

    return fbInstantArticlesFeed
  }
}

export default XmlFacebookInstantArticles
