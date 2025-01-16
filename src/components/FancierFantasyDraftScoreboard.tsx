import Image from 'next/image'
import leftWinnerImg from '../../public/left_winner.png'
import rightWinnerImg from '../../public/right_winner.png'
import Confetti from 'react-dom-confetti';
import { useCallback, useEffect, useMemo, useState } from "react";
import { FantasyDraftConfig, FantasyDraftData, STAT_ID, Statistic, TeamStats } from '@/utils/types';

const CONFETTI_CONFIG = {
    angle: 90,
    spread: 45,
    startVelocity: 30,
    elementCount: 90,
    dragFriction: 0.12,
    duration: 6000,
    stagger: 3,
    width: "20px",
    height: "20px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

type FancyParams = {
    config: FantasyDraftConfig,
    games: FantasyDraftData[],
}

type StatFinalResult = {
    stat: Statistic,
    winner: string,
    teamA: {
        total: number,
        breakdown: {
            value: number,
            winner: boolean
        }[]
    }
    teamB: {
        total: number,
        breakdown: {
            value: number,
            winner: boolean
        }[]
    }
}

type FinalResult = {
    [id: string]: StatFinalResult
}

function customCompare(a: number, b: number): string {
    if (a > b) {
        return 'A'
    } else if (a < b) {
        return 'B'
    } else {
        return ''
    }
}

function FancyStatDisplay({ data }: { data: StatFinalResult}) {
    if (!data) {
        return <></>
    }

    const teamA = data.teamA
    const breakdownTeamA = teamA.breakdown.map((b, i) => (
        <>
            { !!i && ', '}
            <span className={`${b.winner? 'underline' : ''}`}>{b.value}</span>
        </>
    ))

    const teamB = data.teamB
    const breakdownTeamB = teamB.breakdown.map((b, i) => (
        <>
            { !!i && ', '}
            <span className={`${b.winner? 'underline' : ''}`}>{b.value}</span>
        </>
    ))

    return (
        <div className="w-80 py-2 flex justify-between items-center" key={data.stat.id}> 
            <div className='w-1/3 min-w-fit flex flex-col gap-1 justify-center items-center'>
                <div className={`${data.winner == 'A' ? 'underline' : ''}`}> {teamA.total} </div>
                <div className="text-xs overflow-visible"> ({breakdownTeamA}) </div>
            </div>
            <div className="w-1/3 text-xs text-center"> {data.stat.label} </div>
            <div className='w-1/3 min-w-fit flex flex-col gap-1 justify-center items-center'>
                <div className={`${data.winner == 'B' ? 'underline' : ''}`}> {teamB.total} </div>
                <div className="text-xs"> ({breakdownTeamB}) </div>
            </div>
        </div>
    )
}

export default function FancierFantasyDraftScoreboard({ config, games }: FancyParams) {

    const activeStats = config.stats.filter((s) => !s.ignore)
    const [confettiStatus, setConfettiStatus] = useState<boolean>(false)
    const [winner, setWinner] = useState<'A'|'B'>('A')
    const [finalResult, setFinalResult] = useState<FinalResult>({})

    const triggerConfetti = useCallback(() => {
        setConfettiStatus(true)
        setTimeout(() => setConfettiStatus(false), 1000)
    }, [])

    const gameStatus = useMemo(() => {
        let gamesCompleted = 0
        let currentStatus = 'Final'

        games.forEach((g) => {
            if (g && g.game.gameStatus) {
                if (g.game.gameStatus == 'Done') {
                    gamesCompleted += 1
                }
                if (g.game.gameStatus == 'Live') {
                    currentStatus = g.game.gameStatusText
                }
            }
        })

        if (gamesCompleted === config.games.length) {
            return 'Final'
        }

        return `(${gamesCompleted + 1}/${config.games.length}) ${currentStatus}`
    }, [config, games])

    useEffect(() => {
        const results: FinalResult = {}

        config.stats.forEach((stat) => {
            results[stat.id] = {
                stat: stat,
                winner: 'A',
                teamA: {
                    total: 0,
                    breakdown: []
                },
                teamB: {
                    total: 0,
                    breakdown: []
                }
            }
        })

        games.forEach((game) => {
            const statsTeamA = game.fantasyTeamA.teamStats
            const statsTeamB = game.fantasyTeamB.teamStats

            config.stats.forEach((stat) => {
                const currentResult = results[stat.id]
                const statTeamA = statsTeamA[stat.id as keyof TeamStats] || 0
                const statTeamB = statsTeamB[stat.id as keyof TeamStats] || 0
                const statWinner = customCompare(statTeamA, statTeamB)

                const totalTeamA = currentResult.teamA.total + statTeamA
                const totalTeamB = currentResult.teamB.total + statTeamB
                const totalWinner = customCompare(totalTeamA, totalTeamB)

                const newResult = {
                    stat: stat,
                    winner: totalWinner,
                    teamA: {
                        total: totalTeamA,
                        breakdown: [
                            ...currentResult.teamA.breakdown, 
                            {
                                value: statTeamA,
                                winner: statWinner == 'A'
                            }
                        ]
                    },
                    teamB: {
                        total: totalTeamB,
                        breakdown: [
                            ...currentResult.teamB.breakdown, 
                            {
                                value: statTeamB,
                                winner: statWinner == 'B'
                            }
                        ]
                    }
                }

                results[stat.id] = newResult
            })
        })

        const wins = activeStats.map((stat) => results[stat.id].winner)
        const winsTeamA = wins.filter((w) => w == 'A').length
        const winsTeamB = wins.filter((w) => w == 'B').length

        setWinner((winsTeamA > winsTeamB ? 'A' : 'B'))
        setFinalResult(results)
    }, [activeStats, config, games])

    useEffect(() => {
        if (gameStatus == 'Final') {
            triggerConfetti()
        }
    }, [gameStatus, triggerConfetti])

    return (
        <div className='flex flex-col gap-4 font-mono antialiased'>

            <div className='mx-auto italic underline'>
                { config.title }
            </div>

            <div className="m-auto p-2 bg-purple-100 rounded-lg flex flex-col gap-2" onClick={triggerConfetti}>

                <div className="text-center text-sm underline decoration-purple-900 underline-offset-2">
                    { gameStatus }
                </div>

                <div className="flex justify-between items-center italic text-center">
                    <div className="w-1/3"> 
                        <div> { config.captainTeamA }  </div>
                        <Confetti active={winner == 'A' && confettiStatus} config={CONFETTI_CONFIG} />
                    </div>
                    <div className="w-1/3">
                        {
                            winner == 'A' ? <Image className='w-16 m-auto' src={leftWinnerImg} alt="teamA winner"/> : <Image className='w-16 m-auto' src={rightWinnerImg} alt="teamA winner"/>
                        }
                    </div>
                    <div className="w-1/3"> 
                        <div> { config.captainTeamB } </div>
                        <Confetti active={winner == 'B' && confettiStatus} config={CONFETTI_CONFIG} />
                    </div>
                </div>
                
                { activeStats.map((st) => <FancyStatDisplay key={st.id} data={finalResult[st.id]}/>)}
            </div>

        </div>
    )
}