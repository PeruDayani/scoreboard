import { TEAM_A, TEAM_A_CAPTAIN, TEAM_B, TEAM_B_CAPTAIN } from "./constants";
import { BoxScore, PlayerStats, TeamStats } from "./types";

function calcTeamStats(players: PlayerStats[]) : TeamStats {

    function sumStat(stat: string) {
        return players.reduce((a, b) => a + (b[stat as keyof TeamStats] || 0), 0);
    }

    return {
        points: sumStat('points'),
        assists: sumStat('assists'),
        
        reboundsTotal: sumStat('reboundsTotal'),
        reboundsDefensive: sumStat('reboundsDefensive'),
        reboundsOffensive: sumStat('reboundsOffensive'),
        reboundsWeighted: sumStat('reboundsWeighted'),

        threePointersMade: sumStat('threePointersMade'),
        threePointersAttempted: sumStat('threePointersAttempted'),

        blocks: sumStat('blocks'),
        blocksReceived: sumStat('blocksReceived'),
        steals: sumStat('steals'),
        turnovers: sumStat('turnovers'),
        
        stealsBlocks: sumStat('stealsBlocks'),
        stealsBlocksTurnoversBlocksRecieved: sumStat('stealsBlocksTurnoversBlocksRecieved'),
    }
}

function addFantasyPlayerStats(player: PlayerStats): PlayerStats {
    return {
        ...player,
        reboundsWeighted: player.reboundsDefensive + 2*player.reboundsOffensive,
        stealsBlocks: player.steals + player.blocks,
        stealsBlocksTurnoversBlocksRecieved: player.steals + player.blocks - player.turnovers - player.blocksReceived
    }
}

function calcAllStarData(data: BoxScore) : any {

    if (data) {

        const homePlayers: PlayerStats[] = data.game.homeTeam.players
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        const teamA: PlayerStats[] = []
        const teamB: PlayerStats[] = []

        allPlayers.forEach((player) => {
            if (TEAM_A.includes(player.name)) {
                teamA.push(player)
            } else if (TEAM_B.includes(player.name)) {
                teamB.push(player)
            }
        })

        const fantasyTeamA = teamA.map(addFantasyPlayerStats)
        const fantasyTeamB = teamB.map(addFantasyPlayerStats)

        return {
            date: data.date,
            game: data.game,
            fantasyTeamA: {
                teamCaptain: TEAM_A_CAPTAIN,
                teamStats: calcTeamStats(fantasyTeamA),
                players: fantasyTeamA
            },
            fantasyTeamB: {
                teamCaptain: TEAM_B_CAPTAIN,
                teamStats: calcTeamStats(fantasyTeamB),
                players: fantasyTeamB
            }
        }

    }

    return null
}

function fetchPlayers(data: BoxScore) : string[] {

    if (data) {
        const homePlayers: PlayerStats[] = data.game.homeTeam.players
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        return allPlayers.map((player) => player.name)
    }

    return [`Well shit, you sure that's a valid game ID?`]
}

export { calcAllStarData, fetchPlayers }
