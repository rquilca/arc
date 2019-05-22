import React from 'react'
import { getFullDateIso8601 } from '../../../../utilities/helpers'

const classes = {
  container: 'post-item__container',
  date: 'post-item__date',
  content: 'post-item__content',
  figure: 'post-item__figure',
  image: 'post-item__image',
  description: 'post-item__description',
  title: 'post-item__title',
  author: 'post-item__author',
}

const AuthorListChildPostItem = ({
  postTitle = '',
  postPermaLink = '',
  postDate = '',
  image = '',
  author = '',
  arcSite = '',
  contextPath = '',
}) => {
  const { day, month, fullYear } = getFullDateIso8601(postDate)
  const postFormatDate = `${day}/${month}/${fullYear}`
  const WEBSITE = `?_website=${arcSite}`

  return (
    <article className={classes.container}>
      <div className={classes.date}>
        <p>{postFormatDate}</p>
      </div>
      <div className={classes.content}>
        <figure className={classes.figure}>
          <img
            className={classes.image}
            src={image}
            alt={author}
          />
        </figure>
        <div className={classes.description}>
          <a href={`${contextPath}/blog/${postPermaLink}${WEBSITE}`}>
            <h3 className={classes.title}>{postTitle}</h3>
          </a>
          <a href={`${contextPath}/blog/${postPermaLink}${WEBSITE}`}>
            <h5 className={classes.author}>{author}</h5>
          </a>
        </div>
      </div>
    </article>
  )
}

export default AuthorListChildPostItem
