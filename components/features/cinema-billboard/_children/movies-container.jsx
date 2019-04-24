import React, { PureComponent, Fragment } from 'react'
import MoviesSlider from './movies-slider'
import MoviesFilter from './movies-filter'
import MovieDetails from './movies-details'

class MoviesContainer extends PureComponent {
  classes = {
    title: 'movies-container__title text-uppercase margin-top',
    container: 'movies-container',
  }

  render() {
    const { data, params, type, contextPath, arcSite } = this.props // params = movie, cinema, genre
    return (
      <Fragment>
        <h2 className={this.classes.title}>Cartelera</h2>
        <main className={this.classes.container}>
          <MoviesFilter data={{ ...data }} {...params} />

          {type === 'slider' && <MoviesSlider data={{ ...data }} />}
          {type === 'banner' && (
            <MovieDetails
              data={{ ...data }}
              contextPath={contextPath}
              arcSite={arcSite}
              {...params}
            />
          )}
        </main>
      </Fragment>
    )
  }
}

MoviesContainer.label = 'Cartelera de Cine'

export default MoviesContainer
