import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const classes = {
  lista: 'List',
  header: 'List__Header',
  title: 'List__title',
  moreNews: 'List__morenews',
  listItem: 'List__listItems',
  itemNews: 'List__itemNews',
  time: 'List__time',
  pageLink: 'List__pageLink',
  bold: 'bold',
  scrolY: 'scroll-vertical',
}
const HeaderList = ({ titleList, background, seeMore, seeMoreurl }) => {
  return (
    <div className={classes.header + ' ' + background}>
      <div className={classes.title}>
        <h4>{titleList} </h4>
      </div>
      {seeMore && <SeeMore seeMoreurl={seeMoreurl} />}
    </div>
  )
}

const SeeMore = ({ seeMoreurl }) => (
  <div className={classes.moreNews}>
    <a href={seeMoreurl}>
      <h4>ver mas</h4>
    </a>
  </div>
)
const ImageNews = ({ urlNews, promo_items }) => {
  let imagen = promo_items.basic ? promo_items.basic.url || '' : ''
  return (
    <figure>
      {imagen ? (
        <a href={urlNews}>
          <picture>
            <source
              data-type="srcset"
              srcSet={imagen}
              media="(max-width: 639px)"
            />
            <img datatype="src" src={imagen} />
          </picture>
        </a>
      ) : null}
    </figure>
  )
}

const TimeItem = ({ time }) => <div className={classes.time}>{time}</div>

const ItemNews = ({
  seeHour,
  seeImageNews,
  time,
  title,
  urlNews,
  promo_items,
}) => {
  return (
    <article className={classes.itemNews}>
      {seeImageNews && (
        <ImageNews urlNews={urlNews} promo_items={promo_items} />
      )}
      {seeHour && <TimeItem time={time} />}
      <div className={classes.pageLink}>
        <a href={urlNews}>
          <h3 className={classes.bold}>{title}</h3>
        </a>
      </div>
    </article>
  )
}
const ListItemNews = ({ seeHour, seeImageNews, listNews }) => {
  let classListItems =
    listNews.length > 4
      ? classes.listItem + ' ' + classes.scrolY
      : classes.listItem
  

  return (
    <div className={classListItems}>
      {listNews.map(
        (
          { display_date, headlines: { basic }, canonical_url, promo_items },
          index
        ) => {
          let fechaPublicacion = new Date(display_date)
          let time = ''

          let fechapresente = new Date().getTime()

          if (
            (fechapresente - new Date(display_date).getTime()) /
              1000 /
              60 /
              60 >=
            24
          ) {
            time =
              (fechaPublicacion.getDate() < 10
                ? '0' + fechaPublicacion.getDate()
                : fechaPublicacion.getDate()) +
              '/' +
              (fechaPublicacion.getMonth() < 10
                ? '0' + fechaPublicacion.getMonth()
                : fechaPublicacion.getMonth()) +
              '/' +
              fechaPublicacion.getFullYear()
          } else {
            time =
              fechaPublicacion.getHours() +
              ':' +
              fechaPublicacion.getMinutes() +
              '-'
          }

          return (
            <ItemNews
              key={index}
              seeHour={seeHour}
              seeImageNews={seeImageNews === true && index === 0 ? true : false}
              time={time}
              title={basic}
              urlNews={canonical_url}
              promo_items={promo_items || ''}
            />
          )
        }
      )}
    </div>
  )
}
@Consumer
class Lista extends Component {
  constructor(props) {
    super(props)

    var {
      titleList,
      background = '',
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      secction,
    } = this.props.customFields || {}

    this.state = {
      titleList,
      background,
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      secction,
      data: [],
    }
  }

  componentDidMount = () => {
    const { fetched } = this.getContent(
      'get-lis-news',
      {
        website: this.props.arcSite,
        secction: this.state.secction,
        newsNumber: this.state.newsNumber,
      },
      this.filterSchema()
    )
    fetched.then(response => {
      if (!response) {
        response = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      if (!response.content_elements) {
        response.content_elements = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      this.setState({
        data: response.content_elements,
      })
    })
  }

  filterSchema() {
    return `
    {
      content_elements{
        canonical_url
        website_url
        display_date
        promo_items{
          basic{
            url
          }
        }
        headlines{
          basic
        }
      }
    }
    `
  }

  render() {
    return (
      <div className={classes.lista}>
        <HeaderList
          titleList={this.state.titleList}
          background={this.state.background}
          seeMore={this.state.seeMore}
          seeMoreurl={this.state.seeMoreurl}
        />
        <ListItemNews
          seeHour={this.state.seeHour}
          seeImageNews={this.state.seeImageNews}
          listNews={this.state.data || []}
        />
      </div>
    )
  }
}

Lista.propTypes = {
  customFields: PropTypes.shape({
    titleList: PropTypes.string.isRequired.tag({ name: 'Título de la lista' }),
    secction: PropTypes.string.isRequired.tag({ name: 'Sección' }),
    background: PropTypes.oneOf(['bg-color--lightblue', 'bg-color--white']).tag(
      {
        name: 'Color de fondo cabecera',
        labels: {
          'bg-color--lightblue': 'celeste',
          'bg-color--white': 'blanco',
        },
        defaultValue: 'bg-color--lightblue',
      }
    ),

    newsNumber: PropTypes.number.tag({
      name: 'Número de noticas',
      defaultValue: 5,
    }),
    seeMore: PropTypes.bool.tag({ name: 'Ver más' }),
    seeHour: PropTypes.bool.tag({ name: 'Ver hora' }),
    seeImageNews: PropTypes.bool.tag({ name: 'Ver imagen' }),
    seeMoreurl: PropTypes.string.tag({ name: 'Ver más url' }),
  }),
}

export default Lista
