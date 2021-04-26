import { DEFAULT_LANGUAGE } from 'constants/locale.js'

export default function useDateTimeFormat (timestamp) {
  const date = new Date(timestamp)
  const language = navigator.language || DEFAULT_LANGUAGE
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }
  const dateTimeFormat = new Intl.DateTimeFormat(language, options).format(date)
  return dateTimeFormat
}
