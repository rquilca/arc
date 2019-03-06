import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

@Consumer
class Subheading extends Component {
  render() {
    const {
      globalContent: { subheadlines: subtitle },
    } = this.props
    return (
      <Fragment>
        {subtitle && <h2 className="news-summary"> {subtitle.basic}</h2>}
      </Fragment>
    )
  }
}

Subheading.propTypes = {
  globalContent: PropTypes.object,
}

export default Subheading
