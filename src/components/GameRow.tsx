export default function GameRow({game}: {game: any}) {

    const gameTimeUTC = new Date(game.gameTimeUTC)
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gameDateString = new Intl.DateTimeFormat('en-US', options).format(gameTimeUTC)
    const highlighsLink = `https://www.youtube.com/results?search_query=${game.awayTeam.teamCity}+${game.awayTeam.teamName}+at+${game.homeTeam.teamCity}+${game.homeTeam.teamName}+${gameDateString}`
    
    return (
        <div className="py-4 px-6 m-4 shadow-md bg-purple-50 text-center flex justify-between items-center gap-x-10">
            <div className="w-6">
                {game.gameStatusText}
            </div>
            <div className="w-48">
                <p> {game.awayTeam.teamCity} {game.awayTeam.teamName} </p>
                <p> ( {game.awayTeam.wins} - {game.awayTeam.losses} ) </p>
            </div>
            <div className="w-48">
                <p> {game.homeTeam.teamCity} {game.homeTeam.teamName} </p>
                <p> ( {game.homeTeam.wins} - {game.homeTeam.losses}  )</p>
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