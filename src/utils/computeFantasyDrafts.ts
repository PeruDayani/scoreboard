import { BoxScore, Player, StatisticID, AllStatistics, FantasyDraftConfig, Statistic, FantasyDraftResult, WinnerType, StatResult, MultiFantasyDraftResult } from "./types";

function calcTeamStats(players: Player[]) : AllStatistics {

    function sumStat(stat: StatisticID) {
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

function calcWinner(a: number, b: number): WinnerType {
    if (a > b) {
        return 'A'
    } else if (a < b) {
        return 'B'
    } else {
        return null
    }
}

function createBasicPlayer(name: string): Player {
    return {
        name: name,
        personId: name,
        points: 0,
        assists: 0,
        reboundsTotal: 0,
        reboundsDefensive: 0,
        reboundsOffensive: 0,
        freeThrowsMade: 0,
        freeThrowsAttempted: 0,
        twoPointersMade: 0,
        twoPointersAttempted: 0,
        threePointersMade: 0,
        threePointersAttempted: 0,
        blocks: 0,
        blocksReceived: 0,
        steals: 0,
        turnovers: 0,
        foulsTechnical: 0
    }
}

function addFantasyPlayerStats(player: Player): Player {
    return {
        ...player,
        reboundsWeighted: player.reboundsDefensive + 2*player.reboundsOffensive,
        twoPointersFreeThrows: player.freeThrowsMade + 2*player.twoPointersMade,
        stealsBlocks: player.steals + player.blocks,
        stealsBlocksTurnovers: player.steals + player.blocks - player.turnovers,
    }
}

function comparePlayers(playerA: Player, playerB: Player, stats: Statistic[]): number {
    const results = stats.filter((s) => !s.ignore).map((stat: any) => {
        let playerAScore = playerA[stat.id as StatisticID] || 0
        let playerBScore = playerB[stat.id as StatisticID] || 0

        if (playerAScore < playerBScore) {
            return 1
        } else if (playerAScore > playerBScore) {
            return -1
        } else {
            return 0
        }
    })

    return results.reduce((sum: number, a: number) => sum + a, 0)
}

function comparePlayersWrapper(stats: Statistic[]) {
    return (a: Player, b: Player) => comparePlayers(a, b, stats)
}

export function computeFantasyDraftResult(boxScore: BoxScore | null, config: FantasyDraftConfig, gameConfigIdx: number): FantasyDraftResult {
    const gameConfig = config.games[gameConfigIdx]
    
    if (!boxScore) {
        return {
            status: 'Scheduled',
            playersTeamA: gameConfig.playersTeamA.map(createBasicPlayer),
            playersTeamB: gameConfig.playersTeamB.map(createBasicPlayer),
            winner: null,
            results: []
        }
    }
    
    const gameData = boxScore.game

    // Sort Players into Fantasy Teams

    const allPlayers: Player[] = [
        ...gameData.homeTeam.players,
        ...gameData.awayTeam.players
    ].map(addFantasyPlayerStats).sort(comparePlayersWrapper(config.stats))

    const playersTeamA: Player[] = []
    const playersTeamB: Player[] = []

    allPlayers.forEach((player) => {
        if (gameConfig.playersTeamA.includes(player.name)) {
            player.draftedAt = gameConfig.playersTeamA.indexOf(player.name) + 1
            playersTeamA.push(player)
        } else if (gameConfig.playersTeamB.includes(player.name)) {
            player.draftedAt = gameConfig.playersTeamB.indexOf(player.name) + 1
            playersTeamB.push(player)
        }
    })

    // Calculate Fantasy Team results

    const statsTeamA: AllStatistics = calcTeamStats(playersTeamA)
    const statsTeamB: AllStatistics = calcTeamStats(playersTeamB)

    // Calculate Fantasy Draft results

    const results: StatResult[] = []
    let winsA = 0
    let winsB = 0

    config.stats.forEach((stat) => {
        const statTeamA = statsTeamA[stat.id as StatisticID] || 0
        const statTeamB = statsTeamB[stat.id as StatisticID] || 0
        const winner = calcWinner(statTeamA, statTeamB)

        if (winner == 'A') { 
            winsA += 1
        }
        if (winner == 'B') { 
            winsB += 1
        }

        results.push({
            stat,
            winner,
            teamA: {
                total: statTeamA,
                breakdown: []
            },
            teamB: {
                total: statTeamB,
                breakdown: []
            },
        })
    })

    return {
        status: boxScore.game.gameStatusText,
        date: boxScore.date,
        game: gameData,
        playersTeamA,
        playersTeamB,
        winner: calcWinner(winsA, winsB),
        results
    }
}

export function computeMultiFantasyDraftResult(draftResults: FantasyDraftResult[],  config: FantasyDraftConfig): MultiFantasyDraftResult {

    const results: StatResult[] = []
    let winsA = 0
    let winsB = 0

    config.stats.forEach((stat) => {

        let totalStatA = 0
        let breakdownStatA: { value: number; winner: boolean; }[] = []
        let totalStatB = 0
        let breakdownStatB: { value: number; winner: boolean; }[] = []

        draftResults.forEach((draftResult) => {
            const statResult = draftResult.results.find((s) => (s.stat.id == stat.id))

            if (statResult) {
                totalStatA += statResult.teamA.total
                breakdownStatA.push({
                    value: statResult.teamA.total,
                    winner: statResult.winner == 'A'
                })

                totalStatB += statResult.teamB.total
                breakdownStatB.push({
                    value: statResult.teamB.total,
                    winner: statResult.winner == 'B'
                })
            }

        })

        const winner = calcWinner(totalStatA, totalStatB)
        if (!stat.ignore) {
            if (winner == 'A') { 
                winsA += 1
            }
            if (winner == 'B') { 
                winsB += 1
            }   
        }

        results.push({
            stat,
            winner,
            teamA: {
                total: totalStatA,
                breakdown: breakdownStatA
            },
            teamB: {
                total: totalStatB,
                breakdown: breakdownStatB
            },
        })
    })

    const gameStates = draftResults.map((d) => d.status)
    let status = ''

    if (gameStates.every((v) => v == 'Final')) {
        status = 'Final'
    } else if (gameStates.every((v) => v == 'Scheduled')) {
        status = 'Scheduled'
    } else {
        status = 'Live'
    }

    return {
        status,
        winner: calcWinner(winsA, winsB),
        results,
        draftResults
    }
}