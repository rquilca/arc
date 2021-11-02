import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { Status } from '../_dependencies/types'

interface FormContainerProps {
  title: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errorMessage?: string
  successMessage?: string
  formRef?: React.LegacyRef<HTMLFormElement> | undefined // React.RefObject<HTMLFormElement>
  status: Status
  disabled?: boolean
}

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
  onSubmit,
  errorMessage,
  successMessage,
  formRef,
  status = Status.Initial,
  disabled = false,
}) => {
  const {
    siteProperties: {
      signwall: { mainColorLink, mainColorBtn },
    },
  } = useAppContext() || {}

  let buttonText = ''
  switch (status) {
    case Status.Ready:
    case Status.Initial:
      buttonText = 'Guardar Cambios'
      break
    case Status.Loading:
      buttonText = 'Procesando...'
      break
    default:
      break
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="sign-profile_update-form-grid"
      noValidate>
      <div className="row btw">
        <h3 className="title">{title}</h3>
      </div>

      {successMessage ? (
        <div className="sign-profile_update-message sign-profile_update-message-success">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="sign-profile_update-message sign-profile_update-message-failed">
          {errorMessage}
        </div>
      ) : null}
      {children}
      <div className="row three">
        <div className={styles.group} />
        <div className={styles.group} />
        <div className={styles.group}>
          <button
            className={styles.btn}
            type="submit"
            style={{
              color: mainColorBtn,
              backgroundColor: mainColorLink,
            }}
            disabled={
              status === Status.Initial || status === Status.Loading || disabled
            }>
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  )
}

export default FormContainer
