import styled from 'styled-components';
import { devices } from '../../_dependencies/devices'



const Form = Component => {
  return styled(Component)`
  display:flex;
  width: 100%;
  padding: 4em 2em;
  flex-direction: row;

  @media (${devices.mobile}) {
      width: 100%;
      padding: 2.5em;
  }   
  `
}

const FormContactUsContainter = styled.section`
  width:100%;
  max-width:1100px;
  height:auto;
  background-color: #fff;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
  margin: 4em auto;
  display:flex;
  flex-direction:row;
  @media(${devices.mobile}){
      box-shadow:none;
  }
`

const FormPicture = styled.picture`
  // width:40%;
  width:400px;
  @media(${devices.mobile}){
      display:none;
  }  
`

const FormImg = styled.img`
  width:100%;
`

const WrapField = styled.div`
  min-width: 250px;
  // max-width: 250px;
  @media (${devices.mobile}) {
    width: 100%;
    max-width: 100%;
  }
`

const ContentRow = styled.div`
    width: 50%;
    height: auto;
    padding: 0px 10px;
    @media (${devices.mobile}) {
        width: 100%;
    }
    @media (${devices.tablet}) {
        width: 100%;
    }       
`

const Center = styled.div`
    width:100%;
`

const Thanks = styled.div`
    width: 100%;
    height: auto;
    max-width: 230px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ThanksImg = styled.img`
    width: 26%;
    height: auto;
    background: white;
    border-radius: 50%;
    padding: 1em;
    border: .4em solid #7ac043;
    margin: 0 auto 2em;
`
const ThanksTitle = styled.h3`
    margin:0;
    font-size: 2em;
    font-weight: 300;
`
const ThanksContent = styled.p`
    font-size: 1.1em;
    line-height: 1.4em;
`
const ThanksBtn = styled.a`
    color: white;
    font-size: .9em;
    border-radius: 2px;
    background-color: #2768b2;
    text-transform: uppercase;
    padding: 1em 5em;
    font-weight: 600;
    box-shadow: 0px 1px 2px 1px #2768b261;
    cursor: pointer;
    text-decoration: none;
`

export {
  Form,
  FormContactUsContainter,
  FormPicture,
  FormImg,
  WrapField,

  Thanks,
  ThanksImg,
  ThanksTitle,
  ThanksContent,
  ThanksBtn,
  ContentRow,
  Center
}
