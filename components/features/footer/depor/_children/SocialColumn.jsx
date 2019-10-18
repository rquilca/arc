import React from 'react'
import ItemTop from './ComponentStyles'

const classes = {
  socialColumn: 'footer-secction__content-column  flex flex-col',
  item: 'footer-secction__item',
}

const SocialColumnSection = ({ socialNetworks }) => {
  return (
    <ul className={classes.socialColumn}>
      <li className={classes.item} style={ItemTop}>Síguenos</li>
      {socialNetworks &&
        socialNetworks.map(({ name, url }) => {
          return (
            <li>
              <a href={url}>{name}</a>
            </li>
          )
        })}
      <li className={classes.item}>
        <a href="/mapa-web" style={ItemTop}>
          Mapa del Sitio
        </a>
      </li>
    </ul>
  )
}

export default SocialColumnSection
