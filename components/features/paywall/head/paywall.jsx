/* eslint-disable no-extra-boolean-cast */
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import Consumer from 'fusion:consumer'

import { addIdentity, userProfile, isLogged } from '../_dependencies/Identity'
import Icon from '../_children/icon'
import Signwall from '../../signwall/default'
import SignwallPaywall from '../../signwall/_main/signwall/login-paywall'
import GetProfile from '../../signwall/_main/utils/get-profile'
import Taggeo from '../_dependencies/taggeo'
import * as S from './styled'

@Consumer
class Head extends React.PureComponent {
  state = {
    firstName: 'Invitado',
    isActive: false,
    showSignwall: false,
    userName: new GetProfile().username,
    stepForm: 1,
  }

  componentDidMount() {
    this.addEventListener('currentStep', this.currentStepHandler)
    this.addEventListener('signInReq', this.signInReqHandler)
    this.getFirstName()
  }

  componentDidUpdate() {
    if (this.checkSession()) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userName: new GetProfile().username,
      })
    }
  }

  componentWillUnmount() {
    this.removeEventListener(this.currentStepHandler)
  }

  currentStepHandler = currentStep => {
    this.setState({ stepForm: currentStep })
  }

  signInReqHandler() {
    if (!isLogged()) this.setState({ showSignwall: true })
  }

  getFirstName = () => {
    window.dataLayer = window.dataLayer || [] // temporalmente hasta agregar GTM
    addIdentity(this.props.arcSite).then(() => {
      userProfile()
        .then(({ firstName }) => {
          this.setState({ firstName })
        })
        .catch(() => {
          this.setState({ showSignwall: true })
        })
    })
  }

  checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  closeShowSignwall = () => {
    const { showSignwall } = this.state
    this.setState({ showSignwall: !showSignwall })
    this.getFirstName()
  }

  // redirectLogo = () => {
  //   if (window.location.pathname.includes('suscripciones/')) {
  //     window.location.href = '/'
  //   }
  // }

  userName = name => {
    return name.length > 6 ? `${name.substring(0, 6)}..` : name
  }

  closeSignwall() {
    this.setState({ isActive: false })
  }

  render() {
    const { theme, arcSite, customFields } = this.props
    const { showSignwall, userName, isActive, stepForm } = this.state
    const { id, forceLogin: checkForceLogin } = customFields

    let leftColor
    let themedLogo
    switch (arcSite) {
      case 'elcomercio':
        leftColor = theme.palette.terciary.main
        themedLogo = theme.icon.logo_full
        break
      default:
        leftColor = theme.palette.primary.main
        themedLogo = theme.icon.logo
    }

    return (
      <S.Head id={id}>
        {showSignwall && checkForceLogin ? (
          <SignwallPaywall
            brandModal={arcSite}
            closePopup={() => this.closeShowSignwall()}
            onLogged={() => this.dispatchEvent('logged')}
            onLoginFail={() => this.dispatchEvent('loginFailed')}
            reloadLogin
            noBtnClose
          />
        ) : null}
        <S.Background>
          <S.Left backgroundColor={leftColor} />
          <S.Right />
        </S.Background>
        <S.Content backgroundColor={leftColor}>
          <S.WrapLogo as="a" href="/" target="_blank">
            <Icon
              type={themedLogo}
              fill={theme.palette.secondary.contrastText}
              width="30"
              height="30"
            />
          </S.WrapLogo>
          <S.WrapLogin>
            <S.Username>
              {stepForm !== 1 ? (
                <span>
                  {this.checkSession() ? `${userName}` : 'Hola Invitado'}
                </span>
              ) : (
                <S.LoginButton
                  type="button"
                  onClick={() => {
                    Taggeo(
                      `Web_Sign_Wall_Suscripciones`,
                      `web_link_ingresar_${
                        this.checkSession() ? 'perfil' : 'cuenta'
                      }`
                    )
                    this.setState({ isActive: true })
                  }}>
                  <span>
                    {this.checkSession() ? `${userName}` : 'Iniciar Sesión'}
                  </span>
                </S.LoginButton>
              )}
              <S.WrapIcon>
                <Icon
                  type="profile"
                  fill={theme.palette.secondary.contrastText}
                  width="30"
                  height="30"
                />
              </S.WrapIcon>
            </S.Username>
          </S.WrapLogin>
        </S.Content>
        {isActive && (
          <Signwall singleSign closeSignwall={() => this.closeSignwall()} />
        )}
      </S.Head>
    )
  }
}

const ThemedHead = withTheme(Head)

ThemedHead.propTypes = {
  customFields: PropTypes.shape({
    id: PropTypes.string.isRequired.tag({
      name: 'ID',
      description: 'ID único del componente (Ej. head_[nombre])',
    }),
    forceLogin: PropTypes.bool.tag({
      name: 'Forzar login:',
      defaultValue: true,
      description: 'Check para forzar a estar logeado.',
    }),
  }),
}

export default ThemedHead
