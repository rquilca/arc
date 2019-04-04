export default props => {
  const {
    numNotes,
    globalContentConfig,
    globalContent,
  } = props
  const {
    query: {
      section = ''
    } = {}
  } = globalContentConfig || {}
  const {
    taxonomy: {
      primary_section: {
        _id = ''
      } = ''
    } = '',
  } = globalContent || {}

  let sec = _id || section

  if (sec === 'todas') sec = ''
  else if (sec !== '') {
    sec = sec.charAt(0) === '/' ? sec : `/${sec}`
  }

  return {
    source: 'stories__most-readed',
    params: {
      section: sec,
      num_notes: numNotes || 5,
    },
  }
}