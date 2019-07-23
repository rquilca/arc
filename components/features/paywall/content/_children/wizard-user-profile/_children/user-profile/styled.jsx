import React from 'react'
import styled from 'styled-components'
import { devices } from '../../../../../_dependencies/devices'

export const Select = styled.select`
  background-color: #fff;
  border: 0;
  min-width: 40px;
`

const Wrap = styled.div`
  flex-wrap: wrap;
  width: 530px;
  display: flex;
  justify-content: space-between;
  @media (${devices.mobile}) {
    width: 100%;
  }
`

const Title = styled.span`
  line-height: 16px;
  font-size: 16px;
  font-weight: 700;
`

const WrapTitle = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 30px;
  justify-content: flex-start;
  width: 100%;
`

const Form = Component => {
  return styled(Component)`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (${devices.mobile}) {
      padding: 30px;
    }
  `
}

export const WrapField = styled.div`
  min-width: 250px;
  max-width: 250px;
  @media (${devices.mobile}) {
    width: 100%;
  }
`
const WrapError = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  display: flex;
  border-radius: 4px;
  background-color: rgba(219, 0, 0, 0.1);
`

const ErrorMessage = styled.span`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  text-align: center;
  line-height: 22px;
  letter-spacing: normal;
  color: #db0000;
`

const Error = styled(({ message, children, className }) => {
  return (
    <WrapError className={className}>
      <ErrorMessage>{message || children}</ErrorMessage>
    </WrapError>
  )
})`
  margin-bottom: ${props => props.marginBottom || props.mb};
`

export { Wrap, Form, Title, WrapTitle, Error }
