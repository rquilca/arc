import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StoryData from '../../../utilities/story-data'

import StoryContentsChildMultimedia from '../contents/_children/multimedia'
import StoryTitleChildHeading from './_children/heading'
import StoryTitleChildSocial from './_children/social'

/** Este Feature esta construido para funcionar
 * correctamente junto al feature: /header/special
 */

const classes = {
  image: 'w-full position-relative',
  gradientLayer:
    'position-absolute top-0 right-0 bottom-0 left-0 hidden md:block',
  story:
    'story-special-h w-full text-center position-relative pt-30 pb-30 md:position-absolute md:p-0',
  note: `story-special-h__note title-xs text-center text-white uppercase pt-10 pb-10 mb-20 ml-30 mr-30 md:pt-15 md:pb-15`,
}

const gradientBg = {
  background: `linear-gradient(
    to bottom,
    rgba(50, 50, 50, 0.25) 0%,
    rgba(0, 0, 0, 0.1) 20%,
    rgba(50, 50, 50, 0.8) 100%
  )`,
}

const StorySpecialHeader = () => {
  const { arcSite, contextPath, globalContent: data } = useAppContext()
  const { title, link, editorNote, promoItems, multimedia } = new StoryData({
    data,
    contextPath,
  })

  const {
    social: {
      twitter: { user: siteNameRedSocial },
    },
    siteUrl,
  } = getProperties(arcSite)

  const parameters = {
    ...promoItems,
    multimedia,
    showCaption: false,
    primaryImage: true,
    completeImage: true,
  }
  return (
    <div className={classes.image}>
      <StoryContentsChildMultimedia data={parameters} />
      <div className={classes.gradientLayer} style={gradientBg} />
      <div className={classes.story}>
        {editorNote && (
          <div
            className={classes.note}
            dangerouslySetInnerHTML={{ __html: editorNote }}></div>
        )}
        <StoryTitleChildHeading title={title} editorNote={editorNote} />
        <StoryTitleChildSocial
          title={title}
          link={link}
          siteUrl={siteUrl}
          siteNameRedSocial={siteNameRedSocial}
        />
      </div>
    </div>
  )
}

StorySpecialHeader.label = 'Art??culo - Encabezado Especial'
StorySpecialHeader.static = true

export default StorySpecialHeader
