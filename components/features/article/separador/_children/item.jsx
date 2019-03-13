/* eslint-disable operator-assignment */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import React from 'react'

import { addResizedUrlItem } from '../../../../../resources/utilsJs/thumbs'
import { GetMultimediaContent } from '../../../../../resources/utilsJs/utilities'

const classes = {
  item: 'separator__item separator__item--nota',
  detail: 'separator__detail',
  separatorTitle: 'separator__title separator__title--nota',
}

// eslint-disable-next-line camelcase
const SeparatorItem = ({ headlines, urlImage, website_url, medio }) => {
  return (
    <article className={classes.item}>
      {medio === 'video' && <span>&#8227;</span>}
      {medio === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={classes.separatorTitle}>
          <a href={website_url}>{headlines}</a>
        </h2>
      </div>
      <figure>
        {website_url && (
          <a href={website_url}>
            <img src={urlImage} alt="" />
          </a>
        )}
      </figure>
    </article>
  )
}

const SeparatorListItem = ({ data, excluir, website }) => {
  // transform(data, website)
  let key = 0
  const result = data.map(elements => {
    if (key == 5) return
    const {
      promo_items: promoItems,
      website_url: websiteUrl,
      headlines,
    } = elements

    let multimedia = null

    if (websiteUrl == excluir) return

    if (promoItems !== null) {
      multimedia = GetMultimediaContent(promoItems)
    }

    if (multimedia.url == null) return
    const { medio } = multimedia
    key = key + 1
    const aspectRatios = ['3:4|147x80']

    const { resized_urls } = addResizedUrlItem(
      website,
      multimedia.url,
      aspectRatios
    )

    // eslint-disable-next-line consistent-return
    return (
      <SeparatorItem
        key={websiteUrl}
        headlines={headlines.basic}
        urlImage={resized_urls['3:4']}
        website_url={websiteUrl}
        medio={medio}
      />
    )
  })

  return result
}

export default SeparatorListItem
