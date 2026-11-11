export type ComparisonResult = 0 | 1 | 2

export interface MasterMindSettings {
  options: string[]
  numberOfSlots: number
  numberOfRows: number
}

export interface CodePegPick {
  id: number
  codePeg: string
}

export interface TurnState {
  userPick: CodePegPick[]
  correct: ComparisonResult[]
}
