import React from 'react'

const classes = {
  separator: 'blog-separator',
  boxTitle: 'blog-separator__box-title',
  title: 'blog-separator__title',
  link: 'blog-separator__link',
  middle: 'blog-separator__box-middle',
  section: 'blog-separator__section',
  author: 'blog-separator__author',
  boxImg: 'blog-separator__box-img',
  img: 'blog-separator__img',
}

const BlogSeparator = ({
  authorName,
  authorImg,
  blogUrl,
  blogName,
  postLink,
  postTitle,
  arcSite,
  contextPath,
}) => {
  const WEBSITE = `?_website=${arcSite}`
  const DEFAULT_IMG =
    'https://img.gestion.pe/bundles/appcms/images/gestion/logo_gestion.png?1556552656'
  const IMG = authorImg ? authorImg : DEFAULT_IMG
  return (
    <div className={classes.separator}>
      <div className={classes.boxTitle}>
        <h1 className={classes.title}>
          <a
            href={`${contextPath}/${postLink}${WEBSITE}`}
            className={classes.link}>
            {postTitle}
          </a>
        </h1>
      </div>
      <div className={classes.middle}>
        <a
          href={`${contextPath}/${blogUrl}${WEBSITE}`}
          className={classes.section}>
          {blogName}
        </a>
        <a
          href={`${contextPath}/${blogUrl}${WEBSITE}`}
          className={classes.author}>
          {authorName}
        </a>
      </div>
      <div className={classes.boxImg}>
        <a href={`${contextPath}/${postLink}${WEBSITE}`}>
          <img src={IMG} alt="" className={classes.img} />
        </a>
      </div>
    </div>
  )
}
export default BlogSeparator
