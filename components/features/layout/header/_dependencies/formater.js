export default class StandardHeader {
  constructor(
    contextPath = '',
    deployment,
    siteDomain = '',
    arcSite = '',
    data = {},
    headerType = 'standard',
    customLogo
  ) {
    this.contextPath = contextPath
    this.deployment = deployment
    this.siteDomain = siteDomain
    this.arcSite = arcSite
    this.data = data
    this.headerType = headerType
    this.customLogo = customLogo
    this.schema = this.getSchema()
  }

  setData(data) {
    this.data = data
  }

  getSchema() {
    switch (this.headerType) {
      case 'standard':
      case 'somos':
        this.schema = `{ 
            children {
              name
              _id
              display_name
              url
              node_type
            }
          }`
        break

      default:
        break
    }
  }

  getParams() {
    return this[this.headerType]()
  }

  standard() {
    const sections = this.formatSections()
    const newest = {
      name: 'Lo último',
      url: `${this.contextPath}/archivo`,
    }
    const params = {
      logo: {
        src:
          this.customLogo ||
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/logo.png`
          ),
        link: this.contextPath,
        alt: this.siteDomain,
      },
      sections: [newest, ...sections],
    }
    return params
  }

  somos() {
    const sections = this.formatSections()
    const params = {
      logo: {
        src:
          this.customLogo ||
          this.deployment(
            `${this.contextPath}/resources/dist/${this.arcSite}/images/logo.png`
          ),
        link: `${this.contextPath}/somos`,
        alt: 'Somos',
      },
      logoIcon: {
        link: this.contextPath,
      },
      firstSection: {
        url: `${this.contextPath}/somos`,
      },
      sections,
    }
    return params
  }

  // Función para formatear data de las secciones
  formatSections = () => {
    const link = 'link'
    const { children = [] } = this.data || {}
    const sections = children.map(el => {
      return {
        name: el.node_type === link ? el.display_name : el.name,
        url: el.node_type === link ? el.url : `${this.contextPath}${el._id}`,
      }
    })
    return sections
  }
  // TODO: Crear función para formatear data de secciones con subsecciones
}
