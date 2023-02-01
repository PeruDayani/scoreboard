import { PERU_TEAM, HAYDEN_TEAM } from "./constants";
import { BoxScore, PlayerStats } from "./types";


function calcTeamStats(players: any) : any {
    return {
        points: players.reduce(function (sum: any, player: { points: any; }) { return sum + player.points; }, 0),
        assists: players.reduce(function (sum: any, player: { assists: any; }) { return sum + player.assists; }, 0),
        reboundsTotal: players.reduce(function (sum: any, player: { reboundsTotal: any; }) { return sum + player.reboundsTotal; }, 0),
        threePointersMade: players.reduce(function (sum: any, player: { threePointersMade: any; }) { return sum + player.threePointersMade; }, 0),
        stealsBlocksTurnovers: players.reduce(function (sum: any, player: { steals: any; blocks: any; turnovers:any; }) { return sum + player.steals + player.blocks - player.turnovers; }, 0),
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
            peru: {
                teamStats: calcTeamStats(peruTeam),
                players: peruTeam
            },
            hayden: {
                teamStats: calcTeamStats(haydenTeam),
                players: haydenTeam
            }
        }

    }

    return null
}

export { calcAllStarData }