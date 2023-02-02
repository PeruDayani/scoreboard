import { PERU_TEAM, HAYDEN_TEAM } from "./constants";
import { BoxScore, PlayerStats } from "./types";


function calcTeamStats(players: any) : any {
    return {
        points: players.reduce(function (sum: any, player: { points: any; }) { return sum + player.points }, 0),
        assists: players.reduce(function (sum: any, player: { assists: any; }) { return sum + player.assists }, 0),
        
        reboundsTotal: players.reduce(function (sum: any, player: { reboundsTotal: any; }) { return sum + player.reboundsTotal }, 0),
        reboundsDefensive: players.reduce(function (sum: any, player: { reboundsDefensive: any; }) { return sum + player.reboundsDefensive }, 0),
        reboundsOffensive: players.reduce(function (sum: any, player: { reboundsOffensive: any; }) { return sum + player.reboundsOffensive }, 0),
        reboundsWeighted: players.reduce(function (sum: any, player: { reboundsDefensive: any; reboundsOffensive: any; }) { return sum + player.reboundsDefensive + 2*player.reboundsOffensive }, 0),
        
        threePointersMade: players.reduce(function (sum: any, player: { threePointersMade: any; }) { return sum + player.threePointersMade }, 0),
        threePointersAttempted: players.reduce(function (sum: any, player: { threePointersAttempted: any; }) { return sum + player.threePointersAttempted }, 0),
        
        blocks: players.reduce(function (sum: any, player: { blocks: any; }) { return sum + player.blocks }, 0),
        blocksReceived: players.reduce(function (sum: any, player: { blocksReceived: any; }) { return sum + player.blocksReceived }, 0),
        steals: players.reduce(function (sum: any, player: { steals: any; }) { return sum + player.steals }, 0),
        turnovers: players.reduce(function (sum: any, player: { turnovers: any; }) { return sum + player.turnovers }, 0),
        
        stealsBlocks: players.reduce(function (sum: any, player: { steals: any; blocks: any; }) { return sum + player.steals + player.blocks }, 0),
        stealsBlocksTurnoversBlocksRecieved: players.reduce(function (sum: any, player: { blocks: any; blocksReceived: any; steals: any; turnovers: any; }) { return sum + player.blocks - player.blocksReceived + player.steals - player.turnovers }, 0),
    }
}

function calcAllStarData(data: BoxScore) : any {

    if (data) {

        const homePlayers: PlayerStats[] = data.game.homeTeam.players
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        const peruTeam: PlayerStats[] = []
        const haydenTeam: PlayerStats[] = []

        allPlayers.forEach((player) => {
            if (PERU_TEAM.includes(player.name)) {
                peruTeam.push(player)
            } else if (HAYDEN_TEAM.includes(player.name)) {
                haydenTeam.push(player)
            }
        })

        return {
            date: data.date,
            game: data.game,
            fantasyTeamA: {
                teamCaptain: 'Peru Dayani',
                teamStats: calcTeamStats(peruTeam),
                players: peruTeam
            },
            fantasyTeamB: {
                teamCaptain: 'Hayden Davila',
                teamStats: calcTeamStats(haydenTeam),
                players: haydenTeam
            }
        }

    }

    return null
}

export { calcAllStarData }
