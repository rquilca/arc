import md5 from 'md5'
import BuildHtml from './build-html'
import StoryData from '../../../utilities/story-data'

const ListItemNews = (contentElements, buildProps) => {
  const {
    deployment = '',
    contextPath = {},
    arcSite = '',
    siteDomain = '',
    idGoogleAnalitics = '',
    siteUrl,
    fbArticleStyle = '',
    listUrlAdvertisings,
  } = buildProps

  const storydata = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })

  const elements = contentElements
    .map(story => {
      storydata.__data = story

      const propsScriptHeader = {
        siteDomain,
        title: storydata.title,
        sections: storydata.allSections,
        tags: storydata.tags,
        author: storydata.author,
        typeNews: storydata.multimediaType,
      }

      const scriptAnaliticaProps = {
        link: storydata.link,
        siteDomain,
        idGoogleAnalitics,
      }

      const BuildHtmlProps = {
        scriptAnaliticaProps,
        propsScriptHeader,
        title: storydata.title,
        subTitle: storydata.subTitle,
        multimedia: storydata.multimedia,
        author: storydata.author,
        paragraphsNews: storydata.paragraphsNews,
        fbArticleStyle,
        listUrlAdvertisings,
      }

      const htmlString = BuildHtml(BuildHtmlProps)
      const codigoGUID = md5(storydata.id)

      const ItemDataXml = {
        siteUrl,
        siteDomain,
        title: storydata.title,
        date: storydata.date,
        author: storydata.author,
        codigoGUID,
        htmlString,
      }
      const template = `
        <item>
          <title>${ItemDataXml.title}</title>
          <pubDate>${ItemDataXml.date}</pubDate>
          <link>${ItemDataXml.siteUrl}${storydata.link}</link>
          <guid>${ItemDataXml.codigoGUID}</guid>
          <author>${ItemDataXml.author}</author>
          <content:encoded><![CDATA[${
            ItemDataXml.htmlString
          }]]></content:encoded>
          <slash:comments>0</slash:comments>
        </item>
      `
      return template
    })
    .join('')

  return elements
}
export default ListItemNews
