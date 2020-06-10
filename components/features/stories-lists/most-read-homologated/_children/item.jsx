import React from 'react'
import { getMultimediaIcon } from '../../../../utilities/helpers'

const classes = {
  story: `most-read-homologated-item flex flex-col w-auto border-b-1 border-solid border-gray`,
  time: 'most-read-homologated-item__time text-md line-h-sm mr-10',
  linkBox: 'most-read-homologated-item__link-box flex flex-row text-gray-300',
  link:
    'most-read-homologated-item__link flex font-bold m-0 text-md text-gray-300 line-h-sm',
  boxNew: 'most-read-homologated-item__content pt-10 pb-10',
  figure:
    'most-read-homologated-item__image mr-10 position-relative overflow-hidden',
  icon:
    'position-absolute text-center most-read-homologated-item__icon mx-auto rounded text-gray-100',
  image: 'w-full h-full object-center object-cover',
}

export default ({
  storyNumber,
  storyIndex,
  seeImageNews,
  title,
  urlNews,
  multimedia,
  lazyImage,
  multimediaType,
  isAdmin,
}) => {
  return (
    <article role="listitem" className={classes.story}>
      <div className={classes.linkBox}>
        {storyNumber && <span className={classes.time}>{storyIndex}</span>}

        <div className={classes.boxNew}>
          {seeImageNews && (
            <figure className={classes.figure}>
              {getMultimediaIcon(multimediaType) && (
                <i
                  className={`${getMultimediaIcon(multimediaType)} ${
                    classes.icon
                  }`}
                />
              )}

              {multimedia && (
                <a itemProp="url" href={urlNews}>
                  <picture>
                    <img
                      className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                      src={isAdmin ? multimedia : lazyImage}
                      data-src={multimedia}
                      alt={title}
                    />
                  </picture>
                </a>
              )}
            </figure>
          )}
          <a itemProp="url" href={urlNews}>
            <h3 itemProp="name" className={classes.link}>
              {title}
            </h3>
          </a>
        </div>
      </div>
    </article>
  )
}
