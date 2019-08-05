import React from 'react'
import UtilListKey from '../../../../utilities/list-keys'
import { getRemoveSlug } from '../../../../utilities/helpers'

const classes = {
  container: 'story-tags mt-25 mb-20',
  title:
    'story-tags__title uppercase mb-10 primary-font font-bold text-md line-h-none',
  tag: 'inline-block primary-font text-md mr-5 mb-5',
  link:
    'story-tags__link block bg-gray-100 text-gray-200 pt-5 pb-5 pr-10 pl-10',
}
const StoryContentChildTags = props => {
  const { data, isAmp } = props

  return (
    data.length > 0 && (
      <div className={classes.container}>
        <h4 className={isAmp ? `amp-${classes.title}` : classes.title}>
          Tags Relacionados:
        </h4>
        {data.map(
          ({ slug, text }, idx) =>
            slug &&
            text && (
              <h2 key={UtilListKey(idx)} className={classes.tag}>
                <a
                  className={isAmp ? `amp-${classes.link}` : classes.link}
                  href={slug && `/noticias/${getRemoveSlug(slug)}`}>
                  {text}
                </a>
              </h2>
            )
        )}
      </div>
    )
  )
}

export default StoryContentChildTags
