import { FANTASY_STATS, FANTASY_STATS_2022 } from "@/utils/constants";
import { AllStarDraftData, TeamStats, STAT_ID } from "@/utils/types";
import AllStarPlayerStats from "./AllStarPlayerStats"

export default function AllStarScoreboard({data}: {data: AllStarDraftData}) {
    
    if (data == null ) {
        return (<div> Nope </div>)
    }
    
    const fantasyTeamA = data.fantasyTeamA
    const fantasyTeamB = data.fantasyTeamB

    function isWinning (team: string, statId: STAT_ID, invert: boolean = false) : string {
        let teamAScore = fantasyTeamA?.teamStats[statId] || 0
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

    return (
        <div className='flex flex-col font-mono antialiased'>

            <div className='mx-auto py-2 italic underline'>
                All Star {data?.date.split(' ')[3]}
            </div>

            <div className="w-80 lg:w-96 m-auto p-4 bg-purple-100 rounded-lg flex flex-col">
                <div className="pb-2 flex justify-between italic">
                    <div> {fantasyTeamA?.teamCaptain} </div>
                    <div> {fantasyTeamB?.teamCaptain} </div>
                </div>
                {
                    FANTASY_STATS.map((stat) => (
                        <div className="px-6 py-1 flex justify-between items-center" key={stat.id}> 
                            <div className={isWinning('A', stat.id, stat?.invert)}> <> {fantasyTeamA?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                            <div className="text-xs"> {stat.label} </div>
                            <div className={isWinning('B', stat.id, stat?.invert)} > <> {fantasyTeamB?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-24">
                <AllStarPlayerStats team={fantasyTeamA} />
                <AllStarPlayerStats team={fantasyTeamB} />
            </div>

        </div>
    )
}