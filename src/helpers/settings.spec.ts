import { beforeEach, describe, expect, it } from 'vitest'

import { defaultMasterMind, loadMasterMind, saveMasterMind } from './settings'

describe('Mastermind settings', () => {
  beforeEach(() => localStorage.clear())

  it('returns independent defaults when no settings are saved', () => {
    const first = loadMasterMind()
    first.options.pop()
    expect(loadMasterMind()).toEqual(defaultMasterMind())
  })

  it('round-trips legacy-compatible settings', () => {
    const settings = { options: ['#000000', '#ffffff'], numberOfSlots: 3, numberOfRows: 5 }
    saveMasterMind(settings)
    expect(loadMasterMind()).toEqual(settings)
  })

  it('falls back safely for malformed storage', () => {
    localStorage.setItem('master-mind', '{broken')
    expect(loadMasterMind()).toEqual(defaultMasterMind())
  })
})
