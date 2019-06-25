import React from 'react'
import EmbedMultimedia from './embed-multimedia'
import { getIcon } from '../utilities/helpers'
// import { AsyncResource } from 'async_hooks'
// FIXME: La línea de arriba no se usa, se puede eliminar?

const classes = {
  extraordinaryStory: `extraordinary-story bg-white grid border-gray`,
  extraordinaryStorySection:
    'extraordinary-story__section bg-error text-left uppercase font-bold p-20 pb-0 text-white',
  extraordinaryStorySectionLink: 'extraordinary-story__section-link',
  extraordinaryStoryContent:
    'extraordinary-story__content block pt-15 pr-20 pl-20 position-relative',
  extraordinaryStoryTitle:
    'extraordinary-story__title title-lg overflow-hidden font-bold line-h-sm mb-20',
  oneline: 'extraordinary-story--oneline',
  twoline: 'extraordinary-story--twoline',
  threeline: 'extraordinary-story--threeline',
  extraordinaryStorySubtitle:
    'extraordinary-story__subtitle mb-15 text-gray-200 line-h-sm overflow-hidden',
  extraordinaryStoryLink: 'extraordinary-story__link',
  extraordinaryStoryAuthor:
    'extraordinary-story__author uppercase mb-15  text-xs',
  extraordinaryStoryAuthorLink:
    'extraordinary-story__author-link text-gray-200',
  extraordinaryStoryMultimedia:
    'extraordinary-story__multimedia bg-gray-300 flex items-center justify-center position-relative',
  iconGallery: 'position-absolute top-0 right-0 m-10',
  iconGalleryContainer:
    'extraordinary-story__icon-gallery-container flex items-center justify-center rounded',
  icon: 'extraordinary-story__icon-gallery title-lg',
  extraordinaryStoryTitleLink: 'extraordinary-story__title-link',
}

// TODO: retirar este getMultimediaIcon
const getMultimediaIcon = mediaType => {
  if (mediaType === 'G') {
    return (
      <span className={classes.iconGallery}>
        <span className={classes.iconGalleryContainer}>
          <i className={classes.icon}>{mediaType}</i>
        </span>
      </span>
    )
  }
  return null
}
const ExtraordinaryStory = props => {
  const {
    data,
    multimediaType,
    deployment,
    contextPath,
    arcSite,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
  } = props

  let numline = ''
  switch (arcSite) {
    case 'elcomercio':
      numline = classes.threeline
      break
    case 'depor':
      numline = classes.twoline
      break
    default:
      numline = classes.twoline
      break
  }
  // console.log('multiedia ---->', data.sourceMultimedia)
  return (
    <div
      className={`${classes.extraordinaryStory} extraordinary-story--${multimediaOrientation} text-${contentOrientation}`}>
      {!isSection && (
        <div className={classes.extraordinaryStorySection}>
          <a
            href={data.sectionLink}
            className={classes.extraordinaryStorySectionLink}>
            {data.section}
          </a>
        </div>
      )}
      <div className={classes.extraordinaryStoryContent}>
        <div className={`${classes.extraordinaryStoryTitle} ${numline}`}>
          <a href={data.link} className={classes.extraordinaryStoryTitleLink}>
            {data.title}
          </a>
        </div>
        <div className={classes.extraordinaryStorySubtitle}>
          <a href={data.link} className={classes.extraordinaryStoryLink}>
            {data.subTitle}
          </a>
        </div>
        <div className={classes.extraordinaryStoryAuthor}>
          <a
            href={data.authorLink}
            className={classes.extraordinaryStoryAuthorLink}>
            {data.author}
          </a>
        </div>
      </div>
      <div className={classes.extraordinaryStoryMultimedia}>
        <EmbedMultimedia
          type={data.typeMultimediaGeneral}
          title={data.title}
          source={data.sourceMultimedia}
          deployment={deployment}
          contextPath={contextPath}
          website={arcSite}
        />
        {getMultimediaIcon(getIcon(multimediaType))}
      </div>
    </div>
  )
}

export default ExtraordinaryStory
