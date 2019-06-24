import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'

@Consumer
class CardFeaturedStoryAdvanced extends PureComponent {
  constructor(props) {
    super(props)
    const { deployment, contextPath, arcSite } = props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })
    this.state = this.storyFormatter.initialState
    this.fetch()
  }

  fetch() {
    const {
      customFields: {
        imgField,
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
    } = this.props

    const { schema } = this.storyFormatter

    const { fetched } = this.getContent(
      contentService,
      contentConfigValues,
      schema
    )
    fetched.then(response => {
      const newState = this.storyFormatter.formatStory(response, imgField)
      this.setState(newState)
    })
  }

  render() {
    const {
      editableField,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
      } = {},
    } = this.props
    const { category, title, author, image, multimediaType } = this.state

    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'

export default CardFeaturedStoryAdvanced
