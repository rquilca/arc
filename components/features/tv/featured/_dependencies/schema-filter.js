export default `
  {
    promo_items {
      basic { 
        url 
        type 
        resized_urls { 
          preset1
          preset2
          preset3
        } 
      }
      basic_video {
        _id
        promo_items {
          basic { 
            url 
            type 
            resized_urls { 
              preset1
              preset2
              preset3
            } 
          }
        }
      }
      youtube_id {
        content
      }
      basic_html {
        content
      }
    }
    headlines { basic }
    display_date
    section_name
  }
  `
