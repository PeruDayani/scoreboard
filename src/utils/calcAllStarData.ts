import { TEAM_A, TEAM_A_CAPTAIN, TEAM_B, TEAM_B_CAPTAIN } from "./constants";
import { BoxScore, PlayerStats, STAT_ID, TeamStats } from "./types";

function calcTeamStats(players: PlayerStats[]) : TeamStats {

    function sumStat(stat: STAT_ID) {
        return players.reduce((a, b) => a + (b[stat] || 0), 0);
    }

    return {
        points: sumStat('points'),
        assists: sumStat('assists'),
        
        reboundsTotal: sumStat('reboundsTotal'),
        reboundsDefensive: sumStat('reboundsDefensive'),
        reboundsOffensive: sumStat('reboundsOffensive'),

        freeThrowsMade: sumStat('freeThrowsMade'),
        freeThrowsAttempted: sumStat('freeThrowsAttempted'),

        twoPointersMade: sumStat('twoPointersMade'),
        twoPointersAttempted: sumStat('twoPointersAttempted'),

        threePointersMade: sumStat('threePointersMade'),
        threePointersAttempted: sumStat('threePointersAttempted'),

        blocks: sumStat('blocks'),
        blocksReceived: sumStat('blocksReceived'),
        steals: sumStat('steals'),
        turnovers: sumStat('turnovers'),
        foulsTechnical: sumStat('foulsTechnical'),

        reboundsWeighted: sumStat('reboundsWeighted'),
        twoPointersFreeThrows: sumStat('twoPointersFreeThrows'),
        stealsBlocksTurnovers: sumStat('stealsBlocksTurnovers'),
    }
}

function addFantasyPlayerStats(player: PlayerStats): PlayerStats {
    return {
        ...player,
        reboundsWeighted: player.reboundsDefensive + 2*player.reboundsOffensive,
        twoPointersFreeThrows: player.freeThrowsMade + 2*player.twoPointersMade,
        stealsBlocksTurnovers: player.steals + player.blocks - player.turnovers,
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
        fantasyTeamA.sort((playerA: PlayerStats, playerB: PlayerStats) => playerB.points - playerA.points)
        const fantasyTeamB = teamB.map(addFantasyPlayerStats)
        fantasyTeamB.sort((playerA: PlayerStats, playerB: PlayerStats) => playerB.points - playerA.points)

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

export { calcAllStarData }
