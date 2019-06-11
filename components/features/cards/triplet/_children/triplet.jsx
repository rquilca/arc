import React from 'react'
import { getIcon } from '../../../../utilities/helpers'

export const TripletChildTriplet = props => {
  const { data = [], multimediaOrientation = 'right', arcSite } = props
  const classes = {
    triplet: 'triplet',
    link: 'triplet__link',
    tripletItem: `triplet__item grid triplet__item--${multimediaOrientation}`,
    tripletTitle: 'triplet__title overflow-hidden font-bold',
    oneline: 'triplet--oneline',
    twoline: 'triplet--twoline',
    threeline: 'triplet--threeline',
    author: 'triplet__author uppercase',
    multimedia: 'triplet__multimedia',
    mLink: 'full-width full-height block position-relative',
    tripletIcon:
      'triplet__icon position-absolute flex items-center justify-center',
  }

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
    <div className={classes.triplet}>
      {data.map(story => (
        <article className={classes.tripletItem} key={`triplet-${story.index}`}>
          <div className={`${classes.tripletTitle} ${numline}`}>
            <h2>
              <a className={classes.link} href={story.link}>
                {story.title}
              </a>
            </h2>
          </div>
          <figure className={classes.multimedia}>
            <a className={classes.mLink} href={story.link}>
              <img
                className="object-cover full-width full-height"
                src={story.multimedia}
                alt={story.title}
              />
              {story.multimediaType === 'basic' ||
              story.multimediaType === '' ? (
                ''
              ) : (
                <span className={classes.tripletIcon}>
                  {getIcon(story.multimediaType)}
                </span>
              )}
            </a>
            {/* <Icon iconClass={story.iconClass} /> */}
          </figure>
          <div className={classes.author}>
            <a className={classes.link} href={story.authorOrSectionLink}>
              {story.authorOrSection}
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export const Icon = props => {
  const classes = {
    tripletBoxIcon: 'triplet__box-icon position-absolute text-center',
    tripletIcon: 'triplet__icon',
  }

  const html = (
    <span className={`${classes.tripletBoxIcon}`}>
      <i
        className={`${classes.tripletIcon} ${classes.tripletIcon}--${
          props.iconClass
        }`}
      />
    </span>
  )
  return props.iconClass ? html : ''
}
