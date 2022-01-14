export const array = (c, callback = () => null) => {
  return Array.from(Array(c)).map((_, id) => callback(id))
}
