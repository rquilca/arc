import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const CardsFeaturedStorySpecial = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
    filter: `
      headlines { basic }
      promo_items {
        basic { 
          url 
          type 
          resized_urls { 
            landscape_xl
          } 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                landscape_xl
              } 
            }
          }
        }
        basic_gallery {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                landscape_xl
              } 
            }
          }
        }
      }
      websites {
        ${arcSite} {
          website_section {
            name
            path
          }
          website_url
        }
      }
      taxonomy { 
        primary_section { 
          name
          path 
        }
        sections {
          name
          path 
        }
      }
    `,
  })

  const {
    websiteLink, // { websites { ${arcsite} { website_url } } }
    multimediaLandscapeXL,
    title, // { headlines { basic } }
    // multimediaType, // { promo_items }
    primarySectionLink, // { taxonomy { primary_section { path } } }
    primarySection, // { taxonomy { primary_section { name } } }
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'lg',
  })

  return (
    <div className="featured-special position-relative">
      <a href="/asd" className="featured-special__img-link block">
        <picture className="featured-special__picture block">
          <img className="w-full" src={multimediaLandscapeXL} alt={title} />
        </picture>
      </a>
      <div className="position-absolute ml-20 mb-20 md:ml-40 md:mb-40 bottom-0">
        <a
          href={primarySectionLink}
          className="featured-special__section-link inline-block font-bold text-white p-5 pl-20 pr-20 mb-15 text-xl bg-primary">
          {primarySection}
        </a>
        <h2 className="featured-special__title-link block">
          <a
            href={websiteLink}
            className="text-white font-bold line-h-sm title-md ">
            {title}
          </a>
        </h2>
      </div>
    </div>
  )
}

CardsFeaturedStorySpecial.label = 'Destaque especial'
CardsFeaturedStorySpecial.static = true

CardsFeaturedStorySpecial.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default CardsFeaturedStorySpecial
