import ConfigParams from './config-params'
import {
  defaultImage,
  formatHtmlToText,
  breadcrumbList,
  addSlashToEnd,
  msToTime,
} from './helpers'
import { getVideoIdRedSocial } from './story/helpers'
import { getAssetsPath } from './constants'

class StoryData {
  static VIDEO = ConfigParams.VIDEO

  static GALLERY = ConfigParams.GALLERY

  static HTML = ConfigParams.HTML

  static IMAGE = ConfigParams.IMAGE

  static AUTOR_SOCIAL_NETWORK_TWITTER =
    ConfigParams.AUTOR_SOCIAL_NETWORK_TWITTER

  constructor({
    data = {},
    deployment = () => {},
    contextPath = '',
    arcSite = '',
    defaultImgSize = 'md',
    siteUrl = '',
  }) {
    this._data = data
    this._deployment = deployment
    this._contextPath = contextPath
    this._website = arcSite
    this._defaultImgSize = defaultImgSize
    this._siteUrl = siteUrl
  }

  get __data() {
    return this._data
  }

  set __data(val) {
    this._data = val
  }

  get __website() {
    return this._website
  }

  set __website(val) {
    this._website = val
  }

  get __defaultImgSize() {
    return this._defaultImgSize
  }

  set __defaultImgSize(val) {
    this._defaultImgSize = val
  }

  get id() {
    return (this._data && this._data._id) || ''
  }

  get title() {
    return (
      (this._data && this._data.headlines && this._data.headlines.basic) || ''
    )
  }

  get subtype() {
    return (this._data && this._data.subtype) || ''
  }

  get editorNote() {
    return (this._data && this._data.editor_note) || ''
  }

  get tags() {
    return (this._data && this._data.taxonomy && this._data.taxonomy.tags) || []
  }

  get subTitle() {
    return (
      (this._data &&
        this._data.subheadlines &&
        this._data.subheadlines.basic) ||
      ''
    )
  }

  get author() {
    return StoryData.getDataAuthor(this._data).nameAuthor
  }

  get authorEmail() {
    return StoryData.getDataAuthor(this._data).mailAuthor
  }

  get seoAuthor() {
    const defaultAuthor = 'Redacción '
    return (
      StoryData.getDataAuthor(this._data).nameAuthor ||
      defaultAuthor +
        this._website.charAt(0).toUpperCase() +
        this._website.slice(1)
    )
  }

  get authorLink() {
    return addSlashToEnd(StoryData.getDataAuthor(this._data).urlAuthor)
  }

  get authorSlug() {
    return StoryData.getDataAuthor(this._data).slugAuthor
  }

  get authorRoleByNewsLetter() {
    return StoryData.getDataAuthor(this._data).role
  }

  get authorBiography() {
    return StoryData.getDataAuthor(this._data).sortBiography
  }

  get authorTwitterLink() {
    const twitter = StoryData.getDataAuthor(this._data).socialLinks.filter(
      x => x.site === ConfigParams.AUTOR_SOCIAL_NETWORK_TWITTER
    )
    const result = twitter && twitter[0] && twitter[0].url ? twitter[0].url : ''
    return result
  }

  get authorOccupation() {
    const { credits: { by = [] } = {} } = this._data || {}
    const {
      additional_properties: {
        original: { role = '', education = '' } = {},
      } = {},
    } = by[0] || {}
    const { name = '' } = education[0] || {}

    return name || role || 'Autor'
  }

  get authorRole() {
    const { credits: { by = [] } = {} } = this._data || {}
    const { additional_properties: { original: { role = '' } = {} } = {} } =
      by[0] || {}
    return role
  }

  get defaultImg() {
    return defaultImage({
      deployment: this._deployment,
      contextPath: this._contextPath,
      arcSite: this._website,
      size: this._defaultImgSize,
    })
  }

  get authorImageSquareXS() {
    return StoryData.getAuthorImageSquareXS(this.__data)
  }

  get authorImage() {
    return (
      StoryData.getDataAuthor(this._data, {
        contextPath: this._contextPath,
        deployment: this._deployment,
        website: this._website,
      }).imageAuthor || this.defaultImg
    )
  }

  get multimedia() {
    return this.getMultimediaBySize(ConfigParams.IMAGE_ORIGINAL)
  }

