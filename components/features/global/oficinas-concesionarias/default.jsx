import React, { Fragment, Component } from 'react'
import Data from './_children/datos.json'

class OficinasConcesionarias extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapa: {},
      allinfo: [],
      zonas: [],
      distritos: [],
      zoneValue: '',
      districtValue: '',
      districtDataOf: [],
      //      google: {},
    }
  }

  componentWillMount() {
    this.getGoogleMaps()
    this.setState({
      allinfo: Data,
    })
  }

  componentDidMount() {
    this.getGoogleMaps().then(google => {
      this.iniciarMapa()
      //this.createMarkers()
    })
    const { allinfo } = this.state
    this.changeSelectZonas(allinfo)
  }

  getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        window.resolveGoogleMapsPromise = () => {
          resolve(google)

          delete window.resolveGoogleMapsPromise
        }

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbwx4nd6vinEmC5nvaRt2GvwuOcktW_1E&callback=resolveGoogleMapsPromise`
        script.async = true
        document.body.appendChild(script)
      })
    }

    return this.googleMapsPromise
  }

  changeSelectZonas = data => {
    const zonas = Object.keys(data)
    this.setState({
      zonas,
    })
  }

  chargeListZonas = () => {
    const aZonas = this.state.zonas
    return aZonas.map(zona => (
      <option key={zona} value={zona}>
        {zona}
      </option>
    ))
  }

  changeDistritos = event => {
    const zone = event.target.value
    const distritos = Data[`${zone}`].zonaDistritos.map(distrito => {
      return distrito.nomDistrito
    })

    this.setState({
      districtValue: '',
      zoneValue: zone,
      distritos,
    })
  }

  chargeListDistritos = () => {
    const { distritos } = this.state
    return distritos.map(distrito => (
      <option key={distrito} value={distrito}>
        {distrito}
      </option>
    ))
  }

  createMarkers = () => {
    const { mapa, districtDataOf } = this.state
    console.log(districtDataOf)

    const res = districtDataOf.oficinas.forEach(alias => {
      return alias.nomOficina
      //   const marker = new google.maps.Marker({
      //     mapa,
      //     position: { lat: -11.921145144034034, lng: -77.0422911643982 },
      //   })
      //   marker.setMap(mapa)
    })
    console.log(res)
    // const marker = new google.maps.Marker({
    //   mapa,
    //   position: { lat: -11.921145144034034, lng: -77.0422911643982 },
    // })
    // marker.setMap(mapa)
  }

  changeMarkers = e => {
    const district = e.target.value
    const { allinfo, zoneValue } = this.state

    const aDistritos = allinfo[`${zoneValue}`].zonaDistritos
    console.log(aDistritos)
    const dataDistrito = aDistritos.find(distrito => {
      return distrito.nomDistrito === district
    })

    const aOficinas = dataDistrito.oficinas // array oficinas de un distrito

    //    console.log(`distritos: ${res.oficinas[0].nomOficina}`)

    this.setState({
      districtValue: district,
      districtDataOf: aOficinas,
    })

    this.createMarkers()
  }

  iniciarMapa = () => {
    const map = new google.maps.Map(document.getElementById('map1'), {
      center: { lat: -12.0457627, lng: -76.884137972314 },
      zoom: 10,
    })
    this.setState({
      mapa: map,
    })
  }

  render() {
    const { zoneValue, districtValue } = this.state
    return (
      <Fragment>
        <div className="title-wrapper">
          <h3>oficinas concesionarias</h3>
          <h6>
            Para conocer el listado de oficinas concesionarias <br /> seleccione
            en el mapa su ubicación
          </h6>
          <div className="concessionaires-selects">
            <div className="concessionaires-zone">
              Zona :
              <select
                id="sel_zonas"
                value={zoneValue}
                onChange={this.changeDistritos}>
                <option value="seleccionar">Seleccionar</option>
                {this.chargeListZonas()}
              </select>
            </div>
            <div className="concessionaires-district">
              Distrito
              <select
                id="sel_distritos"
                value={districtValue}
                onChange={this.changeMarkers}>
                <option value="seleccionar">Seleccionar</option>
                {this.chargeListDistritos()}
              </select>
            </div>
          </div>
        </div>

        <div
          id="map1"
          style={{ width: '400px', height: '400px', backgroundColor: 'green' }}
        />
      </Fragment>
    )
  }
}

export default OficinasConcesionarias
