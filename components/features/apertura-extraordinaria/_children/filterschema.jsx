const filterSchema = arcSite => `{
    headlines {
        basic
    }
    subheadlines {
        basic
    }
    promo_items {
        basic_video {
            _id
            type
            promo_items {
                basic {
                    type 
                    url
                }
            }
            embed_html
        }
        basic_gallery {
            type 
            promo_items {
                basic {
                    type 
                    url
                }
            }
        }
        basic {
            type 
            url
        }
    }
    credits {
        by {
            type 
            name
            url
        }
    }
    website
    website_url
    websites {
        ${arcSite} {
            website_section {
                name
                path
            }
        }
    }
}`
export default filterSchema
