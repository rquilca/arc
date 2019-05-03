import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_children/customfields'
import filterSchema from '../_children/filterschema'
import Data from '../_children/data'
import FeaturedNews from '../../../global-components/featured-news'

const API_URL = 'story-by-url'
@Consumer
class FeaturedNewsStory extends Component {
  mainLogic = {
    fetch: (api, url, filter = {}) => {
      if (url) {
        const { fetched } = this.getContent(api, { website_url: url }, filter)
        return fetched
      }
      return new Promise((resolve, reject) => {
        reject(new Error('Url empty'))
      })
    },

    dataState: (data = null) => {
      return data === null ? { data: {} } : { data }
    },
  }

  constructor(props) {
    super(props)
    this.state = this.mainLogic.dataState()
    this.isVideo = ''
  }

  componentDidMount() {
    const {
      customFields: { link },
      arcSite,
    } = this.props

    this.mainLogic
      .fetch(API_URL, link, filterSchema(arcSite))
      .then(response => {
        this.setState(this.mainLogic.dataState(response))
      })
      .catch(() => false)
  }

  componentDidUpdate() {
    if (window.powaBoot && this.isVideo) {
      window.powaBoot()
    }
  }

  render() {
    const { customFields, arcSite } = this.props
    const { data } = this.state
    const formattedData = new Data(customFields, data, arcSite)
    this.isVideo = formattedData.isVideo

    const params = {
      data: formattedData,
      multimediaType: formattedData.multimediaType,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
      arcSite,
    }

    return <FeaturedNews {...params} />
  }
}

FeaturedNewsStory.propTypes = {
  customFields: customFieldsExtern,
}

FeaturedNewsStory.label = 'Apertura extraordinaria por nota'

export default FeaturedNewsStory
