type Team = {
    teamId: string,
    teamName: string,
    teamCity: string,
    record: string,
    score: number,
    players: PlayerStats[] | []
}

type Game = {
    gameId: string,
    gameStatus: string,
    gameStatusText: string,
    homeTeam: Team,
    awayTeam: Team
}

type PlayerStats = {
    name: string,
    personId: string,
    minutes?: number,

    points: number,
    assists: number,

    reboundsTotal: number,
    reboundsDefensive: number,
    reboundsOffensive: number,

    freeThrowsMade: number,
    freeThrowsAttempted: number

    twoPointersMade: number,
    twoPointersAttempted: number,

    threePointersMade: number,
    threePointersAttempted: number,

    blocks: number,
    blocksReceived: number,
    steals: number,
    turnovers: number,
    foulsTechnical: number,

    reboundsWeighted?: number,
    twoPointersFreeThrows?: number,
    stealsBlocks?: number,
    stealsBlocksTurnovers?: number,
}

type Scoreboard = ScoreboardData | null

type ScoreboardData = {
    date: string,
    games: Game[]
}

type BoxScore = BoxScoreData | null

type BoxScoreData = {
    date: string,
    game: Game,
}

type TeamStats = {
    points: number,
    assists: number,
    minutes?: number,

    reboundsTotal: number,
    reboundsDefensive: number,
    reboundsOffensive: number,

    freeThrowsMade: number,
    freeThrowsAttempted: number

    twoPointersMade: number,
    twoPointersAttempted: number,

    threePointersMade: number,
    threePointersAttempted: number,

    blocks: number,
    blocksReceived: number,
    steals: number,
    turnovers: number,
    foulsTechnical: number,

    reboundsWeighted?: number,
    twoPointersFreeThrows?: number,
    stealsBlocks?: number,
    stealsBlocksTurnovers?: number,
}

// Use this to access any teamStats obj using variable keys
type STAT_ID = keyof TeamStats

type FantasyTeam = {
    teamCaptain: string,
    teamStats: TeamStats,
    players: PlayerStats[]
}

type FantasyDraft = {
    date: string,
    game: Game,
    fantasyTeamA: FantasyTeam,
    fantasyTeamB: FantasyTeam,
    allPlayers?: PlayerStats[],
    stats?: any,
    error?: {
        message: string,
        type: string
    }
}

type FantasyDraftData = FantasyDraft

type CustomError = {
    status: string,
    reason: string
}

type FantasyTeamStatsConfig = {
    id: STAT_ID,
    label: string,
    invert?: boolean,
    ignore?: boolean
}[]

type FantasyDraftGameConfig = {
    gameId: string,
    playersTeamA: string[],
    playersTeamB: string[]
}

type FantasyDraftConfig = {
    urlId: string,
    title: string,
    stats: FantasyTeamStatsConfig,
    captainTeamA: string,
    captainTeamB: string,
    games: FantasyDraftGameConfig[]
}

export type { Team, Game, PlayerStats, FantasyTeam, STAT_ID, FantasyDraftData, CustomError, TeamStats, Scoreboard, BoxScore, FantasyDraftConfig, FantasyTeamStatsConfig }