import React from 'react'

const CardMostReadChildItem = props => {
  const { item, viewImage } = props
  const { websiteUrl, imageUrl, title, typeNote } = item
  let type = ''

  if (typeNote === 'basic') type = 'image'
  if (typeNote === 'basic_video') type = 'video'

  const classes = {
    item:
      'flex most-read-item border-solid border-b-1 border-gray pt-15 pb-15 pl-20 pr-20',
    figure: `most-read-item__figure most-read-item__figure--icon most-read-item__figure--${type} w-full h-full position-relative overflow-hidden`,
    img: 'most-read-item__img w-full h-full object-cover',
    detail:
      'most-read-item__detail w-full overflow-hidden pl-10 text-sm text-black line-h-sm',
  }

  return (
    <div role="listitem" className={classes.item}>
      {viewImage && (
        <a href={websiteUrl} className={classes.detail}>
          <figure className={classes.figure}>
            <img className={classes.img} src={imageUrl} alt={title} />
          </figure>
        </a>
      )}
      <a className={classes.detail} href={websiteUrl}>
        {title}
      </a>
    </div>
  )
}

export default CardMostReadChildItem
