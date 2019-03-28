import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from '../../../../resources/components/listado-noticias'
import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class Buscar extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    const {
      globalContent: { content_elements: contentElements = [], count = 0 } = {},
      globalContentConfig: { query: { size = 0, from = 1 } = {} } = {},
      arcSite,
    } = this.props

    const params = {
      data: contentElements,
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data.map((el, index) => (
            <CardNotice key={index} data={el} arcSite={params.arcSite} />
          ))}
        </div>
        <Paginacion
          totalElements={count}
          totalViews={size}
          currentPage={from}
        />
      </Fragment>
    )
  }
}

export default Buscar
