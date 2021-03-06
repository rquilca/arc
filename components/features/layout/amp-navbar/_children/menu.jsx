/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  sidebar: 'amp-nav-sidebar w-full',
  item:
    'amp-nav-sidebar__item position-relative uppercase border-b-1 border-solid border-gray',
  containerSubMenu: 'amp-nav-sidebar__container-submenu w-full overflow-hidden',
  menuArrow: 'amp-nav-sidebar__menu-arrow hidden',
  labelParentItem:
    'amp-nav-sidebar__parent-item pl-25 pt-10 pr-20 pb-10 position-absolute right-0',
  listItem: 'amp-nav-sidebar__list-item h-full title-sm line-h-xs pl-10 pr-10',
  link:
    'amp-nav-sidebar__link block pt-15 pb-15 pl-15 text-md secondary-font font-bold',
  body: 'amp-nav-sidebar__body pt-15 pb-15 pr-0 pl-15',
  list: 'amp-nav-sidebar__list bg-gray-100',
  footer: 'amp-nav-sidebar__footer p-30 border-t-1 border-solid border-gray',
  social:
    'amp-nav-sidebar__sidebar-social bg-gray-100 flex items-center justify-center pl-20',
  close: 'amp-nav-sidebar__close position-absolute',
  mvil0: 'ad-amp-movil',
}

class NavbarChildMenu extends PureComponent {
  renderSections = (sections, deep, nameId = 'root') => {
    const aux = deep
    return (
      sections &&
      sections.map(
        ({
          children,
          name = '',
          _id: id = '',
          display_name: displayName = '',
          url = '',
          styles = [],
        }) => {
          const idElem = `${nameId}-${name || displayName}`.toLowerCase()
          const styleCustom = {}
          if (styles.length > 0) {
            const [backgroundCustom, letterColorCustom] = styles
            styleCustom.backgroundColor = backgroundCustom
            styleCustom.color = letterColorCustom
          }
          return (
            <li
              className={classes.item}
              style={styleCustom}
              key={`navbar-menu-${url || id}`}>
              <a
                itemProp="url"
                href={`${url || id || '/'}?ref=menu-amp`}
                {...(styles.length > 0 && {
                  style: {
                    color: styles[1] || '#ffffff',
                  },
                })}
                className={`${classes.link}${
                  deep > 0 ? ` pl-${15 + deep * 15}` : ''
                }`}>
                {name || displayName}
              </a>
              {children && children.length > 0 && (
                <>
                  <input
                    className={classes.menuArrow}
                    type="checkbox"
                    id={idElem}
                    name="checkbox-submenu"
                  />
                  <label htmlFor={idElem} className={classes.labelParentItem} />
                  <ul
                    className={`${classes.containerSubMenu} deep-${deep} ${idElem}`}>
                    {this.renderSections(children, aux + 1, idElem)}
                  </ul>
                </>
              )}
            </li>
          )
        }
      )
    )
  }

  render() {
    const {
      contextPath,
      arcSite,
      data: { children: sections = [] } = {},
      socialNetworks = [],
    } = this.props

    const icon = {
      facebook:
        'M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z',
      twitter:
        'M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z',
    }
    // const adsId = arcSite !== 'diariocorreo' ? arcSite : 'correo'
    // const dataSlot = `/28253241/${
    //   arcSite !== 'elcomercio' && arcSite !== 'elcomerciomag' ? adsId : 'eco'
    // }-amp-320x50-inferior2-movil0`

    const logoAmp = `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/amp/icon-cross.png?d=1`

    return (
      <>
        <amp-sidebar
          class={classes.sidebar}
          id="sidebar"
          layout="nodisplay"
          side="left">
          <amp-img
            src={logoAmp}
            width="25"
            height="25"
            tabIndex="0"
            on="tap:sidebar.close"
            role="button"
            class={classes.close}
          />

          <ul className={classes.list}>
            {sections.length > 0 && this.renderSections(sections, 0)}
          </ul>

          <ul className={classes.social}>
            {socialNetworks.length > 0 &&
              socialNetworks.map(el => (
                <li className={classes.listItem} key={el.url}>
                  <a
                    itemProp="url"
                    className={classes.listLink}
                    href={`${el.url}?ref=menu-amp`}
                    aria-label={el.name}>
                    <svg width="32" height="32" viewBox="-2 -2 32 32">
                      <path d={icon[el.name]} />
                    </svg>
                  </a>
                </li>
              ))}
          </ul>
        </amp-sidebar>
      </>
    )
  }
}

export default NavbarChildMenu
