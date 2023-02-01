import { BoxScore, Game, PlayerStats, Team } from './types'

function extractPlayerData(data: any) : PlayerStats {
    return {
        name: data.name,
        personId: data.personId,
    
        points: data.statistics.points,
        assists: data.statistics.assists,
    
        reboundsTotal: data.statistics.reboundsTotal,
        reboundsDefensive: data.statistics.reboundsDefensive,
        reboundsOffensive: data.statistics.reboundsOffensive,
    
        threePointersMade: data.statistics.threePointersMade,
        threePointersAttempted: data.statistics.threePointersAttempted,
    
        blocks: data.statistics.blocks,
        blocksReceived: data.statistics.blocksReceived,
        steals: data.statistics.steals,
        turnovers: data.statistics.turnovers,
    }
}

function extractTeamData(data: any) : Team {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
        teamCity: data.teamCity,
        record: `N/A`,
        score: data.score,
        players: data.players.map((player : any) => extractPlayerData(player))
    }
}

function gameStatus(data: any) : string {
    if (data.includes('Final')) {
        return 'Done'
    } else if (data.includes('ET')) {
        return 'Scheduled'
    } else {
        return 'Live'
    }
}

function cleanBoxscore (data: any) : BoxScore {

    if (data.game && data.game.gameId) {

        const dateUTC = new Date(data.game.gameTimeUTC)
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Intl.DateTimeFormat('en-US', options).format(dateUTC)

        const gameData = data.game
        const game : Game = {
            gameId: gameData.gameId,
            gameStatus: gameStatus(gameData.gameStatusText),
            gameStatusText: gameData.gameStatusText,
            homeTeam: extractTeamData(gameData.homeTeam),
            awayTeam: extractTeamData(gameData.awayTeam)
        }

        return {
            date,
            game
        }
    }

    return null
}

export { cleanBoxscore }