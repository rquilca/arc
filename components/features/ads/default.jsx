import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

@Consumer
class Ads extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { customFields } = this.props
    const { adElement, isDesktop, isMobile, freeHtml } = customFields

    const createMarkup = html => {
      return { __html: html }
    }

    return (
      <Fragment>
        {isMobile && <div id={`ads-m-${adElement}`} />}
        {isDesktop && <div id={`ads-d-${adElement}`} />}
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
      </Fragment>
    )
  }
}

Ads.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired.tag({
      name: 'Nombre',
    }),
    isDesktop: PropTypes.bool.tag({ name: 'Desktop', group: 'Dispositivo' }),
    isMobile: PropTypes.bool.tag({ name: 'Mobile', group: 'Dispositivo' }),
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html',
    }),
  }),
}

export default Ads
