import React from 'react'

const classes = {
  title: 'newsletter__title position-relative font-bold',
  descripcion: 'newsletter__description',
  row: 'newsletter__row',
  email: 'newsletter__email w-full',
  errorMessage: 'newsletter__error-message block',
  textCenter: 'text-center',
  button: 'newsletter__button font-bold w-full',
  policies: 'newsletter__policies font-bold',
  pageLink: 'newsletter__page-link',
  inputCheckbox: 'newsletter__input-checkbox',
}

const StaticsNewsletterChildForm = props => {
  const {
    description,
    urlTos,
    urlPrivacyPolicies,
    features,
    validation,
    submitForm,
  } = props

  return (
    <>
      <h3 className={classes.title}>
        Registrate en nuestro <span>Newsletter</span>
      </h3>
      <p className={classes.descripcion}>{description}</p>
      <form action="">
        <div className={classes.row}>
          <input
            className={classes.email}
            type="text"
            name="email"
            placeholder="Correo electrónico*"
            required="required"
            onChange={features.email}
          />
          {validation.email.hasError() && submitForm && (
            <div className={classes.errorMessage}>
              {validation.email.message()}
            </div>
          )}
        </div>
        <div className={`${classes.row} ${classes.textCenter}`}>
          <button
            className={classes.button}
            type="submit"
            onClick={features.save}>
            Enviar
          </button>
        </div>
        <div className={classes.row}>
          <label className={classes.policies} htmlFor="tos">
            <input
              type="checkbox"
              id="tos"
              name="tos"
              required="required"
              value="1"
              className={classes.inputCheckbox}
              onChange={features.tos}
            />
            Acepto los{' '}
            <a
              className={classes.pageLink}
              href={urlTos}
              target="_blank"
              rel="noopener noreferrer">
              Términos y condiciones
            </a>{' '}
            y{' '}
            <a
              className={classes.pageLink}
              href={urlPrivacyPolicies}
              target="_blank"
              rel="noopener noreferrer">
              Políticas de privacidad
            </a>
          </label>
          {validation.tos.hasError() && submitForm && (
            <div className={classes.errorMessage}>
              {validation.tos.message()}
            </div>
          )}
        </div>
      </form>
    </>
  )
}

export default StaticsNewsletterChildForm
