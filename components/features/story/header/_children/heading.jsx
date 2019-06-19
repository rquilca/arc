import React from 'react'

const classes = {
  title:
    'story-header__news-title pl-20 pr-20 mb-20 primary-font line-h-xs text-gray-300',
}

const StoryHeaderChildHeading = props => {
  const { title } = props || {}

  return title && <h1 className={classes.title}> {title}</h1>
}

export default StoryHeaderChildHeading
