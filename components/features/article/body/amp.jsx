import ArticleBody, {
  AmpOembed,
} from '@arc-core-components/feature_article-body'
import AMPCarousel from '@arc-core-components/feature_global-amp-gallery'
import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import ElePrincipal from './_children/amp-ele-principal'

@Consumer
class ArticleAMPArticleBody extends Component {
  render() {
    const {
      globalContent: {
        content_elements: contentElements,
        promo_items: promoItems,
      },
    } = this.props
    const elementClasses = {
      textClasses: 'amp-body__news-text',
      headerClasses: 'font--primary',
      imageClasses: 'visual__image visual__image--cover',
    }

    return (
      <Fragment>
        {promoItems && <ElePrincipal data={promoItems} />}

        {contentElements && (
          <ArticleBody
            data={contentElements}
            elementClasses={elementClasses}
            renderElement={element => {
              const {
                type,
                subtype,
                raw_oembed: rawOembed,
                content_elements: innerContentElements,
              } = element
              if (type === 'oembed_response') {
                return <AmpOembed rawOembed={rawOembed} subtype={subtype} />
              }
              if (type === 'raw_html') {
                return null
              }
              if (type === 'gallery') {
                return (
                  <AMPCarousel
                    data={innerContentElements}
                    width="500"
                    height="300"
                  />
                )
              }
              if (type === 'image') {
                return <AmpImage {...element} layout="responsive" />
              }
              return undefined
            }}
          />
        )}
      </Fragment>
    )
  }
}

export default ArticleAMPArticleBody
