export const compare = (code, codeGuess) => {
  const correct = []
  const codeGuessWrongPlace = []
  const codeWrongPlace = {}
  code.forEach((cp, index) => {
    const cpg = codeGuess[index]
    if (cp === cpg) {
      correct.push(2)
    } else {
      codeGuessWrongPlace.push(cpg)
      codeWrongPlace[cp] = (codeWrongPlace[cp] || 0) + 1
    }
  })
  codeGuessWrongPlace.forEach((cpg) => {
    if (codeWrongPlace[cpg] > 0) {
      codeWrongPlace[cpg]--
      correct.push(1)
    }
  })
  for(let k = correct.length; k < code.length; k++) {
    correct.push(0)
  }
  return correct
}
