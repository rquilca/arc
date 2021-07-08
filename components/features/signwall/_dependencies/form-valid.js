const formValid = ({ formErrors, ...rest }) => {
  let valid = true
  const valuesFormErr = Object.keys(formErrors).map((e) => formErrors[e])
  const valuesFormFill = Object.keys(rest).map((e) => rest[e])
  valuesFormErr.forEach((val) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    val.length > 0 && (valid = false)
  })
  valuesFormFill.forEach((val) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    val === null && (valid = false)
  })

  return valid
}
export default formValid
