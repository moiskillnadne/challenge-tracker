export const getMonthFromStartedAtDate = (date: string, lang: string) => {
  return new Date(date).toLocaleString(lang, { month: 'long' })
}
