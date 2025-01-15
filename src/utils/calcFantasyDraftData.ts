import { BoxScore, PlayerStats, STAT_ID, TeamStats } from "./types";

function calcTeamStats(players: PlayerStats[]) : TeamStats {

    function sumStat(stat: STAT_ID) {
        return players.reduce((a, b) => a + (b[stat] || 0), 0);
    }

    return {
        points: sumStat('points'),
        assists: sumStat('assists'),
        minutes: sumStat('minutes'),
        
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

function comparePlayers(playerA: PlayerStats, playerB: PlayerStats, stats: any): number {
    const results = stats?.map((stat: any) => {
        let playerAScore = playerA[stat.id as keyof TeamStats] || 0
        let playerBScore = playerB[stat.id as keyof TeamStats] || 0

        if (playerAScore < playerBScore) {
            return 1
        } else if (playerAScore > playerBScore) {
            return -1
        } else {
            return 0
        }
    })

    return results.slice(0,5).reduce((sum: number, a: number) => sum + a, 0)
}

function calcFantasyDraftData(data: BoxScore, captainTeamA: string, captainTeamB: string, playersTeamA: string[], playersTeamB: string[], stats: any) : any {

    if (data?.game) {

        const homePlayers: PlayerStats[] = data.game.homeTeam.players.map(addFantasyPlayerStats)
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players.map(addFantasyPlayerStats)
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        const teamA: any[] = []
        const teamB: any[] = []

        allPlayers.sort((playerA, playerB) => comparePlayers(playerA, playerB, stats))
        
        allPlayers.forEach((player) => {
            if (playersTeamA.includes(player.name)) {
                teamA.push(player)
            } else if (playersTeamB.includes(player.name)) {
                teamB.push(player)
            }
        })

        return {
            date: data.date,
            game: data.game,
            fantasyTeamA: {
                teamCaptain: captainTeamA,
                teamStats: calcTeamStats(teamA),
                players: teamA
            },
            fantasyTeamB: {
                teamCaptain: captainTeamB,
                teamStats: calcTeamStats(teamB),
                players: teamB
            },
            stats: stats,
            allPlayers: allPlayers
        }

    }

    return data
}

export { calcFantasyDraftData }
