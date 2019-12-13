import React, { Component } from 'react'

const classes = {
  cinemaCard: 'cinema-card bg-white',
  container: 'position-relative',
  gradient: 'cinema-card__gradient w-full position-absolute bottom-0 left-0',
  category: `cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none`,
  link: 'cinema-card__link text-gray-300',
  figure: 'cinema-card__figure overflow-hidden',
  image: 'w-full h-full object-cover',
  detail: `cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20`,
  premiere: 'cinema-card__premiere text-xl line-h-xs font-bold',
  movieTitle: 'cinema-card__p-title overflow-hidden title-xs text-white',
  movieLink: 'cinema-card__p-link font-bold text-white line-h-xs',
  moviesList: 'cinema-card__movies-list p-10',
  title: `cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none`,
  form: 'text-right',
  selectsContainer: 'mb-10',
  select: 'cinema-card__select w-full primary-font mb-10 pl-10 text-xs',
  option: 'cinema-card__option bg-white',
  button: `cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm`,
}

const BASE_PATH = '/cartelera'
const FORM_ACTION = `${BASE_PATH}/search`

class CardCinemaBillboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieSelected: '',
      cinemaSelected: '',
    }
  }

  handleMovieSelected(event) {
    this.setState({ movieSelected: event.target.value })
  }

  handleCinemaSelected(event) {
    this.setState({ cinemaSelected: event.target.value })
  }

  handleSubmit(event) {
    const { movieSelected, cinemaSelected } = this.state

    const moviePath = movieSelected || 'peliculas'
    const cinemaPath = cinemaSelected || 'cines'

    const fullPath =
      !movieSelected && !cinemaSelected ? '' : `${moviePath}/${cinemaPath}`

    window.location.href = `${BASE_PATH}/${fullPath}`
    event.preventDefault()
  }

  render() {
    const { movieSelected, cinemaSelected } = this.state || {}

    const {
      billboardData: { moviesList = [], cinemasList = [] } = {},
      premiereAlt,
      premiereImg,
      premiereTitle,
      premiereUrl,
    } = this.props

    return (
      <div className={classes.cinemaCard}>
        <article className={classes.container}>
          <span className={classes.gradient} />
          <h3 className={classes.category}>
            <a className={classes.link} href={BASE_PATH}>
              Cartelera
            </a>
          </h3>
          <figure className={classes.figure}>
            <a href={`${BASE_PATH}/${premiereUrl}`}>
              <img
                src={premiereImg}
                alt={premiereAlt}
                className={classes.image}
              />
            </a>
          </figure>
          <div className={classes.detail}>
            <p className={classes.premiere}>Estreno</p>
            <h2 className={classes.movieTitle}>
              <a
                className={classes.movieLink}
                href={`${BASE_PATH}/${premiereUrl}`}>
                {premiereTitle}
              </a>
            </h2>
          </div>
        </article>
        <div className={classes.moviesList}>
          <h4 className={classes.title}>Vamos al cine</h4>
          <form
            action={FORM_ACTION}
            method="post"
            className={classes.form}
            onSubmit={e => this.handleSubmit(e)}>
            <div className={classes.selectsContainer}>
              <select
                name="movie"
                className={classes.select}
                value={movieSelected}
                onChange={e => this.handleMovieSelected(e)}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className={classes.option}>
                  PELÍCULAS
                </option>
                {moviesList.map(movie => (
                  <option
                    value={movie.url}
                    className={classes.option}
                    key={movie.mid}>
                    {movie.title}
                  </option>
                ))}
              </select>
              <select
                name="theater"
                className={classes.select}
                value={cinemaSelected}
                onChange={e => this.handleCinemaSelected(e)}>
                <option
                  value=""
                  defaultValue
                  disabled
                  className={classes.option}>
                  CINES
                </option>
                {cinemasList.map(cinema => (
                  <option
                    value={cinema.url}
                    className={classes.option}
                    key={cinema.cid}>
                    {cinema.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={classes.button}>
              Buscar
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default CardCinemaBillboard
