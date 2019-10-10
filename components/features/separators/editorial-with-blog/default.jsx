import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import SeparatorBlogChildItem from './_children/item'
import { schemaBlog, schemaEditorial } from './_dependencies/schema-filter'
import { defaultImage, addSlashToEnd } from '../../../utilities/helpers'

const classes = {
  separator: 'blog-separator mb-20',
  header: `blog-separator__header flex flex-row justify-center mb-10 pt-10 position-relative items-center md:mb-10 md:pt-10`,
  itemsWrapper: 'flex flex-col overflow-hidden lg:flex-row',
  titleSeparator: `blog-separator__blog uppercase title-lg text-gray-300 blog-separator__title-header flex flex-row justify-left items-center`,
  seeMoreText: `blog-separator__see-more rounded-sm bg-white text-sm text-center text-gray-300 capitalize p-10 right-0`,
  seeMoreWrapper: `blog-separator__btn-wrapper flex items-center justify-center pt-10`,
}
const BLOG_BASE = '/blog/'
const CONTENT_SOURCE_SECTION = 'story-feed-by-section'
const CONTENT_SOURCE_BLOG = 'get-user-blog-and-posts'

const SeparatorEditorialWithBlog = () => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties: { siteUrl } = {},
  } = useFusionContext()

  const dataBlog =
    useContent({
      source: CONTENT_SOURCE_BLOG,
      query: {
        website_url: BLOG_BASE,
        blog_limit: 5,
        filter: schemaBlog,
      },
    }) || {}

  const dataEditorial =
    useContent({
      source: CONTENT_SOURCE_SECTION,
      query: {
        website: arcSite,
        section: '/opinion/editorial',
        feedOffset: 0,
        stories_qty: 2,
      },
      filter: schemaEditorial,
    }) || {}

  let listPost = Object.values(dataBlog)
  listPost = listPost.slice(0, 4)
  const seeMoreUrl = `${siteUrl}${BLOG_BASE}`

  const {
    credits: { by: dataAuthor = [] } = {},
    headlines: { basic: postTitleEditorial = '' } = {},
    website_url: postLinkEditorial = '',
  } = dataEditorial.content_elements[0]

  const {
    name: editorialAuthor = '',
    url: linkAuthor = '',
    image: {
      resized_urls: {
        lazy_default: lazyImageAuthor,
        square_s: authorImage = defaultImage({
          deployment,
          contextPath,
          arcSite,
          size: 'sm',
        }),
      } = {},
    } = {},
  } = dataAuthor[0] || {}

  const paramsEditorial = {
    authorName: editorialAuthor,
    lazyImage: lazyImageAuthor,
    authorImg: authorImage,
    blogUrl: linkAuthor,
    postLink: postLinkEditorial,
    postTitle: postTitleEditorial,
    isAdmin,
  }

  return (
    <div className={classes.separator}>
      <div className={classes.header}>
        <a className={classes.titleSeparator} href={BLOG_BASE}>
          FIRMAS
        </a>
        <a
          href={seeMoreUrl}
          className={`${classes.seeMoreText} non-mobile non-tablet`}>
          Ver más
        </a>
      </div>
      <div className={classes.itemsWrapper}>
        <SeparatorBlogChildItem {...paramsEditorial} />
        {listPost &&
          listPost.map(post => {
            const {
              user: {
                first_name: authorName = '',
                user_avatarb: {
                  resized_urls: {
                    lazy_default: lazyImage,
                    author_sm: authorImg = defaultImage({
                      deployment,
                      contextPath,
                      arcSite,
                      size: 'sm',
                    }),
                  } = {},
                } = {},
              } = {},
              blog: { path: blogUrl = '', blogname: blogName = '' } = {},
              posts: [
                {
                  post_permalink: postLink = '',
                  post_title: postTitle = '',
                } = {},
              ] = [],
            } = post

            const data = {
              authorName,
              lazyImage,
              authorImg,
              blogUrl: addSlashToEnd(`${BLOG_BASE}${blogUrl}`),
              blogName,
              postLink: `${BLOG_BASE}${postLink}`,
              postTitle,
              isAdmin,
            }
            return <SeparatorBlogChildItem key={blogUrl} {...data} />
          })}
      </div>
      <div className={`${classes.seeMoreWrapper} non-desktop`}>
        <a href={seeMoreUrl} className={classes.seeMoreText}>
          Ver más
        </a>
      </div>
    </div>
  )
}

SeparatorEditorialWithBlog.label = 'Separador de Editorial con Blog'
SeparatorEditorialWithBlog.static = true

export default SeparatorEditorialWithBlog
