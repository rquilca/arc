/* eslint-disable no-use-before-define */
/* eslint-disable no-bitwise */
/* eslint-disable import/prefer-default-export */
import React from 'react'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import * as colors from '@material-ui/core/colors'
import tinycolor from 'tinycolor2'
import {
  lighten,
  darken,
  emphasize,
  fade,
  rgbToHex,
} from '@material-ui/core/styles/colorManipulator'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useFusionContext } from 'fusion:context'

/**
 * Una pequeña modificacion a createMuiTheme de material-ui
 * que soporta un argumento boolean adicional al final de las
 * funciones utilitarias de "breakpoints" (up, down, between y only)
 * y que por defecto es "true", con este argumento se puede especificar
 * si se quiere o no la cadena "@media " al comienzo del media query
 */
export const createTheme = options => {
  const palette = {
    ...options.palette,
    lighten,
    darken,
    invert,
    emphasize,
    fade,
    rgbToHex,
  }
  const theme = createMuiTheme({ ...options, palette })
  const { breakpoints } = theme

  const bpFuncWrapper = fn => (...args) => {
    const fullMediaQuery = args[args.length - 1]
    if (typeof fullMediaQuery === 'boolean' && !fullMediaQuery) {
      return fn(...args).replace(/^@media\s*/, '')
    }
    return fn(...args)
  }

  breakpoints.up = bpFuncWrapper(breakpoints.up)
  breakpoints.down = bpFuncWrapper(breakpoints.down)
  // breakpoints.down = (key, fullMediaQuery) => {
  //   const endIndex = breakpoints.keys.indexOf(key) + 1
  //   const upperbound = breakpoints.values[breakpoints.keys[endIndex]]
  //   if (endIndex === breakpoints.keys.length) {
  //     // xl down applies to all sizes\
  //     return breakpoints.up(breakpoints.keys[0])
  //   }
  //   const value =
  //     typeof upperbound === 'number' && endIndex > 0 ? upperbound : key
  //   return `${fullMediaQuery ? '@media ' : ''}(max-width:${value -
  //     breakpoints.step / 100}${breakpoints.unit} '))`
  // }
  breakpoints.only = bpFuncWrapper(breakpoints.only)
  breakpoints.between = bpFuncWrapper(breakpoints.between)

  return theme
}

/**
 * HOC que pasa al componente envuelto el tema de la aplicacion
 * seleccionado segun arcSite, e inicializado con los argumentos
 * createTheme, fusionContext, y getImageDeployment
 *
 * @param {*} themes Temas de la aplicación
 */
export const withTheme = themes => Comp => {
  const ThemedComp = props => {
    const fusionContext = useFusionContext()
    const { arcSite: themeName, contextPath, deployment } = fusionContext
    const getImageDeployment = React.useRef(imageFileName =>
      deployment(
        `${contextPath}/resources/dist/${themeName}/images/${imageFileName}`
      )
    ).current
    const themeArgs = {
      colors,
      lighten,
      darken,
      invert,
      emphasize,
      fade,
      rgbToHex,
      createTheme,
      fusionContext,
      getImageDeployment,
    }
    const theme = themes[themeName](themeArgs)
    return React.createElement(Comp, { ...props, theme })
  }
  hoistNonReactStatics(ThemedComp, Comp)
  return ThemedComp
}

export const OnlySite = ({ site, children }) => {
  const { arcSite } = useFusionContext()
  return site === arcSite ? children : null
}

// Color manipulation functions
const invert = color => {
  const hex = tinycolor(color).toHexString()
  // prettier-ignore
  const colors = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
  let inverseColor = '#'
  hex
    .replace('#', '')
    .split('')
    .forEach(i => {
      const index = colors.indexOf(i)
      inverseColor += colors.reverse()[index]
    })
  return inverseColor
}
