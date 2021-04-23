import * as React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import * as Sentry from '@sentry/browser'

import {
  PropertiesSite,
  PropertiesCommon,
} from '../../../_dependencies/Properties'
import { getSessionStorage } from '../../../_dependencies/Utils'
import { cipPayEfectivo } from '../../../_dependencies/Services'
import { AuthContext } from '../../../_context/auth'
import { conformProfile, isLogged } from '../../../_dependencies/Session'
import PWA from '../../../_dependencies/Pwa'

const { urls: urlCommon } = PropertiesCommon

const styles = {
  step: 'step__left-progres',
  subtitle: 'step__left-subtitle',
  contConfirm: 'step__left-cont-confirm',
  noteConfirm: 'step__left-note-confirm',
  contButton: 'step__left-note-button',
  btn: 'step__left-btn-next',
  noteBenefist: 'step__left-note-benefist',
}

const Confirmation = () => {
  const {
    arcSite,
    globalContent: { plans = [], fromFia },
  } = useAppContext() || {}

  const { data: { token = '' } = {} } =
    useContent({
      source: 'paywall-pago-efectivo',
    }) || {}

  const { updateStep, userPeriod, userPlan, userProfile } = React.useContext(
    AuthContext
  )

  const {
    uuid,
    email,
    firstName,
    lastName,
    secondLastName = '',
    documentType,
    documentNumber,
  } = conformProfile(userProfile || {})

  const { urls: urlsSite } = PropertiesSite[arcSite]
  const [loading, setLoading] = React.useState(false)
  const [showIframe, setShowIframe] = React.useState(false)

  React.useEffect(() => {
    Sentry.configureScope((scope) => {
      scope.setTag('step', 'cip')
    })
    Sentry.addBreadcrumb({
      type: 'info',
      category: 'confirmación CIP',
      message: 'Confirmacion Pago Efectivo',
      level: 'info',
    })

    if (!isLogged()) {
      setTimeout(() => {
        updateStep(1)
        window.location.reload()
      }, 1000)
    }

    if (token && !showIframe) {
      getCipPayEfectivo()
    }
  })

  const getCipPayEfectivo = () => {
    const getPLanSelected = plans.reduce(
      (prev, plan) => (plan.priceCode === userPlan.priceCode ? plan : prev),
      null
    )

    const { amount, productName } = getPLanSelected || {}

    if (amount) {
      const dataCIP = {
        currency: 'PEN',
        amount: amount,
        payment_concept: productName + ' - ' + userPeriod,
        user_email: email,
        user_id: userProfile.uuid || uuid,
        user_name: firstName,
        user_last_name: lastName + ' ' + secondLastName,
        user_document_type: documentType,
        user_document_number: documentNumber,
        date_expiry: '',
        user_code_country: '+51',
        token: token,
      }

      cipPayEfectivo(urlCommon.cipPayEfectivo, dataCIP)
        .then((resCIP) => {
          const { response: { data: { cipUrl = '' } = {} } = {} } = resCIP || {}
          setShowIframe(cipUrl)
        })
        .catch((errCIP) => {
          Sentry.captureEvent({
            message: 'Error al generar CIP',
            level: 'error',
            extra: errCIP || {},
          })
        })
    } else {
      updateStep(2)
    }
  }

  const goToHome = () => {
    if (typeof window !== 'undefined') {
      setLoading(true)
      if (PWA.isPWA()) {
        PWA.pwaCloseWebView()
        return
      }
      const urlLocal = getSessionStorage('paywall_last_url')
      let urlRedirect = urlsSite.mainHome
      if (urlLocal) {
        urlRedirect =
          urlLocal !== '' && urlLocal !== '/suscripciones/'
            ? urlLocal
            : urlsSite.mainHome
      }
      window.sessionStorage.removeItem('ArcId.USER_STEP')
      window.sessionStorage.removeItem('paywall_confirm_subs')
      window.sessionStorage.removeItem('paywall_type_modal')
      window.sessionStorage.removeItem('paywall_last_url')
      window.location.href = urlRedirect
    }
  }

  return (
    <>
      <ul className={styles.step}>
        <li className="active">Perfil</li>
        <li className="active">Pago</li>
        <li className="active">Confirmación</li>
      </ul>

      <h3 className={styles.subtitle}>
        ¡Estás a un paso de finalizar la compra!
      </h3>

      <div className="form-confirmation">
        {showIframe && (
          <iframe
            title="pago-efectivo"
            src={showIframe}
            width="100%"
            height="450"
            framborder="0"></iframe>
        )}
      </div>

      {!fromFia && (
        <div className={styles.contButton}>
          <button
            className={styles.btn}
            type="button"
            onClick={goToHome}
            disabled={loading}>
            {loading ? 'Redireccionando...' : 'Seguir navegando'}
          </button>
        </div>
      )}
    </>
  )
}

export default Confirmation
