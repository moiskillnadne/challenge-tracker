export const getFirst = <T>(number: number, list: Array<T>): Array<T> => {
  return list.slice(0, number)
}
