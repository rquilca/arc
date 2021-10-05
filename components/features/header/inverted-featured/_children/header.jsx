/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import Button from '../../../../global-components/button'
import Menu from '../../../../global-components/menu'
import searchQuery from '../../../../utilities/client/search'

import ShareButtons from '../../../../global-components/lite/share'

import {
  toggleMenu,
  searchScript,
  btnSearch,
  searchScriptMobile,
  btnSearchMobile,
  singwallScript
} from '../_dependencies/scripts'

const classes = {
  menuFull: 'header-inverted-featured__menu-full',
  menuList: 'header-inverted-featured__menu-full__list',
  menuItem: 'header-inverted-featured__menu-full__list__item',
  menuItemLink: 'header-inverted-featured__menu-full__list__link',
  header: `header-inverted-featured header`,
  headerContainer: `header-inverted-featured__container`,
  wrapper: `header-inverted-featured__wrapper wrapper`,
  logoContainer: 'header-inverted-featured__logo-container',
  logo: 'header-inverted-featured__logo',
  featured: 'header-inverted-featured__features',
  item: 'header-inverted-featured__item header__item',
  link: 'header-inverted-featured__features-link',
  linkInverted: 'header-inverted-featured__features-link__inverted',
  bandWrapper: 'header-inverted-featured__band-wrapper',
  band: 'header-inverted-featured__band',
  bandInverted: 'header-inverted-featured__band__inverted',
  tags: 'header-inverted-featured__tags',
  tagsTema: 'header-inverted-featured__menu-full__Tags',
  navBtnContainer: `header-inverted-featured__nav-btn-container`,
  leftBtnContainer: `header-inverted-featured__left-btn-container`,
  rightBtnContainer: `header-inverted-featured__right-btn-container`,
  form: 'header-inverted-featured__form',
  search: `header-inverted-featured__search`,
  searchLabel: 'header-inverted-featured__search-label',
  btnSearch: `header-inverted-featured__btn-search`,
  iconSearch: 'header-inverted-featured__icon-search icon-search',
  btnMenu: 'header-inverted-featured__btn-menu ',
  iconMenu: 'header-inverted-featured__icon-menu icon-hamburguer',
  navStoryTitle: 'header-inverted-featured__nav-story-title',
  navLoader: 'nav__loader-bar position-absolute h-full left-0 bg-link',
  listIcon: 'header-inverted-featured__list-icon story-header__list',
  btnRegistrate: 'header-inverted-featured__btn-registrate',
  callImg: 'header-inverted-featured__call-img',
  callLink: 'header-inverted-featured__call-link',
}

const popUpWindow = (url, title, w, h) => {
  const left = window.screen.width / 2 - w / 2
  const top = window.screen.height / 2 - h / 2
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  )
}

