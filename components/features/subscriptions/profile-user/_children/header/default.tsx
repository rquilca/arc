import Identity from '@arc-publishing/sdk-identity'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import { getAssetsPath } from '../../../../../utilities/assets'
import { Back, Close } from '../../../../signwall/_children/icons'
import { Taggeo } from '../../../_dependencies/Taggeo'

const classes = {
  wrapper: 'profile-header__wrapper',
  content: 'profile-header__content',
  back: 'profile-header__back-default',
  logo: 'profile-header__logo-default',
  close: 'profile-header__close-default',
}

interface HeaderSignwallProps {
  buttonClose?: boolean
  onClose?: () => void
  typeDialog?: 'hard' | 'organico'
}

const HeaderSignwall = ({
  buttonClose = false,
  onClose = () => {},
  typeDialog,
}: HeaderSignwallProps): JSX.Element => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorTxt, mainLogo },
    },
    contextPath,
  } = useFusionContext() || {}

  return (
    <div
      className=""
      style={{
        background: '#ffffff',
        color: mainColorTxt,
        height: 'auto',
        minHeight: '100px',
      }}>
      <div className={classes.content}>
        {buttonClose ? (
          <div className={classes.back}> </div>
        ) : (
          <button
            className={classes.back}
            style={{ color: mainColorTxt }}
            type="button"
            onClick={() => {
              window.location.href = document.referrer ? document.referrer : '/'
            }}>
            <Back color={mainColorTxt} />
            <span className="text">Volver</span>
          </button>
        )}

        <div className={classes.logo}>
          <div className={`def def_${arcSite}`}>
            <img
              alt={`Logo ${arcSite}`}
              src={`${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/${mainLogo}?d=1`}
            />
          </div>
        </div>

        {buttonClose && (
          <button
            className={classes.close}
            type="button"
            onClick={() => {
              Taggeo(
                `Web_Sign_Wall_${typeDialog}`,
                `web_sw${typeDialog?.[0]}_boton_cerrar`
              )

              if (typeDialog === 'hard') {
                window.location.href = '/?ref=signwall'
              } else if (onClose) {
                onClose()
              }

              if (
                /newsletters/.test(window.location.pathname) &&
                Identity.userProfile &&
                typeDialog === 'organico'
              ) {
                setTimeout(() => {
                  window.location.reload()
                }, 800)
              }
            }}>
            <Close />
          </button>
        )}
      </div>
    </div>
  )
}

export default HeaderSignwall
