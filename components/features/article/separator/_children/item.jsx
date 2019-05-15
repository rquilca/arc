import React from 'react'
import { addResizedUrlItem } from '../../../../utilities/thumbs'
import { GetMultimediaContent } from '../../../../utilities/helpers'

const classes = {
  item: 'articlesep__item separator__item--nota flex flex--justify-between',
  detail: 'articlesep__detail',
  separatorCategory: 'articlesep__category',
  separatorTitle: 'articlesep__title articlesep__title--nota',
  oneline: 'articlesep-oneline',
  twoline: 'articlesep-twoline',
  threeline: 'articlesep-threeline text-left',
}

const ArticleSeparatorChildItem = ({ data, excluir, website, arcSite }) => {
  const SeparatorItem = ({
    headlines,
    urlImage,
    website_url: websiteUrl,
    medio,
  }) => {
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
      <article className={classes.item}>
        {medio === 'video' && <span>&#8227;</span>}
        {medio === 'gallery' && <span>G</span>}
        <div className={classes.detail}>
          <h2 className={classes.separatorCategory}>Politica </h2>
          <h3 className={`${classes.separatorTitle} ${numline}`}>
            <a href={websiteUrl}>{headlines}</a>
          </h3>
        </div>
        <figure>
          {websiteUrl && (
            <a href={websiteUrl}>
              <img src={urlImage} alt="" />
            </a>
          )}
        </figure>
      </article>
    )
  }

  // transform(data, website)
  let key = 0
  return data.map(elements => {
    if (key === 4) return false
    const {
      promo_items: promoItems,
      website_url: websiteUrl,
      headlines,
    } = elements

    let multimedia = null

    if (websiteUrl === excluir) return false

    if (promoItems) {
      multimedia = GetMultimediaContent(promoItems)
    }
    const { medio, url } = multimedia || {}
    if (url === undefined) return false

    key += 1
    const aspectRatios = ['3:4|147x80']

    const { resized_urls: resizedUrls } = addResizedUrlItem(
      website,
      url,
      aspectRatios
    )

    return (
      <SeparatorItem
        key={websiteUrl}
        headlines={headlines.basic}
        urlImage={resizedUrls['3:4']}
        website_url={websiteUrl}
        medio={medio}
      />
    )
  })
}

export default ArticleSeparatorChildItem
