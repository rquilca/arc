import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image',
  description: 'story-content__news-media-description text-left',
}

const StoryContentChildAmpImage = props => {
  const { data } = props
  return (
    <>
      <figure>
        <amp-img i-amphtml-layout="responsive">
          <i-amphtml-sizer />
          <Image
            width="100%"
            className={classes.image}
            captionClassName={classes.description}
            sizePreset="large"
            {...data}
          />
        </amp-img>
      </figure>
    </>
  )
}

export default StoryContentChildAmpImage
