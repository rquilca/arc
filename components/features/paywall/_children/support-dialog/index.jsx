import React from 'react'
import { useFusionContext } from 'fusion:context'

import { devices } from '../../_dependencies/devices'
import Modal from '../modal'
import * as S from './styled'

const SupportDialog = props => {
  const { contextPath, deployment, siteProperties } = useFusionContext()
  const { assets } = siteProperties
  const supportImageUrl = deployment(
    `${contextPath}${assets.path}${assets.paywall.support}`
  )
  const fullAssets = assets.fullAssets.call(assets, contextPath, deployment)

  return (
    <Modal {...props}>
      <S.DialogContent>
        <picture>
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <source srcSet={fullAssets('support_webp')} type="image/webp" />
          <img src={fullAssets('support')} alt="support" />
        </picture>
        <S.ContentWrapper>
          <S.Title>Soporte</S.Title>
          <br />
          <S.Subtitle>
            Si tienes dudas o consultas, llámanos o envíanos un correo
          </S.Subtitle>
          <br />
          <S.Paragraph>
            <b>Central Telefónica:</b>
            <br />
            (+51) 311 5100
          </S.Paragraph>
          <br />
          <S.Paragraph>
            <b>Horario de atención:</b>
            <br />
            De lunes a viernes: 7 am - 2 pm <br />
            Sábados, domingos y feriados: de 7am - 1pm
          </S.Paragraph>
          <br />
          <S.Paragraph paragraph>
            <b>Correos:</b>
            <br />
            <span>
              - Servicio al cliente y Ventas: suscriptores@diariogestión.com.pe
            </span>
            <br />
            <span>- Pagos pendientes y Facturación: </span>
            <S.LongMail>cobranzas@suscripcionesintegrales.com.pe</S.LongMail>
            <br />
          </S.Paragraph>
        </S.ContentWrapper>
      </S.DialogContent>
    </Modal>
  )
}

export default SupportDialog
