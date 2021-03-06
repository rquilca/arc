import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import DataStory from '../../../utilities/story-data'
import FeaturedStory from '../../../global-components/featured-story'
import Ads from './_children/ads/default'

const ADS = 'publicidad'
const STORY = 'destaque'

const elements = [
  { col: 2, row: 1, type: STORY },
  { col: 1, row: 2, type: ADS },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 1, row: 1, type: STORY },
  { col: 2, row: 1, type: STORY },
]

const classes = {
  container:
    'grid grid--content grid--col-3 grid--col-2 grid--col-1 w-full mt-20',
}

const OrderedStoriesGridFeat = props => {
  const { customFields } = props
  const { globalContent, deployment, contextPath, arcSite } = useAppContext()
  const { isDfp } = getProperties(arcSite)
  const { content_elements: contentElements = [] } = globalContent || {}

  const renderGrilla = () => {
    const dataStory = new DataStory({
      deployment,
      contextPath,
      arcSite,
    })
    let storyNumber = 0

    return elements.map(element => {
      if (element.type === STORY) {
        dataStory.__data = contentElements[storyNumber]

        const {
          primarySection,
          primarySectionLink,
          title,
          websiteLink,
          author,
          authorLink,
          multimediaType,
          multimediaSubtitle,
          multimediaCaption,
          multimedia,
        } = dataStory
        storyNumber += 1
        return (
          <FeaturedStory
            key={`ft-list-${websiteLink}`}
            primarySection={primarySection}
            primarySectionLink={primarySectionLink}
            title={title}
            websiteLink={websiteLink}
            author={author}
            authorLink={authorLink}
            multimediaType={multimediaType}
            multimediaSubtitle={multimediaSubtitle}
            multimediaCaption={multimediaCaption}
            multimedia={multimedia}
            arcSite={arcSite}
            imageSize="complete"
            headband="normal"
            size={element.col === 1 ? 'oneCol' : 'twoCol'}
            hightlightOnMobile="true"
          />
        )
      }
      if (element.type === ADS) {
        const { adElement, isDesktop, isMobile, freeHtml } = customFields || {}
        return (
          <Ads
            adElement={adElement}
            isDesktop={isDesktop}
            isMobile={isMobile}
            columns={element.col === 2 ? 'twoCol' : 'oneCol'}
            rows={element.row === 2 ? 'twoRow' : 'oneRow'}
            freeHtml={freeHtml}
            isDfp={isDfp}
          />
        )
      }
      return null
    })
  }

  return <div className={classes.container}>{renderGrilla()}</div>
}

OrderedStoriesGridFeat.propTypes = {
  customFields: PropTypes.shape({
    /* initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 1,
      description:
        'Indique el n??mero de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al n??mero 1',
    }), */
    adElement: PropTypes.string.tag({
      name: 'Identificador de publicidad',
    }),
    isDesktop: PropTypes.bool.tag({
      name: 'Desktop',
      group: 'Dispositivo de publicidad',
    }),
    isMobile: PropTypes.bool.tag({
      name: 'Mobile',
      group: 'Dispositivo de publicidad',
    }),
    freeHtml: PropTypes.richtext.tag({
      name: 'C??digo HTML',
      group: 'Agregar bloque de html para publicidad',
    }),
  }),
}

OrderedStoriesGridFeat.label = 'Grilla de Historias Ordenadas - Beta'
OrderedStoriesGridFeat.static = true

export default OrderedStoriesGridFeat
