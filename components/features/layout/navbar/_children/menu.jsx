import React, { PureComponent } from 'react'
import Button from '../../../../global-components/button'

const classes = {
  sidebar: `nav-sidebar w-full position-absolute overflow-hidden bottom-0 bg-gray-300`,
  content: `nav-sidebar__content flex flex-col justify-between h-full overflow-y`,
  item: 'nav-sidebar__item position-relative',
  link: 'nav-sidebar__link block pt-15 pr-15 pb-15 pl-15 text-md text-white',
  top: 'nav-sidebar__top',
  header: 'nav-sidebar__header pt-30 pr-30 pb-0 pl-30 hidden',
  btnBox: 'nav-sidebar__box-btn pb-15 border-b-1 border-solid border-gray',
  btn: `flex items-center justify-center btn bg-link text-white nav-sidebar__btn pt-10 pb-10 pr-15 pl-15`,
  search: 'nav-sidebar__search pt-15 pr-30 pb-15 pl-30 block lg:hidden',
  from: 'nav-sidebar__box-search pb-15 border-b-1 border-solid border-gray',
  input: `nav-sidebar__input w-full inline-block pt-10 pr-15 pb-10 pl-15 bg-white border-0 text-md rounded-sm line-h-sm`,
  body: 'nav-sidebar__body pt-15 pr-0 pb-15 pl-15',
  list: 'nav- sidebar__list',
  footer: `nav-sidebar__footer pt-30 pr-30 pb-30 pl-30 border-b-1 border-solid border-gray`,
  text: `nav-sidebar__text block font-thin pt-5 pr-0 pb-5 pl-0 text-md text-white`,
}

// const BASEURL = window.location.origin

class NavbarChildMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearchMovil = React.createRef()
  }

  submitSearch = () => {
    const { value } = this.inputSearchMovil.current
    if (value !== '') {
      // eslint-disable-next-line no-restricted-globals
      location.href = `/buscar?query=${value}`
    }
  }

  renderSections = sections => {
    return (
      sections &&
      sections.map(({ children, name = '', _id: id = '' }) => (
        <>
          <li className={classes.item} key={`navbar-menu-${id}`}>
            <a href={id} className={classes.link}>
              {name}
            </a>
          </li>
          {children && this.renderSections(children)}
        </>
      ))
    )
  }

  render() {
    const {
      siteProperties: { siteDomain = '', legalLinks = [] } = {},
      sections = [],
      showSidebar,
    } = this.props

    const IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )

    return (
      <div className={`${classes.sidebar} ${showSidebar ? 'active' : ''}`}>
        <div
          className={`${classes.content} ${
            IS_MOBILE ? 'w-full' : 'w-desktop'
          } ${showSidebar ? 'active' : ''}`}>
          <div className={classes.top}>
            <div className={classes.header}>
              <div className={classes.btnBox}>
                <Button
                  btnClass={classes.btn}
                  btnLink="#"
                  btnText="Suscríbete"
                />
              </div>
            </div>
            <div className={classes.search}>
              <form
                className={classes.from}
                onSubmit={e => {
                  e.preventDefault()
                  this.submitSearch()
                }}>
                <input
                  ref={this.inputSearchMovil}
                  type="search"
                  // onBlur={this.handleCloseSectionsSearch}
                  placeholder="Buscar"
                  className={classes.input}
                />
              </form>
            </div>
            <div className={classes.body}>
              <ul className={classes.list}>
                {sections && this.renderSections(sections)}
              </ul>
            </div>
          </div>
          <div className={classes.footer}>
            <a href="/" className={classes.text}>
              {siteDomain}
            </a>
            {legalLinks.map(link => (
              <a key={link.url} href={link.url} className={classes.text}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarChildMenu
