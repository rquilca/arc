/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import ResultGraph from './_children/graph'
import ResultPaginator from './_children/paginator'
import NavigationMenu from './_children/navigation'
import ResultPages from './_children/pages'
import { slugify } from '../../../utilities/parse/slugify'
import Projection from './_children/projection'
// import OptionCongresal from './_children/option-congresal'

const PresidentialElection = props => {
  const [filters, setFilters] = React.useState({
    group: 'general',
    filter: null,
    subFilter: null,
  })

  const { requestUri } = useAppContext()

  const { customFields } = props

  const fullPath = requestUri.split('?')[0]
  const pathArr = fullPath.split('/').filter(el => el !== '')

  /**
   * @type {'presidencial' | 'congresal' | 'parlamento-andino'}
   */
  const page = !pathArr[1] ? 'presidencial' : pathArr[1]

  const pageData =
    useContent(
      customFields[page]
        ? {
            source: 'get-data-from-json-file',
            query: {
              json_file: customFields[page],
            },
          }
        : {}
    ) || {}

  const { partidos = [] } =
    useContent(
      customFields.partidosJson
        ? {
            source: 'get-data-from-json-file',
            query: {
              json_file: customFields.partidosJson,
            },
          }
        : {}
    ) || {}

  const changeUrl = (filter, group) => {
    window.history.pushState(
      {},
      null,
      `${requestUri}/${slugify(group)}/${slugify(filter)}/`
    )
  }

  const changeFilters = newFilters => {
    const { filter, group } = newFilters
    setFilters(newFilters)
    changeUrl(filter, group)
  }

  const getFilterData = () => {
    let filterData = []
    if (page === 'congresal') {
      filterData = [] // TODO
    } else if (filters.group && !filters.filter && !filters.subFilter) {
      filterData = pageData?.[filters.group] || []
    } else if (filters.group && filters.filter && !filters.subFilter) {
      const dataByGroup = pageData?.[filters.group] || []

      filterData = dataByGroup.filter(
        ({ filtro_nombre }) => filtro_nombre === filters.filter
      )[0]?.filtro_listado
    }
    return filterData
  }

  console.log(
    pageData,
    partidos,
    filters,
    'currentData>>>>>>>',
    getFilterData()
  )

  const setNewFilterPosition = direction => {
    const filterByGroup = pageData?.[filters.group] || []
    const { group } = filters

    const cirrentFilterIndex = filterByGroup.findIndex(
      ({ filtro_nombre }) => filtro_nombre === filters.filter
    )
    let newData = null
    if (direction === 'prev') {
      newData = filterByGroup[cirrentFilterIndex - 1]
    } else if (direction === 'next') {
      newData = filterByGroup[cirrentFilterIndex + 1]
    }
    if (newData) {
      setFilters({ ...filters, filter: newData.filtro_nombre })
      changeUrl(newData.filtro_nombre, group)
    }
  }

  return (
    <div>
      <ResultPages page={page} />
      <NavigationMenu
        page={page}
        pageData={pageData}
        changeFilters={changeFilters}
      />
      {/* <OptionCongresal /> */}
      <div className="election__updated-date">
        {pageData?.fecha_actualizacion}
      </div>
      <Projection />
      {filters.filter ? (
        <ResultPaginator
          setNewFilterPosition={setNewFilterPosition}
          title={filters.filter}
        />
      ) : null}
      <ResultGraph filterData={getFilterData()} partidos={partidos} />
      <div className="election__bottom-text">{pageData?.texto_inferior}</div>
    </div>
  )
}

PresidentialElection.label = 'Elecciones presidenciales y congresales'

PresidentialElection.propTypes = {
  customFields: PropTypes.shape({
    partidosJson: PropTypes.string.tag({
      name: 'Url del JSON de partidos políticos',
    }),
    presidencial: PropTypes.string.tag({
      name: 'Url del JSON para resultados presidenciales',
    }),
    congresal: PropTypes.string.tag({
      name: 'Url del JSON para resultados congresales',
    }),
    'parlamento-andino': PropTypes.string.tag({
      name: 'Url del JSON para resultados del parlamento andino',
    }),
  }),
}

export default PresidentialElection
