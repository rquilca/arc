import React, { PureComponent } from 'react'
import { defaultImage, getUrlParameter } from '../../../../utilities/helpers'

const classes = {
  elementsSlider: 'story-gallery-slider p-20 bg-primary',
  body: 'position-relative overflow-hidden ',
  content: 'story-gallery-slider__content flex',
  element: '',
  image: 'story-gallery-slider__img w-full object-fit-cover',
  caption: 'story-gallery-slider__caption pt-20 pb-20 flex',
  captionImage:
    'story-gallery-slider__caption-image pt-10 pl-15 text-sm text-white secondary-font line-h-sm',
  quantity:
    'story-gallery-slider__quantity title-xs flex items-center justify-center',
  arrowsBox:
    'story-gallery-slider__arrows-box position-absolute top-0 flex w-full items-center justify-between pl-20 pr-20',
  leftArrow: 'story-gallery-slider__arrows icon-left text-white title-lg',
  rightArrow: 'story-gallery-slider__arrows icon-right text-white title-lg',
}

class StoryHeaderChildGallerySlider extends PureComponent {
  constructor(props) {
    super(props)
    const {
      contentElementGallery: { content_elements: contentElements = [] },
    } = props || {}

    this.state = {
      dataSlider: contentElements,
      steps: contentElements.length,
      sliderWidth: contentElements.length * 100,
      slideWidth: 100 / contentElements.length,
      position: getUrlParameter(contentElements),
    }

    this.step = getUrlParameter()
  }

  componentDidMount() {
    document.addEventListener('keydown', event => {
      this._controlKeysSlider(event)
    })
  }

  setDefault(size) {
    const { deployment, contextPath, arcSite } = this.props
    return defaultImage({ deployment, contextPath, arcSite, size })
  }

  _controlKeysSlider = e => {
    if (e.keyCode === 39) this._handleNextSlider()
    else if (e.keyCode === 37) this._handlePrevSlider()
  }

  _handlePrevSlider = () => {
    const { steps, slideWidth } = this.state
    this.step -= 1
    if (this.step < 0) this.step = steps - 1
    this.setState({
      position: -slideWidth * this.step,
    })

    window.history.pushState(null, '', this._getUrlGalleryImage())
  }

  _handleNextSlider = () => {
    const { steps, slideWidth, dataSlider } = this.state
    this.step += 1

    if (dataSlider.length <= this.step) {
      window.location.href = '/'
    }

    if (this.step >= steps) this.step = 0
    this.setState({
      position: -slideWidth * this.step,
    })

    window.history.pushState(null, '', this._getUrlGalleryImage())
  }

  _getUrlGalleryImage = () => {
    const pathFoto = `${window.location.href.split('?')[0]}?foto=${this.step +
      1}`
    return pathFoto
  }

  render() {
    const { dataSlider = [], sliderWidth, slideWidth, position } = this.state

    const sliderStyle = {
      width: `${sliderWidth}%`,
      transform: `translateX(${position}%)`,
    }
    const slideStyle = {
      width: `${slideWidth}%`,
    }
    return (
      <>
        {dataSlider.length > 0 && (
          <section className={classes.elementsSlider} id="story-galery">
            <div
              role="slider"
              aria-valuenow={dataSlider.length}
              aria-valuemin="1"
              aria-valuemax="10"
              className={classes.body}>
              <>
                <ul style={sliderStyle} className={classes.content}>
                  {dataSlider.map((element, i) => (
                    <li
                      key={element._id}
                      style={slideStyle}
                      className={classes.element}>
                      <figure>
                        <img
                          src={element.resized_urls ? '' : element.url}
                          alt={element.subtitle}
                          className={classes.image}
                        />
                        <figcaption className={classes.caption}>
                          <span className={classes.quantity}>
                            {i + 1}/{dataSlider.length}
                          </span>
                          <p className={classes.captionImage}>
                            {element.subtitle}
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
                {dataSlider && dataSlider.length > 1 && (
                  <div role="navigation" className={classes.arrowsBox}>
                    <i
                      role="button"
                      tabIndex="0"
                      className={classes.leftArrow}
                      onClick={this._handlePrevSlider}
                      onKeyDown={this._controlKeysSlider}
                    />
                    <i
                      role="button"
                      tabIndex="0"
                      id="icon-right"
                      className={classes.rightArrow}
                      onClick={this._handleNextSlider}
                      onKeyDown={this._controlKeysSlider}
                    />
                  </div>
                )}
              </>
            </div>
          </section>
        )}
      </>
    )
  }
}

export default StoryHeaderChildGallerySlider
