import { FantasyDraftData, TeamStats, STAT_ID, Statistic } from "@/utils/types";
import FantasyDraftPlayerStats from "./FantasyDraftPlayerStats"
import Image from 'next/image'
import leftWinnerImg from '../../public/left_winner.png'
import rightWinnerImg from '../../public/right_winner.png'
import Confetti from 'react-dom-confetti';
import { useCallback, useEffect, useState } from "react";

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

export default function FantasyDraftScoreboard({data}: {data: FantasyDraftData}) {

    console.log("Data: ", data)

    const [confettiTeamA, setConfettiTeamA] = useState(false);    
    const [confettiTeamB, setConfettiTeamB] = useState(false);
    
    const fantasyTeamA = data.fantasyTeamA
    const fantasyTeamB = data.fantasyTeamB

    const isTeamAWinning = useCallback(() => {
        const results = data.stats.map((stat: Statistic) => {
            let teamAScore = fantasyTeamA.teamStats[stat.id as keyof TeamStats] || 0
            let teamBScore = fantasyTeamB.teamStats[stat.id as keyof TeamStats] || 0

            if (teamAScore > teamBScore) {
                return 1
            } else if (teamAScore < teamBScore) {
                return -1
            } else {
                return 0
            }
        })

        const primaryResult = results.slice(0,5).reduce((sum: number, a: number) => sum + a, 0)

        if (primaryResult === 0) {
            return results[5] > 0 ?  true : false   
        }

        return primaryResult > 0 ?  true : false     
    }, [data, fantasyTeamA, fantasyTeamB])

    const triggerConfetti = useCallback(() => {
        if (isTeamAWinning()) {
            setConfettiTeamA(true)
            setTimeout(() => setConfettiTeamA(false), 1000)    
        } else {
            setConfettiTeamB(true)
            setTimeout(() => setConfettiTeamB(false), 1000)
        }
    }, [isTeamAWinning])

    const isWinningStat = useCallback((team: string, statId: STAT_ID, invert: boolean = false) => {

        let teamAScore = fantasyTeamA?.teamStats[statId as keyof TeamStats] || 0
        let teamBScore = fantasyTeamB?.teamStats[statId as keyof TeamStats] || 0

        if (invert) {
            teamAScore = -teamAScore
            teamBScore = -teamBScore
        }

        if (teamAScore > teamBScore && team=='A') {
            return 'underline decoration-purple-900 underline-offset-2'
        } 

        if (teamBScore > teamAScore && team=='B') {
            return 'underline decoration-purple-900 underline-offset-2'
        } 

        return ''

    }, [fantasyTeamA, fantasyTeamB])

    useEffect(() => {
        if (data.game.gameStatus == 'Done') {
            triggerConfetti()
        }
    }, [data, triggerConfetti])

    return (
        <div className='flex flex-col font-mono antialiased'>

            <div className='mx-auto py-2 italic underline'>
                All Star {data?.date.split(' ')[3]}
            </div>

            <div className="w-80 lg:w-96 m-auto p-4 bg-purple-100 rounded-lg flex flex-col" onClick={triggerConfetti}>

                <div className="text-center text-sm underline decoration-purple-900 underline-offset-2">
                    {data.game.gameStatusText}
                </div>

                <div className="flex justify-between items-center italic text-center">
                    <div className="w-1/4"> 
                        <div> {fantasyTeamA?.teamCaptain}  </div>
                        <Confetti active={confettiTeamA} config={CONFETTI_CONFIG} />
                    </div>
                    <div className="w-20">
                        {
                            isTeamAWinning() ? <Image src={leftWinnerImg} alt="teamA winner"/> : <Image src={rightWinnerImg} alt="teamA winner"/>
                        }
                    </div>
                    <div className="w-1/4"> 
                        <div> {fantasyTeamB?.teamCaptain} </div>
                        <Confetti active={confettiTeamB} config={CONFETTI_CONFIG} />
                     </div>
                </div>

                {
                    data.stats.filter((stat: any) => !stat.ignore ).map((stat: any) => (
                        <div className="px-6 py-1 flex justify-between items-center" key={stat.id}> 
                            <div className={isWinningStat('A', stat.id, stat?.invert)}> <> {fantasyTeamA?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                            <div className="text-xs"> {stat.label} </div>
                            <div className={isWinningStat('B', stat.id, stat?.invert)} > <> {fantasyTeamB?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                        </div>
                    ))
                }

                <div className="px-6 py-2 flex justify-center items-center"> 
                    <div className="text-xs italic"> Other stats </div>
                </div>

                {   
                    data.stats.filter((stat: any) => stat.ignore ).map((stat: any) => (
                        <div className="px-6 py-1 flex justify-between items-center" key={stat.id}> 
                            <div className={isWinningStat('A', stat.id, stat?.invert)}> <> {fantasyTeamA?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                            <div className="text-xs"> {stat.label} </div>
                            <div className={isWinningStat('B', stat.id, stat?.invert)} > <> {fantasyTeamB?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                        </div>
                    ))
                }
            </div>

            {/* <div className="flex flex-col">
                <FantasyDraftPlayerStats teamCaptain={fantasyTeamA.teamCaptain} players={fantasyTeamA.players} />
                <FantasyDraftPlayerStats teamCaptain={fantasyTeamB.teamCaptain} players={fantasyTeamB.players} />
            </div>

            <div className="flex flex-col">
                <FantasyDraftPlayerStats teamCaptain="All Players Ranked" players={data.allPlayers || []}/>
            </div> */}

        </div>
    )
}