import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useEditableContent } from 'fusion:content'

import PropTypes from 'prop-types'
import {
  formatSlugToText,
  arrayMonths,
  arrayDays,
  createMarkup,
} from '../../utilities/helpers'

const classes = {
  title: 'w-full mt-20 custom-title',
  button:
    'custom-title__button position-absolute right-0 text-sm font-normal border-1 border-gray border-solid p-10 text-gray-200',
  darkButton:
    'custom-title__button position-absolute right-0 text-sm font-normal border-1 border-white border-solid p-10 text-white',
}

const CustomTitle = props => {
  const { globalContent, globalContentConfig } = useFusionContext()
  const { editableField } = useEditableContent()

  const {
    customFields: {
      isUppercase,
      isThreeCol,
      isCustomBorder,
      seeMoreButton,
      customText,
      isDarkBg,
      seeMoreButtonLink = '',
      TextType = 'h1',
      textAlign = 'left',
      size = 'large',
      subtitleField,
    } = {},
  } = props

  const {
    section_name: sectionName,
    tag_name: tagName,
    author_name: authorName,
  } = globalContent || {}
  const { query: { section } = {} } = globalContentConfig || {}

  const getArchivoTitle = () => {
    const { source } = globalContentConfig || {}
    if (source !== 'story-feed-by-section-and-date') {
      return undefined
    }
    const { query: { date = '' } = {} } = globalContentConfig || {}
    if (date === '' || !date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      return 'ÚLTIMO MINUTO'
    }

    // TODO: Usar librería como luxon"
    const dateObj = new Date(date)

    return `ARCHIVO, ${arrayDays[
      dateObj.getUTCDay()
    ].toUpperCase()} ${dateObj.getUTCDate()} DE ${arrayMonths[
      dateObj.getUTCMonth()
    ].toUpperCase()} DEL ${dateObj.getUTCFullYear()}` // ARCHIVO, LUNES 03 DE FEBRERO DEL 2018
  }

  const getSearchTitle = () => {
    const { source } = globalContentConfig || {}
    if (source !== 'story-feed-by-search') {
      return undefined
    }
    const { query: { query = '' } = {} } = globalContentConfig || {}
    const { count = 0 } = globalContent || {}

    let search = query && query.replace(/\+/g, ' ')
    search = decodeURIComponent(search)
    const title = search
      ? `SE ENCONTRARON ${count} RESULTADOS PARA: ${search.toUpperCase()}` // SE ENCONTRARON 99 RESULTADOS PARA: MADURO
      : `ÚLTIMAS NOTICIAS`

    return title
  }

  return (
    <>
      <TextType
        {...editableField('customText')}
        suppressContentEditableWarning
        className={`${classes.title} text-${textAlign} ${
          isUppercase ? 'uppercase' : ''
        } ${isThreeCol ? 'col-3' : ''} ${
          isCustomBorder ? 'custom-border' : ''
        } ${seeMoreButton ? 'position-relative ' : ''} ${
          isDarkBg ? 'dark-bg text-white bg-base-100' : ''
        } ${size}`}>
        {customText ||
          sectionName ||
          tagName ||
          authorName ||
          getSearchTitle() ||
          getArchivoTitle() ||
          formatSlugToText(section) ||
          'Título'}
        {seeMoreButton && (
          <a
            href={seeMoreButtonLink}
            className={isDarkBg ? classes.darkButton : classes.button}>
            VER MÁS
          </a>
        )}
      </TextType>
      {subtitleField && (
        <h2
          className="text-lg mt-10 mb-20 line-h-xs pl-20 pr-20 md:pl-0 md:pr-0"
          dangerouslySetInnerHTML={createMarkup(subtitleField)}
        />
      )}
    </>
  )
}

CustomTitle.propTypes = {
  customFields: PropTypes.shape({
    TextType: PropTypes.oneOf(['h1', 'h2']).tag({
      name: 'Tipo de texto',
      labels: {
        h1: 'Título',
        h2: 'Subtítulo',
      },
      defaultValue: 'h1',
    }),
    size: PropTypes.oneOf(['large', 'medium']).tag({
      name: 'Tamaño del texto',
      labels: {
        large: 'Grande',
        medium: 'Mediano',
      },
      defaultValue: 'large',
    }),
    textAlign: PropTypes.oneOf(['left', 'center', 'right']).tag({
      name: 'Alineación del texto',
      labels: {
        left: 'Izquierda',
        center: 'Centro',
        right: 'Derecha',
      },
      defaultValue: 'left',
    }),
    customText: PropTypes.string.tag({
      name: 'Título personalizado',
    }),
    isUppercase: PropTypes.bool.tag({
      name: 'Texto en mayúsculas',
    }),
    isThreeCol: PropTypes.bool.tag({
      name: 'Ancho de 3 columnas',
    }),
    isCustomBorder: PropTypes.bool.tag({
      name: 'Borde perzonalizado',
    }),
    isDarkBg: PropTypes.bool.tag({
      name: 'Fondo personalizado',
    }),
    seeMoreButton: PropTypes.bool.tag({
      name: 'Agregar botón "Ver más"',
    }),
    seeMoreButtonLink: PropTypes.string.tag({
      name: 'Url del botón "Ver más"',
    }),
    subtitleField: PropTypes.string.tag({
      name: 'Subtítulo personalizado',
      group: 'Agregar subtítulo',
      description: 'Este campo acepta código html',
    }),
  }),
  editableField: PropTypes.func,
}

CustomTitle.label = 'Título Personalizable'
CustomTitle.static = true

export default CustomTitle
