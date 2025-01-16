import { BoxScore, Game, PlayerStats, Team } from './types'

function cleanMinsPlayer(data: string) : number {
    const regex = /(?<=PT)(.*)(?=M)/g;
    const found = data.match(regex);
    if (found?.length == 1) {
        return Number(found[0])
    }
    return 0
}

function extractPlayerData(data: any) : PlayerStats {
    return {
        name: data.name,
        personId: data.personId,
        minutes: cleanMinsPlayer(data.statistics.minutesCalculated),
    
        points: data.statistics.points,
        assists: data.statistics.assists,
    
        reboundsTotal: data.statistics.reboundsTotal,
        reboundsDefensive: data.statistics.reboundsDefensive,
        reboundsOffensive: data.statistics.reboundsOffensive,

        freeThrowsMade: data.statistics.freeThrowsMade,
        freeThrowsAttempted: data.statistics.freeThrowsAttempted,
        
        twoPointersMade: data.statistics.twoPointersMade,
        twoPointersAttempted: data.statistics.twoPointersAttempted,

        threePointersMade: data.statistics.threePointersMade,
        threePointersAttempted: data.statistics.threePointersAttempted,
    
        blocks: data.statistics.blocks,
        blocksReceived: data.statistics.blocksReceived,
        steals: data.statistics.steals,
        turnovers: data.statistics.turnovers,
        foulsTechnical: data.statistics.foulsTechnical,
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
    } else if (data.includes('ET') || data.includes('P')) {
        return 'Scheduled'
    } else {
        return 'Live'
    }
}

function cleanBoxscore (data: any) : BoxScore {

    if (data && data.game && data.game.gameId) {

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

    return data
}

export { cleanBoxscore }