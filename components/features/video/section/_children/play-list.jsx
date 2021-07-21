import React from 'react'
import Image from '../../../../global-components/image'

import StoryData from '../../../../utilities/story-data'

export default (props) => {
  const {
    content_elements: videoItems = [],
    principalVideo,
    arcSite,
    contextPath,
    deployment,
  } = props
  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <div className="play-list">
      <h2 itemProp="name" className="play-list__name">
        PLAYLIST
      </h2>
      <div className="play-list__wrapper">
        {arcSite === 'trome' && principalVideo && (
          <div className="play-list__item">
            <span className="play-list__image-box play-list__current">
              <Image
                src={principalVideo.promoItemJwplayer.thumbnail_url}
                width={225}
                height={0}
                alt={principalVideo.title}
                className="play-list__image"
                loading="lazy"
                sizes="(max-width: 360px) 360px"
              />

              {/* {!(
                principalVideo.videoDuration === '00:00' ||
                principalVideo.videoDuration === '00:00:00'
              ) && (
                <span className="play-list__duration">
                  {principalVideo.videoDuration}
                </span>
              )} */}
            </span>
            <h3 itemProp="name" className="play-list__title">
              {principalVideo.title}
            </h3>
          </div>
        )}
        {videoItems &&
          videoItems.map((item) => {
            Story.__data = item
            return (
              <div className="play-list__item">
                <a
                  itemProp="url"
                  className="play-list__image-box"
                  href={Story.websiteLink}>
                  <Image
                    src={Story.multimediaLandscapeMD}
                    width={225}
                    height={0}
                    alt={Story.title}
                    className="play-list__image"
                    loading="lazy"
                    sizes="(max-width: 360px) 360px"
                  />

                  {!(
                    Story.videoDuration === '00:00' ||
                    Story.videoDuration === '00:00:00'
                  ) && (
                    <span className="play-list__duration">
                      {Story.videoDuration}
                    </span>
                  )}
                </a>
                <h3 itemProp="name" className="play-list__title">
                  <a itemProp="url" href={Story.websiteLink}>
                    {Story.title}
                  </a>
                </h3>
              </div>
            )
          })}
      </div>
    </div>
  )
}
