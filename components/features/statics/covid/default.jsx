import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'

import Home from './_children/home'
import Infected from './_children/infected/infected'
import QuestionList from './_children/question-list'
import UciBeds from './_children/uci_beds/home'

/**
 * @see estilos `src/websites/elcomercio/covid.scss`
 */

const StaticsCovid = () => {
  const { requestUri } = useAppContext()
  const fullPath = requestUri.split('?')[0]
  const pathArr = fullPath.split('/').filter((el) => el !== '')
  const [
    paramOne = '',
    paramTwo = '',
    paramThree = '',
    paramFour = '',
    // paramFive = '',
  ] = pathArr || []
  let html = ''
  if (paramOne === 'covid-19' && pathArr.length === 1) {
    html = <Home />
  } else if (
    paramOne === 'covid-19' &&
    paramTwo === 'camas-uci' &&
    pathArr.length >= 2 &&
    pathArr.length <= 5
  ) {
    html = <UciBeds />
  } else if (
    paramOne === 'covid-19' &&
    paramTwo === 'contagiados' &&
    pathArr.length >= 2 &&
    pathArr.length <= 4
  ) {
    let paramPath = paramThree
    if (paramFour !== '') paramPath += `/${paramFour}`
    html = <Infected path={paramPath} />
  } else if (
    paramOne === 'covid-19' &&
    paramTwo === 'mas-informacion' &&
    (pathArr.length === 2 || pathArr.length === 3)
  ) {
    html = <QuestionList path={paramThree} />
  }

  return html
}

StaticsCovid.label = 'Covid Especial'

StaticsCovid.propTypes = {
  customFields: PropTypes.shape({}),
}

export default StaticsCovid
