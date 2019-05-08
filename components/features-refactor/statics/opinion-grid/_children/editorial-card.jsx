import React from 'react'
import StoryData from '../../../../../resources/components/utils/data-story'

const classes = {
  card: 'editorial-card',
  wrapper: 'editorial-card__wrapper flex flex--column',
  group: 'editorial-card__group text-uppercase',
  name: 'editorial-card__name block text-uppercase',
  description: 'flex',
  imageBox: 'flex position-relative flex--align-start',
  image: 'editorial-card__image',
  detailsBox: 'editorial-card__box-details',
  title: 'editorial-card__title block',
}

const OpinionGridEditorialCard = ({ arcSite, data }) => {
  const story = new StoryData({}, arcSite)
  story.__data = data

  return (
    <div className={classes.card}>
      <div className={classes.wrapper}>
        <h4 className={classes.group}>{story.section}</h4>
        <h2>
          <a className={classes.name} href={story.link}>
            {story.title}
          </a>
        </h2>
        <div className={classes.description}>
          <div className={classes.imageBox}>
            <a href={story.link}>
              <img
                className={classes.image}
                src={story.authorImage}
                alt={story.author}
              />
            </a>
          </div>
          <div className={classes.detailsBox}>
            <p className={classes.title}>{story.subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridEditorialCard
