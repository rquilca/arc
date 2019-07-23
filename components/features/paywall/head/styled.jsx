import styled, { ThemeProvider } from 'styled-components'
import { devices } from '../_dependencies/devices'

const Head = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  max-width: 1120px;
  height: 100%;
  background-color: ${({ theme }) => theme.colorPrimary};
`

const WrapLogin = styled.div`
  background-color: #000;
  height: 100%;
  color: #fff;
  align-items: center;
  display: flex;
  @media (${devices.mobile}) {
    max-width: 40%;
  }
`

const Username = styled.span`
  padding-left: 45px;
`

const Background = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  display: flex;
  z-index: -1;
`

const Left = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colorPrimary};
`

const Right = styled.div`
  flex: 1;
  background-color: #000;
`
const Img = styled.img`
  @media (${devices.mobile}) {
    max-height: 26px;
  }
`

export {
  ThemeProvider,
  Head,
  Content,
  WrapLogin,
  Username,
  Background,
  Left,
  Right,
  Img,
}
