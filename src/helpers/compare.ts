import type { ComparisonResult } from '@/types/mastermind'

export function compare(code: string[], guess: string[]): ComparisonResult[] {
  const result: ComparisonResult[] = Array.from({ length: code.length }, () => 0)
  const unmatchedCode = new Map<string, number>()
  const unmatchedGuessIndexes: number[] = []

  code.forEach((peg, index) => {
    if (peg === guess[index]) {
      result[index] = 2
      return
    }

    unmatchedCode.set(peg, (unmatchedCode.get(peg) ?? 0) + 1)
    unmatchedGuessIndexes.push(index)
  })

  unmatchedGuessIndexes.forEach((index) => {
    const peg = guess[index]
    if (peg === undefined) return

    const remaining = unmatchedCode.get(peg) ?? 0
    if (remaining > 0) {
      result[index] = 1
      unmatchedCode.set(peg, remaining - 1)
    }
  })

  return result
}
