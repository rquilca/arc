/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
import React from 'react'

const classes = {
  listItemText:
    'stories-video__content pt-20 pl-10 lg:pl-20 pr-20 pb-10 w-full position-relative',
  listBorder: 'stories-video__item-border border-b-1 border-solid pb-10',
  listItemTitleDest: 'stories-video__item-dest-title text-white',
  closeSticky:
    'stories-video__close text-white hidden position-absolute right-0 top-0 rounded items-center justify-center font-bold',
}

const removeSticky = () => {
  const itemDest = document.querySelector('.stories-video__item-dest')
  itemDest.classList.remove('sticky')
}

const addSticky = () => {
  const itemDest = document.querySelector('.stories-video__item-dest')
  itemDest.classList.add('sticky')
}

const handleCloseStickyClick = powaPlayer => {
  if (powaPlayer !== null) {
    removeSticky()
    powaPlayer.pause()
  }
}

const handleScrolVideList = () => {
  const playOf = document.querySelector('.stories-video__wrapper')
  const scrollHeight = window.scrollY

  const offsetButton = scrollHeight >= playOf.offsetTop + playOf.offsetHeight
  const offSetTop = scrollHeight + window.innerHeight < playOf.offsetTop

  if (offsetButton || offSetTop) {
    // si esta fuera de foco por (abajo y arriba)
    addSticky()
  } else {
    // en pantalla
    removeSticky()
  }
}

const ItemVideoCenterDestacado = ({
  isAdmin,
  title,
  video: { payload },
  autoPlayVideo,
}) => {
  let powaPlayer = null
  window.addEventListener('powaRender', event => {
    const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
      window.navigator.userAgent
    )
    const {
      detail: { powa },
    } = event

    powaPlayer = powa
    powa.on(window.PoWa.EVENTS.PLAY, () => {
      window.addEventListener('scroll', handleScrolVideList)
    })

    powa.on(window.PoWa.EVENTS.PAUSE, () => {
      window.removeEventListener('scroll', handleScrolVideList)
    })

    powa.on(window.PoWa.EVENTS.END, () => {
      removeSticky()
      window.removeEventListener('scroll', handleScrolVideList)
    })

    if (
      !isMobile &&
      !isAdmin &&
      autoPlayVideo &&
      powa &&
      powa.play &&
      !powa.isPlay
    ) {
      powa.play()
      powa.isPlay = true
    }
  })

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: payload }} />
      <div className={classes.listItemText}>
        <div className={classes.listBorder}>
          <h2 className={classes.listItemTitleDest}>{title}</h2>
        </div>
        <span
          className={classes.closeSticky}
          onClick={() => handleCloseStickyClick(powaPlayer)}>
          X
        </span>
      </div>
    </>
  )
}

export default ItemVideoCenterDestacado
