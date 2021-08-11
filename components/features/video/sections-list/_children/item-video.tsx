import React from 'react'
import { FC } from 'types/features'
import { AppContext, ArcSite } from 'types/fusion'

import Image from '../../../../global-components/image'
import StoryData from '../../../../utilities/story-data'

interface Props {
  story?: any
  index?: number
  arcSite?: ArcSite
  contextPath?: AppContext['contextPath']
  deployment?: AppContext['deployment']
}

const classes = {
  wrapper: 'video-categories-list__section__item__wrapper',
  image: 'video-categories-list__section__item__image',
  duration: 'video-categories-list__section__item__duration',
  title: 'video-categories-list__section__item__title',
}

const ItemVideo: FC<Props> = ({ story, arcSite, contextPath, deployment }) => {
  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
  })

  Story.__data = story

  return (
    <div className={classes.wrapper}>
      <a
        itemProp="url"
        className="play-list__image-box"
        href={Story.websiteLink}>
        <img
          src={Story.multimediaLandscapeMD}
          width={276}
          height={155}
          alt={Story.title}
          className={classes.image}
          // loading="lazy"
          // sizes="(max-width: 276px) 276px"
          // clientResize
        />

        {!(
          Story.videoDuration === '00:00' || Story.videoDuration === '00:00:00'
        ) && <span className={classes.duration}>{Story.videoDuration}</span>}
      </a>
      <h3 itemProp="name" className={classes.title}>
        <a itemProp="url" href={Story.websiteLink}>
          {Story.title}
        </a>
      </h3>
    </div>
  )
}

export default ItemVideo