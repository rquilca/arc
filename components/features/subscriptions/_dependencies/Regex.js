const passRecomend = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)
const emailRegex = new RegExp(
  /^[a-zA-Z0-9]{1}[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}(?:\.[a-zA-Z0-9-]{2,})+$/
)
const strongRegularExp = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
)
const mediumRegularExp = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
)
const namesRegex = new RegExp(
  /^([a-zA-ZÑñÁáÉéÍíÓóÚúüÜ\-'\s])+[a-zA-ZZÑñÁáÉéÍíÓóÚúüÜ]+$/
)
const numberRegex = new RegExp(/^([0-9])+$/)
const cellphoneRegex = new RegExp(/^9\d{8}$/)
const docRegex = new RegExp(/^([0-9a-zA-Z-])+$/)
const phoneRegex = new RegExp(/^[0-9-]+$/)

// prettier-ignore
const patternCard = [/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,]
const patternDate = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
const patterCvv = [/\d/, /\d/, /\d/, /\d/]

const maskDocuments = {
  DNI: new Array(8).fill(/\d/),
  CEX: new Array(15).fill(/[a-zA-Z0-9-]/),
  CDI: new Array(15).fill(/[a-zA-Z0-9-]/),
}

const docPatterns = {
  DNI: /(\d){8}/,
  CDI: /^([a-zA-Z0-9-]{5,15})/,
  CEX: /^([a-zA-Z0-9-]{5,15})/,
}

// // prettier-ignore
// const patternPHONE = [/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/, " ", /\d/, /\d/,/\d/, " ", /\d/, /\d/,/\d/]

export {
  cellphoneRegex,
  docPatterns,
  docRegex,
  emailRegex,
  maskDocuments,
  mediumRegularExp,
  namesRegex,
  numberRegex,
  passRecomend,
  patterCvv,
  patternCard,
  patternDate,
  phoneRegex,
  strongRegularExp,
}
