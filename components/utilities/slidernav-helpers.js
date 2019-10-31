const sideScrollInterval = (element, direction, speed, distance, step) => {
  let scrollAmount = 0
  const newElement = element
  const slideTimer = setInterval(() => {
    if (direction === 'left') {
      newElement.scrollLeft -= step
    } else {
      newElement.scrollLeft += step
    }
    scrollAmount += step
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer)
    }
  }, speed)
}

export const sideScroll = direction => {
  if (window) {
    const container =
      document.getElementsByClassName('header__featured')[0] || {}
    const isNotSupportSmooth =
      document.body.style['scroll-behavior'] === undefined
    if (container) {
      if (direction === 'left') {
        if (isNotSupportSmooth)
          sideScrollInterval(container, 'left', 25, 100, 20)
        else container.scrollLeft -= 100
      } else if (isNotSupportSmooth)
        sideScrollInterval(container, 'right', 25, 100, 25)
      else container.scrollLeft += 100
    }
  }
}

export const handleNavScroll = e => {
  const icons = document.getElementsByClassName('header__icon-back')
  if (e.target.scrollLeft === 0) {
    icons[0].classList.add('disabled')
  } else {
    icons[0].classList.remove('disabled')
  }

  if (e.target.scrollWidth - e.target.offsetWidth <= e.target.scrollLeft) {
    icons[1].classList.add('disabled')
  } else {
    icons[1].classList.remove('disabled')
  }
}

export const checkDisabledIcons = () => {
  const icons = document.getElementsByClassName('header__icon-back')
  const container = document.getElementsByClassName('header__featured')[0]
  if (container && icons) {
    if (container.scrollWidth > container.clientWidth) {
      icons[1].classList.remove('disabled')
    }
  }
}

// funciones copiadas desde helpers con el fin de que el feature que no usa static true no traigan todas las funciones helpers

export const getResponsiveClasses = ({
  showInDesktop = true,
  showInTablet = true,
  showInMobile = true,
}) => {
  const responsiveClasses = []
  if (!showInDesktop) responsiveClasses.push('non-desktop')
  if (!showInTablet) responsiveClasses.push('non-tablet')
  if (!showInMobile) responsiveClasses.push('non-mobile')
  return responsiveClasses.join(' ')
}
