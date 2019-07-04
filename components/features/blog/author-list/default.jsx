import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PostItem from './_children/post-item'
import Pagination from '../../../global-components/pagination'
import { defaultImage, getFullDateIso8601 } from '../../../utilities/helpers'

@Consumer
class BlogAuthorList extends PureComponent {
  render() {
    const {
      contextPath,
      deployment,
      globalContent = {},
      globalContentConfig = {},
      arcSite = '',
    } = this.props

    const {
      posts = [],
      user: { first_name: author = 'Gestion' } = {},
      blog: { count_posts: countPosts = '' } = {},
    } = globalContent || {}

    const {
      query: {
        posts_limit: postsLimit = '',
        posts_offset: postsOffset = '',
      } = {},
    } = globalContentConfig

    return (
      <div>
        {posts.map((post, i) => {
          const key = `post-${i}-${post.ID}`
          const {
            post_title: postTitle,
            post_permalink: postPermaLink,
            post_date: postDate,
            post_thumbnail: {
              guid: image = defaultImage({
                deployment,
                contextPath,
                arcSite,
                size: 'sm',
              }),
            } = {},
          } = post
          const { day, month, fullYear } = getFullDateIso8601(postDate)
          const data = {
            postTitle,
            postPermaLink: `/blog/${postPermaLink}`,
            postDate: `${day}/${month}/${fullYear}`,
            image,
            author,
          }
          return <PostItem key={key} {...data} />
        })}
        <Pagination
          totalElements={countPosts}
          storiesQty={postsLimit}
          currentPage={postsOffset || 1}
        />
      </div>
    )
  }
}

BlogAuthorList.label = 'Blog - Posts por autor'
// No puede ser static = true porque Pagination maneja estados.

export default BlogAuthorList
