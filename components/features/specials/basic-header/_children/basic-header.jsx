import React from 'react'
import { socialMediaUrlShareList } from '../../../../utilities/social-media'

const classes = {
  header:
    'special-basic-header bg-black position-relative text-center full-width pb-5 pt-5 pl-0 pr-0',
  headerContainer:
    'special-basic-header__container flex justify-between text-left mx-auto',
  logo: 'special-basic-header__logo mt-10 mb-10 ml-10 mr-10',
  sharerButton: 'special-basic-header__button sharer',
  socialList: 'flex justify-between pr-10',
  linkSocial:
    'story-header__link   flex items-center pl-10 pr-10 text-white justify-center',
}

const HeaderChildSpecialBasic = props => {
  const {
    siteDomain = '',
    logo: { src: srcLogo = '', alt: altImage = '' },
    siteUrl = '',
    requestUri = '',
    postTitle = '',
    siteNameRedSocial = '',
  } = props

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    requestUri.split('?')[0],
    postTitle,
    siteNameRedSocial
  )

  const htmlScript = `
  "use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".story-header__link");e.forEach(function(e){e.addEventListener("click",function(e){var o,n,t,r,c,a;e.preventDefault(),console.log(e.target.parentNode.href),o=e.target.parentNode.href,n="",t=600,r=400,c=window.screen.width/2-t/2,a=window.screen.height/2-r/2,window.open(o,n,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(t,", height=").concat(r,", top=").concat(a,", left=").concat(c))})})});
  `

  /* document.addEventListener('DOMContentLoaded', () => {
    const socialBtn = document.querySelectorAll('.story-header__link')
    const popUpWindow = (url, title, w, h) => {
      const left = window.screen.width / 2 - w / 2
      const top = window.screen.height / 2 - h / 2
      return window.open(
        url,
        title,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
      )
    }
    socialBtn.forEach(btn => {
      btn.addEventListener('click', e => { 
        e.preventDefault(); 
        console.log(e.target.parentNode.href)
        popUpWindow(e.target.parentNode.href, '', 600, 400)
      })
    })
  }) */

  const shareButtons = [
    {
      name: 'facebook',
      icon: 'icon-facebook',
      link: urlsShareList.facebook,
      mobileClass: 'flex justify-center',
    },
    {
      name: 'twitter',
      icon: 'icon-twitter',
      link: urlsShareList.twitter,
      mobileClass: 'flex justify-center',
    },
    {
      name: 'whatsapp',
      icon: 'icon-whatsapp',
      link: urlsShareList.whatsapp,
      mobileClass: 'block md:hidden flex justify-center',
    },
  ]

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <a
          className={classes.social}
          href={`http://${siteDomain}/`}
          target="blank">
          <img src={srcLogo} alt={altImage} className={classes.logo} />
        </a>
        <ul className={classes.socialList}>
          {shareButtons.map((item, i) => (
            <li key={item.icon} className={`${item.mobileClass}`}>
              <a
                title={`Compartir en ${item.name}`}
                className={classes.linkSocial}
                href={item.link}>
                <i className={`${item.icon}`} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: htmlScript,
          }}
        />
      </div>
    </header>
  )
}

export default HeaderChildSpecialBasic
