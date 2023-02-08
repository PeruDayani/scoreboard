import GameRow from '@/components/GameRow'
import { Game } from '@/utils/types'

export default function Scoreboard({date, games}: {date: any, games: any}) {    

    const liveGames = games.filter((game: Game) => game.gameStatus == 'Live')
    const scheduledGames = games.filter((game: Game) => game.gameStatus == 'Scheduled')
    const doneGames = games.filter((game: Game) => game.gameStatus == 'Done')

    const sortedDoneGames = doneGames.sort(function(firstGame: any, secondGame: any) {
        const firstGameDiff = Math.abs(firstGame.homeTeam.score - firstGame.awayTeam.score)
        const secondGameDiff = Math.abs(secondGame.homeTeam.score - secondGame.awayTeam.score)
        return firstGameDiff - secondGameDiff
    })

    
    return (
        <div className='flex flex-col font-mono antialiased'>
            <div className='mx-auto py-2 italic underline'>
                {date}
            </div>

            <div className='flex flex-wrap justify-center max-w-5xl m-auto'>
                {sortedDoneGames.map((game: Game) => <GameRow game={game} key={game.gameId}/>)}

                {liveGames.map((game: Game) => <GameRow game={game} key={game.gameId}/>)}

                {scheduledGames.map((game: Game) => <GameRow game={game} key={game.gameId}/>)}
            </div>

        </div>
    )
}