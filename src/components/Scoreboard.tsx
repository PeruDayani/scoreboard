import GameRow from '@/components/GameRow'

export default function Scoreboard({date, games}: {date: any, games: any}) {    
    
    // TODO:
    // CSS obviously
    // Sort by Final (with links), Live (without links), Scheduled (without links)

    const sortedGames = games.sort(function(firstGame: any, secondGame: any) {
        const firstGameDiff = Math.abs(firstGame.homeTeam.score - firstGame.awayTeam.score)
        const secondGameDiff = Math.abs(secondGame.homeTeam.score - secondGame.awayTeam.score)
        return firstGameDiff - secondGameDiff
    })
    const renderGames = sortedGames.length ? sortedGames.map((game: any) => <GameRow game={game} key={game.gameId}/>) : <p> No Games Today </p>
    
    return (
        <div className='flex flex-col'>
            <div className='mx-auto text-2xl italic'>
                {date}
            </div>
            <div className='mx-auto'>
                {renderGames}
            </div>
        </div>
    )
}