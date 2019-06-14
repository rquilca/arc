import React from 'react'
// import StoryData from '../../../../utilities/story-data'
import { getIcon } from '../../../../utilities/helpers'

// Basic flex stuff
const classes = {
  related: 'related-internal position-relative mt-20',
  title: 'related-internal__title font-bold uppercase mb-10',
  multimedia: 'position-relative',
  image: 'w-full',
  icon: 'related-internal__multimedia-icon position-absolute p-5 rounded-lg',
  info: 'related-internal__information pt-20 pb-20',
}

const RelartedItem = ({ data } /* , i */) => {
  const {
    contextPath,
    headlines: { basic: storyTitle } = {},
    website_url: storyUrl,
    promo_items: { basic: imageData = {} } = {},
  } = data

  const filterData = {
    nameTitle: storyTitle,
    urlTitle: storyUrl,
    multimediaType: imageData.type,
    multimediaImg: imageData.url,
  }

  return (
    <>
      <div className={classes.related}>
        <div className={classes.title}>Siga Leyendo </div>
        <div className={`${classes.info}`}>
          <h2>
            <a href={`${contextPath}${filterData.urlTitle}`}>
              {filterData.nameTitle}
            </a>
          </h2>
        </div>
        <figure className={classes.multimedia}>
          <a href={`${contextPath}${filterData.urlTitle}`}>
            <img
              src={filterData.multimediaImg}
              alt={filterData.nameTitle}
              className={classes.image}
            />
            {filterData.multimediaType === 'basic' ||
            filterData.multimediaType === '' ? (
              ''
            ) : (
              <span
                className={`${classes.icon} icon-${getIcon(
                  filterData.multimediaType
                )}`}
              />
            )}
          </a>
          {/* <Icon iconClass={story.iconClass} /> */}
        </figure>
      </div>
    </>
  )
}

const StoryContentChildRelatedInternal = ({ stories, id, contextPath }) => {
  const keyinternal = 'story-related-internal'

  return (
    <>
      {stories.map((item, index) =>
        item._id === id ? (
          <RelartedItem
            key={keyinternal.concat(item._id).concat(index)}
            data={item}
            contextPath={contextPath}
          />
        ) : null
      )}
    </>
  )
}

export default StoryContentChildRelatedInternal