  get multimediaLandscapeXL() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_XL)
  }

  get multimediaLandscapeL() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_L)
  }

  get multimediaLandscapeMD() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_MD)
  }

  get multimediaLandscapeS() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_S)
  }

  get multimediaLandscapeXS() {
    return this.getMultimediaBySize(ConfigParams.LANDSCAPE_XS)
  }

  get multimediaPortraitXL() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_XL)
  }

  get multimediaPortraitL() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_L)
  }

  get multimediaPortraitMD() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_MD)
  }

  get multimediaPortraitS() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_S)
  }

  get multimediaPortraitXS() {
    return this.getMultimediaBySize(ConfigParams.PORTRAIT_XS)
  }

  get multimediaSquareXL() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_XL)
  }

  get multimediaSquareL() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_L)
  }

  get multimediaSquareMD() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_MD)
  }

  get multimediaSquareS() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_S)
  }

  get multimediaSquareXS() {
    return this.getMultimediaBySize(ConfigParams.SQUARE_XS)
  }

  get multimediaLarge() {
    return this.getMultimediaBySize(ConfigParams.LARGE)
  }

  get multimediaStorySmall() {
    return this.getMultimediaBySize(ConfigParams.STORY_SMALL)
  }

  get multimediaImpresaS() {
    return this.getMultimediaBySize(ConfigParams.IMPRESA_S)
  }

  get multimediaLazyDefault() {
    // return this.getMultimediaBySize(ConfigParams.LAZY_DEFAULT)
    return this.defaultImg
  }

  get multimediaType() {
    // return StoryData.getTypeMultimedia(this._data)
    return StoryData.getMultimediaIconType(this._data)
  }

  get promoItemsType() {
    return this.getPromoItemsType() || ''
  }

  get quantityGalleryItem() {
    return StoryData.lengthImageGallery(this._data)
  }

  get section() {
    // FIXME: deprecated
    return StoryData.getDataSection(this._data, this._website).name
  }

  get sectionLink() {
    // FIXME: deprecated
    return addSlashToEnd(
      StoryData.getDataSection(this._data, this._website).path
    )
  }

  get primarySection() {
    return StoryData.getPrimarySection(this._data).name
  }

  get primarySectionLink() {
    return addSlashToEnd(StoryData.getPrimarySection(this._data).path) || ''
  }

  get sectionsFIA() {
    let result = { section: null, subsection: null }
    const { taxonomy: { primary_section: { path } = {} } = {} } =
      this._data || {}
    if (path) {
      result = { section: null, subsection: null }
      const listSections = this._data.taxonomy.primary_section.path.split('/')

      result.section = listSections[1] !== undefined ? listSections[1] : null
      result.subsection = listSections[2] !== undefined ? listSections[2] : null
    }
    return result
  }

  get allSections() {
    let auxSections = []
    let result = []
    const { taxonomy: { sections = [] } = {} } = this._data || {}
    if (sections) {
      auxSections = sections.map(sec => sec.name)
    }
    result = auxSections.filter(x => x !== null || x !== undefined || x !== '')
    return result
  }

  get type() {
    const { type = '' } = this._data || {}
    return type
  }

  // TODO: Validar que link regrese la url correcta de la nota
  get link() {
    const { website_url: url = '' } = this._data || {}
    return addSlashToEnd(url)
  }

  get canonicalUrl() {
    // obtiene el url de canonical para el content source story-feed-by-collection y story-feed-by-collection-newsletter
    const { canonical_url: url = '' } = this._data || {}
    return url
  }

  get websiteLink() {
    const { websites = {} } = this._data || {}
    const brandWeb = websites[this._website] || {}
    return brandWeb.website_url || ''
  }

  get relatedContent() {
    const { related_content: { basic = [] } = {} } = this._data || {}
    return basic
  }

  get relatedStories() {
    const { recent_stories: { content_elements: contentElements = [] } = {} } =
      this._data || {}

    return contentElements
  }

  get videoSeo() {
    const videosContent = StoryData.getVideoContent(
      this._data && this._data.content_elements,
      'video'
    )

    const promoItemsVideo =
      this._data &&
      this._data.promo_items &&
      StoryData.getSeoMultimedia(this._data.promo_items, 'video')

    return videosContent.concat(promoItemsVideo).filter(String)
  }

  get seoTitle() {
    const { headlines: { meta_title: metaTitle = '', basic = '' } = {} } =
      this._data || {}
    return metaTitle || basic
  }

  get getVideoPrincipal() {
    return (
      (this._data &&
        this._data.promo_items &&
        StoryData.getSeoMultimedia(this._data.promo_items, 'video')) ||
      []
    )
  }

  get getGallery() {
    return (
      (this._data &&
        this._data.promo_items &&
        StoryData.getSeoMultimedia(this._data.promo_items, 'image')) ||
      []
    )
  }

  get imagesSeo() {
    const imagesContent =
      StoryData.getContentElements(
        this._data && this._data.content_elements,
        'image'
      ) || []

    const galleryContentResul =
      StoryData.getContentElements(
        this._data && this._data.content_elements,
        'gallery'
      ) || []

    const { content_elements: galleryContent = [] } =
      galleryContentResul[0] || []

    const promoItemsImage =
      (this._data &&
        this._data.promo_items &&
        StoryData.getSeoMultimedia(this._data.promo_items, 'image')) ||
      []

    const promoItemsImagex = !Array.isArray(promoItemsImage)
      ? [promoItemsImage]
      : promoItemsImage
    return promoItemsImagex
      .concat(galleryContent)
      .concat(imagesContent)
      .filter(String)
  }

  get imagePrimarySeo() {
    const promoItemsImage =
      (this._data &&
        this._data.promo_items &&
        StoryData.getSeoMultimedia(this._data.promo_items, 'image')) ||
      []

    const promoItemsImagex = !Array.isArray(promoItemsImage)
      ? [promoItemsImage]
      : promoItemsImage
    return promoItemsImagex
  }

  // TODO: Cambiar la fecha a lo que se estandarice
  get date() {
    return this.displayDate
  }

  get displayDate() {
    return (this._data && this._data.display_date) || ''
  }

  get publishDate() {
    return (this._data && this._data.publish_date) || ''
  }

  get createdDate() {
    return (this._data && this._data.created_date) || ''
  }

  get firstPublishDate() {
    return (this._data && this._data.first_publish_date) || ''
  }

  get lastPublishDate() {
    return (this._data && this._data.last_updated_date) || ''
  }

  get isPremium() {
    const {
      __data: {
        content_restrictions: { content_code: ContentCode = '' } = {},
      } = {},
    } = this || {}
    console.log('ContentCode:::::::::::::', ContentCode)
    return ContentCode === 'premium'
  }

  get getPremiumValue() {
    const { __data: { content_restrictions: ContentRestrictions } = {} } =
      this || {}

    const { content_code: ContentCode = '' } = ContentRestrictions || {}
    return (ContentRestrictions && ContentCode) || 'vacio'
  }

  get videoId() {
    return StoryData.getIdGoldfish(this.__data)
  }

  get videoDuration() {
    return msToTime(
      (this.__data &&
        this.__data.promo_items &&
        this.__data.promo_items[ConfigParams.VIDEO] &&
        this.__data.promo_items[ConfigParams.VIDEO].duration) ||
        ''
    )
  }

  get video() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.VIDEO] &&
        this._data.promo_items[ConfigParams.VIDEO].embed_html) ||
      ''
    )
  }

  get multimediaNews() {
    const type = StoryData.getMultimediaIconTypeFIA(this._data) || ''
    const result = { type, payload: '' }
    let imageItems = ''

    switch (type) {
      case ConfigParams.IMAGE:
        result.payload = this.getMultimediaBySize(ConfigParams.IMAGE_ORIGINAL)
        break
      case ConfigParams.VIDEO:
        result.payload =
          (this._data &&
            this._data.promo_items &&
            this._data.promo_items[ConfigParams.VIDEO] &&
            this._data.promo_items[ConfigParams.VIDEO]._id) ||
          ''
        break

      case ConfigParams.GALLERY:
        imageItems =
          (this._data &&
            this._data.promo_items &&
            this._data.promo_items[ConfigParams.GALLERY] &&
            this._data.promo_items[ConfigParams.GALLERY].content_elements) ||
          []

        result.payload =
          imageItems.map(({ additional_properties: additionalProperties }) => {
            const { resizeUrl = '' } = additionalProperties
            return resizeUrl
          }) || []
        break
      case ConfigParams.ELEMENT_YOUTUBE_ID:
        result.payload =
          (this._data &&
            this._data.promo_items &&
            this._data.promo_items[ConfigParams.ELEMENT_YOUTUBE_ID] &&
            this._data.promo_items[ConfigParams.ELEMENT_YOUTUBE_ID].content) ||
          ''
        break
      default:
        result.payload = ''
        break
    }
    return result
  }

  get paragraphsNews() {
    const { content_elements: contentElements = [] } = this._data || {}
    return StoryData.paragraphsNews(contentElements)
  }

  get breadcrumbList() {
    const { website_url: url = '' } = this._data || {}
    const primarySectionLinks = this.primarySectionLink
    const link = url.split('/')
    const primarySectionLink = primarySectionLinks[0]
      ? primarySectionLinks
      : `/${link[1]}/`

    return breadcrumbList(this._siteUrl, primarySectionLink)
  }

  get recentList() {
    const {
      recent_stories: { content_elements: contentElements = [] } = {},
      _id: id,
    } = this._data || {}
    return StoryData.recentList(contentElements, id)
  }

  get recentStoryContinue() {
    const {
      recent_stories: { content_elements: contentElements = [] } = {},
      _id: id,
    } = this._data || {}
    return StoryData.recentList(contentElements, id, 6)
  }

  get seoKeywords() {
    const { taxonomy: { seo_keywords: seoKeywords = [] } = {} } =
      this._data || {}
    return seoKeywords
  }

  get sourceUrlOld() {
    const { additional_properties: { source_url: sourceUrl = '' } = {} } =
      this._data || {}
    return sourceUrl
  }

  get canonicalWebsite() {
    // obtiene el canonical website, se usa para FIA
    const { canonical_website: canonicalWebsite = '' } = this._data || {}
    return canonicalWebsite
  }

  // TODO: Improve raw attribute function (should only be getter's attribute)
  get attributesRaw() {
    const attributesObject = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const attr of Object.getOwnPropertyNames(StoryData.prototype)) {
      if (attr !== 'attributesRaw') attributesObject[attr] = this[attr]
    }
    return attributesObject
  }

  get contentElementsHtml() {
    return (
      (this._data &&
        StoryData.getContentElementsHtml(
          this._data.content_elements,
          ConfigParams.ELEMENT_RAW_HTML
        )) ||
      ''
    )
  }

  get contentElementsImage() {
    return (
      (this._data &&
        StoryData.getContentElementsImage(
          this._data.content_elements,
          ConfigParams.ELEMENT_IMAGE
        )) ||
      ''
    )
  }

  get contentElementsText() {
    return (
      (this._data &&
        StoryData.getContentElementsText(
          this._data.content_elements,
          ConfigParams.ELEMENT_TEXT
        )) ||
      ''
    )
  }

  get contentElementGallery() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.GALLERY]) ||
      ''
    )
  }

  get contentElements() {
    return (this._data && this._data.content_elements) || []
  }

  get contentPosicionPublicidadAmp() {
    let i = 0
    const { content_elements: contentElements = null } = this._data || {}
    return (
      contentElements &&
      contentElements.map(dataContent => {
        let dataElements = {}
        const { type: typeElement } = dataContent
        dataElements = dataContent
        if (i === 1) {
          dataElements.publicidad = true
          i += 1
        }
        if (typeElement === ConfigParams.ELEMENT_TEXT) {
          i += 1
        }
        return dataElements
      })
    )
  }

  get contentPosicionPublicidad() {
    let i = 0
    const { content_elements: contentElements = null } = this._data || {}
    return (
      contentElements &&
      contentElements.map(dataContent => {
        let dataElements = {}
        const { type: typeElement } = dataContent
        dataElements = dataContent
        if (i === 2) {
          dataElements.publicidad = true
          dataElements.nameAds = `inline`
        }
        if (i === 4) {
          dataElements.publicidad = true
          dataElements.nameAds = `caja4`
        }
        if (i === 6) {
          dataElements.publicidad = true
          dataElements.nameAds = `caja5`
        }
        if (typeElement === ConfigParams.ELEMENT_TEXT) {
          i += 1
        }
        return dataElements
      })
    )
  }

  get contentElementsRedesSociales() {
    const { content_elements: contentElements = null } = this._data || {}
    const videoprimary =
      this._data &&
      this._data.promo_items &&
      this._data.promo_items[ConfigParams.HTML] &&
      this._data.promo_items[ConfigParams.HTML].content

    const primaryId = [getVideoIdRedSocial(videoprimary)]
    const videosIds =
      contentElements &&
      contentElements.map(dataContent => {
        let dataElements = ''
        const {
          type: typeElement,
          raw_oembed: { html = '', type: typeRedsocial } = {},
          content = '',
        } = dataContent

        if (
          typeElement === ConfigParams.ELEMENT_RAW_HTML ||
          typeElement === ConfigParams.ELEMENT_OEMBED
        ) {
          dataElements = getVideoIdRedSocial(html || content, typeRedsocial)
        }
        return dataElements
      })
    return primaryId.concat(videosIds).filter(String)
  }

  get promoItems() {
    return (this._data && this._data.promo_items) || []
  }

  get sourceId() {
    return (
      (this._data && this._data.source && this._data.source.source_id) || ''
    )
  }

  get relatedInternal() {
    const galleryContentResul =
      StoryData.getContentElements(
        this._data && this._data.content_elements,
        'story'
      ) || []
    return galleryContentResul.filter(String)
  }

  get commentsDisplay() {
    const comments =
      (this._data &&
        this._data.comments &&
        this._data.comments.display_comments) ||
      ''

    return comments
  }

  get commentsAllow() {
    const comments =
      (this._data &&
        this._data.comments &&
        this._data.comments.allow_comments) ||
      ''

    return comments
  }

  get videoIdContent() {
    let video = ''
    const typeItem = this.promoItemsType
    if (typeItem === ConfigParams.VIDEO) {
      video = StoryData.getIdGoldfish(this._data)
    } else if (typeItem === ConfigParams.ELEMENT_YOUTUBE_ID) {
      video = StoryData.getIdYoutube(this._data)
    }
    return video
  }

  get idYoutube() {
    return StoryData.getIdYoutube(this._data)
  }

  get mp3Path() {
    const { promo_items: { path_mp3: { content = '' } = {} } = {} } =
      this._data || {}
    return content
  }

  get nucleoOrigen() {
    return (
      (this._data &&
        this._data.label &&
        this._data.label.nucleo &&
        this._data.label.nucleo.url) ||
      'redaccion'
    )
  }

  get formatOrigen() {
    return (
      (this._data &&
        this._data.label &&
        this._data.label.formato &&
        this._data.label.formato.url) ||
      'tfg'
    )
  }

  get contentOrigen() {
    return (
      (this._data &&
        this._data.label &&
        this._data.label.contenido &&
        this._data.label.contenido.url) ||
      'tcs'
    )
  }

  get genderOrigen() {
    return (
      (this._data &&
        this._data.label &&
        this._data.label.genero &&
        this._data.label.genero.url) ||
      'info'
    )
  }

  get fiaOrigen() {
    const { label: { facebook_ia: { url = '' } = {} } = {} } = this._data
    const result = (url === '' || url === 'true') && true
    return result
    // return (
    //   (this._data &&
    //     this._data.label &&
    //     this._data.label.facebook_ia &&
    //     this._data.label.facebook_ia.url) ||
    //   true
    // )
  }

  get hasAdsVideo() {
    return StoryData.findHasAdsVideo(this._data)
  }

  get captionVideo() {
    return StoryData.getCaptionVideo(this.__data)
  }

  get multimediaSubtitle() {
    return this.getMultimediaConfig().subtitle
  }

  get multimediaCaption() {
    return this.getMultimediaConfig().caption
  }

  getMultimediaBySize(size) {
    return (
      StoryData.getThumbnailBySize(
        this._data,
        StoryData.getTypeMultimedia(this._data),
        size
      ) || this.defaultImg
    )
  }

  getMultimediaConfig() {
    const {
      promo_items: {
        basic: {
          subtitle: basicSubtitle = '',
          caption: basicCaption = '',
        } = {},
        basic_video: {
          promo_items: {
            basic: {
              subtitle: videoSubtitle = '',
              caption: videoCaption = '',
            } = {},
          } = {},
        } = {},
        basic_gallery: {
          promo_items: {
            basic: {
              subtitle: gallerySubtitle = '',
              caption: galleryCaption = '',
            } = {},
          } = {},
        } = {},
      } = {},
    } = this._data || {}

    return {
      subtitle: videoSubtitle || gallerySubtitle || basicSubtitle,
      caption: videoCaption || galleryCaption || basicCaption,
    }
  }

  getPromoItemsType = () => {
    let typeMultimedia = null
    const { promo_items: promoItems = {} } = this._data || {}
    const items = Object.keys(promoItems)

    if (items.length > 0) {
      if (items.includes(ConfigParams.VIDEO)) {
        typeMultimedia = ConfigParams.VIDEO
      } else if (items.includes(ConfigParams.ELEMENT_YOUTUBE_ID)) {
        typeMultimedia = ConfigParams.ELEMENT_YOUTUBE_ID
      } else if (items.includes(ConfigParams.GALLERY)) {
        typeMultimedia = ConfigParams.GALLERY
      } else if (items.includes(ConfigParams.IMAGE)) {
        typeMultimedia = ConfigParams.IMAGE
      }
    }
    return typeMultimedia
  }

  static getSeoMultimedia(
    {
      basic_video: basicVideo = {},
      basic_gallery: basicGallery = {},
      basic: basicImage = {},
    } = {},
    type = ''
  ) {
    if (
      (basicVideo.promo_image || basicVideo.promo_items) &&
      (type === 'video' || type === 'image')
    ) {
      const {
        _id: idVideo = '',
        streams = [],
        publish_date: date = '',
        duration,
        promo_image: {
          url: urlImage = '',
          resized_urls: resizedUrls = '',
        } = {},
        promo_items: {
          basic: { url: urlImageP = '', resized_urls: resizedUrlsP = '' } = {},
        } = {},
        headlines: { basic: caption = '' } = {},
        description: { basic: description = '' } = {},
      } = basicVideo
      if (type === 'video') {
        const dataVideo = streams
          .map(
            ({
              url,
              stream_type: streamType,
              resized_urls: resizedUrlsV = '',
            }) => {
              return streamType === 'ts'
                ? {
                    idVideo,
                    url,
                    resized_urls: resizedUrlsV || resizedUrlsP,
                    caption,
                    duration,
                    urlImage: urlImage || urlImageP,
                    date,
                    description,
                  }
                : []
            }
          )
          .filter(String)
        const cantidadVideo = dataVideo.length
        return [dataVideo[cantidadVideo - 1]]
      }

      return {
        url: urlImage || urlImageP,
        resized_urls: resizedUrls || resizedUrlsP,
        subtitle: caption,
      }
    }

    if (basicGallery.content_elements && type !== 'video') {
      const { content_elements: contentElements = {} } = basicGallery
      return contentElements
    }
    if (basicImage.url && type === 'image') {
      const {
        content_element: {
          basic: {
            url: urlImage1,
            caption = '',
            resized_urls: resizedUrlsc = '',
          } = {},
        } = {},
        url: urlImage,
        resized_urls: resizedUrls1 = '',
        subtitle,
      } = basicImage
      return {
        url: urlImage1 || urlImage,
        resized_urls: resizedUrlsc || resizedUrls1,
        subtitle: caption || subtitle,
      }
    }

    return []
  }

  static getContentElementsText(data = [], typeElement = '') {
    return data && data.length > 0
      ? data
          .map(({ content, type }) => {
            return type === typeElement ? formatHtmlToText(content) : []
          })
          .join(' ')
      : ''
  }

  static getContentElementsHtml(data = [], typeElement = '') {
    return data && data.length > 0
      ? data
          .map(({ content, type }) => {
            return type === typeElement ? content : []
          })
          .join(' ')
      : ''
  }

  static getContentElementsImage(data = [], typeElement = '') {
    return data && data.length > 0
      ? data.filter((img = {}) => {
          return img.type === typeElement
        })
      : []
  }

  static getContentElements(data = [], typeElement = '') {
    return data && data.length > 0
      ? data.map(item => {
          return item.type === typeElement ? item : []
        })
      : []
  }

  static getVideoContent(data = []) {
    const dataVideo =
      StoryData.getContentElements(data, 'video').filter(String) || []

    return (
      dataVideo
        .map(
          ({
            _id: idVideo = '',
            promo_image: { url: urlImage },
            streams,
            duration,
            publish_date: date,
            headlines: { basic: caption = '' } = {},
            description: { basic: description = '' } = {},
          }) => {
            const resultVideo = streams
              .map(({ url = '', stream_type: streamType = '' }) => {
                return streamType === 'ts'
                  ? {
                      idVideo,
                      url,
                      caption,
                      duration,
                      urlImage,
                      date,
                      description,
                    }
                  : []
              })
              .filter(String)
            const cantidadVideo = resultVideo.length
            return resultVideo[cantidadVideo - 1] || []
          }
        )
        .filter(String) || []
    )
  }

  static findHasAdsVideo(data) {
    const {
      promo_items: {
        basic_video: {
          additional_properties: { advertising: { playAds = null } = {} } = {},
        } = {},
      } = {},
    } = data || {}
    return playAds
  }

  static getPrimarySection(data) {
    const {
      taxonomy: {
        primary_section: { name = '', path = '' } = {},
        sections = [],
      } = {},
    } = data || {}

    // En caso de que el primary section no devuelva "path" ni "name"
    const { name: auxName, path: auxPath } = sections[0] || {}

    if (!name && !path) {
      return {
        name: auxName,
        path: auxPath,
      }
    }
    // //////////////////////////////////

    return {
      name,
      path,
    }
  }

  static getDataSection(data, website) {
    const sectionData =
      (data &&
        data.websites &&
        data.websites[website] &&
        data.websites[website].website_section) ||
      {}

    const section = sectionData.name || ''
    const path = sectionData.path || ''
    return {
      name: section,
      path,
    }
  }

  static getAuthorImageSquareXS(data) {
    const { credits: { by = [] } = {} } = data || {}
    const { image: { resized_urls: { square_xs: squareXS = '' } = {} } = {} } =
      by[0] || {}
    return squareXS
  }

  static getDataAuthor(
    data,
    { contextPath = '', deployment = () => {}, website = '' } = {}
  ) {
    const authorData = (data && data.credits && data.credits.by) || []
    const authorImageDefault = deployment(
      `${getAssetsPath(
        website,
        contextPath
      )}/resources/dist/${website}/images/author.png`
    )

    let nameAuthor = ''
    let urlAuthor = ''
    let slugAuthor = ''
    let mailAuthor = ''
    let socialLinks = []
    let role = ''
    let sortBiography = ''

    let imageAuthor = authorImageDefault
    for (let i = 0; i < authorData.length; i++) {
      const iterator = authorData[i]
      if (iterator.type === 'author') {
        nameAuthor = iterator.name && iterator.name !== '' ? iterator.name : ''
        urlAuthor = iterator.url && iterator.url !== '' ? iterator.url : '#'
        slugAuthor = iterator.slug && iterator.slug !== '' ? iterator.slug : ''
        imageAuthor =
          iterator.image && iterator.image.url && iterator.image.url !== ''
            ? iterator.image.url
            : authorImageDefault
        socialLinks = iterator.social_links ? iterator.social_links : []
        mailAuthor =
          (iterator.additional_properties &&
            iterator.additional_properties.original &&
            iterator.additional_properties.original.email) ||
          ''

        role =
          (iterator.additional_properties &&
            iterator.additional_properties.original &&
            iterator.additional_properties.original.role) ||
          null
        sortBiography =
          (iterator.additional_properties &&
            iterator.additional_properties.original &&
            iterator.additional_properties.original.bio) ||
          null
        break
      }
    }

    return {
      nameAuthor,
      urlAuthor,
      slugAuthor,
      imageAuthor,
      socialLinks,
      mailAuthor,
      role,
      sortBiography,
    }
  }

  static getTypeMultimedia(data) {
    let typeMultimedia = ''
    const promoItems = (data && data.promo_items && data.promo_items) || {}
    const items = Object.keys(promoItems)
    let item = {}
    for (let i = 0; i <= items.length; i++) {
      item = promoItems[items[i]]
      if (
        typeof item === 'object' &&
        item !== null &&
        items[i] !== ConfigParams.HTML
      ) {
        typeMultimedia = items[i]
        break
      }
    }

    return typeMultimedia
  }

  static getCaptionVideo = data => {
    const {
      promo_items: {
        basic_video: {
          promo_items: { basic: { caption = '' } = {} } = {},
        } = {},
      } = {},
    } = data
    return caption
  }

  static getMultimediaIconType = data => {
    let typeMultimedia = ConfigParams.IMAGE
    const { promo_items: promoItems = {} } = data || {}
    const items = Object.keys(promoItems)
    if (items.length > 0) {
      if (items.includes(ConfigParams.VIDEO)) {
        typeMultimedia = ConfigParams.VIDEO
      } else if (items.includes(ConfigParams.HTML)) {
        const { content } = promoItems.basic_html
        if (content.includes('id="powa-')) {
          typeMultimedia = ConfigParams.VIDEO
        }
      } else if (items.includes(ConfigParams.ELEMENT_YOUTUBE_ID)) {
        // typeMultimedia = ConfigParams.ELEMENT_YOUTUBE_ID
        typeMultimedia = ConfigParams.VIDEO
      } else if (items.includes(ConfigParams.GALLERY)) {
        typeMultimedia = ConfigParams.GALLERY
      }
    }
    return typeMultimedia
  }

  static getMultimediaIconTypeFIA = data => {
    let typeMultimedia = null
    const { promo_items: promoItems = {} } = data || {}
    const items = Object.keys(promoItems)

    if (items.length > 0) {
      if (items.includes(ConfigParams.VIDEO)) {
        typeMultimedia = ConfigParams.VIDEO
      } else if (items.includes(ConfigParams.ELEMENT_YOUTUBE_ID)) {
        typeMultimedia = ConfigParams.ELEMENT_YOUTUBE_ID
      } else if (items.includes(ConfigParams.GALLERY)) {
        typeMultimedia = ConfigParams.GALLERY
      } else if (items.includes(ConfigParams.IMAGE)) {
        typeMultimedia = ConfigParams.IMAGE
      }
    }
    return typeMultimedia
  }

  static getThumbnailVideo(data, size = ConfigParams.IMAGE_ORIGINAL) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.VIDEO] &&
        data.promo_items[ConfigParams.VIDEO].promo_items &&
        data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE] &&
        ((data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
          .resized_urls &&
          data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
            .resized_urls[size]) ||
          data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
            .url)) ||
      ''
    return thumb
  }

  static getThumbnailGalleryBySize(data, size = ConfigParams.IMAGE_ORIGINAL) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.GALLERY] &&
        data.promo_items[ConfigParams.GALLERY].promo_items &&
        data.promo_items[ConfigParams.GALLERY].promo_items[
          ConfigParams.IMAGE
        ] &&
        ((data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
          .resized_urls &&
          data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
            .resized_urls[size]) ||
          data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
            .url)) ||
      ''
    return thumb
  }

  static getIdGoldfish(data) {
    return (
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.VIDEO] &&
        data.promo_items[ConfigParams.VIDEO]._id) ||
      ''
    )
  }

  static getIdYoutube(data) {
    const video =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.ELEMENT_YOUTUBE_ID] &&
        data.promo_items[ConfigParams.ELEMENT_YOUTUBE_ID].content) ||
      ''
    return video
  }

  static getImageBySize(data, size = ConfigParams.IMAGE_ORIGINAL) {
    const { url = '', resized_urls: resizeUrls = {}, type = null } =
      (data && data.promo_items && data.promo_items[ConfigParams.IMAGE]) || {}
    if (size === ConfigParams.IMAGE_ORIGINAL) return url
    return (
      (type === ConfigParams.ELEMENT_IMAGE && resizeUrls[size]
        ? resizeUrls[size]
        : url) || ''
    )
  }

  static getThumbnailBySize(data, type, size) {
    let thumb = ''
    if (type === ConfigParams.VIDEO) {
      thumb = StoryData.getThumbnailVideo(data, size)
    } else if (type === ConfigParams.GALLERY) {
      thumb = StoryData.getThumbnailGalleryBySize(data, size)
    } else if (type === ConfigParams.IMAGE) {
      thumb = StoryData.getImageBySize(data, size)
    } else if (type === ConfigParams.ELEMENT_YOUTUBE_ID) {
      thumb = StoryData.getImageBySize(data, size)
    }
    return thumb
  }

  static lengthImageGallery(data = {}) {
    const {
      promo_items: {
        basic_gallery: { content_elements: content_elements = [] } = {},
      } = {},
    } = data
    return content_elements.length || 0
  }

  static recentList(recentElements, id, numero = 2) {
    let i = 0
    return (
      recentElements
        .map(data => {
          const {
            headlines: { basic } = {},
            canonical_url: websiteUrl,
            _id: storyId,
          } = data
          if (storyId !== id && i < numero) {
            const type = StoryData.getTypeMultimedia(data)
            const urlImage = StoryData.getThumbnailBySize(data, type)
            i += 1
            return {
              basic: formatHtmlToText(basic),
              websiteUrl,
              urlImage,
            }
          }
          return []
        })
        .filter(String) || {}
    )
  }

  static paragraphsNews(contentElements) {
    const paragraphs = contentElements.map(
      ({
        content = '',
        type = '',
        _id = '',
        url = '',
        subtitle = '',
        caption = '',
        items = [],
        level = null,
      }) => {
        const result = { _id, type, level, payload: '' }

        switch (type) {
          case ConfigParams.ELEMENT_TEXT:
            result.payload = content
            // && content
            break
          case ConfigParams.ELEMENT_LIST:
            result.payload = items
            break
          case ConfigParams.ELEMENT_HEADER:
            result.payload = content
            break
          case ConfigParams.ELEMENT_IMAGE:
            result.payload = url
            result.caption = subtitle || caption
            // && url
            break
          case ConfigParams.ELEMENT_VIDEO:
            result.payload = _id
            break
          case ConfigParams.ELEMENT_RAW_HTML:
            result.payload = content
            // && content
            break
          default:
            result.payload = content
            break
        }
        return result
      }
    )
    // const result = paragraphs.filter(x => x.payload !== null)
    return paragraphs
  }
}

export default StoryData
