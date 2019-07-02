import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image w-full h-full',
  caption: 'story-content__caption pt-10 secondary-font text-sm',
}

const StoryContentChildImage = ({ data, imgTag }) => {
  return (
    <>
      <Image
        width="100%"
        layout="responsive"
        ImgTag={imgTag}
        imgClassName={classes.image}
        captionClassName={classes.caption}
        sizePreset="large"
        {...data}
      />
    </>
  )
}

export default StoryContentChildImage
