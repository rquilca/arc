import React from 'react'
import SectionItem from './section-item'
import EmbedMultimedia from '../../../../global-components/embed-multimedia'

const classes = {
  extraordinayStoryGridContainer:
    'extraordinary-story-grid flex position-relative',
  videoBox: 'story-video-box flex items-center position-relative',
  gridContainer: 'sections-grid w-full',
  gridHeaderText: 'sections-grid__text flex items-center',
  gridHeaderImage: 'sections-grid__text-image',
  gridListTitle: 'sections-grid__title',
  gridListItems: 'flex flex-wrap',
}

const ExtraordinaryStoryGridChildExtraordinaryStoryGrid = props => {
  const {
    section1,
    section2,
    section3,
    section4,
    storyData,
    deployment,
    contextPath,
    arcSite,
    imgLogo,
  } = props
  storyData.multimediaOrientation = 'grid'

  return (
    <div className={classes.extraordinayStoryGridContainer}>
      <div className={classes.videoBox}>
        <EmbedMultimedia
          type={storyData.typeMultimediaGeneral}
          title={storyData.title}
          source={storyData.sourceMultimedia}
          deployment={deployment}
          contextPath={contextPath}
          website={arcSite}
        />
      </div>
      <div className={classes.gridContainer}>
        <div className={classes.gridHeaderText}>
          Estás viendo
          <img className={classes.gridHeaderImage} src={imgLogo} alt="" />
        </div>
        <h2 className={classes.gridListTitle}>Programas del día</h2>
        <div className={classes.gridListItems}>
          {section1.id !== '' && (
            <SectionItem path={contextPath} data={section1} />
          )}
          {section2.id !== '' && (
            <SectionItem path={contextPath} data={section2} />
          )}
          {section3.id !== '' && (
            <SectionItem path={contextPath} data={section3} />
          )}
          {section4.id !== '' && (
            <SectionItem path={contextPath} data={section4} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ExtraordinaryStoryGridChildExtraordinaryStoryGrid
