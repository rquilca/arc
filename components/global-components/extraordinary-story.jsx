import React from 'react'
import renderHTML from 'react-render-html'
import { getIcon } from '../utilities/helpers'

const classes = {
  extraordinaryStory: `extraordinary-story padding-normal`,
  extraordinaryStorySection: 'extraordinary-story__section text-center',
  extraordinaryStoryContent: 'extraordinary-story__content',
  extraordinaryStoryTitle: 'extraordinary-story__title',
  oneline: 'extraordinary-story-oneline',
  twoline: 'extraordinary-story-twoline',
  threeline: 'extraordinary-story-threeline',
  extraordinaryStorySubtitle: 'extraordinary-story__subtitle',
  extraordinaryStoryAuthor: 'extraordinary-story__author',
  extraordinaryStoryMultimedia: 'extraordinary-story__multimedia',
  iconGallery: 'extraordinary-story__icon-gallery',
  iconGalleryContainer: 'extraordinary-story__icon-gallery-container',
}

const getMultimediaIcon = mediaType => {
  if (mediaType === 'G') {
    return (
      <span className={`${classes.iconGallery}-G`}>
        <span className={`${classes.iconGalleryContainer}-G`}>
          <i>{mediaType}</i>
        </span>
      </span>
    )
  }
  return null
}
const ExtraordinaryStory = props => {
  const {
    data,
    multimediaOrientation = 'bottom',
    contentOrientation = 'left',
    isSection = false,
    multimediaType,
    arcSite,
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

  return (
    <div
      className={`${
        classes.extraordinaryStory
      } extraordinary-story--${multimediaOrientation} text-${contentOrientation}`}>
      {!isSection && (
        <div className={classes.extraordinaryStorySection}>
          <a href={data.sectionLink}>{data.section}</a>
        </div>
      )}
      <div className={classes.extraordinaryStoryContent}>
        <div className={`${classes.extraordinaryStoryTitle} ${numline}`}>
          <a href={data.link}>{data.title}</a>
        </div>
        <div className={classes.extraordinaryStorySubtitle}>
          <a href={data.link}>{data.subTitle}</a>
        </div>
        <div className={classes.extraordinaryStoryAuthor}>
          <a href={data.authorLink}>{data.author}</a>
        </div>
      </div>
      <div className={classes.extraordinaryStoryMultimedia}>
        {renderHTML(data.embedMultimedia)}
        <script src="https://d1tqo5nrys2b20.cloudfront.net/sandbox/powaBoot.js?org=elcomercio" />
        {getMultimediaIcon(getIcon(multimediaType))}
      </div>
    </div>
  )
}

export default ExtraordinaryStory
