import moment from 'moment'

export const unixToString = unix => {
  const date = moment.unix(unix)
  return date.format('l') + ' ' + date.format('LT')
}