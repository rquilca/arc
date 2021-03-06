import React from 'react'
import PropTypes from 'prop-types'

import getResponsiveClasses from '../../../../utilities/responsive-classes'

const HeaderChildRecipe = props => {
  const { logo, sections, deviceList, tags, isSlider } = props
  const { showInMobile = true } = deviceList || {}

  const sliderScript = `"use strict";requestIdle(function(){if(${!showInMobile}){if(/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent))return!1};var e=document.getElementsByClassName("header__button"),t=document.getElementsByClassName("header__featured")[0],s=function(e,t,s,i,l){var n=0,d=e,o=setInterval(function(){"left"===t?d.scrollLeft-=l:d.scrollLeft+=l,(n+=l)>=i&&window.clearInterval(o)},s)},i=function(e){if(window){var i=void 0===document.body.style["scroll-behavior"];t&&("left"===e?i?s(t,"left",25,100,20):t.scrollLeft-=100:i?s(t,"right",25,100,25):t.scrollLeft+=100)}};window&&t&&e&&t.scrollWidth>t.clientWidth&&e[1].classList.remove("disabled"),e[0].addEventListener("click",function(){i("left")}),e[1].addEventListener("click",function(){i("right")}),t.addEventListener("scroll",function(t){!function(t){window&&(0===t.target.scrollLeft?e[0].classList.add("disabled"):e[0].classList.remove("disabled"),t.target.scrollWidth-t.target.offsetWidth<=t.target.scrollLeft?e[1].classList.add("disabled"):e[1].classList.remove("disabled"))}(t)})});`

  return (
    <>
      <header className="header bg-primary primary-font w-full font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex position-relative">
        <a itemProp="url" href={logo.link} title={logo.alt}>
          <img
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            className="header__logo"
          />
        </a>
      </header>
      <nav
        className={`${deviceList.showInDesktop &&
          'nav__wrapper justify-between header__wrapper--dashed bg-gray-100 flex'} ${getResponsiveClasses(
          deviceList
        )}`}>
        {tags !== '' && (
          <div className="header__tags header-recetas__tags justify-center mr-10 hidden md:flex">
            {tags}
          </div>
        )}
        {isSlider && (
          <button
            aria-label="Deslizar temas del d??a a la izquierda"
            type="button"
            className="header__button header-recetas__button left position-relative">
            <i
              className="header__icon-back left icon-back text-white rounded font-bold p-5"
              aria-hidden="true"></i>
          </button>
        )}
        {sections[0] && (
          <ul
            className={`header__featured flex w-full font-normal overflow-hidden pr-20${
              isSlider ? ' slider' : ''
            }`}>
            {sections.map(({ url, name, styles = [] }) => (
              <li
                className={`header__item flex items-center justify-center h-inherit${
                  styles ? ' header__custom-item' : ''
                }`}
                key={url}>
                <a
                  itemProp="url"
                  className="header__link uppercase text-sm p-10"
                  href={url}
                  {...(styles && {
                    style: {
                      backgroundColor: styles[0],
                      color: styles[1] || '#fff',
                    },
                  })}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {isSlider && (
          <button
            aria-label="Deslizar temas del d??a a la derecha"
            type="button"
            className="header__button header-recetas__button right position-relative">
            <i
              className="header__icon-back right icon-back text-white rounded font-bold p-5"
              aria-hidden="true"></i>
          </button>
        )}
      </nav>
      {isSlider && (
        <script dangerouslySetInnerHTML={{ __html: sliderScript }}></script>
      )}
    </>
  )
}

HeaderChildRecipe.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default HeaderChildRecipe
