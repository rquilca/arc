import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import { formatSlugToText } from '../../../utilities/helpers'
import getLatinDate from '../../../utilities/date-name'
import CustomFieldsImport from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const classes = {
  tabloid: 'tabloid row-1 flex flex-col',
  header: 'tabloid__header flex items-center justify-center',
  headerLink: 'tabloid__header-link text-white',
  body: 'tabloid__body flex items-center justify-center flex-col h-auto',
  content: 'flex items-center justify-center',
  date: 'tabloid__date flex items-center justify-center',
  dateLink: 'tabloid__date-link text-black',
  face: 'tabloid__face object-contain',
}

const CONTENT_SOURCE = 'story-feed-by-section'

@Consumer
class CardTabloid extends PureComponent {
  constructor(props) {
    super(props)

    const {
      arcSite,
      deployment,
      contextPath,
      customFields: { section = '' } = {},
    } = this.props

    this.fetchContent({
      data: {
        source: CONTENT_SOURCE,
        query: {
          website: arcSite,
          section,
          stories_qty: 1,
        },
        filter: schemaFilter(arcSite),
        tramsform: ({ content_elements: contentElements = [] } = {}) => {
          const data = new StoryData({
            data: contentElements[0],
            deployment,
            contextPath,
            arcSite,
            defaultImgSize: 'sm',
          })
          return data
        },
      },
    })
  }

  render() {
    const {
      data: {
        multimedia = '',
        title = '',
        date = '',
        section = '',
        link = '',
      } = {},
    } = this.state

    const { customFields: { sectionName = '' } = {} } = this.props

    const nameDate = getLatinDate(date, ' del')

    return (
      <div className={classes.tabloid}>
        <div className={classes.header}>
          <h4>
            <a className={classes.headerLink} href={link}>
              {sectionName || formatSlugToText(section)}
            </a>
          </h4>
        </div>
        <div className={classes.body}>
          <h3 className={classes.date}>
            <a className={classes.dateLink} href={link}>
              {nameDate}
            </a>
          </h3>
          <div className={classes.content}>
            <figure>
              <picture>
                <a href={link}>
                  <img className={classes.face} src={multimedia} alt={title} />
                </a>
              </picture>
            </figure>
          </div>
        </div>
      </div>
    )
  }
}

CardTabloid.label = 'Tabloide'
CardTabloid.static = true

CardTabloid.propTypes = {
  customFields: CustomFieldsImport,
}

export default CardTabloid
