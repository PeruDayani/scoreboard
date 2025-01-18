import { useCallback, useEffect, useState } from "react";
import { FantasyDraftConfig, FantasyDraftResult, MultiFantasyDraftResult, Player, StatResult } from '@/utils/types';
import Header from './FantasyDraft/Header';
import Title from "./FantasyDraft/Title";
import DraftsNavi from "./FantasyDraft/DraftsNavi";
import FancyStatDisplay from "./FantasyDraft/FancyStatDisplay";
import StatLabel from "./FantasyDraft/StatLabel";
import PlayersList from "./FantasyDraft/PlayersList";
import Navi from "./Navi";
import Link from "next/link";
import GameLabel from "./FantasyDraft/GameLabel";

type FancyParams = {
    config: FantasyDraftConfig,
    draftResult: MultiFantasyDraftResult,
}

export default function FantasyDraftResults({ config, draftResult }: FancyParams) {

    const multipleDrafts = config.games.length > 1

    const [activeGame, setActiveGame] = useState<number>(0)
    const [activeGameData, setActiveGameData] = useState<FantasyDraftResult>(draftResult.draftResults[0])
    const [selectedPlayerA, setSelectedPlayerA] = useState<Player>(activeGameData.playersTeamA[0])
    const [selectedPlayerB, setSelectedPlayerB] = useState<Player>(activeGameData.playersTeamB[0])

    const activeGameChange = useCallback((i: number) => {
        const newActiveGame = draftResult.draftResults[i]
        const newPlayerA = draftResult.draftResults[i].playersTeamA[0]
        const newPlayerB = draftResult.draftResults[i].playersTeamB[0]

        setActiveGame(i)
        setActiveGameData(newActiveGame)
        setSelectedPlayerA(newPlayerA)
        setSelectedPlayerB(newPlayerB)
        
        localStorage.setItem('fantasyDraftSelection', JSON.stringify(newActiveGame))
    }, [draftResult, setActiveGame, setActiveGameData])

    useEffect(() => {
        try {
            const storedActiveGame = JSON.parse(localStorage.getItem('fantasyDraftSelection') || '')
            const foundGame = draftResult.draftResults.findIndex((d) => d.game?.gameId === storedActiveGame?.game?.gameId )

            if (foundGame != -1) {
                activeGameChange(foundGame)
            }
        } catch (e) {
            console.log("Welp: ", e)
        }
    }, [draftResult.draftResults, activeGameChange])

    return (
        <div className='flex flex-col gap-4 font-mono antialiased mb-60'>

            <Navi
                label={config.title}
            />

            <div className="m-auto p-4 bg-purple-100 rounded-lg flex flex-col gap-4">
                <Title>
                    { draftResult.status }
                </Title>

                <Header
                    captainTeamA={config.captainTeamA}
                    captainTeamB={config.captainTeamB}
                    winner={draftResult.winner}
                    confettiOnLoad={draftResult.status == 'Final'}
                />
                
                { 
                    draftResult.results.map(
                        (result) => 
                            <FancyStatDisplay 
                                key={result.stat.id}
                                result={result} 
                            />
                    )
                }
            </div>

            <div className="p-4 bg-purple-100 rounded-lg flex flex-col gap-3">

                { multipleDrafts && 
                    <DraftsNavi
                        games={draftResult.draftResults}
                        activeGame={activeGame}
                        onClick={activeGameChange}
                    />
                }

                { multipleDrafts && 
                    <Header
                        captainTeamA={config.captainTeamA}
                        captainTeamB={config.captainTeamB}
                        winner={activeGameData.winner}
                        imageCSS={'w-12'}
                        confettiOnLoad={draftResult.status == 'Final'}
                    />
                }

                { multipleDrafts && 
                    activeGameData.results.map(
                        (result) => 
                            <FancyStatDisplay 
                                key={result.stat.id} 
                                result={result} 
                            />
                    )
                }

                <Title>
                    Roster
                </Title>

                <div className='w-80 pt-2 flex justify-between items-center text-center text-xs'>
                    <PlayersList
                        players={activeGameData.playersTeamA}
                        activePlayerId={selectedPlayerA.personId}
                        onClickCb={setSelectedPlayerA}
                    />

                    <div className="w-1/3 flex flex-col gap-8">
                        {
                            config.stats.map((s) => (
                                <StatLabel
                                    key={s.id}
                                    label={s.label}
                                    valueA={selectedPlayerA[s.id] || 0}
                                    valueB={selectedPlayerB[s.id] || 0}
                                />
                            ))
                        }
                    </div>

                    <PlayersList
                        players={activeGameData.playersTeamB}
                        activePlayerId={selectedPlayerB.personId}
                        onClickCb={setSelectedPlayerB}
                    />
                </div>

                <Title>
                    Game
                </Title>

                <GameLabel draftResult={activeGameData} />
                
            </div>

        </div>
    )
}