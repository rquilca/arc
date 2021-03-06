import PropTypes from 'prop-types'
import * as React from 'react'

import { AuthURL } from '../../signwall/_children/forms/control_social'
import {
  dataTreatment,
  PolicyPrivacy,
} from '../../signwall/_dependencies/domains'
import { AuthContext } from '../_context/auth'
import { NavigateConsumer } from '../_context/navigate'
import getCodeError, { formatEmail, formatPass } from '../_dependencies/Errors'
import { PropertiesCommon } from '../_dependencies/Properties'
import { deleteQuery } from '../_dependencies/QueryString'
import { Taggeo } from '../_dependencies/Taggeo'
import { isFbBrowser } from '../_dependencies/Utils'
import useForm from '../_hooks/useForm'
import ButtonSocial from './social'

const styles = {
  title: 'step__left-title',
  blockMiddle: 'step__left-block-middle',
  titleLine: 'step__left-title-line',
  titleForgot: 'step__left-forgot-pass',
  block: 'step__left-block',
  blockFull: 'step__left-block-full',
  btnShow: 'step__left-btn-show',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  titleRegister: 'step__left-link-register',
  noteEnd: 'step__notes-footer text-center',
}

const Login = ({
  contTempl,
  arcSite,
  handleCallToAction,
  isFia,
  typeDialog,
}) => {
  const { changeTemplate } = React.useContext(NavigateConsumer)
  const { activateAuth, updateStep } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState()
  const [msgError, setMsgError] = React.useState()
  const [showVerify, setShowVerify] = React.useState()
  const [showHidePass, setShowHidePass] = React.useState('password')
  const [showSendEmail, setShowSendEmail] = React.useState(false)
  const [checkedPolits, setCheckedPolits] = React.useState(true)
  const { texts } = PropertiesCommon

  const stateSchema = {
    lemail: { value: contTempl || '', error: '' },
    lpass: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    lemail: {
      required: true,
      validator: formatEmail(),
    },
    lpass: {
      required: true,
      validator: formatPass(),
      nospaces: true,
    },
  }

  const nameTagCategory = `Web_Sign_Wall_${typeDialog}`

  const onFormSignIn = ({ lemail, lpass }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      Taggeo(nameTagCategory, `web_sw${typeDialog[0]}_login_boton_ingresar`)
      window.Identity.login(lemail, lpass, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          window.Identity.getUserProfile().then((resProfile) => {
            if (
              !resProfile.emailVerified &&
              resProfile.displayName === resProfile.email
            ) {
              // bloquea hasta verificar email
              setLoading(false)
              setMsgError(getCodeError('130051'))
              setShowVerify(true)
              Taggeo(
                nameTagCategory,
                `web_sw${typeDialog[0]}_login_show_reenviar_correo`
              )
              window.localStorage.removeItem('ArcId.USER_INFO')
              window.localStorage.removeItem('ArcId.USER_PROFILE')
              window.Identity.userProfile = null
              window.Identity.userIdentity = {}
            } else {
              activateAuth(resProfile)
              updateStep(2)
              if (isFia) {
                handleCallToAction(true)
              }
              Taggeo(
                nameTagCategory,
                `web_sw${typeDialog[0]}_login_success_ingresar`
              )
            }
          })
        })
        .catch((err) => {
          setMsgError(getCodeError(err.code))
          setShowVerify(err.code === '130051')
          setLoading(false)
          if (err.code === '130051') {
            Taggeo(
              nameTagCategory,
              `web_sw${typeDialog[0]}_login_show_reenviar_correo`
            )
          } else {
            Taggeo(
              nameTagCategory,
              `web_sw${typeDialog[0]}_login_error_ingresar`
            )
          }
        })
    }
  }

  const {
    values: { lemail, lpass },
    errors: { lemail: lemailError, lpass: lpassError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFormSignIn)

  const handleChangeInput = (e) => {
    handleOnChange(e)
    setMsgError(false)
  }

  const toogleHidePass = () => {
    if (showHidePass === 'password') setShowHidePass('text')
    else setShowHidePass('password')
  }

  const sendVerifyEmail = () => {
    setShowSendEmail(true)
    window.Identity.requestVerifyEmail(lemail)
    Taggeo(nameTagCategory, `web_sw${typeDialog[0]}_login_reenviar_correo`)
    let timeleft = 9
    const downloadTimer = setInterval(() => {
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
        setShowSendEmail(false)
      } else {
        const divCount = document.getElementById('countdown')
        if (divCount) divCount.innerHTML = ` ${timeleft} `
      }
      timeleft -= 1
    }, 1000)
  }

  const triggerShowVerify = () => {
    setMsgError(getCodeError('verifySocial'))
    setShowVerify(false)
  }

  const onLoggedFia = (profile) => {
    activateAuth(profile)
    if (isFbBrowser) {
      deleteQuery('signFia')
      deleteQuery('signLanding')
      deleteQuery('dataTreatment')
      setTimeout(() => {
        updateStep(2)
        window.location.reload()
      }, 1000)
    }
    if (isFia) {
      handleCallToAction(true)
    }
  }

  return (
    <>
      <h2 className={styles.title}>{texts.login}</h2>
      <div
        className={`${styles.blockMiddle} ${
          isFbBrowser ? styles.blockFull : ''
        }`}>
        <ButtonSocial
          arcSocial="facebook"
          arcSite={arcSite}
          arcType="login"
          showMsgVerify={() => triggerShowVerify()}
          dataTreatment={checkedPolits ? '1' : '0'}
          typeDialog={typeDialog}
        />
        {!isFbBrowser && (
          <ButtonSocial
            arcSocial="google"
            arcSite={arcSite}
            arcType="login"
            showMsgVerify={() => triggerShowVerify()}
            dataTreatment={checkedPolits ? '1' : '0'}
            typeDialog={typeDialog}
          />
        )}

        {isFbBrowser && (
          <AuthURL
            arcSite={arcSite}
            onClose={() => {}}
            typeDialog={typeDialog}
            activeNewsletter
            typeForm="login"
            onLogged={onLoggedFia}
            checkUserSubs={() => {}}
          />
        )}
      </div>
      <div className={styles.titleLine}>
        <p>{texts.orEnterDatesLog}</p>
      </div>
      {msgError && (
        <div className={styles.block}>
          <div className={showVerify ? ' msg-warning' : 'msg-alert'}>
            {` ${msgError} `}
            {showVerify && (
              <>
                <br />
                {!showSendEmail ? (
                  <button
                    className="step__btn-link"
                    type="button"
                    onClick={sendVerifyEmail}>
                    {texts.reSendEmail}
                  </button>
                ) : (
                  <span>
                    {texts.youCanSendEmail}
                    <strong id="countdown"> 10 </strong> segundos
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <form onSubmit={handleOnSubmit} className="form-login">
        <div className={styles.block}>
          <label htmlFor="lemail">
            Correo electr??nico
            <input
              className={lemailError && 'input-error'}
              type="email"
              inputMode="email"
              autoComplete="email"
              name="lemail"
              value={lemail}
              required
              onChange={handleChangeInput}
              onBlur={handleOnChange}
              maxLength="80"
              disabled={loading}
            />
            {lemailError && <span className="msn-error">{lemailError}</span>}
          </label>
        </div>

        <div className={styles.block}>
          <label htmlFor="lpass">
            Contrase??a
            <input
              className={lpassError && 'input-error'}
              type={showHidePass}
              autoComplete="current-password"
              name="lpass"
              value={lpass}
              required
              onChange={handleChangeInput}
              maxLength="50"
              onBlur={handleOnChange}
              disabled={loading}
            />
            <button
              name="lshowpass"
              aria-label="lshowpass"
              className={`${styles.btnShow}-${showHidePass}`}
              type="button"
              tabIndex={-1}
              onClick={toogleHidePass}
            />
            {lpassError && <span className="msn-error">{lpassError}</span>}
          </label>
        </div>

        <p className={styles.titleForgot}>
          <button
            className={styles.link}
            type="button"
            onClick={() => {
              changeTemplate('forgot')
              Taggeo(
                nameTagCategory,
                `web_sw${typeDialog[0]}_contrasena_link_olvide`
              )
            }}>
            Olvid?? mi contrase??a
          </button>
        </p>

        <div className={styles.block}>
          <button
            className={`${styles.btn} ${loading && 'btn-loading'}`}
            type="submit"
            disabled={disable || loading}>
            {loading ? 'Cargando...' : 'Iniciar sesi??n'}
          </button>
        </div>
      </form>
      <p className={styles.titleRegister}>
        {texts.notHasAccount}
        <button
          className={styles.link}
          type="button"
          onClick={() => {
            changeTemplate('register')
            Taggeo(
              nameTagCategory,
              `web_sw${typeDialog[0]}_login_boton_registrate`
            )
          }}>
          Registrarme
        </button>
      </p>
      <div className={styles.block}>
        <label htmlFor="rpolit" className="terms">
          <input
            id="rpolit"
            type="checkbox"
            name="rpolit"
            value={checkedPolits ? '1' : '0'}
            checked={checkedPolits}
            disabled={loading}
            onChange={() => {
              setCheckedPolits(!checkedPolits)
            }}
          />
          Al ingresar por redes sociales autorizo el uso de mis datos para{' '}
          <a
            href={dataTreatment}
            className={`${styles.link} link-color`}
            target="_blank"
            rel="noreferrer">
            fines adicionales
          </a>
          <span className="checkmark" />
        </label>
      </div>
      <p className={styles.titleRegister} style={{ textAlign: 'justify' }}>
        En caso hayas autorizado los fines de uso adicionales anteriormente, no
        es necesario que lo vuelvas a marcar. Si deseas retirar dicho
        consentimiento, revisa el procedimiento en nuestras{' '}
        <a
          href={PolicyPrivacy(arcSite)}
          className={`${styles.link} link-color`}
          target="_blank"
          rel="noreferrer">
          Pol??ticas de Privacidad.
        </a>
      </p>
    </>
  )
}

Login.propTypes = {
  arcSite: PropTypes.string.isRequired,
}

export default Login
