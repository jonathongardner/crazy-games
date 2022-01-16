export const defaultMasterMind = () => {
  // defaults
  return {
    options: [
      '#5cabff',
      '#42f5e0',
      '#fcba03',
      '#60f542',
      '#c77b7d',
    ],
    numberOfSlots: 4,
    numberOfRows: 8
  }
}
export const loadMasterMind = () => {
  // defaults
  const toReturn = defaultMasterMind()
  const jsonString = localStorage.getItem('master-mind')
  if (jsonString) {
    const savedOptions = JSON.parse(jsonString)
    Object.keys(toReturn).forEach(k => {
      if (savedOptions.hasOwnProperty(k)) {
        toReturn[k] = savedOptions[k]
      }
    })
  }
  return toReturn
}
export const saveMasterMind = ({ options, numberOfRows, numberOfSlots }) => {
  localStorage.setItem('master-mind',JSON.stringify({
    options, numberOfRows, numberOfSlots
  }))
}
