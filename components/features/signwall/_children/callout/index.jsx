import React, { useState } from 'react'
import useForm from '../../_dependencies/useForm'
import { Modal } from '../modal/index'
import { ContMiddle, SecondMiddle, CloseBtn } from '../landing/styled'
import * as S from '../forms/styles'
import { CheckBox } from '../forms/control_checkbox'
import { Input } from '../forms/control_input_select'
import { Close, MsgRegister } from '../iconos'

import {
  formatNames,
  formatPhone,
} from '../../../subscriptions/_dependencies/Errors'
import { pushCallOut } from '../../../subscriptions/_dependencies/Services'

const CallOut = props => {
  const { onClose, noBtnClose } = props
  const [showChecked, setShowChecked] = useState(false)
  const [showConfirmCall, setShowConfirmCall] = useState(false)
  const [showErrorCall, setShowErrorCall] = useState(false)

  const stateSchema = {
    namecall: { value: '', error: '' },
    phonecall: { value: '', error: '' },
    rterms: { value: '', error: '' },
  }

  const stateValidatorSchema = {
    namecall: {
      required: true,
      validator: formatNames(),
    },
    phonecall: {
      required: true,
      validator: formatPhone(),
    },
    rterms: {
      required: true,
      validator: {
        func: value => value !== '1',
        error: 'Para usar este servicio es necesario aceptar autorización',
      },
    },
  }

  const onFomrCallOut = ({ namecall, phonecall }) => {
    pushCallOut(namecall, phonecall)
      .then(resCall => {
        if (resCall.resultado) {
          setShowConfirmCall(true)
        } else {
          setShowErrorCall(resCall.mensaje)
        }
      })
      .catch(() => {
        setShowErrorCall(
          'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'
        )
      })
  }

  const {
    values: { namecall, phonecall },
    errors: {
      namecall: namecallError,
      phonecall: phonecallError,
      rterms: rtermsError,
    },
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onFomrCallOut)

  return (
    <Modal size="medium" position="middle">
      <ContMiddle hm="400">
        {!noBtnClose && (
          <CloseBtn
            type="button"
            onClick={() => {
              onClose()
            }}>
            <Close />
          </CloseBtn>
        )}
        <SecondMiddle>
          {showConfirmCall || showErrorCall ? (
            <S.Form>
              <div className="center block mb-20 mt-20">
                <MsgRegister bgcolor="#efdb96" />
              </div>

              {showConfirmCall && (
                <S.Title s="22" className="center mb-10">
                  Tus datos han sido enviados correctamente
                </S.Title>
              )}

              {showErrorCall && (
                <S.Title s="22" className="center mb-10">
                  Ocurrió un error
                </S.Title>
              )}

              {showConfirmCall && (
                <S.Title s="16" c="#6a6a6a" className="center">
                  en unos momentos uno de nuestros ejecutivos se pondrá en
                  contacto contigo
                </S.Title>
              )}

              {showErrorCall && (
                <S.Title s="16" c="#6a6a6a" className="center">
                  {showErrorCall}
                </S.Title>
              )}
            </S.Form>
          ) : (
            <S.Form onSubmit={handleOnSubmit}>
              <S.Title c="#404040" s="24" className="mb-10 mt-40 center">
                Ingresa tus datos
              </S.Title>

              <Input
                type="text"
                name="namecall"
                placeholder="Nombre*"
                autoComplete="on"
                maxLength="80"
                required
                value={namecall}
                onChange={e => {
                  handleOnChange(e)
                }}
                error={namecallError}
              />

              <Input
                type="text"
                name="phonecall"
                placeholder="Celular*"
                autoComplete="on"
                maxLength="9"
                required
                value={phonecall}
                onChange={e => {
                  handleOnChange(e)
                }}
                error={phonecallError}
              />

              <CheckBox
                checked={showChecked}
                value={showChecked ? '1' : '0'}
                name="rterms"
                onChange={e => {
                  handleOnChange(e)
                  setShowChecked(!showChecked)
                }}
                valid
                error={rtermsError}>
                <S.Text c="gray" lh="24" s="14" className="mt-20">
                  Autorizo el tratamiento de mis datos
                </S.Text>
              </CheckBox>

              <S.ButtonCall
                type="submit"
                className="mt-40 mb-10"
                disabled={disable}>
                Te llamamos
              </S.ButtonCall>
            </S.Form>
          )}
        </SecondMiddle>
      </ContMiddle>
    </Modal>
  )
}

export default CallOut
