import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faAt } from '@fortawesome/free-solid-svg-icons';

export default function GameRow({game}: {game: any}) {
    
    let gameDifference = Math.ceil((Math.abs(game.homeTeam.score - game.awayTeam.score))/5)*5
    const highlighsLink = `https://www.youtube.com/results?search_query=${game.awayTeam.teamCity}+${game.awayTeam.teamName}+at+${game.homeTeam.teamCity}+${game.homeTeam.teamName}`
    const awayTeamImageSrc = `https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`
    const homeTeamImageSrc = `https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`

    function gameScheduled() {
        return game.gameStatus == 'Scheduled'
    }

    function gameScoreText() {
        if (gameDifference > 0) {
            return `Less than ${gameDifference}`
        } else {
            return `Tie Game!`
        }
    }

    function teamRecords() {
        return (
            <div className="flex gap-12">
                <div> {game.awayTeam.record} </div>
                <div> {game.homeTeam.record} </div>
            </div>
        )
    }

    return (
        <div className="min-w-3/4 m-2 p-4 bg-purple-100	rounded-lg flex flex-col font-mono antialiased">
            <div className="px-4 py-2 flex justify-between">
                <div>
                    {game.gameStatusText}
                </div>
                <div>
                    <a href={highlighsLink} target="_blank" rel="noreferrer"> <FontAwesomeIcon icon={faUpRightFromSquare} size="sm"/> </a>
                </div>
            </div>

            <div className="p-4 flex justify-between items-center">
                <Image src={awayTeamImageSrc} width="80" height="80" alt="awayTeam"/>
                <FontAwesomeIcon className='mx-1' icon={faAt} size="sm"/>
                <Image src={homeTeamImageSrc} width="80" height="80" alt="homeTeam"/>
            </div>

            <div className="m-auto font-medium">
                {gameScheduled() ? teamRecords() : gameScoreText()}
            </div>

        </div>
    )
}