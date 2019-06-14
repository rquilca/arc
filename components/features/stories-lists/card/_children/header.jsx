import React from 'react'

const classes = {
  header:
    'stories-list-card__header flex justify-between w-auto pt-15 pb-15 pr-20 pl-20',
  seeMore: 'stories-list-card__see-more pt-5 pb-5 pr-10 pl-10',
  title: 'stories-list-card__title flex items-center full-height',
}
const StoriesListsCardChildHeader = ({
  titleList,
  urlTitle,
  background,
  seeMore,
  seeMoreurl,
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      {urlTitle ? (
        <a href={urlTitle} className={classes.title}>
          <h4>{titleList} </h4>
        </a>
      ) : (
        <h4 className={classes.title}>{titleList}</h4>
      )}
      {seeMore && (
        <a href={seeMoreurl} className={classes.seeMore}>
          ver más
        </a>
      )}
    </div>
  )
}

export default StoriesListsCardChildHeader
