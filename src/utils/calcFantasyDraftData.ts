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

function calcWinner(a: number, b: number): WinnerType {
    if (a > b) {
        return 'A'
    } else if (a < b) {
        return 'B'
    } else {
        return null
    }
}

export function calculateFantasyDraftResult(boxScore: BoxScore, config: FantasyDraftConfig, gameConfigIdx: number): FantasyDraftResult {
    const gameData = boxScore.game
    const gameConfig = config.games[gameConfigIdx]

    // Sort Players into Fantasy Teams

    const allPlayers: Player[] = [
        ...gameData.homeTeam.players,
        ...gameData.awayTeam.players
    ].map(addFantasyPlayerStats).sort(comparePlayersWrapper(config.stats))

    const playersTeamA: Player[] = []
    const playersTeamB: Player[] = []

    allPlayers.forEach((player) => {
        if (gameConfig.playersTeamA.includes(player.name)) {
            playersTeamA.push(player)
        } else if (gameConfig.playersTeamB.includes(player.name)) {
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
        date: boxScore.date,
        game: gameData,
        playersTeamA,
        playersTeamB,
        winner: calcWinner(winsA, winsB),
        results
    }
}

export function calculateMultiFantasyDraftResult(draftResults: FantasyDraftResult[],  config: FantasyDraftConfig): MultiFantasyDraftResult {

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

    let status = 'Final'
    let gamesCompleted = 0

    draftResults.forEach((g) => {
        if (g && g.game.gameStatus) {
            if (g.game.gameStatus == 'Done') {
                gamesCompleted += 1
            } else {
                status = g.game.gameStatusText
            }
        }
    })
    if (gamesCompleted !== config.games.length) {
        status = `(${gamesCompleted + 1}/${config.games.length}) ${status}`
    }

    return {
        status,
        winner: calcWinner(winsA, winsB),
        results,
        draftResults
    }
}