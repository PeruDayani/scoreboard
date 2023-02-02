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

    points: number,
    assists: number,

    reboundsTotal: number,
    reboundsDefensive: number,
    reboundsOffensive: number,

    threePointersMade: number,
    threePointersAttempted: number,

    blocks: number,
    blocksReceived: number,
    steals: number,
    turnovers: number,
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

    reboundsTotal: number,
    reboundsDefensive: number,
    reboundsOffensive: number,
    reboundsWeighted: number,

    threePointersMade: number,
    threePointersAttempted: number,

    blocks: number,
    blocksReceived: number,
    steals: number,
    turnovers: number,

    stealsBlocks: number,
    stealsBlocksTurnoversBlocksRecieved: number,
}

type FantasyTeam = {
    teamCaptain: string,
    teamStats: TeamStats,
    players: PlayerStats[]
}

type AllStarDraft = {
    date: string,
    game: Game,
    fantasyTeamA: FantasyTeam,
    fantasyTeamB: FantasyTeam
}

type AllStarDraftData = AllStarDraft | null

export type { Team, Game, PlayerStats, AllStarDraftData, TeamStats, Scoreboard, BoxScore }