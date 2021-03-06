// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN, ENVIRONMENT } from 'fusion:environment'

// TODO: LIMPIAME POR FAVOR

const flagDev = ENVIRONMENT !== 'elcomercio' // false

const uriPostProd = site =>
  site === 'gestion'
    ? 'https://do5ggs99ulqpl.cloudfront.net/gestion/9043312/top_premium.json'
    : 'https://do5ggs99ulqpl.cloudfront.net/elcomercio/21928896/top_premium.json'

const uriPostDev = site =>
  site === 'gestion'
    ? 'https://d3ocw6unvuy6ob.cloudfront.net/gestion/9043312/top_premium.json'
    : 'https://d3ocw6unvuy6ob.cloudfront.net/elcomercio/21928896/top_premium.json'

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

/* const clearURL = (arr = [], site = 'gestion') => {
  return arr.map(url => {
    return url.replace(`https://${site}.pe/`, '/')
  })
} */

const setPageViewsUrls = (arrUrl, arrUrlRes) => {
  return arrUrlRes.map(row => {
    const item = arrUrl.find(el => {
      return el.path === row.website_url
    })
    return { ...row, page_views: item.pageviews || 0 }
  })
}

const params = [
  {
    name: 'amountStories',
    displayName: 'Número de historias',
    type: 'number',
  },
]

const uriAPI = (url, site) => {
  const filter = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,
taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`

  return `${CONTENT_BASE}/content/v4/stories/?website_url=${url}&website=${site}&published=true${filter}`
}

const fetch = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { amountStories } = key

  const pattern = /((.*)-noticia(.*)\/)(.*)/

  return request({
    uri: flagDev ? uriPostDev(website) : uriPostProd(website),
    ...options,
  }).then(resp => {
    const arrVerify = []
    const arrResponse = resp.filter(obj => {
      let ret = false
      if (pattern.test(obj.path) && !arrVerify.includes(obj.path)) {
        arrVerify.push(obj.path)
        ret = true
      }
      return ret
    })

    const arrURL = arrResponse.slice(0, amountStories)

    const promiseArray = arrURL.map(url =>
      request({
        uri: uriAPI(url.path, website),
        ...options,
      })
    )

    return Promise.all(promiseArray).then(res => {
      const newRes = setPageViewsUrls(arrURL, res) || res
      newRes.sort((a, b) => {
        return b.page_views - a.page_views
      })
      return { content_elements: newRes }
    })
  })
}

export default {
  fetch,
  schemaName: 'stories-dev',
  params,
}
