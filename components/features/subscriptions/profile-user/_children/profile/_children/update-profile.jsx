/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import Consumer from 'fusion:consumer'
import * as React from 'react'

import { Close } from '../../../../../signwall/_children/icons'
import { Modal } from '../../../../../signwall/_children/modal/index'
import { getOriginAPI } from '../../../../../signwall/_dependencies/domains'
import GetProfile from '../../../../../signwall/_dependencies/get-profile'
import { clean } from '../../../../../signwall/_dependencies/object'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'
import {
  docRegex,
  emailRegex,
  namesRegex,
  numberRegex,
  phoneRegex,
} from '../../../../_dependencies/Regex'

const SET_ATTRIBUTES_PROFILE = [
  'documentType',
  'documentNumber',
  'civilStatus',
  'country',
  'department',
  'province',
  'district',
  'secondLastName',
]
const GET_ATTRIBUTES_PROFILE = ['mobilePhone', ...SET_ATTRIBUTES_PROFILE]

@Consumer
class UpdateProfile extends React.Component {
  constructor(props) {
    super(props)
    const { publicProfile } = new GetProfile()
    const { attributes = [] } = publicProfile
    const attributesObj = this.attributeToObject(attributes)

    this._backup_attributes = Array.isArray(attributes)
      ? attributes.filter(({ name }) => !GET_ATTRIBUTES_PROFILE.includes(name))
      : []

    const customVars = {
      showMsgSuccess: false,
      showMsgError: false,
      showModalConfirm: false,
      currentPassword: '',
      formErrorsConfirm: {
        currentPassword: '',
      },
      sending: true,
      sendingConfirmText: 'CONFIRMAR',
      messageErrorPass: '',
      messageErrorDelete: '',
    }

    this.state = {
      dataDepartments: [],
      dataProvinces: [],
      dataDistricts: [],
      formErrors: {
        firstName: '',
        lastName: '',
        secondLastName: '',
        mobilePhone: '',
        documentNumber: '',
        typeDocument: '',
        userEmail: '',
      },
      loading: false,
      hasChange: false,
      textSubmit: 'GUARDAR CAMBIOS',
      typeDocLenghtMax: attributesObj.documentType !== 'dni' ? '15' : '8',
      typeDocLenghtMin: attributesObj.documentType !== 'dni' ? '5' : '8',
      typeDoc: attributesObj.documentType !== 'dni' ? 'text' : 'numeric',
      ...publicProfile,
      ...attributesObj,
      ...customVars,
    }
  }

