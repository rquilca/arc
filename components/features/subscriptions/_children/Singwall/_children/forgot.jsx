/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import useForm from '../../../_hooks/useForm'
import getCodeError, { formatEmail } from '../../../_dependencies/Errors'
import MsgForgotPass from '../../../_dependencies/Icons'
import { NavigateConsumer } from '../../../_context/navigate'
import PropertiesSite from '../../../_dependencies/Properties'

const styles = {
  title: 'step__left-title',
  subTitle: 'step__left-subtitle',
  block: 'step__left-block',
  btn: 'step__left-btn-next',
  link: 'step__btn-link',
  center: 'step__left-align-center',
  backLogin: 'step__left-link-register',
}

const Forgot = () => {
  const [loading, setLoading] = useState(false)
  const [msgError, setMsgError] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [registerLink, setRegisterLink] = useState()
  const { texts } = PropertiesSite.common

  const stateSchema = {
    femail: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    femail: {
      required: true,
      validator: formatEmail(),
    },
  }

  const onFomrForgot = ({ femail }) => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      window.Identity.requestResetPassword(femail)
        .then(() => setShowConfirm(true))
        .catch(err => {
          setMsgError(getCodeError(err.code))
          setRegisterLink(err.code === '300030')
          setLoading(false)
        })
    }
  }

  const {
    values: { femail },
    errors: { femail: femailError },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFomrForgot)

  const handleChangeInput = e => {
    handleOnChange(e)
    setMsgError(false)
  }

  return (
    <NavigateConsumer>
      {value => (
        <>
          {!showConfirm ? (
            <>
              <h2 className={styles.title}> {texts.forgot}</h2>
              <h3 className={styles.subTitle}>{texts.subtitleForgot}</h3>
              {msgError && (
                <div className={styles.block}>
                  <div className="msg-alert">
                    {` ${msgError} `}
                    {registerLink && (
                      <button
                        className={styles.link}
                        type="button"
                        onClick={() => value.changeTemplate('register')}>
                        Registrar
                      </button>
                    )}
                  </div>
                </div>
              )}
              <form onSubmit={handleOnSubmit}>
                <div className={styles.block}>
                  <label htmlFor="femail">
                    Correo electrónico
                    <input
                      className={femailError && 'input-error'}
                      type="text"
                      name="femail"
                      required
                      value={femail}
                      onChange={handleChangeInput}
                      onBlur={handleOnChange}
                      disabled={loading}
                    />
                    {femailError && (
                      <span className="msn-error">{femailError}</span>
                    )}
                  </label>
                </div>
                <div className={styles.block}>
                  <button
                    className={`${styles.btn} ${loading && 'btn-loading'}`}
                    type="submit"
                    disabled={disable || loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
                <p className={styles.backLogin}>
                  {texts.backLogin}
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => value.changeTemplate('login')}>
                    Inciar Sesión
                  </button>
                </p>
              </form>
            </>
          ) : (
            <div className={styles.center}>
              <MsgForgotPass bgcolor="#fff" />
              <h2 className={styles.title}>Correo enviado</h2>
              <h3 className={styles.subTitle}>{texts.msgForgotOk}</h3>
              <div className={styles.block}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => value.changeTemplate('login')}>
                  Aceptar
                </button>
              </div>
            </div>
          )}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </NavigateConsumer>
  )
}

export default Forgot
