import React from 'react'
import Consumer from 'fusion:consumer'
import { ModalProvider, ModalConsumer } from '../../signwall/context'
import { Modal } from '../../common/modal/index'
import { FormStudents } from '../_children/form_students'
import { FormLoginPaywall } from '../_children/form_login_landing'
import { FormForgot } from '../_children/form_forgot'
import { FormRegister } from '../_children/form_register'
import { ContMiddle, FirstMiddle, SecondMiddle, CloseBtn } from './styles'
import { Close } from '../../common/iconos'

const renderTemplate = (template, attributes) => {
  const templates = {
    // eslint-disable-next-line react/jsx-filename-extension
    login: <FormLoginPaywall {...attributes} />,
    students: <FormStudents />,
    forgot: <FormForgot />,
    register: <FormRegister />,
  }
  return templates[template] || templates.login
}

// eslint-disable-next-line import/prefer-default-export
const StudentsInt = props => {
  const { onClose, bgMmodalPng, bgMmodalWebp } = props
  return (
    <ModalProvider>
      <ModalConsumer>
        {value => (
          <Modal size="medium" position="middle">
            <ContMiddle>
              <CloseBtn type="button" onClick={() => onClose()}>
                <Close />
              </CloseBtn>
              <FirstMiddle>
                <picture>
                  <source srcSet={bgMmodalWebp} type="image/webp" />
                  <source srcSet={bgMmodalPng} type="image/png" />
                  <img src={bgMmodalPng} alt="img" />
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
class Students extends React.Component {
  render() {
    const { contextPath, deployment, arcSite } = this.props

    const backImagePng =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_students.png`
      ) || ''
    const backImageWebp =
      deployment(
        `${contextPath}/resources/dist/${arcSite}/images/bg_students.webp`
      ) || ''

    return (
      <StudentsInt
        {...this.props}
        bgMmodalPng={backImagePng}
        bgMmodalWebp={backImageWebp}
        dispatchEvent={this.dispatchEvent.bind(this)}
        addEventListener={this.addEventListener.bind(this)}
        removeEventListener={this.removeEventListener.bind(this)}
      />
    )
  }
}

export { Students }
