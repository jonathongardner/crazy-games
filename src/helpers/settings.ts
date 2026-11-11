import type { MasterMindSettings } from '@/types/mastermind'

const STORAGE_KEY = 'master-mind'

export function defaultMasterMind(): MasterMindSettings {
  return {
    options: ['#5cabff', '#42f5e0', '#fcba03', '#60f542', '#c77b7d'],
    numberOfSlots: 4,
    numberOfRows: 8,
  }
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
}

export function loadMasterMind(): MasterMindSettings {
  const defaults = defaultMasterMind()
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return defaults

  try {
    const value: unknown = JSON.parse(saved)
    if (!value || typeof value !== 'object') return defaults

    const candidate = value as Partial<MasterMindSettings>
    return {
      options:
        Array.isArray(candidate.options) &&
        candidate.options.length >= 2 &&
        candidate.options.every((option) => typeof option === 'string')
          ? [...candidate.options]
          : defaults.options,
      numberOfSlots: isPositiveInteger(candidate.numberOfSlots)
        ? candidate.numberOfSlots
        : defaults.numberOfSlots,
      numberOfRows: isPositiveInteger(candidate.numberOfRows)
        ? candidate.numberOfRows
        : defaults.numberOfRows,
    }
  } catch {
    return defaults
  }
}

export function saveMasterMind(settings: MasterMindSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}
