import Image from 'next/image'
import leftWinnerImg from '../../public/left_winner.png'
import rightWinnerImg from '../../public/right_winner.png'
import linkImg from '../../public/link.png'
import Confetti from 'react-dom-confetti';
import { useCallback, useEffect, useMemo, useState } from "react";
import { FantasyDraftConfig, MultiFantasyDraftResult, Statistic, StatResult } from '@/utils/types';
import Link from 'next/link';

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

function FancyStatDisplay({ result, displayBreakdown }: { result: StatResult, displayBreakdown: boolean }) {

    if (result.stat.ignore) {
        return <></>
    }

    const teamA = result.teamA
    const breakdownTeamA = teamA.breakdown.map((b, i) => (
        <>
            { !!i && ', '}
            <span className={`${b.winner? 'underline' : ''}`}>{b.value}</span>
        </>
    ))

    const teamB = result.teamB
    const breakdownTeamB = teamB.breakdown.map((b, i) => (
        <>
            { !!i && ', '}
            <span className={`${b.winner? 'underline' : ''}`}>{b.value}</span>
        </>
    ))

    return (
        <div className="w-80 py-2 flex justify-between items-center" key={result.stat.id}> 
            <div className='w-1/3 min-w-fit flex flex-col gap-1 justify-center items-center'>
                <div className={`${result.winner == 'A' ? 'underline' : ''}`}> {teamA.total} </div>
                {displayBreakdown && <div className="text-xs overflow-visible"> ({breakdownTeamA}) </div>}
            </div>
            <div className="w-1/3 text-xs text-center"> {result.stat.label} </div>
            <div className='w-1/3 min-w-fit flex flex-col gap-1 justify-center items-center'>
                <div className={`${result.winner == 'B' ? 'underline' : ''}`}> {teamB.total} </div>
                {displayBreakdown && <div className="text-xs"> ({breakdownTeamB}) </div>}
            </div>
        </div>
    )
}

type FancyParams = {
    config: FantasyDraftConfig,
    draftResult: MultiFantasyDraftResult,
}

export default function MultiFantasyDraftResultDisplay({ config, draftResult }: FancyParams) {

    const [confettiStatus, setConfettiStatus] = useState<boolean>(false)
    const displayBreakdown = draftResult.draftResults.length > 1

    const triggerConfetti = useCallback(() => {
        setConfettiStatus(true)
        setTimeout(() => setConfettiStatus(false), 1000)
    }, [])

    useEffect(() => {
        if (draftResult.status == 'Final') {
            triggerConfetti()
        }
    }, [draftResult.status, triggerConfetti])

    return (
        <div className='flex flex-col gap-4 font-mono antialiased'>

            <div className='mx-auto italic underline'>
                { config.title }
            </div>

            <div className="m-auto p-4 bg-purple-100 rounded-lg flex flex-col gap-2" onClick={triggerConfetti}>
                <div className="text-center text-sm underline decoration-purple-900 underline-offset-2">
                    { draftResult.status }
                </div>

                <div className="flex justify-between items-center italic text-center">
                    <div className="w-1/3"> 
                        <div> { config.captainTeamA }  </div>
                        <Confetti active={draftResult.winner == 'A' && confettiStatus} config={CONFETTI_CONFIG} />
                    </div>
                    <div className="w-1/3">
                        {
                            draftResult.winner == 'A' ? <Image className='w-16 m-auto' src={leftWinnerImg} alt="teamA winner"/> : <Image className='w-16 m-auto' src={rightWinnerImg} alt="teamA winner"/>
                        }
                    </div>
                    <div className="w-1/3"> 
                        <div> { config.captainTeamB } </div>
                        <Confetti active={draftResult.winner == 'B' && confettiStatus} config={CONFETTI_CONFIG} />
                    </div>
                </div>
                
                { draftResult.results.map((result) => <FancyStatDisplay key={result.stat.id} result={result} displayBreakdown={displayBreakdown}/>)}
            </div>

            <div className='mx-auto italic underline'>
                Games
            </div>

            <div className="p-4 bg-purple-100 rounded-lg flex flex-col gap-4" onClick={triggerConfetti}>
                {
                    draftResult.draftResults.map((g, i) => (
                        <div key={g.game.gameId} className='flex flex-col gap-2 text-center'>
                            <div> Game {i+1} </div>
                            <div className='text-sm flex gap-4 justify-center items-center'>
                                <div>
                                    {g.date}
                                </div>
                                <Link href={`https://www.nba.com/game/${g.game.gameId}/box-score`} target='_blank'>
                                    <Image className='w-3' src={linkImg} alt="open link" />
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}