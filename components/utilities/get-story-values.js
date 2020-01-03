import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
  IMAGE,
  GALLERY,
  //   IMAGE_ORIGINAL,
} from './constants'

export const getTitle = data => {
  const { headlines: { basic = '' } = {} } = data || {}
  return basic
}

export const getMultimediaType = data => {
  let typeMultimedia = null
  const { promo_items: promoItems = {} } = data || {}
  const items = Object.keys(promoItems)

  if (items.length > 0) {
    if (items.includes(VIDEO)) {
      typeMultimedia = VIDEO
      return typeMultimedia
    }
    if (items.includes(ELEMENT_YOUTUBE_ID)) {
      typeMultimedia = ELEMENT_YOUTUBE_ID
      return typeMultimedia
    }
    if (items.includes(GALLERY)) {
      typeMultimedia = GALLERY
      return typeMultimedia
    }
    if (items.includes(IMAGE)) {
      typeMultimedia = IMAGE
      return typeMultimedia
    }
  }
  return typeMultimedia
}

export const multimediaNews = data => {
  const type = getMultimediaType(data) || ''
  const result = { type, payload: '' }
  let imageItems = ''

  switch (type) {
    // se comento por que para el componente lista video no se va a usar
    //   case IMAGE:
    //     result.payload = this.getMultimediaBySize(IMAGE_ORIGINAL)
    //     break
    case VIDEO:
      result.payload =
        (data &&
          data.promo_items &&
          data.promo_items[VIDEO] &&
          data.promo_items[VIDEO].embed_html) ||
        ''
      break

    case GALLERY:
      imageItems =
        (data &&
          data.promo_items &&
          data.promo_items[GALLERY] &&
          data.promo_items[GALLERY].content_elements) ||
        []

      result.payload =
        imageItems.map(({ additional_properties: additionalProperties }) => {
          const { resizeUrl = '' } = additionalProperties
          return resizeUrl
        }) || []
      break
    case ELEMENT_YOUTUBE_ID:
      result.payload =
        (data &&
          data.promo_items &&
          data.promo_items[ELEMENT_YOUTUBE_ID] &&
          data.promo_items[ELEMENT_YOUTUBE_ID].content) ||
        ''
      break
    default:
      result.payload = ''
      break
  }
  return result
}

export const getVideo = data => {
  const result = { type: '', payload: '' }

  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[VIDEO] &&
      data.promo_items[VIDEO].embed_html) ||
    ''
  if (result.payload !== '') {
    result.type = VIDEO
  }
  return result
}

export const getVideoYoutube = data => {
  const result = { type: '', payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[ELEMENT_YOUTUBE_ID] &&
      data.promo_items[ELEMENT_YOUTUBE_ID].content) ||
    ''
  if (result.payload !== '') {
    result.type = ELEMENT_YOUTUBE_ID
  }
  return result
}

export const getImage = (data, ImageSize) => {
  const result = { type: '', payload: '' }
  result.payload =
    (data &&
      data.promo_items &&
      data.promo_items[IMAGE] &&
      data.promo_items[IMAGE].resized_urls &&
      data.promo_items[IMAGE].resized_urls[ImageSize]) ||
    ''
  if (result.payload !== '') {
    result.type = IMAGE
  }
  return result
}
