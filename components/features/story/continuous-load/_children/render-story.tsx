/* eslint-disable react/jsx-curly-brace-presence */
import * as React from 'react'
import { ArcSite } from 'types/fusion'
import { Story } from 'types/story'
import { AnyObject } from 'types/utils'

import StorySidebarContinueLayout from '../../../../layouts/story-sidebar/continue'
import StoryData from '../../../../utilities/story-data'
import StoryChildrenContentsLite from '../../_children/contents/lite'
import StoryChildrenGalleryLite from '../../_children/gallery/lite'
import StoryChildrenMultimediaLte from '../../_children/multimedia/lite'
import StoryChildrenSocialHeaderLite from '../../_children/social-header/lite'
import StoryChildrenTitle from '../../_children/title/lite'

const rederStory: React.FC<{
  data: Story
  contextPath: string
  arcSite: ArcSite
  requestUri: string
}> = (props) => {
  const { contextPath, arcSite, requestUri, data } = props
  const trustproject = data?.label?.trustproject

  const {
    isPremium,
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    subTitle,
    promoItems,
    contentElementsListOne,
    subtype,
    multimedia,
    promoItemJwplayer,
    tags: tagsStory,
    displayDate,
    publishDate,
    createdDate,
    authorImage,
    authorLink,
    author,
    role,
    locality,
    contentElements,
    authorsList,
    authorEmail,
  } = new StoryData({
    data,
    contextPath,
    arcSite,
  })

  // eslint-disable-next-line no-sparse-arrays
  const children = [
    ,
    StoryChildrenSocialHeaderLite({
      arcSite,
      primarySectionLink,
      primarySection,
      postTitle: title,
      postPermaLink: websiteLink,
      isPremium,
      trustproject,
    }),
    StoryChildrenTitle({
      arcSite,
      primarySectionLink,
      primarySection,
      title,
      contentElementsListOne,
      subTitle,
      isPremium,
    }),

    StoryChildrenMultimediaLte({
      promoItems,
      primarySection,
      primarySectionLink,
      subtype,
      multimedia,
      promoItemJwplayer,
      tags: tagsStory,
    }),
    StoryChildrenContentsLite({
      arcSite,
      contextPath,
      requestUri,
      shareAlign: 'right',
      copyLink: true,
      displayDate,
      publishDate,
      createdDate,
      authorImage,
      authorLink,
      author,
      role,
      locality,
      primarySection,
      authorEmail,
      subtype,
      isPremium,
      multimedia,
      tags: tagsStory,
      contentElements,
      canonicalUrl: websiteLink,
      authorsList,
      liteAdsEvery: 2,
    }),
  ]

  return (
    <>
      <StorySidebarContinueLayout children={children} />

      {/* <StoryChildrenGalleryLite
        subtype={subtype}
        canonicalUrl={websiteLink}
        multimedia={multimedia}
        isPremium={isPremium}
        promoItems={promoItems}
        primarySection={primarySection}
        promoItemJwplayer={promoItemJwplayer}
      /> */}
    </>
  )
}

export default rederStory
