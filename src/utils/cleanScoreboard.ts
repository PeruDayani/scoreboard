import { Game, Scoreboard, Team } from './types'

function extractTeamData(data: any) : Team {
    return {
        teamId: data.teamId || data['TEAM_ID'],
        teamName: data.teamName || data['TEAM_NAME'],
        teamCity: data.teamCity || data['TEAM_CITY_NAME'],
        record: data.wins ? `${data.wins}-${data.losses}` : data['TEAM_WINS_LOSSES'],
        score: data.score || data['PTS'],
        players: []
    }
}

function gameStatus(data: any) : string {
    if (data.gameStatusText.includes('Final')) {
        return 'Done'
    } else if (data.gameStatusText.includes('ET')) {
        return 'Scheduled'
    } else {
        return 'Live'

    }
}

function cleanScoreboard(data: any) : Scoreboard {

    let date = ''
    let games = new Array<Game>()

    if (data.scoreboard && data.scoreboard.games && data.scoreboard.games.length > 0) {

        const dateUTC = new Date(data.scoreboard.gameDate)
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date = new Intl.DateTimeFormat('en-US', options).format(dateUTC)

        games = data.scoreboard.games.map((game: any) => ({
            gameId: game.gameId,
            gameStatus: gameStatus(game),
            gameStatusText: game.gameStatusText,
            homeTeam: extractTeamData(game.homeTeam),
            awayTeam: extractTeamData(game.awayTeam)
        }))

        return {
            date,
            games
        } 
    }

    return null
}

function cleanScoreboardByDate(data: any) : Scoreboard {

    let date = ''
    let games = new Array<Game>()

    if (Object.keys(data['LineScore']).length > 0) {

        const lineScore = data['LineScore']

        const dateEST = new Date(lineScore[0]['GAME_DATE_EST'])
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date = new Intl.DateTimeFormat('en-US', options).format(dateEST)


        for (var idx = 0; idx < Object.keys(lineScore).length; idx += 2){
            const homeTeam = lineScore[idx]
            const awayTeam = lineScore[idx+1]

            games.push({
                gameId: homeTeam['GAME_ID'],
                gameStatus: "TODO",
                gameStatusText: 'Final',
                homeTeam: extractTeamData(homeTeam),
                awayTeam: extractTeamData(awayTeam)
            })
        }

        return {
            date,
            games
        }
    }

    return null
}

export { cleanScoreboard, cleanScoreboardByDate }