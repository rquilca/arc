import StoryData from '../../../utilities/story-data'
import {
  ELEMENT_YOUTUBE_ID,
  GALLERY,
  IMAGE,
  VIDEO,
} from '../../../utilities/constants/multimedia-types'

class Data extends StoryData {
  static GOLDFISH = 'goldfish'

  static JWPLAYER = 'jwplayer'

  static YOUTUBE = 'youtube'

  static IMAGE = 'image'

  static AUTOMATIC = 'default'

  static GOLDFISH_ENV = 'sandbox'

  constructor({
    data,
    deployment,
    contextPath,
    arcSite,
    defaultImgSize,
    customFields,
    customPhoto,
  }) {
    super({
      data,
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    this.arcSite = arcSite
    this.customFields = customFields
    this.customPhoto = customPhoto
  }

  get title() {
    return this.customFields.title || super.title
  }

  get subTitle() {
    return this.customFields.subTitle || super.subTitle
  }

  get multimediaOrientation() {
    return this.customFields.multimediaOrientation || 'bottom'
  }

  set multimediaOrientation(label) {
    this.customFields.multimediaOrientation = label
  }

  get contentOrientation() {
    return this.customFields.contentOrientation || 'left'
  }

  get primarySection() {
    return this.customFields.section || super.primarySection
  }

  get multimedia() {
    const multimedia =
      this.multimediaOrientation === 'left' ||
      this.multimediaOrientation === 'right'
        ? super.multimediaSquareL
        : super.multimediaLandscapeXL

    const {
      resized_urls: { landscape_xl: landscapeXL, square_l: squareL } = {},
    } = this.customPhoto || {}

    const customMultimedia =
      this.multimediaOrientation === 'left' ||
      this.multimediaOrientation === 'right'
        ? squareL
        : landscapeXL

    return customMultimedia || multimedia
  }

  get multimediaService() {
    return this.customFields.multimediaService || 'default'
  }

  get multimediaSource() {
    return this.customFields.multimediaSource || ''
  }

  get link() {
    const { urlNew: externalLink } = this.customFields
    const { websites = {} } = this._data || {}
    const { website_url: url = '' } = websites[`${this.arcSite}`] || {}
    return externalLink || url
  }

  get primarySectionLink() {
    return (
      (this.customFields && this.customFields.sectionLink) ||
      super.primarySectionLink
    )
  }

  /* get isVideo() {
    let isVideoCustom = false
    let isVideoApi = false
    const { multimediaService } = this.customFields
    if (
      multimediaService === Data.YOUTUBE ||
      multimediaService === Data.GOLDFISH
    )
      isVideoCustom = true
    if (super.multimediaType === VIDEO) isVideoApi = true
    return multimediaService !== Data.AUTOMATIC ? isVideoCustom : isVideoApi
  } */

  get typeMultimediaGeneral() {
    return Data.getTypeMultimediaGeneral(
      this.multimediaService,
      this.promoItemsType
    )
  }

  get sourceMultimedia() {
    const {
      // Custom config values
      multimediaService,
      multimediaSource,
      // Story Data values
      promoItemsType,
      videoIdContent,
      multimedia,
    } = this
    const multimediaTypeFeature = Data.getTypeMultimediaGeneral(
      multimediaService,
      promoItemsType
    )
    let multimediaSourceFeature = multimediaSource
    if (Data.AUTOMATIC === multimediaService) {
      multimediaSourceFeature =
        promoItemsType === VIDEO || promoItemsType === ELEMENT_YOUTUBE_ID
          ? videoIdContent
          : multimedia
    }
    return Data.getSourceMultimedia(
      multimediaTypeFeature,
      multimediaSourceFeature,
      multimedia
    )
  }

  get secondMultimedia() {
    const {
      // Custom config values
      multimediaService,
      // Story Data values
      promoItemsType,
      multimedia,
    } = this

    const multimediaTypeFeature = Data.getTypeMultimediaGeneral(
      multimediaService,
      promoItemsType
    )

    let multimediaContent = ''
    if (
      (multimediaTypeFeature === VIDEO ||
        multimediaTypeFeature === ELEMENT_YOUTUBE_ID ||
        multimediaTypeFeature === Data.YOUTUBE ||
        multimediaTypeFeature === Data.JWPLAYER ||
        multimediaTypeFeature === Data.GOLDFISH) &&
      multimedia !== ''
    ) {
      multimediaContent = multimedia
    }

    return multimediaContent
  }

  static getSourceMultimedia(multimediaType, customMultimedia, multimedia) {
    let multimediaContent = ''
    if (
      (multimediaType === VIDEO ||
        multimediaType === ELEMENT_YOUTUBE_ID ||
        multimediaType === Data.YOUTUBE ||
        multimediaType === Data.JWPLAYER ||
        multimediaType === Data.GOLDFISH) &&
      multimedia !== ''
    ) {
      multimediaContent = customMultimedia
    } else if (
      (multimediaType === GALLERY ||
        multimediaType === IMAGE ||
        multimediaType === Data.IMAGE) &&
      multimedia !== ''
    ) {
      multimediaContent = /* customMultimedia || */ multimedia || ''
    }
    return multimediaContent
  }

  static getTypeMultimediaGeneral(multimediaService, multimediaType) {
    let multimediaTypeFeature = multimediaService
    if (Data.AUTOMATIC === multimediaService) {
      multimediaTypeFeature = multimediaType
    }
    return multimediaTypeFeature
  }
}

export default Data
