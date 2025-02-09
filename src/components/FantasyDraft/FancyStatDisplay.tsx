import { StatResult, StatResultBreakdown } from "@/utils/types"
import { ReactNode } from "react"
import StatLabel from "./StatLabel"
import SlotCounter from 'react-slot-counter';

function computeBreakdownDisplay(breakdown: StatResultBreakdown[]): ReactNode {
    if (breakdown.length < 2) {
        return <></>
    }

    const content = breakdown.map((b, i) => (
        <span key={i}>
            { !!i && ', '}
            <span className={`${b.winner? 'underline underline-offset-2' : ''}`}>{b.value}</span>
        </span>
    ))

    return <span>({content})</span>
}

type StatDisplayParams = {
    winner: boolean,
    total: number,
    breakdown: ReactNode
}

function StatDisplay({ winner, total, breakdown}: StatDisplayParams) {
    return (
        <div className='w-1/3 min-w-fit flex flex-col gap-2 justify-center items-center'>
            <div className={`${winner ? 'border-b-2 border-neutral-800' : ''}`}>
                <SlotCounter value={total}/>
            </div>
            <div className="text-xs overflow-visible">
                {breakdown}
            </div>
        </div>
    )
}

type FancyStatDisplayParams = {
    result: StatResult
}

export default function FancyStatDisplay({
    result
}: FancyStatDisplayParams) {

    if (result.stat.ignore) {
        return <></>
    }

    const teamA = result.teamA
    const breakdownTeamA = computeBreakdownDisplay(teamA.breakdown)

    const teamB = result.teamB
    const breakdownTeamB = computeBreakdownDisplay(teamB.breakdown)

    return (
        <div className="w-80 py-2 flex justify-between items-center"> 
            <StatDisplay
                winner={result.winner == 'A'}
                total={teamA.total}
                breakdown={breakdownTeamA}
            />      
            <StatLabel
                label={result.stat.label}
            />
            <StatDisplay
                winner={result.winner == 'B'}
                total={teamB.total}
                breakdown={breakdownTeamB}
            />
        </div>
    )
}