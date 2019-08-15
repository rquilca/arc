import getDomain from './services'
import addScriptAsync from '../../../utilities/script-async'

const addSales = () => {
  return addScriptAsync({
    name: 'sdkSalesARC',
    url: getDomain('ORIGIN_SALES_SDK'),
  }).then(added => {
    if (added) {
      window.Sales.apiOrigin = getDomain('ORIGIN_API')
    }
    return window.Sales
  })
}

export { addSales }