  attributeToObject = (attributes = []) => {
    if (attributes === null) return {}

    const clearObject = []
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].value !== null) {
        clearObject.push(attributes[i])
      }
    }

    return clearObject.reduce((prev, { name, value }) => {
      const newPrev = prev
      switch (name) {
        case 'mobilePhone':
          newPrev.contacts = [{ type: 'PRIMARY', phone: value }]
          break
        default:
          newPrev[name] = value
          break
      }
      return prev
    }, {})
  }

  componentDidMount = () => {
    const { country, department, province } = this.state

    if (country) {
      this._getUbigeo(country, 'department')
    }

    if (department) {
      this._getUbigeo(department, 'province')
    }

    if (province) {
      this._getUbigeo(province, 'district')
    }
  }

  _getUbigeo = (input, geo) => {
    const state = {}
    let value = input
    const hasTarget = Object.prototype.hasOwnProperty.call(input, 'target')
    if (hasTarget) {
      const newValue = input.target.value
      value = newValue
      switch (geo) {
        case 'departament':
          state.departament = 'default'
          state.province = 'default'
          state.district = 'default'
          break
        case 'province':
          state.province = 'default'
          state.district = 'default'
          break
        default:
      }
    }
    const result = getUbigeo(value)

    result.then((geoData) => {
      const GeoUpper = geo.charAt(0).toUpperCase() + geo.slice(1)
      Object.assign(state, {
        [`data${GeoUpper}s`]: geoData,
      })
      this.setState(state)
    })
  }

  getAtributes = (state, list = []) => {
    if (typeof window !== 'undefined') {
      return list.reduce((prev, item) => {
        if (
          Object.prototype.hasOwnProperty.call(state, item) &&
          state[item] !== ''
        ) {
          prev.push({
            name: item,
            value: state[item],
            type: 'String',
          })
        }
        return prev
      }, [])
    }
    return null
  }

  handleUpdateProfile = () => {
    const { arcSite } = this.props

    const {
      firstName,
      lastName,
      secondLastName,
      displayName,
      email,
      contacts,
      ...restState
    } = this.state

    const profile = {
      firstName,
      lastName,
      secondLastName,
      displayName,
      email,
      contacts,
    }
    clean(profile)

    profile.attributes = [
      ...this.getAtributes(restState, SET_ATTRIBUTES_PROFILE),
      ...this._backup_attributes,
    ].map((attribute) => {
      if (attribute.name === 'originReferer' && attribute.value) {
        return {
          ...attribute,
          value: attribute.value
            .split('&')[0]
            .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
        }
      }
      if (!attribute.value) {
        return {
          ...attribute,
          value: 'undefined',
        }
      }
      return attribute
    }) // work around - [MEJORA]

    this.setState({ loading: true, textSubmit: 'GUARDANDO...' })

    if (typeof window !== 'undefined') {
      window.Identity.apiOrigin = getOriginAPI(arcSite)
      window.Identity.updateUserProfile(profile)
        .then(() => {
          this.setState({
            showMsgSuccess: true,
            loading: false,
            hasChange: false,
            textSubmit: 'GUARDAR CAMBIOS',
          })

          const modalConfirmPass = document.getElementById('profile-signwall')
          if (modalConfirmPass) {
            modalConfirmPass.scrollIntoView()
          }

          const textProfile = document.getElementById('name-user-profile')
          if (textProfile) {
            textProfile.textContent = `Hola ${
              profile.firstName ? profile.firstName : 'Usuario'
            }`
          }

          setTimeout(() => {
            this.setState({
              showMsgSuccess: false,
            })
          }, 5000)

          this.dispatchEvent('profileUpdate', profile)
        })
        .catch((errUpdate) => {
          if (errUpdate.code === '100018') {
            this.setState({
              showModalConfirm: true,
            })
          } else if (errUpdate.code === '3001001') {
            this.setState({
              messageErrorDelete:
                'Al parecer hubo un problema con su cuenta, intente ingresar nuevamente. ',
              showMsgError: true,
            })
          } else {
            this.setState({
              messageErrorPass:
                'Ha ocurrido un error al actualizar. Int??ntalo en otro momento.',
              showMsgError: true,
            })
            setTimeout(() => {
              this.setState({
                showMsgError: false,
              })
            }, 5000)
          }
        })
        .finally(() => {
          this.setState({
            loading: false,
            textSubmit: 'GUARDAR CAMBIOS',
          })
        })
    }
  }

  handleOnChange = (e) => {
    if (e.target.name === 'mobilePhone') {
      this.setState({
        contacts: [{ type: 'PRIMARY', phone: e.target.value }],
        hasChange: true,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        hasChange: true,
      })
    }
  }

  handleTypeDocument = (e) => {
    e.preventDefault()
    const { value } = e.target
    let state = {}
    switch (value) {
      case 'DNI':
        state = {
          typeDocLenghtMax: '8',
          typeDocLenghtMin: '8',
          typeDoc: 'numeric',
        }
        break
      case 'CDI':
      case 'CEX':
        state = {
          typeDocLenghtMin: '5',
          typeDocLenghtMax: '15',
          typeDoc: 'text',
        }
        break
      default:
    }

    this.setState(state, () => {
      let { documentNumber } = this.state
      documentNumber = documentNumber !== undefined ? documentNumber : ''
      const { typeDocLenghtMin, typeDoc } = state
      const minLenghtInput = typeDocLenghtMin
      const { formErrors } = this.state

      if (typeDoc === 'numeric') {
        if (
          documentNumber.length < minLenghtInput ||
          documentNumber.length > minLenghtInput
        ) {
          formErrors.documentNumber = `Longitud inv??lida, requiere ${minLenghtInput} d??gitos`
        } else if (numberRegex.test(documentNumber)) {
          formErrors.documentNumber = ''
        } else {
          formErrors.documentNumber = 'Formato inv??lido. Solo n??meros'
        }
      } else if (typeDoc === 'text') {
        if (documentNumber.length < minLenghtInput) {
          formErrors.documentNumber = `Longitud inv??lida, m??nimo ${minLenghtInput} d??gitos`
        } else if (docRegex.test(documentNumber)) {
          formErrors.documentNumber = ''
        } else {
          formErrors.documentNumber = 'Formato inv??lido.'
        }
      }

      this.setState({
        formErrors,
      })
    })
  }

  changeValidationConfirm = (e) => {
    const { name, value } = e.target
    const { formErrorsConfirm } = this.state
    const space =
      value.indexOf(' ') >= 0
        ? 'Contrase??a inv??lida, no se permite espacios'
        : ''
    const min = value.length < 8 ? 'M??nimo 8 caracteres' : space

    formErrorsConfirm.currentPassword =
      value.length === 0 ? 'Este campo es requerido' : min

    this.setState({ formErrorsConfirm, [name]: value })

    if (formErrorsConfirm.currentPassword.length >= 1) {
      this.setState({
        sending: true,
      })
    } else {
      this.setState({
        sending: false,
      })
    }
  }

  handleValidation = (e) => {
    const { name, value } = e.target
    const { formErrors } = this.state
    const { documentType } = this.state

    const minLenghtInput = e.target.getAttribute('minlength')
    const typeDoc = e.target.getAttribute('typedoc')

    switch (name) {
      case 'firstName':
        if (value.length < 2) {
          formErrors.firstName = 'Longitud inv??lida, m??nimo 2 caracteres'
        } else if (
          namesRegex.test(value) &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          formErrors.firstName = ''
        } else {
          formErrors.firstName = 'Formato inv??lido, solo letras'
        }
        break
      case 'lastName':
        if (value.length < 2) {
          formErrors.lastName = 'Longitud inv??lida, m??nimo 2 caracteres'
        } else if (
          namesRegex.test(value) &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          formErrors.lastName = ''
        } else {
          formErrors.lastName = 'Formato inv??lido, solo letras'
        }
        break
      case 'secondLastName':
        if (value.length < 2) {
          formErrors.secondLastName = 'Longitud inv??lida, m??nimo 2 caracteres'
        } else if (
          namesRegex.test(value) &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          formErrors.secondLastName = ''
        } else {
          formErrors.secondLastName = 'Formato inv??lido, solo letras'
        }
        break
      case 'mobilePhone':
        if (value.length < 9 || value.length > 12) {
          formErrors.mobilePhone = 'Longitud inv??lida, entre 9  y 12 caracteres'
        } else if (phoneRegex.test(value)) {
          formErrors.mobilePhone = ''
        } else {
          formErrors.mobilePhone = 'Formato inv??lido. Solo n??meros y guiones'
        }
        break
      case 'documentNumber':
        if (typeDoc === 'numeric') {
          if (value.length < minLenghtInput || value.length > minLenghtInput) {
            formErrors.documentNumber = `Longitud inv??lida, requiere ${minLenghtInput} d??gitos`
          } else if (numberRegex.test(value)) {
            formErrors.documentNumber = ''
          } else {
            formErrors.documentNumber = 'Formato inv??lido. Solo n??meros'
          }
        } else if (typeDoc === 'text') {
          if (value.length < minLenghtInput) {
            formErrors.documentNumber = `Longitud inv??lida, m??nimo ${minLenghtInput} d??gitos`
          } else if (docRegex.test(value)) {
            formErrors.documentNumber = ''
          } else {
            formErrors.documentNumber = 'Formato inv??lido.'
          }
        }
        if (documentType === undefined || documentType === null) {
          formErrors.typeDocument = 'Ingresar tipo documento'
        }
        break

      case 'documentType':
        if (value !== '') {
          formErrors.typeDocument = ''
        } else {
          formErrors.typeDocument = 'Ingresar tipo documento'
        }
        break

      case 'email':
        if (value.length === 0) {
          formErrors.userEmail = 'Este campo es requerido'
        } else if (emailRegex.test(value)) {
          formErrors.userEmail = ''
        } else {
          formErrors.userEmail = 'Correo Electr??nico Inv??lido'
        }
        break
      default:
    }

    this.setState({ formErrors, [name]: value }, () => {
      if (
        formErrors.firstName.length > 0 ||
        formErrors.lastName.length > 0 ||
        formErrors.secondLastName.length > 0 ||
        formErrors.documentNumber.length > 0 ||
        formErrors.mobilePhone.length > 0 ||
        formErrors.typeDocument.length > 0
      ) {
        this.setState({
          hasError: true,
        })
      } else {
        this.setState({
          hasError: false,
        })
      }
    })
  }

  onLogout = (e) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      const linkLogout = document.getElementById('web_link_cerrarsesion')
      if (linkLogout) {
        linkLogout.click()
      }
    }
  }

  submitConfirmPassword = (e) => {
    e.preventDefault()

    const { formErrorsConfirm, currentPassword, email } = this.state
    const { arcSite } = this.props

    formErrorsConfirm.oldPassword =
      currentPassword.length === 0 ? 'Este campo es requerido' : ''
    this.setState({ formErrorsConfirm })

    if (
      typeof window !== 'undefined' &&
      formErrorsConfirm.currentPassword === ''
    ) {
      this.setState({ sending: true, sendingConfirmText: 'CONFIRMANDO...' })

      window.Identity.apiOrigin = getOriginAPI(arcSite)

      const currentEmail = email || window.Identity.userProfile.email

      window.Identity.login(currentEmail, currentPassword, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          this.handleUpdateProfile()
          this.setState({
            showMsgSuccess: true,
          })
          setTimeout(() => {
            this.setState({
              showMsgSuccess: false,
            })
          }, 5000)
        })
        .catch(() => {
          this.setState({
            messageErrorPass:
              'Ha ocurrido un error al actualizar. Contrase??a Incorrecta.',
            showMsgError: true,
          })

          setTimeout(() => {
            this.setState({
              showMsgError: false,
            })
          }, 5000)
        })
        .finally(() => {
          this.setState({
            currentPassword: '',
            showModalConfirm: false,
            sending: false,
            sendingConfirmText: 'CONFIRMAR',
          })

          const ModalProfile =
            document.getElementById('profile-signwall').parentNode ||
            document.getElementById('profile-signwall').parentElement
          ModalProfile.style.overflow = 'auto'
        })
    }
  }

  togglePopupModalConfirm() {
    const { showModalConfirm } = this.state
    this.setState({
      showModalConfirm: !showModalConfirm,
    })

    const ModalProfile =
      document.getElementById('profile-signwall').parentNode ||
      document.getElementById('profile-signwall').parentElement
    if (showModalConfirm) {
      ModalProfile.style.overflow = 'auto'
    } else {
      ModalProfile.style.overflow = 'hidden'
    }
  }

  render() {
    const {
      formErrors,
      firstName,
      lastName,
      secondLastName,
      documentType,
      province,
      documentNumber,
      civilStatus,
      contacts,
      country,
      department,
      district,
      email,
      hasChange,
      loading,
      hasError,
      showMsgSuccess,
      showMsgError,
      typeDocLenghtMin,
      typeDocLenghtMax,
      typeDoc,
      dataDepartments,
      dataProvinces,
      dataDistricts,
      textSubmit,
      showModalConfirm,
      formErrorsConfirm,
      sending,
      sendingConfirmText,
      messageErrorPass,
      messageErrorDelete,
    } = this.state

    const {
      siteProperties: {
        signwall: { mainColorBtn, mainColorLink },
      },
    } = this.props

    const [primaryPhone = { phone: null }] = contacts
    const { phone } = primaryPhone

    return (
      <>
        <form
          className="sign-profile_update-form-grid"
          onSubmit={(e) => {
            e.preventDefault()
            this.handleUpdateProfile()
          }}>
          <div className="row btw">
            <h3 className="title">Mis Datos</h3>
          </div>

          {showMsgSuccess && (
            <div className="sign-profile_update-message sign-profile_update-message-success">
              Tus datos de perfil han sido actualizados correctamente.
            </div>
          )}

          {showMsgError && (
            <div className="sign-profile_update-message sign-profile_update-message-failed">
              {messageErrorDelete ? (
                <>
                  {messageErrorDelete}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      this.onLogout(e)
                    }}>
                    Clic Aqu??
                  </a>
                </>
              ) : (
                messageErrorPass
              )}
            </div>
          )}

          <div className="row three">
            <div className="sign-profile_update-form-group">
              <input
                type="text"
                autoComplete="given-name"
                name="firstName"
                className={
                  formErrors.firstName.length > 0
                    ? 'input error capitalize'
                    : 'input capitalize'
                }
                placeholder="Nombres"
                noValidate
                maxLength="50"
                onChange={(e) => {
                  this.handleOnChange(e)
                  this.handleValidation(e)
                }}
                defaultValue={firstName}
                tabIndex="1"
                disabled={!email}
              />
              <label htmlFor="name" className="label">
                Nombres
              </label>
              {formErrors.firstName.length > 0 && (
                <span className="error">{formErrors.firstName}</span>
              )}
            </div>
            <div className="sign-profile_update-form-group">
              <input
                type="text"
                autoComplete="family-name"
                name="lastName"
                className={
                  formErrors.lastName.length > 0
                    ? 'input error capitalize'
                    : 'input capitalize'
                }
                placeholder="Apellido Paterno"
                noValidate
                maxLength="50"
                onChange={(e) => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
                defaultValue={lastName}
                tabIndex="2"
                disabled={!email}
              />
              <label htmlFor="lastnameP" className="label">
                Apellido Paterno
              </label>
              {formErrors.lastName.length > 0 && (
                <span className="error">{formErrors.lastName}</span>
              )}
            </div>
            <div className="sign-profile_update-form-group">
              <input
                type="text"
                name="secondLastName"
                className={
                  formErrors.secondLastName.length > 0
                    ? 'input error capitalize'
                    : 'input capitalize'
                }
                placeholder="Apellido Materno"
                noValidate
                maxLength="50"
                onChange={(e) => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
                defaultValue={secondLastName}
                tabIndex="3"
                disabled={!email}
              />
              <label htmlFor="secondLastName" className="label">
                Apellido Materno
              </label>
              {formErrors.secondLastName.length > 0 && (
                <span className="error">{formErrors.secondLastName}</span>
              )}
            </div>
          </div>

          <div className="row three">
            <div className="sign-profile_update-form-group">
              <div className="combo">
                <select
                  name="documentType"
                  className={
                    formErrors.typeDocument.length > 0
                      ? 'input input-minimal error'
                      : 'input input-minimal'
                  }
                  defaultValue={
                    documentType ? documentType.toUpperCase() : 'default'
                  }
                  onChange={(e) => {
                    this.handleOnChange(e)
                    this.handleTypeDocument(e)
                    this.handleValidation(e)
                  }}
                  tabIndex="4"
                  disabled={!email}>
                  <option disabled="disabled" value="default">
                    Seleccione
                  </option>
                  <option value="DNI">DNI</option>
                  <option value="CEX">CEX</option>
                  <option value="CDI">CDI</option>
                </select>
                <label htmlFor="statusCivil" className="label">
                  Tipo Doc.
                </label>

                <input
                  type="text"
                  name="documentNumber"
                  className={
                    formErrors.documentNumber.length > 0
                      ? 'input error'
                      : 'input'
                  }
                  placeholder="Num Documento"
                  noValidate
                  minLength={typeDocLenghtMin}
                  maxLength={typeDocLenghtMax}
                  typedoc={typeDoc}
                  onChange={(e) => {
                    this.handleOnChange(e)
                    this.handleValidation(e)
                  }}
                  onBlur={(e) => this.handleValidation(e)}
                  defaultValue={documentNumber}
                  tabIndex="5"
                  disabled={!email}
                />
              </div>
              {formErrors.documentNumber.length > 0 && (
                <span className="error">{formErrors.documentNumber}</span>
              )}
              {formErrors.typeDocument.length > 0 && (
                <span className="error">{formErrors.typeDocument}</span>
              )}
            </div>
            <div className="sign-profile_update-form-group">
              <select
                name="civilStatus"
                className="input input-minimal"
                value={civilStatus ? civilStatus.toUpperCase() : 'default'}
                onChange={(e) => {
                  this.handleOnChange(e)
                  this.handleValidation(e)
                }}
                tabIndex="6"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="SO">Soltero(a)</option>
                <option value="CA">Casado(a)</option>
                <option value="DI">Divorciado(a)</option>
                <option value="VI">Viudo(a)</option>
              </select>
              <label htmlFor="statusCivil" className="label">
                Estado Civil
              </label>
            </div>
            <div className="sign-profile_update-form-group">
              <input
                type="text"
                inputMode="tel"
                autoComplete="tel"
                name="mobilePhone"
                className={
                  formErrors.mobilePhone.length > 0 ? 'input error' : 'input'
                }
                placeholder="N??mero de Celular"
                noValidate
                maxLength="12"
                onChange={(e) => {
                  this.handleOnChange(e)
                  this.handleValidation(e)
                }}
                defaultValue={phone}
                tabIndex="7"
                disabled={!email}
              />
              <label htmlFor="mobilePhone" className="label">
                N??mero de Celular
              </label>
              {formErrors.mobilePhone.length > 0 && (
                <span className="error">{formErrors.mobilePhone}</span>
              )}
            </div>
          </div>

          <div className="row three">
            <div className="sign-profile_update-form-group">
              <select
                name="country"
                className="input input-minimal"
                value={country || 'default'}
                onChange={(e) => {
                  this.handleOnChange(e)
                  this._getUbigeo(e, 'department')
                  this.handleValidation(e)
                }}
                tabIndex="8"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="260000">Per??</option>
              </select>
              <label htmlFor="Pa??s" className="label">
                Pa??s
              </label>
            </div>
            <div className="sign-profile_update-form-group">
              <select
                name="department"
                className="input input-minimal"
                value={department || 'default'}
                onChange={(e) => {
                  this.handleOnChange(e)
                  this._getUbigeo(e, 'province')
                  this.handleValidation(e)
                }}
                tabIndex="9"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                {dataDepartments.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              <label htmlFor="Departamento" className="label">
                Departamento
              </label>
            </div>
            <div className="sign-profile_update-form-group">
              <select
                name="province"
                className="input input-minimal"
                value={province || 'default'}
                onChange={(e) => {
                  this.handleOnChange(e)
                  this._getUbigeo(e, 'district')
                  this.handleValidation(e)
                }}
                tabIndex="10"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                {dataProvinces.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <label htmlFor="Provincia" className="label">
                Provincia
              </label>
            </div>
          </div>

          <div className="row three">
            <div className="sign-profile_update-form-group">
              <select
                name="district"
                className="input input-minimal"
                value={district || 'default'}
                onChange={(e) => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
                tabIndex="11"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                {dataDistricts.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <label htmlFor="Distrito" className="label">
                Distrito
              </label>
            </div>
            <div className="sign-profile_update-form-group">
              <input
                type="text"
                inputMode="email"
                autoComplete="email"
                name="email"
                className={
                  formErrors.userEmail.length > 0 ? 'input error' : 'input'
                }
                placeholder="Correo electr??nico"
                noValidate
                maxLength="30"
                defaultValue={email}
                tabIndex="12"
                disabled={email !== null}
                onChange={(e) => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
              />
              <label htmlFor="email" className="label">
                Correo electr??nico
              </label>
              {formErrors.userEmail.length > 0 && (
                <span className="error">{formErrors.userEmail}</span>
              )}
            </div>
            <div className="sign-profile_update-form-group">
              <button
                className="signwall-inside_forms-btn"
                type="submit"
                style={{
                  color: mainColorBtn,
                  backgroundColor: mainColorLink,
                }}
                disabled={!hasChange || loading || hasError}
                tabIndex="13">
                {textSubmit}
              </button>
            </div>
          </div>
        </form>

        {showModalConfirm && (
          <Modal size="mini" position="middle" bgColor="white">
            <div className="text-right">
              <button
                type="button"
                onClick={(e) => this.togglePopupModalConfirm(e)}>
                <Close />
              </button>
            </div>

            <form
              className="sign-profile_update-form-grid"
              onSubmit={(e) => this.submitConfirmPassword(e)}>
              <p
                style={{
                  lineHeight: '28px',
                }}
                className="signwall-inside_forms-text mt-10 mb-10 center">
                Para realizar los cambios, por favor ingresa tu contrase??a
              </p>

              <div
                className="sign-profile_update-form-group"
                style={{
                  width: '100%',
                  margin: '10px 0px',
                }}>
                <input
                  type="password"
                  name="currentPassword"
                  className={
                    formErrorsConfirm.currentPassword.length > 0
                      ? 'input error'
                      : 'input'
                  }
                  placeholder="Contrase??a"
                  noValidate
                  maxLength="50"
                  autoComplete="off"
                  onChange={(e) => {
                    this.setState({ currentPassword: e.target.value })
                    this.changeValidationConfirm(e)
                  }}
                />
                <label htmlFor="currentPassword" className="label">
                  Contrase??a
                </label>
                {formErrorsConfirm.currentPassword.length > 0 && (
                  <span className="error">
                    {formErrorsConfirm.currentPassword}
                  </span>
                )}
              </div>

              <button
                className="signwall-inside_forms-btn"
                type="submit"
                disabled={sending}
                style={{ color: mainColorBtn, backgroundColor: mainColorLink }}>
                {sendingConfirmText}
              </button>
            </form>
          </Modal>
        )}
      </>
    )
  }
}

export default UpdateProfile
