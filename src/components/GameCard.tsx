import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faAt } from '@fortawesome/free-solid-svg-icons';
import { Game } from '@/utils/types';
import { useState } from 'react';

export default function GameCard({game}: {game: Game}) {

    const [displayScore, setDisplayScore] = useState(false)
    
    const gameDifference = Math.ceil((Math.abs(game.homeTeam.score - game.awayTeam.score))/5)*5
    const highlighsLink = `https://www.youtube.com/results?search_query=${game.awayTeam.teamCity}+${game.awayTeam.teamName}+at+${game.homeTeam.teamCity}+${game.homeTeam.teamName}`
    const awayTeamImageSrc = `https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`
    const homeTeamImageSrc = `https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`

    function gameScheduled() {
        return game.gameStatus == 'Scheduled'
    }

    function gameScoreText() {
        if (displayScore) {
            return (
                <div className="flex gap-20" onClick={() => setDisplayScore(false)}>
                    <div> {game.awayTeam.score} </div>
                    <div> {game.homeTeam.score} </div>
                </div>
            )
        } else {
            if (gameDifference > 0) {
                return (
                    <div onClick={() => setDisplayScore(true)} className="text-center"> 
                        <div className="italic text-sm">
                            {game.gameStatus == 'Live' ? `Score Difference` : `Decided By`}
                        </div>
                        <div>
                            {`Less than ${gameDifference}` }
                        </div>
                    </div>
                )
            } else {
                return (
                    <div onClick={() => setDisplayScore(true)}>
                        Tie Game 
                    </div>
                )
            }
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
        <div className="min-w-3/4 m-2 p-4 bg-purple-100	rounded-lg flex flex-col">
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