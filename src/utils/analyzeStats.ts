import { AnalyzedPlayer } from './types'

export type AnalyzeStatConfig = {
  id: string
  label: string
  shortLabel: string
  getValue: (p: AnalyzedPlayer) => number
  getPer36?: (p: AnalyzedPlayer) => number
}

// Stats used in contributions page
export const CONTRIBUTION_STATS: AnalyzeStatConfig[] = [
  {
    id: 'inside',
    label: 'Inside (2P+FT)',
    shortLabel: 'Inside',
    getValue: (p) => p.twoPointersFreeThrows ?? 0,
    getPer36: (p) => p.twoPointersFreeThrowsPer36 ?? 0,
  },
  {
    id: 'threes',
    label: '3-Pointers Made',
    shortLabel: 'Treys',
    getValue: (p) => p.threePointersMade,
    getPer36: (p) => p.threePointersMadePer36 ?? 0,
  },
  {
    id: 'assists',
    label: 'Assists',
    shortLabel: 'AST',
    getValue: (p) => p.assists,
    getPer36: (p) => p.assistsPer36 ?? 0,
  },
  {
    id: 'rebounds',
    label: 'Rebounds',
    shortLabel: 'REB',
    getValue: (p) => p.reboundsTotal,
    getPer36: (p) => p.reboundsTotalPer36 ?? 0,
  },
]

// Extended stats for leaderboard page
export const LEADERBOARD_STATS: AnalyzeStatConfig[] = [
  {
    id: 'points',
    label: 'Points',
    shortLabel: 'PTS',
    getValue: (p) => p.points,
    getPer36: (p) => p.minutes ? (p.points / p.minutes) * 36 : 0,
  },
  {
    id: 'inside',
    label: 'Inside Scoring (2P+FT)',
    shortLabel: 'Inside',
    getValue: (p) => p.twoPointersFreeThrows ?? 0,
    getPer36: (p) => p.twoPointersFreeThrowsPer36 ?? 0,
  },
  {
    id: 'threes',
    label: '3-Pointers Made',
    shortLabel: '3PM',
    getValue: (p) => p.threePointersMade,
    getPer36: (p) => p.threePointersMadePer36 ?? 0,
  },
  {
    id: 'assists',
    label: 'Assists',
    shortLabel: 'AST',
    getValue: (p) => p.assists,
    getPer36: (p) => p.assistsPer36 ?? 0,
  },
  {
    id: 'rebounds',
    label: 'Rebounds',
    shortLabel: 'REB',
    getValue: (p) => p.reboundsTotal,
    getPer36: (p) => p.reboundsTotalPer36 ?? 0,
  },
  {
    id: 'hustle',
    label: 'Hustle (STL+BLK-TO)',
    shortLabel: 'Hustle',
    getValue: (p) => p.stealsBlocksTurnovers ?? 0,
    getPer36: (p) => p.stealsBlocksTurnoversPer36 ?? 0,
  },
  {
    id: 'steals',
    label: 'Steals',
    shortLabel: 'STL',
    getValue: (p) => p.steals,
    getPer36: (p) => p.minutes ? (p.steals / p.minutes) * 36 : 0,
  },
  {
    id: 'blocks',
    label: 'Blocks',
    shortLabel: 'BLK',
    getValue: (p) => p.blocks,
    getPer36: (p) => p.minutes ? (p.blocks / p.minutes) * 36 : 0,
  },
  {
    id: 'turnovers',
    label: 'Turnovers (lower is better)',
    shortLabel: 'TO',
    getValue: (p) => p.turnovers,
    getPer36: (p) => p.minutes ? (p.turnovers / p.minutes) * 36 : 0,
  },
  {
    id: 'offReb',
    label: 'Offensive Rebounds',
    shortLabel: 'OREB',
    getValue: (p) => p.reboundsOffensive,
    getPer36: (p) => p.minutes ? (p.reboundsOffensive / p.minutes) * 36 : 0,
  },
  {
    id: 'defReb',
    label: 'Defensive Rebounds',
    shortLabel: 'DREB',
    getValue: (p) => p.reboundsDefensive,
    getPer36: (p) => p.minutes ? (p.reboundsDefensive / p.minutes) * 36 : 0,
  },
  {
    id: 'freeThrows',
    label: 'Free Throws Made',
    shortLabel: 'FTM',
    getValue: (p) => p.freeThrowsMade,
    getPer36: (p) => p.minutes ? (p.freeThrowsMade / p.minutes) * 36 : 0,
  },
]

// Default weights for draft score calculation
export const DEFAULT_WEIGHTS = {
  inside: 1.15,
  threes: 1.00,
  assists: 1.05,
  rebounds: 0.95,
  hustle: 1.25,
}

export type Weights = typeof DEFAULT_WEIGHTS

// Calculate draft score based on weights
export function calculateDraftScore(player: AnalyzedPlayer, weights: Weights): number {
  return (
    (player.twoPointersFreeThrowsPer36 ?? 0) * weights.inside +
    (player.threePointersMadePer36 ?? 0) * weights.threes +
    (player.assistsPer36 ?? 0) * weights.assists +
    (player.reboundsTotalPer36 ?? 0) * weights.rebounds +
    (player.stealsBlocksTurnoversPer36 ?? 0) * weights.hustle
  )
}

