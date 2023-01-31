export default function GameRow({game}: {game: any}) {
    const highlighsLink = `https://www.youtube.com/results?search_query=${game.awayTeam.teamCity}+${game.awayTeam.teamName}+at+${game.homeTeam.teamCity}+${game.homeTeam.teamName}`
    
    return (
        <div className="py-4 px-6 m-4 shadow-md bg-purple-50 text-center flex justify-between items-center gap-x-10">
            <div className="w-6">
                {game.gameStatusText}
            </div>
            <div className="w-48">
                <p> {game.awayTeam.teamCity} {game.awayTeam.teamName} </p>
                <p> ( {game.awayTeam.record} ) </p>
            </div>
            <div className="w-48">
                <p> {game.homeTeam.teamCity} {game.homeTeam.teamName} </p>
                <p> ( {game.homeTeam.record}  )</p>
            </div>
            <div className="w-32">
                Less than {Math.ceil((Math.abs(game.homeTeam.score - game.awayTeam.score))/5)*5}
            </div>
            <div>
                <a href={highlighsLink} target="_blank" rel="noreferrer"> Link </a>
            </div>

        </div>
    )
}