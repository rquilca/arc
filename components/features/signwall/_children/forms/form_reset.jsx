import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { ModalConsumer } from '../../../subscriptions/_context/modal'
import getCodeError, {
  formatPass,
} from '../../../subscriptions/_dependencies/Errors'
import { Taggeo } from '../../../subscriptions/_dependencies/Taggeo'
import useForm from '../../../subscriptions/_hooks/useForm'
import { getOriginAPI } from '../../_dependencies/domains'
import { MsgResetPass, ResetPass } from '../icons'
import { Input } from './control_input_select'

const FormReset = ({ onClose, tokenReset, typeDialog }) => {
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorBr, mainColorBtn, primaryFont, mainColorLink },
    },
  } = useAppContext() || {}

  const isTromeReset = arcSite === 'trome' && typeDialog === 'resetpass'

  const { changeTemplate } = React.useContext(ModalConsumer)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [showBtnContinue, setShowBtnContinue] = React.useState(false)
  const [showFormatInvalidOne, setShowFormatInvalidOne] = React.useState('')
  const [showFormatInvalidTwo, setShowFormatInvalidTwo] = React.useState('')

  React.useEffect(() => {
    if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
      setShowBtnContinue(true)
    }
  }, [])

  const stateSchema = {
    rpass: { value: '', error: '' },
    rconfirmpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    rpass: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
    rconfirmpass: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  }

  const onSubmitForm = ({ rpass }) => {
    setShowLoading(true)
    window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
    window.Identity.resetPassword(tokenReset, rpass)
      .then(() => {
        setShowConfirm(true)
        Taggeo(
          `Web_Sign_Wall_${typeDialog}`,
          `web_sw${typeDialog[0]}_aceptar_success`
        )
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

  const {
    values: { rpass, rconfirmpass },
    errors: { rpass: rpassError, rconfirmpass: rconfirmpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm)

  const checkFormatOne = (e) => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalidOne('No se permite espacios')
    } else if (rconfirmpass.length > 1 && rconfirmpass !== e.target.value) {
      setShowFormatInvalidOne('Las contrase??as no coinciden.')
    } else {
      setShowFormatInvalidOne('')
    }
  }

  const checkFormatTwo = (e) => {
    if (e.target.value.indexOf(' ') >= 0) {
      setShowFormatInvalidTwo('No se permite espacios.')
    } else if (rpass.length > 1 && rpass !== e.target.value) {
      setShowFormatInvalidTwo('Las contrase??as no coinciden.')
    } else {
      setShowFormatInvalidTwo('')
    }
  }

  return (
    <form
      className={`signwall-inside_forms-form ${
        arcSite === 'trome' ? 'form-trome' : ''
      }`}
      onSubmit={handleOnSubmit}>
      {isTromeReset && (
        <>
          <div className={isTromeReset ? 'group-float-trome' : ''}>
            <br />
            <h1 className="group-float-trome__title">
              ??Hola! <br />
              ??Olvidaste tu contrase??a?
            </h1>
            <p className="group-float-trome__subtitle">
              No te preocupes, c??mbiala f??cilmente.
            </p>
          </div>
        </>
      )}

      {!showConfirm ? (
        <>
          {isTromeReset ? (
            <>
              <br />
              <div className="spacing-trome" />
            </>
          ) : (
            <>
              <div className="center block mb-20">
                <br />
                <ResetPass bgcolor={mainColorBr} />
              </div>
              <h4
                style={{ fontSize: '20px', fontFamily: primaryFont }}
                className="signwall-inside_forms-title center mb-10">
                Cambiar contrase??a
              </h4>
              <p
                style={{
                  lineHeight: '28px',
                }}
                className="signwall-inside_forms-text mt-10 mb-10 center">
                Ingresa una nueva contrase??a para tu cuenta
              </p>
            </>
          )}

          {showError && (
            <div className="signwall-inside_forms-error">{showError}</div>
          )}

          <Input
            type="password"
            autoComplete="new-password"
            name="rpass"
            placeholder="Nueva contrase??a"
            required
            value={rpass}
            onChange={(e) => {
              handleOnChange(e)
              setShowError(false)
              checkFormatOne(e)
            }}
            error={rpassError || showFormatInvalidOne}
          />

          <Input
            type="password"
            autoComplete="off"
            name="rconfirmpass"
            placeholder="Confirmar contrase??a"
            required
            value={rconfirmpass}
            onChange={(e) => {
              handleOnChange(e)
              setShowError(false)
              checkFormatTwo(e)
            }}
            error={rconfirmpassError || showFormatInvalidTwo}
          />

          <button
            style={{ color: mainColorBtn, background: mainColorLink }}
            type="submit"
            className="signwall-inside_forms-btn mt-20"
            disabled={
              disable ||
              showLoading ||
              showFormatInvalidOne ||
              showFormatInvalidTwo
            }>
            {showLoading ? 'CAMBIANDO...' : 'ACEPTAR'}
          </button>
        </>
      ) : (
        <>
          <br />
          <div className="center block mb-20">
            <MsgResetPass bgcolor={mainColorBr} />
          </div>

          <h4
            style={{ fontSize: '20px' }}
            className="signwall-inside_forms-title center mb-20 ">
            Tu contrase??a ha sido actualizada
          </h4>

          {showBtnContinue ? (
            <button
              type="button"
              className="signwall-inside_forms-btn"
              style={{ color: mainColorBtn, background: mainColorLink }}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                onClose()
              }}>
              CONTINUAR NAVEGANDO
            </button>
          ) : (
            <button
              type="button"
              className="signwall-inside_forms-btn"
              style={{ color: mainColorBtn, background: mainColorLink }}
              onClick={() => {
                Taggeo(
                  `Web_Sign_Wall_${typeDialog}`,
                  `web_sw${typeDialog[0]}_continuar_boton`
                )
                changeTemplate('login')
              }}>
              CONTINUAR
            </button>
          )}
        </>
      )}
    </form>
  )
}

export default FormReset
