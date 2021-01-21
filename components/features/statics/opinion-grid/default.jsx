import React, { Fragment } from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import StoryData from '../../../utilities/story-data'
import { createResizedParams } from '../../../utilities/resizer/resizer'

import AuthorCard from './_children/author-card'
import EditorialCard from './_children/editorial-card'
import ListItem from './_children/list-item'
import CustomTitle from '../../custom-title/default/default'
import Ads from '../../../global-components/ads'
// TODO: author-card y editorial-card pueden evitar código duplicado con un contenedor
const classes = {
  container: 'opinion-grid grid w-full m-0 mx-auto',
  externalTitle: 'opinion-grid--title pt-20 pb-20 pl-0 pr-0 m-0 mx-auto',
  list: 'opinion-grid--list w-full m-0 mx-auto',
  titleBox:
    'opinion-grid__box-title w-full pt-15 pb-15 border-b-1 border-solid border-gray md:pt-25 md:pb-25 md:pl-0 md:pr-0',
  title: 'opinion-grid__title uppercase text-center secondary-font title-xs',
  moreBox: 'flex justify-center pt-25 pb-15',
  more: 'opinion-grid__more uppercase text-center text-md text-gray-300',
}

const StaticOpinionGrid = () => {
  const {
    globalContent,
    deployment,
    contextPath,
    arcSite,
    isAdmin,
  } = useFusionContext()
  const { content_elements: contentElements } = globalContent || {}
  const stories = contentElements || []
  const data = new StoryData({
    deployment,
    contextPath,
    arcSite,
    defaultImgSize: 'sm',
  })
  let countAdd = 0
  let countAddPrint = 0

  const { isDfp = false } = getProperties(arcSite)
  const typeSpace = isDfp ? 'caja' : 'movil'

  const defaultAuthorImage = deployment(
    `${contextPath}/resources/assets/author-grid/author-alpha.png`
  )

  return (
    <div>
      <div className={classes.title}>
        <CustomTitle />
      </div>
      <div role="list" className={classes.container}>
        {stories.slice(0, 12).map(story => {
          const { credits: { by = [] } = {} } = story || {}
          const { image: { url } = {} } = by[0] || {}

          const { square_md: resizedAuthorImage } = createResizedParams({
            url,
            presets: 'square_md:100x100',
            arcSite,
          })

          const authorImage = resizedAuthorImage || defaultAuthorImage

          data.__data = story
          const { taxonomy: { primary_section: { name } = '' } = {} } =
            story || {}
          const section = name ? name.toUpperCase() : ''
          let result = null
          countAdd += 1
          if (section && section === 'EDITORIALp') {
            if (countAdd === 4) {
              countAddPrint += 1
              result = (
                <Fragment>
                  <EditorialCard
                    key={`Editorial-card-${story._id}`}
                    data={data.attributesRaw}
                    authorImage
                  />
                  <Ads
                    adElement={`${typeSpace}${countAddPrint}`}
                    isDesktop={false}
                    columns=""
                    rows=""
                    freeHtml=""
                    isDfp={isDfp}
                  />
                </Fragment>
              )
              countAdd = 0
            } else {
              result = (
                <EditorialCard
                  key={`Editorial-card-${story._id}`}
                  data={data.attributesRaw}
                  authorImage
                />
              )
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (countAdd === 4) {
              countAddPrint += 1
              result = (
                <Fragment>
                  <AuthorCard
                    {...{
                      key: `Author-card-${story._id}`,
                      data: data.attributesRaw,
                      deployment,
                      contextPath,
                      arcSite,
                      authorImage,
                    }}
                  />
                  <Ads
                    adElement={`${typeSpace}${countAddPrint}`}
                    isDesktop={false}
                    columns=""
                    rows=""
                    freeHtml=""
                    isDfp={isDfp}
                  />
                </Fragment>
              )
              countAdd = 0
            } else {
              result = (
                <AuthorCard
                  {...{
                    key: `Author-card-${story._id}`,
                    data: data.attributesRaw,
                    deployment,
                    contextPath,
                    arcSite,
                    authorImage,
                  }}
                />
              )
            }
          }
          return result
        })}
      </div>
      <Ads
        adElement="middle1"
        isMobile={false}
        columns=""
        rows=""
        freeHtml=""
        isDfp={isDfp}
      />

      <div role="list" className={classes.list}>
        <div className={classes.titleBox}>
          <p itemProp="description" className={classes.title}>
            ÚLTIMAS NOTICIAS
          </p>
        </div>
        {stories.slice(12).map((story, index) => {
          const { credits: { by = [] } = {} } = story || {}
          const { image: { url } = {} } = by[0] || {}

          const { square_sm: resizedAuthorImageSmall } = createResizedParams({
            url,
            presets: 'square_sm:70x70',
            arcSite,
          })

          const authorImage = resizedAuthorImageSmall || defaultAuthorImage

          data.__data = story
          return index !== 3 ? (
            <ListItem
              {...{
                key: `List-item-${story._id}`,
                data: data.attributesRaw,
                isAdmin,
                defaultAuthorImage,
                authorImage,
              }}
            />
          ) : (
            <Fragment>
              <ListItem
                {...{
                  key: `List-item-${story._id}`,
                  data: data.attributesRaw,
                  isAdmin,
                  defaultAuthorImage,
                  authorImage,
                }}
              />
              <Ads
                adElement={`${isDfp ? 'caja5' : 'movil5'}`}
                isDesktop={false}
                columns=""
                rows=""
                freeHtml=""
                isDfp={isDfp}
              />
            </Fragment>
          )
        })}
        <div className={classes.moreBox}>
          <a itemProp="url" href="/archivo/opinion/" className={classes.more}>
            Ver Más
          </a>
        </div>
      </div>
    </div>
  )
}

StaticOpinionGrid.label = 'Grilla y listado de Opinión'
StaticOpinionGrid.static = true

export default StaticOpinionGrid
