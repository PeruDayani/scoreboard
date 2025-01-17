export type AllStatistics = {
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

export type StatisticID = keyof AllStatistics

export type Statistic = {
    id: StatisticID,
    label: string,
    invert?: boolean,
    ignore?: boolean
}

export type Player = {
    name: string,
    personId: string,
} & AllStatistics

export type Team = {
    teamId: string,
    teamName: string,
    teamCity: string,
    record: string,
    score: number,
    players: Player[]
}

export type Game = {
    gameId: string,
    gameStatus: string,
    gameStatusText: string,
    homeTeam: Team,
    awayTeam: Team
}

export type BoxScore =  {
    date: string,
    game: Game,
}

export type Scoreboard = {
    date: string,
    games: Game[]
}

export type FantasyDraftConfig = {
    urlId: string,
    title: string,
    stats: Statistic[],
    captainTeamA: string,
    captainTeamB: string,
    games: {
        gameId: string,
        playersTeamA: string[],
        playersTeamB: string[]
    }[]
}

export type WinnerType = 'A' | 'B' | null

export type StatResult = {
    stat: Statistic,
    winner: WinnerType,
    teamA: {
        total: number,
        breakdown: {
            value: number,
            winner: boolean
        }[]
    }
    teamB: {
        total: number,
        breakdown: {
            value: number,
            winner: boolean
        }[]
    }
}

export type FantasyDraftResult = {
    date: string,
    game: Game,
    playersTeamA: Player[],
    playersTeamB: Player[],
    winner: WinnerType,
    results: StatResult[]
}

export type MultiFantasyDraftResult = {
    status: string,
    winner: WinnerType,
    results: StatResult[],
    draftResults: FantasyDraftResult[]
}