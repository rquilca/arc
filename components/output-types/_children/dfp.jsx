/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const getSectionSlug = (sectionId = '') => {
  return sectionId.split('/')[1] || ''
}

const Dfp = ({ isFuature, adId }) => {
  const {
    siteProperties = {},
    globalContent = {},
    requestUri,
    metaValue,
    arcSite,
  } = useFusionContext()

  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`

  const lazyLoadFunction = `"use strict";window.addLazyLoadToAd=function(e){if("IntersectionObserver"in window){var n=(e||{}).adId;if(n)return new Promise(function(e){var o=new IntersectionObserver(function(n,o){n.forEach(function(n){n.isIntersecting&&(console.log("resolved!!!!"),e(),o.unobserve(n.target))})},{rootMargin:"0px 0px 500px 0px"});document.getElementById(n)&&o.observe(document.getElementById(n))})}};`

  const {
    section_id: sectionId,
    _id,
    taxonomy: {
      primary_section: { path: primarySection } = {},
      tags = [],
    } = {},
  } = globalContent

  let contentConfigValues = {}
  let page = ''
  let flagsub = false
  switch (metaValue('id')) {
    case 'meta_section':
      if (sectionId || _id) {
        contentConfigValues = {
          page: 'sect',
          sectionSlug: getSectionSlug(sectionId || _id),
        }
      } else {
        contentConfigValues = {
          page: 'sect',
          sectionSlug: getSectionSlug(requestUri),
        }
        flagsub = true
      }
      page = 'sect'

      break
    case 'meta_story':
      if (primarySection) {
        contentConfigValues = {
          page: 'post',
          sectionSlug: getSectionSlug(primarySection),
        }
      } else {
        contentConfigValues = {
          page: 'post',
          sectionSlug: 'default',
        }
      }
      page = 'post'
      break
    case 'meta_home':
      contentConfigValues = {
        page: 'home',
      }
      page = 'home'
      break
      case 'meta_tag':
        contentConfigValues = {
          page: 'sect',
          sectionSlug: 'default',
        }
        page = 'sect'
        flagsub=true
        break
    default:
      contentConfigValues = {
        page: 'sect',
        sectionSlug: 'default',
      }
      break
  }

  const formatAdsCollection = response => {
    const { espacios: spaces = [] } = response || {}

    const getTmpAdFunction = `var getTmpAd=function getTmpAd(){var tmpAdTargeting=window.location.search.match(/tmp_ad=([^&]*)/)||[];return tmpAdTargeting[1]||''}`
    const getAdsDisplayFunction = `var getAdsDisplay=function getAdsDisplay(){var IS_MOBILE=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);return IS_MOBILE?'mobile':'desktop'}`
 
    const sectionValues = (page==='home'|| page==='post')?(primarySection || sectionId || _id|| '').split('/'):(primarySection || sectionId || _id || requestUri || '').split('/')
    const section = sectionValues[1] || ''
    const subsection = flagsub?'':sectionValues[2] || ''
    const { siteUrl = '' } = getProperties(arcSite) || {}
    const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
    const adsCollection = spaces.map(
      ({
        space,
        slotname,
        slotname2,
        dimensions,
        dimensions_mobile: dimensionsMobile,
        islazyload,
      }) => {
        const formatSpace = {
          id: `gpt_${space}`,
          slotName: (arcSite === 'publimetro') ? slotname : slotname2,
          dimensions: `<::getAdsDisplay() === 'mobile' ? ${dimensionsMobile} : ${dimensions}::>`,
          targeting: {
            publisher: arcSite,
            seccion: section,
            categoria: subsection,
            fuente: 'WEB',
            tipoplantilla: page,
            phatname: `${siteUrl}${requestUri}`,
            tags: targetingTags,
            ab_test: '',
            tmp_ad: '<::getTmpAd()::>',
          },
        }
        if (islazyload) {
          formatSpace.prerender = '<::window.addLazyLoadToAd::>'
        }
        return formatSpace
      }
    )

    //PUBLIMETRO
// return `"use strict";
// document.addEventListener('DOMContentLoaded', function() {
//     "use strict";
//     var arcAds = new ArcAds({
//         dfp: {
//             id: "28253241"
//         }
//     }, function(d) {
//         console.log("Advertisement has loaded...", d)
//     });
//     "use strict";
//     window.addLazyLoadToAd = function(e) {
//         if ("IntersectionObserver" in window) {
//             var n = (e || {}).adId;
//             if (n) return new Promise(function(e) {
//                 var o = new IntersectionObserver(function(n, o) {
//                     n.forEach(function(n) {
//                         n.isIntersecting && (console.log("resolved!!!!"), e(), o.unobserve(n.target))
//                     })
//                 }, {
//                     rootMargin: "0px 0px 500px 0px"
//                 });
//                 document.getElementById(n) && o.observe(document.getElementById(n))
//             })
//         }
//     };
//     var getTmpAd = function getTmpAd() {
//         var tmpAdTargeting = window.location.search.match(/tmp_ad=([^&]*)/) || [];
//         return tmpAdTargeting[1] || ''
//     };
//     var getAdsDisplay = function getAdsDisplay() {
//         var IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);
//         return IS_MOBILE ? 'mobile' : 'desktop'
//     };
//     window.adsCollection = [{
//         "id": "gpt_top",
//         "slotName": "publimetro_home_web_top",
//         "dimensions": [[
//             [1, 1],
//             [970, 250],
//             [970, 90],
//             [728, 90]]
//         ],
//         "targeting": {
//             "publisher": "publimetro",
//             "seccion": "",
//             "categoria": "",
//             "fuente": "WEB",
//             "tipoplantilla": "home",
//             "phatname": "https://publimetro.pe/homepage?ref=pur",
//             "tags": [],
//             "ab_test": "",
//             "tmp_ad": getTmpAd()
//         },
//         "sizemap":{
//           "breakpoints":[[950,0]],
//           "refresh":true
//        },
//         "prerender": window.addLazyLoadToAd
//     },
//     {
//         "id": "gpt_laterall",
//         "slotName": "publimetro_home_web_laterall",
//         "dimensions":[
//             [[160, 600],[120, 600]],
//             [[120, 600]],
//             [[1, 1]]
//         ],
//         "targeting": {
//             "publisher": "publimetro",
//             "seccion": "",
//             "categoria": "",
//             "fuente": "WEB",
//             "tipoplantilla": "home",
//             "phatname": "https://publimetro.pe/homepage?ref=pur",
//             "tags": [],
//             "ab_test": "",
//             "tmp_ad": getTmpAd()
//         },
//         "sizemap":{
//             "breakpoints":[[1200, 0], [1100, 0], [0, 0]],
//            "refresh":true
//          },
//         "prerender": window.addLazyLoadToAd
//     }, 
//     {
//         "id": "gpt_lateralr",
//         "slotName": "publimetro_home_web_lateralr",
//         "dimensions": [
//             [[160, 600],[120, 600]],
//             [[120, 600]],
//             [[1, 1]]
//         ],
//         "targeting": {
//             "publisher": "publimetro",
//             "seccion": "",
//             "categoria": "",
//             "fuente": "WEB",
//             "tipoplantilla": "home",
//             "phatname": "https://publimetro.pe/homepage?ref=pur",
//             "tags": [],
//             "ab_test": "",
//             "tmp_ad": getTmpAd()
//         },
//         "sizemap":{
//           "breakpoints":[[1200, 0], [1100, 0], [0, 0]],
//          "refresh":true
//        },
//         "prerender": window.addLazyLoadToAd
//     }];
//     arcAds.registerAdCollection(window.adsCollection);
// });`




    // DEPOR
    return `"use strict";
    document.addEventListener('DOMContentLoaded', function() {
        "use strict";
        var arcAds = new ArcAds({
            dfp: {
                id: "28253241"
            }
        }, function(d) {
            console.log("Advertisement has loaded...", d)
        });
        "use strict";
        window.addLazyLoadToAd = function(e) {
            if ("IntersectionObserver" in window) {
                var n = (e || {}).adId;
                if (n) return new Promise(function(e) {
                    var o = new IntersectionObserver(function(n, o) {
                        n.forEach(function(n) {
                            n.isIntersecting && (console.log("resolved!!!!"), e(), o.unobserve(n.target))
                        })
                    }, {
                        rootMargin: "0px 0px 500px 0px"
                    });
                    document.getElementById(n) && o.observe(document.getElementById(n))
                })
            }
        };
        var getTmpAd = function getTmpAd() {
            var tmpAdTargeting = window.location.search.match(/tmp_ad=([^&]*)/) || [];
            return tmpAdTargeting[1] || ''
        };
        var getAdsDisplay = function getAdsDisplay() {
            var IS_MOBILE = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);
            return IS_MOBILE ? 'mobile' : 'desktop'
        };
        window.adsCollection = [{
            "id": "gpt_laterall",
            "slotName": "depor/web/home/laterall",
            "dimensions":[[ [160, 600] ], [ [120, 600] ], [ [0,0]]],
            "sizemap":{
              "breakpoints":[ [1280, 0], [1124, 0], [0, 0] ],
              "refresh":true
            },
            "targeting": {
                "publisher": "depor",
                "seccion": "",
                "categoria": "",
                "fuente": "WEB",
                "tipoplantilla": "home",
                "phatname": "https://depor.com/homepage?ref=depr",
                "tags": [],
                "ab_test": "",
                "tmp_ad": getTmpAd()
            },
            "prerender": window.addLazyLoadToAd
        }, 
        {
            "id": "gpt_lateralr",
            "slotName": "depor/web/home/lateralr",
            "dimensions":[[ [160, 600] ], [ [120, 600] ], [ [0,0]]],
            "sizemap":{
              "breakpoints":[ [1280, 0], [1124, 0], [0, 0] ],
              "refresh":true
          },
            "targeting": {
                "publisher": "depor",
                "seccion": "",
                "categoria": "",
                "fuente": "WEB",
                "tipoplantilla": "home",
                "phatname": "https://depor.com/homepage?ref=depr",
                "tags": [],
                "ab_test": "",
                "tmp_ad": getTmpAd()
            },
            "prerender": window.addLazyLoadToAd
        }, 
        {
            "id": "gpt_top",
            "slotName": "depor/web/home/top",
            "dimensions": [
                [1, 1],
                [970, 250],
                [970, 90],
                [728, 90]
            ],
            "targeting": {
                "publisher": "depor",
                "seccion": "",
                "categoria": "",
                "fuente": "WEB",
                "tipoplantilla": "home",
                "phatname": "https://depor.com/homepage?ref=depr",
                "tags": [],
                "ab_test": "",
                "tmp_ad": getTmpAd()
            },
            "prerender": window.addLazyLoadToAd
        }];
        arcAds.registerAdCollection(window.adsCollection);
    });`
  }

  return (
    <>
      {(  arcSite === 'publimetro' ||  
          arcSite === 'depor'||  
          arcSite === 'elcomercio' || 
          arcSite === 'elcomerciomag' || 
          arcSite === 'peru21' || 
          arcSite === 'gestion' || 
          arcSite === 'peru21g21' ||
          arcSite === 'diariocorreo' || 
          arcSite === 'ojo' ||
          arcSite === 'elbocon' ||
          arcSite === 'trome'
          ) && (
        <Content
          {...{
            contentService: 'get-dfp-spaces',
            contentConfigValues,
          }}>
          {content =>
            isFuature ? (
              <div id={`gpt_${adId}`} className="flex justify-center"></div>
            ) : (
              <>
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: formatAdsCollection(content, requestUri),
                  }}
                />
                <script
                  defer
                  src="https://d1r08wok4169a5.cloudfront.net/gpt-adtmp/gpt-adtmp.js"
                />
              </>
            )
          }
        </Content>
      )}
    </>
  )
}

export default Dfp
