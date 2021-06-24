import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { Modal } from '../../../signwall/_children/modal/index'
import { ModalConsumer, ModalProvider } from '../../_context/modal'
import { Taggeo } from '../../_dependencies/Taggeo'
import Header from '../../profile-user/_children/header/signwall'

const Benefits = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-Benefits' */ '../../../signwall/_children/benefits/index'
  )
)

const FormLogin = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormLogin' */ '../../../signwall/_children/forms/form_login'
  )
)

const FormRegister = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormRegister' */ '../../../signwall/_children/forms/form_register'
  )
)

const FormForgot = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormForgot' */ '../../../signwall/_children/forms/form_forgot'
  )
)

const FormReset = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormReset' */ '../../../signwall/_children/forms/form_reset'
  )
)

const FormVerify = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormVerify' */ '../../../signwall/_children/forms/form_verify'
  )
)

const FormRelogin = React.lazy(() =>
  import(
    /* webpackChunkName: 'Auth-FormRelogin' */ '../../../signwall/_children/forms/form_relogin'
  )
)

const lazyFallback = <div style={{ padding: '30px' }}>Cargando...</div>

const renderTemplate = (template, valTemplate, attributes) => {
  const { typeDialog } = attributes

  const templates = {
    login: (
      <React.Suspense fallback={lazyFallback}>
        <FormLogin {...{ valTemplate, attributes }} />
      </React.Suspense>
    ),
    register: (
      <React.Suspense fallback={lazyFallback}>
        <FormRegister {...attributes} />
      </React.Suspense>
    ),
    forgot: (
      <React.Suspense fallback={lazyFallback}>
        <FormForgot {...attributes} />
      </React.Suspense>
    ),
    reset: (
      <React.Suspense fallback={lazyFallback}>
        <FormReset {...attributes} />
      </React.Suspense>
    ),
    verify: (
      <React.Suspense fallback={lazyFallback}>
        <FormVerify {...attributes} />
      </React.Suspense>
    ),
    relogin: (
      <React.Suspense fallback={lazyFallback}>
        <FormRelogin {...attributes} />
      </React.Suspense>
    ),
  }

  const getDefault = () => {
    switch (typeDialog) {
      case 'resetpass':
        return templates.reset
      case 'verify':
        return templates.verify
      case 'relogemail':
      case 'reloghash':
        return templates.relogin
      default:
        return templates.login
    }
  }

  return templates[template] || getDefault()
}

export const ContGeneric = ({ properties }) => {
  const { typeDialog, onClose } = properties
  const {
    arcSite,
    siteProperties: {
      signwall: { mainColorTitle, primaryFont },
      activePaywall,
    },
  } = useAppContext() || {}

  const { selectedTemplate, valTemplate } = React.useContext(ModalConsumer)

  // const handleLeavePage = useRef(() => {
  //   Taggeo(`Web_Sign_Wall_${typeDialog}`, `web_sw${typeDialog[0]}_leave`)
  // }).current

  React.useEffect(() => {
    Taggeo(`Web_Sign_Wall_${typeDialog}`, `web_sw${typeDialog[0]}_open`)
    // addEventListener('beforeunload', handleLeavePage)
    return () => {
      // removeEventListener('beforeunload', handleLeavePage)
    }
  }, [])

  return (
    <Modal
      // eslint-disable-next-line no-nested-ternary
      size={activePaywall ? 'large' : arcSite === 'trome' ? 'medium' : 'small'}
      position="middle">
      <Header
        buttonClose
        onClose={onClose}
        typeDialog={typeDialog}
        noLoading
        logoLeft
      />
      <div className="cont-modal">
        <div className={`left-modal ${arcSite === 'trome' ? 'bg-white' : ''}`}>
          <React.Suspense fallback={null}>
            <Benefits
              arcSite={arcSite}
              mainColorTitle={mainColorTitle}
              primaryFont={primaryFont}
              typeMessage={typeDialog}
            />
          </React.Suspense>
        </div>
        <div className="right-modal">
          {renderTemplate(selectedTemplate, valTemplate, {
            ...properties,
          })}
        </div>
      </div>
    </Modal>
  )
}

const SignOrganic = (props) => (
  <ModalProvider>
    <ContGeneric properties={props} />
  </ModalProvider>
)

export { SignOrganic }