import React from 'react'
import ItemNews from './ItemNews'

const classes = {
  listItem: 'List__listItems',
  scrolY: 'scroll-vertical-auto',
}

const ListItemNews = ({ seeHour, seeImageNews, listNews }) => {
  return (
    <div className={`${classes.listItem} ${classes.scrolY}`}>
      {listNews.map(
        (
          {
            publish_date: publishDate,
            headlines: { basic },
            canonical_url: canonicalUrl,
            promo_items: promoItems,
          },
          index
        ) => {
          const fechaPublicacion = new Date(publishDate)
          let time = ''

          const fechapresente = new Date().getTime()

          if (
            (fechapresente - new Date(publishDate).getTime()) /
              1000 /
              60 /
              60 >=
            24
          ) {
            time = `${
              fechaPublicacion.getDate() < 10
                ? `0${fechaPublicacion.getDate()}`
                : fechaPublicacion.getDate()
            }/${
              fechaPublicacion.getMonth() < 10
                ? `0${fechaPublicacion.getMonth()}`
                : fechaPublicacion.getMonth()
            }/${fechaPublicacion.getFullYear()}`
          } else {
            time = `${fechaPublicacion.getHours()}:${
              fechaPublicacion.getMinutes() < 10
                ? `0${fechaPublicacion.getMinutes()}`
                : fechaPublicacion.getMinutes()
            }-`
          }

          return (
            <ItemNews
              key={canonicalUrl}
              seeHour={seeHour}
              seeImageNews={
                seeImageNews === true && index === 0 /* ? true : false */
              }
              time={time}
              title={basic}
              urlNews={canonicalUrl}
              promo_items={promoItems || ''}
            />
          )
        }
      )}
    </div>
  )
}

export default ListItemNews
