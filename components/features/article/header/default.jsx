import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import ArticleHeaderChildHeading from './_children/heading'
import ArticleHeaderChildShareSubheading from './_children/subheading'
import ArticleHeaderChildGallery from './_children/gallery'
import ArticleHeaderChildSocial from './_children/social'

const classes = {
  news: 'col-3 bg-color--white',
  gallery: 'col-3',
}
@Consumer
class ArticleHeader extends Component {
  render() {
    const { globalContent } = this.props
    const {
      website_url: baseUrl = '',
      headlines: title = '',
      promo_items: galleryItems = {},
    } = globalContent || {}

    const hasValueElements =
      galleryItems &&
      galleryItems.basic_gallery &&
      typeof galleryItems.basic_gallery.content_elements !== 'undefined' &&
      true

    return (
      <Fragment>
        <div className={hasValueElements ? classes.gallery : classes.news}>
          <ArticleHeaderChildSocial url={baseUrl} title={title} />

          <ArticleHeaderChildHeading />
          <ArticleHeaderChildShareSubheading />

          {galleryItems &&
          galleryItems.basic_gallery &&
          typeof galleryItems.basic_gallery.content_elements !== 'undefined' ? (
            <ArticleHeaderChildGallery
              data={galleryItems && galleryItems.basic_gallery}
            />
          ) : (
            ''
          )}
        </div>
      </Fragment>
    )
  }
}

ArticleHeader.static = true

ArticleHeader.label = 'Artículo - cabecera'

export default ArticleHeader
