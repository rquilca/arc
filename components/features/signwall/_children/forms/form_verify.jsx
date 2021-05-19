/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react'

import getCodeError from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import Domains from '../../_dependencies/domains'
import { ModalConsumer } from '../context'
import { MsgResetPass } from '../iconos'
import Loading from '../loading'
import * as S from './styles'

export const FormVerify = ({
  arcSite,
  siteProperties: {
    signwall: { mainColorBr, mainColorBtn, primaryFont },
    activePaywall,
  },
  onClose,
  tokenVerify,
  typeDialog,
}) => {
  const [showLoading, setShowLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showBtnContinue, setShowBtnContinue] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
        setShowBtnContinue(true)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Identity.options({ apiOrigin: Domains.getOriginAPI(arcSite) })
      window.Identity.verifyEmail(tokenVerify)
        .then(() => {
          setShowConfirm(true)
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_sucess`
          )
          if (
            window.Identity.userProfile ||
            window.Identity.userIdentity.uuid
          ) {
            window.Identity.getUserProfile()
          }
        })
        .catch((errLogin) => {
          setShowError(getCodeError(errLogin.code))
          Taggeo(
            `Web_Sign_Wall_${typeDialog}`,
            `web_sw${typeDialog[0]}_aceptar_error`
          )
        })
        .finally(() => {
          setShowLoading(false)
        })
    }
  }, [])

  return (
    <ModalConsumer>
      {(value) => (
        <>
          <S.Form>
            {showLoading ? (
              <Loading arcSite={arcSite} typeBg="wait" />
            ) : (
              <>
                <div className="center block mb-20">
                  <MsgResetPass bgcolor={mainColorBr} />
                </div>

                <S.Title
                  s="20"
                  primaryFont={primaryFont}
                  className="center mb-10">
                  {showConfirm
                    ? '¡Bienvenido(a) Usuario!'
                    : '¡Bienvenido(a) Nuevamente!'}
                </S.Title>

                {showError && <S.Error>{showError}</S.Error>}

                <S.Text c="gray" s="14" lh="28" className="mt-10 mb-20 center">
                  {showConfirm
                    ? 'Tu correo electrónico ha sido validado'
                    : 'Tu correo electrónico podría ya estar validado'}
                  <br />

                  {!activePaywall && 'disfruta nuestro contenido sin límites'}
                </S.Text>

                {showBtnContinue ? (
                  <S.Button
                    type="button"
                    color={mainColorBtn}
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_continuar_boton`
                      )
                      onClose()
                    }}>
                    CONTINUAR NAVEGANDO
                  </S.Button>
                ) : (
                  <S.Button
                    type="button"
                    color={mainColorBtn}
                    onClick={() => {
                      Taggeo(
                        `Web_Sign_Wall_${typeDialog}`,
                        `web_sw${typeDialog[0]}_continuar_boton`
                      )
                      value.changeTemplate('login')
                    }}>
                    CONTINUAR
                  </S.Button>
                )}
              </>
            )}
          </S.Form>
        </>
      )}
    </ModalConsumer>
  )
}
