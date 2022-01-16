export const array = (c, callback = () => null) => {
  return Array.from(Array(c)).map((_, id) => callback(id))
}
export const randomColor = () => {
  const c = Math.floor(Math.random() * 16777215).toString(16)
  return `#${c}`
}
export const debounce = (func, timeout = 1000) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args); }, timeout)
  };
}
