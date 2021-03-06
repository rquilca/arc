import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import PropTypes from 'prop-types'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import { includePromoItems } from '../../../utilities/included-fields'
import LiveScoreChild from './_children/live-score'

const PHOTO_SOURCE = 'photo-resizer'

const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

const ExtraordinaryStoryLifeScore = props => {
  const { customFields } = props
  const {
    storyConfig: { contentService = '', contentConfigValues = {} } = {},
    codeField = '',
    titleField = '',
    subTitleField = '',
    isLive,
    imgField,
  } = customFields || {}

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const presets = 'landscape_l:648x374'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,${includePromoItems}`

  const story = useContent({
    source: contentService,
    query: Object.assign(contentConfigValues, { presets, includedFields }),
    filter: schemaFilter(arcSite),
    transform(data) {
      const {
        title,
        subTitle,
        multimediaLandscapeL,
        websiteLink,
        multimediaLazyDefault,
      } = new StoryData({
        data,
        arcSite,
        contextPath,
        deployment,
        defaultImgSize: 'md',
      })
      return {
        title,
        subTitle,
        multimediaLandscapeL,
        websiteLink,
        multimediaLazyDefault,
      }
    },
  })

  // Solo acepta custom image desde Photo Center
  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: imgField,
              presets,
            },
          }
        : {}
    ) || {}

  const {
    title,
    subTitle,
    multimediaLandscapeL,
    websiteLink,
    multimediaLazyDefault,
  } = story || {}
  const { resized_urls: { landscape_l: landscapeL } = {} } = customPhoto || {}

  const imgUrl = landscapeL || imgField || multimediaLandscapeL

  const params = {
    isAdmin,
    title,
    subTitle,
    websiteLink,
    multimediaLazyDefault,
    imgUrl,
    codeField,
    titleField,
    subTitleField,
    isLive,
  }

  return <LiveScoreChild {...params} />
}

ExtraordinaryStoryLifeScore.label = 'Apertura extraordinaria - En vivo'

ExtraordinaryStoryLifeScore.propTypes = {
  customFields: PropTypes.shape({
    codeField: PropTypes.string.tag({
      name: 'C??digo del partido',
    }),
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuraci??n del contenido',
    }),
    isLive: PropTypes.bool.tag({
      name: 'En vivo',
    }),
    titleField: PropTypes.string.tag({
      name: 'T??tulo',
      group: 'Editar campos',
      description: 'Dejar vac??o para tomar el valor original de la historia.',
    }),
    subTitleField: PropTypes.string.tag({
      name: 'Bajada',
      group: 'Editar campos',
      description: 'Dejar vac??o para tomar el valor original de la historia.',
    }),
    imgField: PropTypes.string.tag({
      name: 'Imagen',
      group: 'Editar campos',
      description: 'Dejar vac??o para tomar el valor original de la historia.',
    }),
  }),
}

ExtraordinaryStoryLifeScore.static = true
export default ExtraordinaryStoryLifeScore
