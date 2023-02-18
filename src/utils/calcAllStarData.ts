import { ID_TO_DATA_MAP } from "./constants";
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
        stealsBlocks: sumStat('stealsBlocks'),
        stealsBlocksTurnovers: sumStat('stealsBlocksTurnovers'),
    }
}

function addFantasyPlayerStats(player: PlayerStats): PlayerStats {
    return {
        ...player,
        reboundsWeighted: player.reboundsDefensive + 2*player.reboundsOffensive,
        twoPointersFreeThrows: player.freeThrowsMade + 2*player.twoPointersMade,
        stealsBlocks: player.steals + player.blocks,
        stealsBlocksTurnovers: player.steals + player.blocks - player.turnovers,
    }
}

function calcAllStarData(data: BoxScore, id: string) : any {

    const fantasyData = ID_TO_DATA_MAP.find((data) => data.id == id)

    if (data?.game && fantasyData) {

        const { captainTeamA, captainTeamB, playersTeamA, playersTeamB } = fantasyData

        const homePlayers: PlayerStats[] = data.game.homeTeam.players
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        const teamA: PlayerStats[] = []
        const teamB: PlayerStats[] = []

        allPlayers.forEach((player) => {
            if (playersTeamA.includes(player.name)) {
                teamA.push(player)
            } else if (playersTeamB.includes(player.name)) {
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
                teamCaptain: captainTeamA,
                teamStats: calcTeamStats(fantasyTeamA),
                players: fantasyTeamA
            },
            fantasyTeamB: {
                teamCaptain: captainTeamB,
                teamStats: calcTeamStats(fantasyTeamB),
                players: fantasyTeamB
            },
            stats: fantasyData.stats
        }

    }

    return data
}

export { calcAllStarData }
