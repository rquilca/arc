import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import AuthorTitleComponent from './_children/author-title'

@Consumer
class BlogAuthorTitle extends PureComponent {
  render() {
    const { globalContent } = this.props
    const {
      user: {
        first_name: firstName = '',
        user_avatarb: { guid = '' } = {},
      } = {},
      blog: { blogname = '' } = {},
    } = globalContent || {}

    const data = {
      firstName,
      guid,
      blogname,
    }
    return (
      // Componente titulo
      <AuthorTitleComponent {...data} />
    )
  }
}

BlogAuthorTitle.label = 'Titulo autor'
BlogAuthorTitle.static = true

export default BlogAuthorTitle
