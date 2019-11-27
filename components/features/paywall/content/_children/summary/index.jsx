import React from 'react'
import Panel from '../../../_children/panel'
import Bullet from '../../../_children/bullet-point'
import Icon from '../../../_children/icon'
import { useStrings } from '../../../_children/contexts'
import * as S from './styled'

const Summary = ({ overrides, elevation, summary, plan, event, arcSite }) => {
  let _plan = plan
  if (overrides) {
    // Sobreescribimos los valores de los atributos del plan
    // por los definidos en description
    const {
      displayFrequency: billingFrequency,
      displayAmount: amount,
      displayBanner: banner,
    } = plan.description
    let attrOverrides = {
      billingFrequency,
      amount,
      banner,
    }
    // eliminamos atributos indefinidos
    attrOverrides = JSON.parse(JSON.stringify(attrOverrides))
    // creamos plan con atributos sobreescritos
    _plan = { ...plan, ...attrOverrides }
  }
  const { amount, billingFrequency, description } = _plan

  return (
    <Panel elevation={elevation} type="summary">
      <S.Summary>
        <Footer {...summary} />
        <Content
          amount={amount}
          description={description}
          billingFrequency={billingFrequency}
          event={event}
          arcSite={arcSite}
        />
      </S.Summary>
    </Panel>
  )
}

const Content = ({
  amount = 0,
  description = {},
  billingFrequency,
  event,
  arcSite,
}) => {
  const msgs = useStrings()
  const frequency = {
    month: ` ${msgs.monthlyPeriod}`,
    year: ` ${msgs.yearlyPeriod}`,
  }
  return (
    <div>
      <S.Content>
        {event && (
          <p>
            Se efectuará un solo cobro por el año completo a <br /> S/{' '}
            {arcSite === 'gestion' ? '234' : '120'}. Válido hasta el 01/12/2019.
          </p>
        )}
        <S.Expand size={18} style={{ paddingTop: '20px' }}>
          <strong>
            <span>{msgs.totalLabel}</span>
          </strong>
          <strong>
            <S.Amount>
              <div>
                {(() =>
                  amount === 0 ? (
                    <span style={{ fontSize: '24px' }}>Gratis</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '14px' }}>S/ </span> {amount}
                      <span style={{ fontSize: '14px' }}>
                        {frequency[billingFrequency.toLowerCase()]}
                      </span>
                    </>
                  ))()}
              </div>
            </S.Amount>
          </strong>
        </S.Expand>
        {/* <S.Description>{description.cart}</S.Description> */}
        <S.Description>
          <strong>{description.title || ''}</strong>
        </S.Description>
        <S.Description>{description.description || ''}</S.Description>
      </S.Content>
    </div>
  )
}

const Footer = ({ title, feature }) => {
  const msgs = useStrings()
  return (
    <S.Footer>
      <S.WrapTitle>
        <S.SummaryTitle>{msgs.subscriptionDetail}</S.SummaryTitle>
        <S.NamePlan>{title}</S.NamePlan>
      </S.WrapTitle>
      {feature.map((text, index) => {
        const key = index
        return (
          <Bullet key={key} icon={<Icon type="check" fill="#FFF" />}>
            {text}
          </Bullet>
        )
      })}
    </S.Footer>
  )
}

export default Summary
