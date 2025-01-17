import Image from 'next/image'
import leftWinnerImg from '../../public/left_winner.png'
import rightWinnerImg from '../../public/right_winner.png'
import Confetti from 'react-dom-confetti';
import { useCallback, useEffect, useState } from "react";
import { FantasyDraftConfig, FantasyDraftResult, MultiFantasyDraftResult, Player, Statistic, StatResult } from '@/utils/types';

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
            <span className={`${b.winner? 'underline underline-offset-2' : ''}`}>{b.value}</span>
        </>
    ))

    const teamB = result.teamB
    const breakdownTeamB = teamB.breakdown.map((b, i) => (
        <>
            { !!i && ', '}
            <span className={`${b.winner? 'underline underline-offset-2' : ''}`}>{b.value}</span>
        </>
    ))

    return (
        <div className="w-80 py-2 flex justify-between items-center" key={result.stat.id}> 
            <div className='w-1/3 min-w-fit flex flex-col gap-2 justify-center items-center'>
                <div className={`${result.winner == 'A' ? 'underline underline-offset-2' : ''}`}> {teamA.total} </div>
                {displayBreakdown && <div className="text-xs overflow-visible"> ({breakdownTeamA}) </div>}
            </div>
            <div className="w-1/3 text-xs text-center"> {result.stat.label} </div>
            <div className='w-1/3 min-w-fit flex flex-col gap-2 justify-center items-center'>
                <div className={`${result.winner == 'B' ? 'underline underline-offset-2' : ''}`}> {teamB.total} </div>
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

    const multipleDrafts = config.games.length > 1
    const [activeGame, setActiveGame] = useState<number>(0)
    const [activeGameData, setActiveGameData] = useState<FantasyDraftResult>(draftResult.draftResults[0])
    const [selectedPlayerA, setSelectedPlayerA] = useState<Player>(activeGameData.playersTeamA[0])
    const [selectedPlayerB, setSelectedPlayerB] = useState<Player>(activeGameData.playersTeamB[0])

    const activeGameChange = useCallback((i: number) => {
        setActiveGame(i)
        setActiveGameData(draftResult.draftResults[i])
        setSelectedPlayerA(draftResult.draftResults[i].playersTeamA[0])
        setSelectedPlayerB(draftResult.draftResults[i].playersTeamB[0])
    }, [draftResult, setActiveGame, setActiveGameData])

    const triggerConfetti = useCallback(() => {
        setConfettiStatus(true)
        setTimeout(() => setConfettiStatus(false), 1000)
    }, [])

    useEffect(() => {
        if (draftResult.status == 'Final') {
            // triggerConfetti()
        }
    }, [draftResult.status, triggerConfetti])

    return (
        <div className='flex flex-col gap-4 font-mono antialiased mb-60'>

            <div className='mx-auto italic underline underline-offset-2'>
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

            <div className="p-4 bg-purple-100 rounded-lg flex flex-col gap-4">

                { multipleDrafts && <div className='flex py-2 justify-between italic sticky top-0 bg-purple-100'>
                    {
                        draftResult.draftResults.map((g, i) => (
                            <div key={i} className={`${activeGame == i? 'underline underline-offset-2' : ''}`} onClick={() => activeGameChange(i)}> Game {i+1} </div>
                        ))
                    }
                </div>
                }

                { multipleDrafts && <div className='flex justify-between items-center italic text-center'>
                    <div className="w-1/3"> 
                        <div> { config.captainTeamA }  </div>
                    </div>
                    <div className="w-1/3">
                        {
                            activeGameData.winner == 'A' ? <Image className='w-12 m-auto' src={leftWinnerImg} alt="teamA winner"/> : <Image className='w-12 m-auto' src={rightWinnerImg} alt="teamA winner"/>
                        }
                    </div>
                    <div className="w-1/3"> 
                        <div> { config.captainTeamB } </div>
                    </div>
                </div>}

                { multipleDrafts && activeGameData.results.map((result) => <FancyStatDisplay key={result.stat.id} result={result} displayBreakdown={false}/>)}

                <div className='w-full text-center italic underline underline-offset-2'> Roster </div>

                <div className='w-80 flex justify-between items-center text-center text-xs '>
                    <div className="w-1/3 flex flex-col justify-between h-full gap-6">
                        {
                            activeGameData.playersTeamA.map((p) => (
                                <div 
                                    key={p.personId}
                                    className={`${selectedPlayerA.personId == p.personId? 'underline' : 'hover:underline'} underline-offset-2`}
                                    onClick={() => setSelectedPlayerA(p)}
                                > 
                                    {p.name} 
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-1/3 flex flex-col text-center gap-8">
                        {
                            config.stats.map((s) => (
                                <div key={s.id} className='flex flex-col gap-2'>
                                    <div> {s.label} </div>
                                    <div className='text-xs'> 
                                        <span className={`${(selectedPlayerA[s.id] || 0) > (selectedPlayerB[s.id] || 0) ? 'underline underline-offset-2' : ''}`}>{selectedPlayerA[s.id]}</span>
                                        <span> - </span>
                                        <span className={`${(selectedPlayerA[s.id] || 0) < (selectedPlayerB[s.id] || 0) ? 'underline underline-offset-2' : ''}`}>{selectedPlayerB[s.id]}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-1/3 flex flex-col justify-between h-full gap-6">
                        {
                            activeGameData.playersTeamB.map((p) => (
                                <div 
                                    key={p.personId}
                                    className={`${selectedPlayerB.personId == p.personId? 'underline' : 'hover:underline'} underline-offset-2`}
                                    onClick={() => setSelectedPlayerB(p)}
                                > 
                                    {p.name} 
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}