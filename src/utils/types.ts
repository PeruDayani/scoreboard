type Team = {
    teamId: String,
    teamName: String,
    teamCity: String,
    record: String,
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

type TeamStats = {
    teamId: String,
    teamName: String,

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

type PlayerStats = {
    name: String,
    personId: String,

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
    date: String,
    games: Game[]
}

type BoxScore = BoxScoreData | null

type BoxScoreData = {
    date: String,
    game: Game,
}

export type { Team, Game, PlayerStats, TeamStats, Scoreboard, BoxScore }