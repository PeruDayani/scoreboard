import { FantasyDraftResult } from "@/utils/types"
import Link from "next/link"

type GameLabelParams = {
    draftResult: FantasyDraftResult
}

export default function GameLabel({ draftResult }: GameLabelParams) {
    if (draftResult.date && draftResult.game) {

        const homeTeam = draftResult.game.homeTeam
        const awayTeam = draftResult.game.awayTeam

        const truncate = homeTeam.teamCity.length > 15 || awayTeam.teamCity.length > 15
        const homeTeamName = truncate ? `${homeTeam.teamCity}` : `${homeTeam.teamCity} ${homeTeam.teamName}`
        const awayTeamName = truncate ? `${awayTeam.teamCity}` : `${awayTeam.teamCity} ${awayTeam.teamName}`

        return (
            <Link href={`https://www.nba.com/game/${draftResult.game.gameId}/box-score`} target="_blank">
                <div className="text-xs text-center">
                    <div> {draftResult.date} </div>
                    <div>
                        <span>{homeTeamName} </span>
                        <span> • </span>
                        <span>{awayTeamName}</span>
                    </div>
                </div>  
            </Link>
        )
    }
    
    return (
        <div className="text-xs text-center">
            •
        </div>
    )
}