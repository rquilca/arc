import * as React from 'react'
import { TypeListItems } from 'types/story'

import LinkListItem from './link-list-item'

interface FeatureProps {
  items?: TypeListItems[]
  title?: string
  v2?: boolean
  isAmp?: boolean
}
const LinkList: React.FC<FeatureProps> = ({ items, title, v2, isAmp = false }) => {
  const classAmp = isAmp ? 'amp-' : ''
  const classes = {
    container: `${classAmp}story-content__link-list position-relative p-20 mb-20 mt-20 mr-20 ${
      items.length <= 1 && 'story-content__link-list-single'
    }`,
    title: `${classAmp}story-content__link-list-title uppercase mb-20`,
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>{(v2 && title) || "Mira también:"}</div>
      {items?.map((data) => {
        const url = data?.url
        const content = data?.content
        const urlImg = data?.image?.url

        return (
          <LinkListItem
            key={`link-list-${url}`}
            url={url}
            title={content}
            image={urlImg}
            isAmp={isAmp}
            v2 = {v2}
          />
        )
      })}
    </div>
  )
}

export default LinkList
