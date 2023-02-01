import GameRow from '@/components/GameRow'
import { Game } from '@/utils/types'

export default function Scoreboard({date, games}: {date: any, games: any}) {    

    // Move this to a game attribute! 
    const liveGames = games.filter((game: Game) => !(game.gameStatusText.includes('ET') || game.gameStatusText.includes('Final')))
    const scheduledGames = games.filter((game: Game) => game.gameStatusText.includes('ET'))
    const finishedGames = games.filter((game: Game) => game.gameStatusText.includes('Final'))

    const sortedFinishedGames = finishedGames.sort(function(firstGame: any, secondGame: any) {
        const firstGameDiff = Math.abs(firstGame.homeTeam.score - firstGame.awayTeam.score)
        const secondGameDiff = Math.abs(secondGame.homeTeam.score - secondGame.awayTeam.score)
        return firstGameDiff - secondGameDiff
    })
    
    return (
        <div className='flex flex-col'>
            <div className='mx-auto py-2 text-xl italic underline'>
                {date}
            </div>

            <div className='flex flex-wrap justify-center'>
                {sortedFinishedGames.map((game: Game) => <GameRow game={game} key={game.gameId}/>)}

                {liveGames.map((game: Game) => <GameRow game={game} key={game.gameId}/>)}

                {scheduledGames.map((game: Game) => <GameRow game={game} key={game.gameId}/>)}
            </div>

        </div>
    )
}