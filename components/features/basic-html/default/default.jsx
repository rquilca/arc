import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  appendToBody,
  appendToId,
  createScript,
} from '../../../utilities/client/nodes'
import customFields from './_dependencies/custom-fields'

const classes = {
  htmlContainer: 'htmlContainer overflow-x-auto overflow-y-hidden',
  newsEmbed: 'story-content__embed',
}

// Funcion extraida de Helpers
const storyVideoPlayerId = (content = '') => {
  const pattern = content.includes('id')
    ? /<script (.+)id=([A-Za-z0-9 _]*[A-Za-z0-9])(.*)><\/script>/
    : /<script (src=(.*))(.*)(async(=(.*))?)><\/script>/
  return content.match(pattern) || []
}

const isDaznServicePlayer = (content) =>
  content.includes('player.daznservices.com/') ||
  content.includes('player.performgroup.com/')

const clearUrlOrCode = (url = '') => {
  const clearUrl = url.trim().replace('"', '').replace('"', '')
  return { clearUrl, code: clearUrl.split('#')[1] }
}

const BasicHtmlFeat = (props) => {
  const {
    customFields: { freeHtml = '', adsSpace, adsBorder = '' } = {},
  } = props
  const { isAdmin } = useAppContext()
  let ID_VIDEO = ''
  let URL_VIDEO = ''

  const adsSpaces =
    useContent(
      adsSpace && adsSpace !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace },
          }
        : {}
    ) || {}

  if (
    isDaznServicePlayer(freeHtml) &&
    freeHtml.trim().match(/^<script(.*)<\/script>$/)
  ) {
    const idVideos = storyVideoPlayerId(freeHtml)
    const urlAssignHttp = freeHtml.includes('player.daznservices.com/')
      ? idVideos[1].replace('src="//', 'https://')
      : idVideos[1]
          .replace('src="//', 'https://')
          .replace('performgroup', 'daznservices')

    URL_VIDEO = freeHtml.includes('id')
      ? `${urlAssignHttp}id=${idVideos[2]}`
      : `${urlAssignHttp}`

    ID_VIDEO = freeHtml.includes('id') && `${idVideos[2]}`
  }

  React.useEffect(() => {
    if (URL_VIDEO) {
      appendToBody(createScript({ src: URL, async: true }))
    }

    if (URL_VIDEO) {
      const idVideo = storyVideoPlayerId(freeHtml)
      const idElement =
        isDaznServicePlayer(freeHtml) && freeHtml.includes('id') && idVideo[2]
          ? `id_video_embed_${ID_VIDEO}`
          : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`
      appendToId(
        idElement,
        createScript({
          src: freeHtml.includes('id')
            ? URL_VIDEO
            : clearUrlOrCode(idVideo[2]).clearUrl,
          async: true,
        })
      )
    }

    // TODO: separar en funciones puras
    if (freeHtml) {
      const contentTwitter = freeHtml.includes('https://twitter.com')
      if (contentTwitter) {
        const scriptCDN = freeHtml.slice(
          freeHtml.indexOf('<script'),
          freeHtml.lastIndexOf('</script>') + 9
        )
        const rgexpURL = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
        const match = rgexpURL.exec(scriptCDN)
        const url = match && match.length > 0 ? match[0] : ''
        appendToBody(createScript({ src: url, async: true }))
      }
    }
  }, [URL_VIDEO, ID_VIDEO, freeHtml])

  const getAdsSpace = () => {
    const toDate = (dateStr) => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      const {
        fec_inicio: fecInicio,
        fec_fin: fecFin,
        des_html: desHtml,
      } = currentSpace
      const currentDate = new Date()
      const initDate = toDate(fecInicio)
      const endDate = toDate(fecFin)

      return currentDate > initDate && endDate > currentDate ? desHtml : false
    }

    return false
  }

  // DaznService Player
  if (isDaznServicePlayer(freeHtml)) {
    const idVideo = storyVideoPlayerId(freeHtml)

    const idVideoEmbed =
      isDaznServicePlayer(freeHtml) && freeHtml.includes('id') && idVideo[2]
        ? `id_video_embed_${idVideo[2]}`
        : `_${clearUrlOrCode(idVideo[2] || '').code || ''}`

    return (
      <div className={classes.htmlContainer}>
        <div
          id={idVideoEmbed}
          className={classes.newsEmbed}
          dangerouslySetInnerHTML={{
            __html: isDaznServicePlayer(freeHtml)
              ? freeHtml.trim().replace('performgroup', 'daznservices')
              : freeHtml,
          }}
        />
      </div>
    )
  }

  const addEmptyBorder = () =>
    adsBorder === 'containerp' ? 'container-publicidad' : ''
  const addEmptyBackground = () => (!freeHtml && isAdmin ? 'bg-gray-200' : '')
  const ads = getAdsSpace()

  if (ads) {
    return (
      <div
        className={addEmptyBorder()}
        dangerouslySetInnerHTML={{ __html: ads }}
      />
    )
  }
  return (
    <div className={` ${classes.htmlContainer} `}>
      {freeHtml ? <div dangerouslySetInnerHTML={{ __html: freeHtml }} /> : null}
      {!freeHtml && isAdmin ? (
        <div
          dangerouslySetInnerHTML={{ __html: freeHtml }}
          className={addEmptyBackground()}
        />
      ) : null}
    </div>
  )
}

BasicHtmlFeat.propTypes = {
  customFields,
}

BasicHtmlFeat.label = 'HTML B??sico'
BasicHtmlFeat.static = true

export default BasicHtmlFeat
