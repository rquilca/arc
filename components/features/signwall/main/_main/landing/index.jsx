/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../../_children/context'
import { Modal } from '../../../_children/modal/index'
import { FormLoginPaywall } from '../_children/form_login_landing'
import { FormForgot } from '../_children/form_forgot'
import { FormRegister } from '../_children/form_register'
import { ContMiddle, FirstMiddle, SecondMiddle, CloseBtn } from './styled'
import { Close } from '../../../_children/iconos'
import { getAssetsPath } from '../../../../../utilities/constants'

const renderTemplate = (template, attributes) => {
  const templates = {
    login: <FormLoginPaywall {...attributes} />,
    forgot: <FormForgot {...attributes} />,
    register: <FormRegister {...attributes} />,
  }
  return templates[template] || templates.login
}

export const LandingInt = props => {
  const { onClose, onLogged, noBtnClose, pathSourcePNG, pathSourceWEBP } = props
  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <Modal size="medium" position="middle">
            <ContMiddle>
              {!noBtnClose && (
                <CloseBtn
                  type="button"
                  onClick={() => {
                    if (window.Identity.userProfile) {
                      onLogged(window.Identity.userProfile)
                      onClose()
                    } else {
                      onClose()
                    }
                  }}>
                  <Close />
                </CloseBtn>
              )}

              <FirstMiddle>
                <picture>
                  <source srcSet={pathSourceWEBP} type="image/webp" />
                  <source srcSet={pathSourcePNG} type="image/png" />
                  <img src={pathSourcePNG} alt="img" />
                </picture>
              </FirstMiddle>
              <SecondMiddle>
                {renderTemplate(value.selectedTemplate, { ...props })}
              </SecondMiddle>
            </ContMiddle>
          </Modal>
        )}
      </ModalConsumer>
    </ModalProvider>
  )
}

@Consumer
class Landing extends Component {
  render() {
    const { contextPath, typeDialog, deployment, arcSite } = this.props
    const IMG = typeDialog === 'landing' ? 'bg_login' : 'bg_students'

    const pathSourcePNG =
      deployment(
        `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/${IMG}.png`
      ) || ''

    const pathSourceWEBP =
      deployment(
        `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/${IMG}.webp`
      ) || ''

    return (
      <LandingInt
        {...this.props}
        pathSourcePNG={pathSourcePNG}
        pathSourceWEBP={pathSourceWEBP}
        dispatchEvent={this.dispatchEvent.bind(this)}
      />
    )
  }
}

export { Landing }
