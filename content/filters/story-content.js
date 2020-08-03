import { basicVideo } from './basic-video'
import { basicGallery } from './basic-gallery'

// eslint-disable-next-line import/prefer-default-export
export const storyContent = `
_id
type
content_elements {
  _id
  type
  content
  text
  correction_type
  caption
  embed{
    id
    config{
      link
      photo
      title
      alt
      prepTime
      totalTime
      recipeCuisine
      recipeYield
      puntuation
      countReviews
      content
      date
    }
  }
  raw_oembed{
    url
    html
    provider_name
    type
    width
  }
  additional_properties{
    advertising{
      allowPrerollOnDomain
      playAds
      forceAd
      playVideoAds
      enableAdInsertion
      enableAutoPreview
    }
  }
  level
  language
  url
  duration
  list_type
  title
  subtype_label
  subtype
  width
  publish_date
  height
  citation{
    type
    content
  }
  content_elements{
    width
    height
    url
    subtitle
    type
    content
  }
  header{
    type
    content
  }
  rows
      {
        type
        content
      }
  
  headlines{
    basic
  }
  description{
    basic
  }
  items{
    type
    content
    url
    description{
      type
      content
    }
    image {
      type
      url
    }
  }
  streams{
    stream_type
    filesize
    url
  }
  duration
  embed_html
  promo_image{
    width
    height
    url
  }
  promo_items{
    basic{
      caption
      subtitle
      url
      width
      height
      
    }
  }

  canonical_url
  headlines{
    basic
  }
  credits{
    by  {
      type
      name
      slug
      url
      description
      image {
        url
      }
      referent{
        type
        id  
      }
    }
  }
}
created_date
last_updated_date
canonical_url
headlines {
  basic
  meta_title
}
subheadlines {
  basic
}
source
label{
  audiencia_nicho{
    text
    url
  }
  nucleo{
    text
    url
  }
  formato{
    text
    url
  }
  contenido{
    text
    url
  }
  genero{
    text
    url
  }
  facebook_ia{
    text
    url
  }
  trustproject{
    text
    url
  }
}
content_restrictions{
  content_code
}
subheadlines{
  basic
}
description
copyright
source{
  source_id
}
comments{
  allow_comments
  display_comments
  moderation_required
}
taxonomy {
  tags{
    text
    description
    slug
  }
  sections{
    name
  }
  primary_section{
    type
    name
    path
    additional_properties{
      original{
        _admin{
          alias_ids
        }
      }
    }
  }
  seo_keywords
}
promo_items{
  basic_html{
    content
    type
  }
  infografia {
    content
    type
  }
  youtube_id {
    content
    type
  }
  basic { 
    url 
    type
    subtitle
    caption
    width
    height

  }
  path_mp3 {
    content
    _id
    type
  }
  ingredients {
    content
  }
  ${basicVideo}
  ${basicGallery}
}

credits{
  by  {
    name
    slug
    url
    description
    image {
      url
    }
    type
    social_links{
      site
      url
    }
    additional_properties{
      original{
        email
        education
        role
        bio
      }
    }
  }
}
subtype
display_date
publish_date
website
editor_note
website_url
`
