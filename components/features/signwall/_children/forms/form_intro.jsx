/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown/with-html'
import * as S from './styles'
import { ModalConsumer } from '../context'
import Loading from '../loading'
import Domains from '../../_dependencies/domains'
import Taggeo from '../../_dependencies/taggeo'

export const FormIntro = ({
  getContent,
  arcSite,
  typeDialog,
  removeBefore = i => i,
  checkModal = i => i,
}) => {
  const [showLoading, setShowLoading] = useState(true)
  const [showPaywallBtn, setShowPaywallBtn] = useState(false)
  const [resCampaing, setResCampaing] = useState({})
  const [showFree, setShowFree] = useState(null)

  useEffect(() => {
    const { fetched } = getContent('paywall-campaing')
    fetched.then(resCam => {
      const getPLanSelected = resCam.plans.reduce((prev, plan) => {
        return plan.description.checked ? plan : prev
      }, {})

      setResCampaing({
        paywallPrice: getPLanSelected.amount || '-',
        paywallFrecuency: getPLanSelected.billingFrequency || '-',
        paywallTitle:
          (getPLanSelected.description && getPLanSelected.description.title) ||
          '-',
        paywallDescripcion:
          (getPLanSelected.description &&
            getPLanSelected.description.description) ||
          '-',
        featuresDescription: resCam.summary.feature || [],
        printAttributes: resCam.printAttributes || [],
      })
      setShowFree(getPLanSelected.amount === 0)
      setShowLoading(false)
    })
  }, [])

  useEffect(() => {
    if (window.Identity.userProfile || window.Identity.userIdentity.uuid) {
      setShowPaywallBtn(true)
    }
  }, [])

  const frecuency = {
    Month: 'al mes',
    Year: 'al año',
  }

  const handleSuscription = () => {
    switch (typeDialog) {
      case 'premium':
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.location.pathname ? window.location.pathname : ''
        )
        break
      case 'paywall':
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.location.pathname ? window.location.pathname : ''
        )
        break
      default:
        window.sessionStorage.setItem('paywall_last_url', '/')
    }

    removeBefore() // dismount before
    window.sessionStorage.setItem('paywall_type_modal', typeDialog)
    window.location.href = Domains.getUrlPaywall(arcSite)
  }

  return (
    <ModalConsumer>
      {value => (
        <S.Form typeDialog={typeDialog}>
          {showLoading ? (
            <Loading arcSite={arcSite} typeBg="wait" typeDialog={typeDialog} />
          ) : (
            <>
              <S.ContPaywall>
                <div className="cont-price-detail">
                  {showFree ? (
                    <div className="price-middle">
                      <h3>Gratis</h3>
                    </div>
                  ) : (
                    <div className="price">
                      <i>s/</i>
                      {resCampaing.paywallPrice}
                    </div>
                  )}
                  <div
                    className={
                      showFree ? 'detail-price-middle' : 'detail-price'
                    }>
                    {!showFree && (
                      <p>
                        <strong>
                          {frecuency[resCampaing.paywallFrecuency]}
                        </strong>
                      </p>
                    )}
                    <p>
                      <strong>{resCampaing.paywallTitle}</strong>
                    </p>
                    <p>{resCampaing.paywallDescripcion}</p>
                  </div>
                </div>

                {typeDialog !== 'premium' ? (
                  <>
                    <h3 className="title-line line-gestion uppercase text-center mt-30 mb-20">
                      <span>Beneficios</span>
                    </h3>

                    <ul className="list-benefits mb-20">
                      {resCampaing.featuresDescription.map(item => {
                        return <li key={item}>{item}</li>
                      })}
                    </ul>
                  </>
                ) : (
                  <div className="mt-20 block"></div>
                )}
              </S.ContPaywall>

              {showPaywallBtn ? (
                <S.Button
                  type="button"
                  onClick={() => {
                    Taggeo(
                      `Web_${typeDialog}_Hard`,
                      `web_${typeDialog}_boton_ver_planes`
                    )
                    handleSuscription()
                  }}>
                  VER PLANES
                </S.Button>
              ) : (
                <S.Button
                  type="button"
                  onClick={() => {
                    Taggeo(
                      `Web_${typeDialog}_Hard`,
                      `web_${typeDialog}_boton_iniciar_continuar`
                    )

                    if (typeDialog === 'premium') {
                      window.sessionStorage.setItem(
                        'paywall_last_url',
                        window.location.pathname ? window.location.pathname : ''
                      )
                    } else {
                      window.sessionStorage.setItem(
                        'paywall_last_url',
                        window.document.referrer
                          ? window.document.referrer.split(
                              window.location.origin
                            )[1]
                          : ''
                      )
                    }
                    value.changeTemplate('login')
                    checkModal()
                  }}>
                  CONTINUAR
                </S.Button>
              )}

              <S.Text
                c="gray"
                s={typeDialog === 'premium' ? '12' : '15'}
                className="mt-20 mb-10 center">
                {resCampaing.printAttributes.map(item => {
                  if (item.name === 'subscriber_title_popup') {
                    return item.value
                  }
                  return null
                })}
              </S.Text>

              <S.Text
                c="gray"
                s={typeDialog === 'premium' ? '12' : '15'}
                className={`center note-premium ${
                  arcSite === 'elcomercio' ? 'mb-10' : ''
                }`}>
                {resCampaing.printAttributes.map(item => {
                  if (item.name === 'subscriber_detail_popup') {
                    return (
                      <div className="sub-paragraph">
                        <Markdown
                          source={item.value}
                          escapeHtml={false}
                          unwrapDisallowed
                          disallowedTypes={['paragraph']}
                        />
                      </div>
                    )
                  }
                  return null
                })}
              </S.Text>
            </>
          )}
        </S.Form>
      )}
    </ModalConsumer>
  )
}
