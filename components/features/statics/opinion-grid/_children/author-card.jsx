import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  card: 'author-card p-5 position-relative',
  wrapper:
    'author-card__wrapper flex flex-col items-center lg:pt-25 md:pt-25 xs:pt-25 pt-25 pb-60 md:pb-25 lg:pb-25',
  imageBox: 'flex flex-col items-center ',
  image: 'author-card__image bg-white',
  defaultImage:
    'author-card__image-default icon-marca flex items-center justify-center',
  detailsBox: 'author-card__detail flex flex-col items-center pt-10',
  group: 'author-card__group uppercase font-thin mb-10 text-xs',
  name:
    'author-card__name block mb-10 secondary-font font-bold title-sm text-gray-300 line-h-xs text-center',
  title:
    'author-card__title block secondary-font text-lg text-gray-300 line-h-sm font-bold text-center overflow-hidden',
  icono:
    'author-card__icono icon-marca position-absolute mb-20 flex items-center justify-center',
  iconImg: 'author-card__icon-img',
}

const OpinionGridAuthorCard = ({
  author,
  authorLink,
  authorOccupation,
  websiteLink,
  title,
  authorImage,
  uid,
}) => {
  const existImageAuthor = authorImage.includes('author.png')

  return (
    <article role="listitem" className={classes.card}>
      <div className={classes.wrapper}>
        <figure className={classes.imageBox}>
          {existImageAuthor ? (
            <i className={classes.defaultImage} />
          ) : (
            <Image
              src={authorImage}
              width={100}
              height={100}
              alt={author}
              className={classes.image}
              uid={uid}
            />
          )}
        </figure>
        <div className={classes.detailsBox}>
          <h3 itemProp="name">
            <a itemProp="url" className={classes.name} href={authorLink}>
              {author}
            </a>
          </h3>
          <p itemProp="description" className={classes.group}>
            {authorOccupation}
          </p>
          <h2 itemProp="name">
            <a itemProp="url" className={classes.title} href={websiteLink}>
              {title}
            </a>
          </h2>
        </div>
        <i className={classes.icono} />
      </div>
    </article>
  )
}

export default React.memo(OpinionGridAuthorCard)
