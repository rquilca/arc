import PropTypes from 'prop-types'

const customFields = PropTypes.shape({
  disableSales: PropTypes.bool.tag({
    name: 'Deshabilitar SDK Sales',
    defaultValue: false,
  }),
})

export default customFields