// TODO: Agregar el click afuera del menu
const HeaderChildInverted = ({
  logo,
  logoImg,
  bandLinks,
  bandLinksTema,
  menuSections,
  tags,
  tagsTema,
  hideTema,
  date,
  search,
  isStory,
  winningCallLogo,
  hideMenu,
  invertedTema
}) => {
  const [scrolled, setScrolled] = React.useState(false)
  const [statusSidebar, setStatusSidebar] = React.useState(false)
  const [statusSearch, setStatusSearch] = React.useState(false)

  const {
    contextPath,
    siteProperties,
    // arcSite,
    // requestUri,
  } = useFusionContext()

  const inputSearch = React.useRef()

  /* let dragFlag = false
  let initPointDrag = 0
  let distDrag = 0 */

  // let listContainer = null
  // let layerBackground = null

  /** ------ SEARCH ----- */
  const _handleSearch = () => {
    const { value } = inputSearch.current
    searchQuery(value)
  }

  const _handleKeyDown = (e) => {
    e.preventDefault()
    const { value } = e.target
    if (value !== '' && e.which === 13) {
      _handleSearch()
    }
  }

  // Open search and automatic focus input
  const focusInputSearch = () => {
    inputSearch.current.focus()
  }

  // Add - Remove Class active input and button search
  const activeSearch = () => {
    return statusSearch ? 'active' : ''
  }

  // If input search is empty, buton close search else buton find search
  const optionButtonClick = () => {
    if (statusSearch) _handleSearch()
    else focusInputSearch()
    setStatusSearch(!statusSearch)
  }

  /** ------ // SEARCH ----- */

  /** ------ SIDEBAR ----- */

  const toggleBodyOverflow = () => {
    if (typeof window !== 'undefined') {
      if (document.body.classList.contains('overflow-hidden'))
        document.body.classList.remove('overflow-hidden')
      else if (window.innerWidth < 640)
        document.body.classList.add('overflow-hidden')
    }
  }

  const _setPosition = (posX) => {
    document.body.querySelector(
      '.nav-sidebar'
    ).style.transform = `scaleX(${posX})`
  }

  const _openMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) _setPosition(1)
    document.body.querySelector('.layer').style.display = 'block'
    setStatusSidebar(true)
  }

  const _closeMenu = () => {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    if (!isIOS) _setPosition(0)
    document.body.querySelector('.layer').style.display = 'none'
    setStatusSidebar(false)
  }

  const _handleToggleSectionElements = () => {
    toggleBodyOverflow()
    if (statusSidebar) _closeMenu()
    else _openMenu()
  }

  /** ------ // SIDEBAR ----- */

  const moreList = () => {
    const el = document.body.querySelector('.story-header__list')
    if (el.classList.contains('block')) {
      el.classList.remove('block')
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
      el.classList.add('block')
    }
  }

  const openLink = (event, item) => {
    event.preventDefault()
    if (item === 3) moreList()
    else popUpWindow(item.link, '', 600, 400)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const _handleScroll = () => {
    // ------ Logic to set state to hidden or show logo in navbar
    const { body = {}, documentElement = {} } = document
    const { scrollTop: scrollBody = 0 } = body
    const { scrollTop: scrollElement = 0 } = documentElement
    const scroll = scrollBody || scrollElement

    const headerTop = 10
    if (!scrolled && scroll > headerTop) setScrolled(true)
    else if (scrolled && scroll <= headerTop) setScrolled(false)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', _handleScroll)

    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [_handleScroll])

  const Header = () => (
    <nav className={classes.bandInverted}>
      <div className={classes.menuFull}>
        {tagsTema && <div className={`${(invertedTema) ? classes.tags : classes.tagsTema}`}>{tagsTema}</div>}

        {bandLinksTema && bandLinksTema[0] && (
          <ul className={`${classes.menuList}`}>
            {bandLinksTema.map(({ url, name, styles = [] }) => (
              <li
                className={`${classes.menuItem}${styles ? ' header__custom-item' : ''
                  }`}
                key={`band-${url}`}>
                <a
                  itemProp="url"
                  className={`${classes.menuItemLink}`}
                  href={url}
                  {...(styles && {
                    style: {
                      backgroundColor: styles[0],
                      color: styles[1] || '#ffffff',
                    },
                  })}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )

  return (
    <>
      {(!invertedTema && !hideTema) && <Header />}

      {/* <header className={`${classes.header} ${scrolled ? 'active' : ''}`}> */}
      <header className={classes.header}>

        <div className={classes.navLoader} />
        <div className={classes.wrapper}>
          {/** ************* LEFT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.leftBtnContainer}`}>
            <button
              type="button"
              className={classes.btnMenu}
              onClick={_handleToggleSectionElements}
              id="btn-menu"
              tabIndex="0">
              {/* <i className={classes.iconMenu} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bars"
                className={classes.iconMenu}
                role="img"
                viewBox="0 0 448 512">
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times"
                className="svg-inline-close hidden"
                role="img"
                viewBox="0 0 352 512">
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                />
              </svg>
              <span aria-hidden="true">Menú</span>
            </button>
            <form
              id='header-search-form'
              className={classes.form}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id="header-search-input"
                ref={inputSearch}
                type="search"
                defaultValue={search}
                /* onBlur={this._handleCloseSectionsSearch} */
                onKeyUp={_handleKeyDown}
                placeholder="¿Qué Buscas?"
                className={`${classes.search} ${activeSearch()}`}
              />
              <label
                htmlFor="header-search-input"
                className={classes.searchLabel}>
                Cuadro de búsqueda
              </label>
              <svg
                id="header-search-button"
                className={`${classes.btnSearch} ${activeSearch()}`}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                role="img"
                viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                />
              </svg>
              {/* <Button
                idButton="header-search-button"
                iconClass={classes.iconSearch}
                btnClass={`${classes.btnSearch} ${activeSearch()}`}
                onClick={optionButtonClick}
              /> */}
            </form>
          </div>
          {/** ************* // LEFT *************** */}
          <a
            itemProp="url"
            href="/"
            // className={`${classes.logoContainer}  ${scrolled ? 'active' : ''}`}
            className={classes.logoContainer}
            title={logo.alt}>
            <img
              // src={
              //   scrolled && auxLogo.src !== logo.src ? auxLogo.src : logo.src
              // }
              src={logoImg}
              alt={logo.alt}
              title={logo.alt}
              className={classes.logo}
            />
          </a>
          <div className={classes.navStoryTitle} />
          {/** ************* RIGHT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.rightBtnContainer}`}>
            {isStory && scrolled && (
              <div className="flex header-inverted-featured__socials">
                <ShareButtons activeGoogleNews googleNewsText={false} />
              </div>
            )}
          </div>
          {/** ************* // RIGHT *************** */}
        </div>
        <Menu
          sections={menuSections}
          showSidebar={true}
          contextPath={contextPath}
          siteProperties={siteProperties}
          winningCallLogo={winningCallLogo}
          searchScriptMobile={searchScriptMobile}
          btnSearchMobile={btnSearchMobile}
        />
        <div className={classes.callImg}>
          <Button
            idButton="signwall-nav-btn"
            btnClass={classes.btnRegistrate}
            btnText="REGÍSTRATE"
          />
          <a
            itemProp="url"
            href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
            title="Llamada Ganadora"
            className={classes.callLink}
          >
            <img src={winningCallLogo} alt="Llamada Ganadora" />
          </a>
        </div>
        <div className="layer" />
      </header>
      {!hideMenu && (
        <nav className={`${classes.band} ${(!hideTema) && classes.bandInverted}`}>

          {/* <button
            type="button"
            className={classes.btnMenu}
            onClick={_handleToggleSectionElements}
            id="btn-menu"
            tabIndex="0">
            <i className={classes.iconMenu} />
            <span aria-hidden="true">Menú</span>
          </button> */}

          <div className={classes.bandWrapper}>
            {(tags && hideTema) && <div className={classes.tags}>{tags}</div>}

            {bandLinks && bandLinks[0] && (
              <ul className={`${classes.featured}`}>
                {bandLinks.map(({ url, name, styles = [] }) => (
                  <li
                    className={`${classes.item}${styles ? ' header__custom-item' : ''
                      }`}
                    key={`band-${url}`}>
                    <a
                      itemProp="url"
                      className={`${classes.link} ${(!hideTema) && classes.linkInverted}`}
                      href={url}
                      {...(styles && {
                        style: {
                          backgroundColor: styles[0],
                          color: styles[1] || '#ffffff',
                        },
                      })}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {date.active && (
              <time className={classes.date} dateTime={date.raw}>
                {date.value}
              </time>
            )}
          </div>
        </nav>
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: toggleMenu
        }}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: btnSearch
        }}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: hideMenu ? '' : searchScript
        }}
      >
      </script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: singwallScript
        }}
      />
      {(invertedTema && !hideTema) && <Header />}
    </>
  )
}

HeaderChildInverted.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  bandLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default React.memo(HeaderChildInverted)
