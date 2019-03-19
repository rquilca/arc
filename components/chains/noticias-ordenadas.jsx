import React from 'react'
import PropTypes from 'prop-types'

export default function OrderedNews({ children, customFields }) {
  let { initialStory: storyNumber } = customFields
  storyNumber = storyNumber || 0
  /**
   *    Recorre los hijos para clonarlos agregando como propiedad
   *    el número de la noticia que le corresponde imprimir.
   */
  const AutoChildren = React.Children.map(children, child => {
    /**
     *    Sólo agrega la propiedad "storyNumber" cuando el hijo
     *    es de los tipos que aceptan la propiedad.
     */

    if (child.props.type === 'grilla-seccion/destaque') {
      const newChild = React.cloneElement(child, {
        storyNumber,
      })
      storyNumber += 1
      return newChild
    }
    return child
  })
  return (
    <div className="content-grid-base content--3col content--2col content--1col full-width margin-top">
      {AutoChildren}
    </div>
  )
}

OrderedNews.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la noticia:',
      defaultValue: 0,
      description:
        'Indique el número de la noticia desde la que quiere empezar a imprimir. La primera noticia corresponde al número 0',
    }),
  }),
}
