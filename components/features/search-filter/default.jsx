
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import ChildSearchFilter from './_children/search-filter'

@Consumer
class SearchFilter extends PureComponent {
  render() {
    const { arcSite, requestUri, isAdmin, globalContentConfig } = this.props

    const params = {
      arcSite,
      requestUri,
      isAdmin,
      globalContentConfig,
    }
    console.log(requestUri)
    return <ChildSearchFilter {...params} />
  }
}

SearchFilter.label = 'Filtro de búsqueda'

export default SearchFilter
