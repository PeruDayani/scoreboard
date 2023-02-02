import { AllStarDraftData, TeamStats } from "@/utils/types";

export default function AllStarScoreboard({data}: {data: AllStarDraftData}) {  
    
    const fantasyTeamA = data?.fantasyTeamA
    const fantasyTeamB = data?.fantasyTeamB

    const displayStats = [
        {
            id: 'points',
            label: 'Points'
        },
        {
            id: 'assists',
            label: 'Assists'
        },
        {
            id: 'reboundsTotal',
            label: 'Rebounds'
        },
        {
            id: 'threePointersMade',
            label: `Trey's`
        },
        {
            id: 'stealsBlocks',
            label: `Hustle(STL+BLK)`
        },
        {
            id: '',
            label: `More Options`
        },
        {
            id: 'reboundsWeighted',
            label: 'Rebounds Weighted'
        },
        {
            id: 'threePointersAttempted',
            label: `Trey's Attempted`
        },
        {
            id: 'blocks',
            label: `Blocks`
        },
        {
            id: 'blocksReceived',
            label: `Blocks Recieved`,
            invert: true
        },
        {
            id: 'steals',
            label: `Steals`
        },
        {
            id: 'turnovers',
            label: `Turnovers`,
            invert: true
        },
        {
            id: 'stealsBlocksTurnoversBlocksRecieved',
            label: `Hustle (STL+BK-BKR-TO)`
        },
    ]

    function isWinning (team: string, statId: string, invert: boolean = false) : string {
        let teamAScore = fantasyTeamA?.teamStats[statId as keyof TeamStats] || 0
        let teamBScore = fantasyTeamB?.teamStats[statId as keyof TeamStats] || 0

        if (invert) {
            teamAScore = -teamAScore
            teamBScore = -teamBScore
        }

        if (teamAScore > teamBScore && team=='A') {
            return 'underline decoration-purple-600 underline-offset-2'
        } 

        if (teamBScore > teamAScore && team=='B') {
            return 'underline decoration-purple-800 underline-offset-2'
        } 

        return ''
    }

    return (
        <div className='flex flex-col font-mono antialiased'>

            <div className='mx-auto py-2 italic underline'>
                All Star {data?.date.split(' ')[3]}
            </div>

            <div className="w-80 lg:w-96 m-auto p-4 bg-purple-100	rounded-lg flex flex-col">
                <div className="py-2 flex justify-between italic">
                    <div> {fantasyTeamA?.teamCaptain} </div>
                    <div> {fantasyTeamB?.teamCaptain} </div>
                </div>
                {
                    displayStats.map((stat) => (
                        <div className="px-6 py-1 flex justify-between items-center" key={stat.id}> 
                            <div className={isWinning('A', stat.id, stat?.invert)}> <> {fantasyTeamA?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                            <div className="text-xs"> {stat.label} </div>
                            <div className={isWinning('B', stat.id, stat?.invert)} > <> {fantasyTeamB?.teamStats[stat.id as keyof TeamStats]} </>  </div>
                        </div>
                    ))
                }
            </div>

            {/* A table each for the player stats */}
        </div>
    )
}