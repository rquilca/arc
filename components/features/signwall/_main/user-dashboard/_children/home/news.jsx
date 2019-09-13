import React, { Component } from 'react'
import { WrapperBlock } from './styles'
import Services from '../../../utils/services'
import Loading from '../../../common/loading'

const services = new Services()

// eslint-disable-next-line import/prefer-default-export
class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsletters: [],
      checksNews: [],
      loading: true,
    }
  }

  componentDidMount() {
    // const UUID = 'f058d956-b390-43f2-88fa-e1694212c697' // JORGE
    const UUID = window.Identity.userIdentity.uuid
    const SITE = 'gestion'
    const localNews = JSON.parse(
      window.sessionStorage.getItem('preferencesNews')
    )

    const listAllNews = { ...[] }

    services.getNewsLetters().then(resNews => {
      resNews[SITE].map(item => {
        listAllNews[item.code] = false
        return null
      })

      this.setState({
        newsletters: resNews[SITE] || [],
        checksNews: listAllNews,
      })

      if (localNews && localNews.length >= 1) {
        localNews.map(item => {
          this.setState(prevState => ({
            checksNews: {
              ...prevState.checksNews,
              [item]: true,
            },
            loading: false,
          }))

          return null
        })
      } else {
        services.getNewsLettersUser(UUID, SITE).then(res => {
          if (res.data.length >= 1) {
            res.data.map(item => {
              this.setState(prevState => ({
                checksNews: {
                  ...prevState.checksNews,
                  [item]: true,
                },
                loading: false,
              }))

              return null
            })
          }
          this.setState({
            loading: false,
          })
        })
      }
    })
  }

  showNewsletters = () => {
    const btnNews = document.getElementById('btn-menu-newsleters')
    if (btnNews) btnNews.click()
  }

  render() {
    const { newsletters, checksNews, loading } = this.state
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <WrapperBlock nopadding nobackground nocolumn>
        <div className="left">
          <h3>Newsletters</h3>
        </div>
        <div className="right">
          {!loading ? (
            <div className="container-grid">
              {newsletters.map(
                itemNews =>
                  checksNews[itemNews.code] && (
                    <div className="item item1" key={itemNews.code}>
                      <img src={itemNews.image} alt="demo" />
                      <div className="title">{itemNews.name}</div>
                    </div>
                  )
              )}

              <button
                type="button"
                className="add-item"
                onClick={() => this.showNewsletters()}>
                <span className="icon-plus">&#43;</span>
                Personaliza tus newsletters
              </button>
            </div>
          ) : (
            <Loading site="gestion" />
          )}
        </div>
      </WrapperBlock>
    )
  }
}

export { News }
