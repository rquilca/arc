import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Modal from '../common/modal'
import Header from '../common/header'
import Taggeo from '../utils/taggeo'
import Domains from '../utils/domains'
import FormVerify from './_children/form-verify'
import ListBenefits from './_children/benefits'
import { ModalProvider, ModalConsumer } from './context'

@Consumer
class SignWallVerify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showVerify: false,
    }

    const { arcSite } = this.props
    this.origin_api = Domains.getOriginAPI(arcSite)
    this.validateToken()
  }

  componentDidMount() {
    window.Identity.apiOrigin = this.origin_api
    Taggeo('Web_Sign_Wall_Verify', 'web_swv_open')
    window.addEventListener('beforeunload', this.handleLeavePage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleLeavePage)
  }

  handleLeavePage = e => {
    e.preventDefault()
    Taggeo('Web_Sign_Wall_Verify', 'web_swv_leave')
  }

  validateToken = () => {
    const { tokenVerify } = this.props

    window.Identity.apiOrigin = this.origin_api
    window.Identity.verifyEmail(tokenVerify).then(() => {
      this.setState({
        showVerify: true,
      })
    })
  }

  renderTemplate(template) {
    const { closePopup, brandModal } = this.props
    const templates = {
      verify: (
        <FormVerify
          closePopup={closePopup}
          typePopUp="verify"
          typeForm="verify"
          brandCurrent={brandModal}
        />
      ),
    }
    return templates[template] || templates.verify
  }

  render() {
    const { showVerify } = this.state
    const { closePopup, brandModal } = this.props
    return (
      <>
        {showVerify && (
          <ModalProvider>
            <ModalConsumer>
              {value => (
                <Modal
                  size={brandModal !== 'peru21' ? 'large' : 'small'}
                  position="middle"
                  name="arc-popup-verifyaccount"
                  id="arc-popup-verifyaccount">
                  <Header closePopup={closePopup} typePopUp="verify" />
                  <div className="modal-body">
                    {brandModal !== 'peru21' ? (
                      <div className="modal-body__left">
                        <ListBenefits
                          typeMessage="organic"
                          brandCurrent={brandModal}
                        />
                      </div>
                    ) : null}
                    <div
                      className={
                        brandModal !== 'peru21'
                          ? 'modal-body__right'
                          : 'modal-body__full'
                      }>
                      {this.renderTemplate(value.selectedTemplate)}
                    </div>
                  </div>
                </Modal>
              )}
            </ModalConsumer>
          </ModalProvider>
        )}
      </>
    )
  }
}

export default SignWallVerify
