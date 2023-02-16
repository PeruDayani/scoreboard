import { all } from "axios";
import { TEAM_A, TEAM_A_CAPTAIN, TEAM_B, TEAM_B_CAPTAIN, FANTASY_TEAM_STATS } from "./constants";
import { BoxScore, PlayerStats, STAT_ID, Team, TeamStats } from "./types";

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

function calcAvgPlayerStats(players: PlayerStats[]) : any {

    function avgStat(stat: STAT_ID) : string {
        return (players.reduce((a, b) => a + (b[stat] || 0), 0) / players.length).toFixed(2);
    }

    return {
        points: avgStat('points'),
        assists: avgStat('assists'),
        
        reboundsTotal: avgStat('reboundsTotal'),
        reboundsDefensive: avgStat('reboundsDefensive'),
        reboundsOffensive: avgStat('reboundsOffensive'),

        freeThrowsMade: avgStat('freeThrowsMade'),
        freeThrowsAttempted: avgStat('freeThrowsAttempted'),

        twoPointersMade: avgStat('twoPointersMade'),
        twoPointersAttempted: avgStat('twoPointersAttempted'),

        threePointersMade: avgStat('threePointersMade'),
        threePointersAttempted: avgStat('threePointersAttempted'),

        blocks: avgStat('blocks'),
        blocksReceived: avgStat('blocksReceived'),
        steals: avgStat('steals'),
        turnovers: avgStat('turnovers'),
        foulsTechnical: avgStat('foulsTechnical'),

        reboundsWeighted: avgStat('reboundsWeighted'),
        twoPointersFreeThrows: avgStat('twoPointersFreeThrows'),
        stealsBlocksTurnovers: avgStat('stealsBlocksTurnovers'),
    }
}

function calcBestPlayer(allPlayers: PlayerStats[], stat: STAT_ID) : any {
    return allPlayers.sort(
        function(playerA: any, playerB: any) {
            return playerB[stat] - playerA[stat]
        }
    )
    .map((player) => {
        return {
            name: player.name,
            score: player[stat]
        }
    })
    .slice(0,3)
}

function calcAllStarData(data: BoxScore) : any {

    if (data?.game) {

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

    return data
}

function analyzeAllStarData(data:BoxScore) : any {
    if (data?.game) {

        const homePlayers: PlayerStats[] = data.game.homeTeam.players.map(addFantasyPlayerStats)
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players.map(addFantasyPlayerStats)
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        const avgPlayer: TeamStats = calcAvgPlayerStats(allPlayers)
        
        const bestPlayers: any[] = []

        FANTASY_TEAM_STATS.forEach((stat) => 
            bestPlayers.push(
                {
                    stat: stat,
                    average: avgPlayer[stat.id],
                    bestPlayers: calcBestPlayer(allPlayers, stat.id)
                }
            )
        )

        return {
            date: data.date,
            bestPlayers: bestPlayers,
            // avgPlayer: avgPlayer,
            // allPlayers: allPlayers
        }

    }

    return data
}

export { calcAllStarData, analyzeAllStarData }
