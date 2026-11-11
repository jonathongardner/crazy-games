import { describe, expect, it } from 'vitest'

import { compare } from './compare'

describe('compare', () => {
  it('marks exact, misplaced, and missing pegs by position', () => {
    expect(compare(['red', 'blue', 'green', 'yellow'], ['red', 'green', 'purple', 'blue'])).toEqual([
      2, 1, 0, 1,
    ])
  })

  it('does not count a duplicated guess more times than the code', () => {
    expect(compare(['red', 'blue', 'green', 'yellow'], ['blue', 'blue', 'blue', 'blue'])).toEqual([
      0, 2, 0, 0,
    ])
  })

  it('marks a solved code', () => {
    expect(compare(['red', 'red'], ['red', 'red'])).toEqual([2, 2])
  })
})
