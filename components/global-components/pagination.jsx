import React from 'react'

const classes = {
  pagination:
    'pagination flex justify-center w-full flex-wrap mb-15 m-0 md:pt-30 md:pb-30 md:pr-0 md:pl-0',
  page: 'pagination__page uppercase h-full text-md text-gray-300',
}

const createPaginator = (currentPage, totalPages) => {
  const listPages = []
  const initPage = 1

  // eslint-disable-next-line no-param-reassign
  currentPage =
    Math.abs(currentPage) > totalPages ? totalPages : Math.abs(currentPage)

  const leftPag = currentPage - initPage >= 6
  const rightPag = totalPages - currentPage >= 6

  if (leftPag && rightPag) {
    for (let i = currentPage - 3; i <= currentPage + 3; i++) {
      listPages.push(i)
    }
  }

  if (leftPag && !rightPag) {
    for (let i = totalPages - 6; i <= totalPages; i++) {
      listPages.push(i)
    }
  }

  if (!leftPag && rightPag) {
    for (let i = initPage; i <= initPage + 6; i++) {
      listPages.push(i)
    }
  }

  if (!leftPag && !rightPag) {
    for (let i = initPage; i <= totalPages; i++) {
      listPages.push(i)
    }
  }

  if (rightPag) {
    if (totalPages - listPages.length > 1) listPages.push('...')
    if (totalPages - listPages.length >= 1) listPages.push(totalPages)
  }

  if (leftPag) {
    const aux = []
    if (listPages[0] - initPage >= 1) aux.push(initPage)
    if (listPages[0] - initPage > 1) aux.push('...')
    if (aux.length > 1) listPages.unshift(aux[0], aux[1])
    else listPages.unshift(aux[0])
  }

  return listPages
}

const Pagination = props => {
  const { totalElements, storiesQty, requestUri } = props
  let { currentPage } = props

  const totalPages = Math.ceil(totalElements / (storiesQty || 50))
  const pages = createPaginator(currentPage || 1, totalPages)
  currentPage = parseInt(currentPage || 1, 10)

  const pathOrigin = requestUri.replace(/\/[0-9]*?\/?$/, '')

  const nextPage = currentPage === 0 ? currentPage + 2 : currentPage + 1
  const prevPage = currentPage - 1

  const urlPrevPage = `${pathOrigin}/${prevPage}`
  const urlNextPage = `${pathOrigin}/${nextPage}`

  return (
    <div role="navigation" className={classes.pagination}>
      <a
        className={`${classes.page} ${
          currentPage === 1 || currentPage === 0
            ? 'pagination__page--disabled'
            : ''
        }`}
        href={urlPrevPage}>
        anterior
      </a>
      {pages.map((page, i) => {
        let tag = null
        const key = `pagination-${i}-${page || ''}`
        const urlPage = `${pathOrigin}/${page}`

        if (page !== '...') {
          tag = (
            <a
              key={key}
              className={`${classes.page} ${
                currentPage === page || (currentPage === 0 && page === 1)
                  ? 'pagination__page--current'
                  : ''
              }`}
              href={urlPage}>
              {page}
            </a>
          )
        } else {
          tag = (
            <span key={key} className={classes.page}>
              {page}
            </span>
          )
        }
        return tag
      })}
      <a
        className={`${classes.page} ${
          currentPage === totalPages ? 'pagination__page--disabled' : ''
        }`}
        href={urlNextPage}>
        siguiente
      </a>
    </div>
  )
}

export default Pagination
