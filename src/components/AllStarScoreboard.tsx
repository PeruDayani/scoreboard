import { AllStarDraftData, TeamStats, STAT_ID } from "@/utils/types";
import AllStarPlayerStats from "./AllStarPlayerStats"
import Image from 'next/image'
import leftWinnerImg from '../../public/left_winner.png'
import rightWinnerImg from '../../public/right_winner.png'

export default function AllStarScoreboard({data}: {data: AllStarDraftData}) {
    
    if (data.error) {
        return (
            <div className="mx-auto text-lg py-2 italic text-center"> 
                <p> 
                    The NBA has not started publishing the game data yet.
                </p>
                <p> 
                    They usually start 45 minutes before tipoff.
                </p>
            </div>
        )
    }
    
    const fantasyTeamA = data.fantasyTeamA
    const fantasyTeamB = data.fantasyTeamB

    function isRightWinning () : boolean {

        const results = data.stats?.map((stat: any) => {
            let teamAScore = fantasyTeamA?.teamStats[stat.id as keyof TeamStats] || 0
            let teamBScore = fantasyTeamB?.teamStats[stat.id as keyof TeamStats] || 0

            if (teamAScore > teamBScore) {
                return -1
            } else if (teamAScore < teamBScore) {
                return 1
            } else {
                return 0
            }
        })

        const primaryResult = results.slice(0,5).reduce((sum: number, a: number) => sum + a, 0)

        if (primaryResult === 0) {
            return results[5] > 0 ?  true : false   
        }

        return primaryResult > 0 ?  true : false     
    }

    function isWinningStat (team: string, statId: STAT_ID, invert: boolean = false) : string {
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
    }

    // Trigger confettit on click and when status === final
    // Use this icon to signify who's winning 

    return (
        <div className='flex flex-col font-mono antialiased'>

            <div className='mx-auto py-2 italic underline'>
                All Star {data?.date.split(' ')[3]}
            </div>

            <div className="w-80 lg:w-96 m-auto p-4 bg-purple-100 rounded-lg flex flex-col">

                <div className="text-center text-sm underline decoration-purple-900 underline-offset-2">
                    {data.game.gameStatusText}
                </div>

                <div className="flex justify-between items-center italic text-center">
                    <div className="w-1/4"> {fantasyTeamA?.teamCaptain} </div>
                    <div className="w-20">
                        {
                            isRightWinning() ? <Image src={rightWinnerImg} alt="teamA winner"/> : <Image src={leftWinnerImg} alt="teamA winner"/>
                        }
                    </div>
                    <div className="w-1/4"> {fantasyTeamB?.teamCaptain} </div>
                </div>

                {
                    data.stats.map((stat: any) => (
                        <div className="px-6 py-1 flex justify-between items-center" key={stat.id}> 
                            <div className={isWinningStat('A', stat.id, stat?.invert)}> <> {fantasyTeamA?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                            <div className="text-xs"> {stat.label} </div>
                            <div className={isWinningStat('B', stat.id, stat?.invert)} > <> {fantasyTeamB?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col">
                <AllStarPlayerStats team={fantasyTeamA} />
                <AllStarPlayerStats team={fantasyTeamB} />
            </div>

        </div>
    )
}