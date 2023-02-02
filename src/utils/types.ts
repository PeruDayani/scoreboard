type Team = {
    teamId: string,
    teamName: string,
    teamCity: string,
    record: string,
    score: Number,
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

    points: Number,
    assists: Number,

    reboundsTotal: Number,
    reboundsDefensive: Number,
    reboundsOffensive: Number,

    threePointersMade: Number,
    threePointersAttempted: Number,

    blocks: Number,
    blocksReceived: Number,
    steals: Number,
    turnovers: Number,
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
    points: Number,
    assists: Number,

    reboundsTotal: Number,
    reboundsDefensive: Number,
    reboundsOffensive: Number,
    reboundsWeighted: Number,

    threePointersMade: Number,
    threePointersAttempted: Number,

    blocks: Number,
    blocksReceived: Number,
    steals: Number,
    turnovers: Number,

    stealsBlocks: Number,
    stealsBlocksTurnoversBlocksRecieved: Number,
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