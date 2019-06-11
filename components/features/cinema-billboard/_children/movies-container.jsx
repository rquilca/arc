import React, { PureComponent } from 'react'
import MoviesSlider from './movies-slider'
import MoviesFilter from './movies-filter'
import MovieDetails from './movies-details'

const classes = {
  title: 'movies-container__title uppercase mt-20',
  container: 'movies-container',
}

class StaticCinemaBillboardChildMoviesContainer extends PureComponent {
  render() {
    const { data, params, type, deployment, contextPath, arcSite } = this.props
    // params = movie, cinema, genre
    const context = {
      deployment,
      contextPath,
      arcSite,
    }
    return (
      <>
        <h2 className={classes.title}>Cartelera</h2>
        <main className={classes.container}>
          <MoviesFilter data={{ ...data }} {...params} />

          {type === 'slider' && (
            <MoviesSlider data={{ ...data }} {...context} />
          )}
          {type === 'banner' && (
            <MovieDetails data={{ ...data }} {...context} {...params} />
          )}
        </main>
      </>
    )
  }
}

export default StaticCinemaBillboardChildMoviesContainer
