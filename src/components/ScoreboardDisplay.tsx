import ScoreboardGameCard from '@/components/ScoreboardGameCard'
import { Game } from '@/utils/types'
import { useMemo } from 'react'

type ScoreboardDisplayProps = {
    title: string,
    games: Game[]
}

function FilterAndSortGames(games: Game[], status: string, sort: boolean): Game[] {
    let results = games.filter((game) => game.gameStatus == status)

    if (sort) {
        return results.sort(function(firstGame: any, secondGame: any) {
            const firstGameDiff = Math.abs(firstGame.homeTeam.score - firstGame.awayTeam.score)
            const secondGameDiff = Math.abs(secondGame.homeTeam.score - secondGame.awayTeam.score)
            return firstGameDiff - secondGameDiff
        })
    }

    return results
}

export default function ScoreboardDisplay({title, games}: ScoreboardDisplayProps) { 
    
    const displayGames = useMemo(() => {
        const finishedGames = FilterAndSortGames(games, 'Done', true)
        const liveGames = FilterAndSortGames(games, 'Live', true)
        const scheduledGames = FilterAndSortGames(games, 'Scheduled', false)

        return [
            ...finishedGames,
            ...liveGames,
            ...scheduledGames
        ]
    }, [games])
    
    return (
        <div className='flex flex-col font-mono antialiased'>
            <div className='mx-auto py-2 italic underline'>
                {title}
            </div>

            <div className='flex flex-wrap justify-center max-w-5xl m-auto'>
                {displayGames.map((game: Game) => <ScoreboardGameCard game={game} key={game.gameId}/>)}
            </div>

        </div>
    )
}