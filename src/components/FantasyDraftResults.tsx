import { useCallback, useState } from "react";
import { FantasyDraftConfig, FantasyDraftResult, MultiFantasyDraftResult, Player, StatResult } from '@/utils/types';
import Header from './FantasyDraft/Header';
import Title from "./FantasyDraft/Title";
import DraftsNavi from "./FantasyDraft/DraftsNavi";
import FancyStatDisplay from "./FantasyDraft/FancyStatDisplay";
import StatLabel from "./FantasyDraft/StatLabel";
import PlayersList from "./FantasyDraft/PlayersList";

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
        setActiveGame(i)
        setActiveGameData(draftResult.draftResults[i])
        setSelectedPlayerA(draftResult.draftResults[i].playersTeamA[0])
        setSelectedPlayerB(draftResult.draftResults[i].playersTeamB[0])
    }, [draftResult, setActiveGame, setActiveGameData])

    return (
        <div className='flex flex-col gap-4 font-mono antialiased mb-60'>

            <div className='mx-auto underline underline-offset-4'>
                { config.title }
            </div>

            <div className="m-auto p-4 bg-purple-100 rounded-lg flex flex-col gap-4">
                <Title>
                    { draftResult.status }
                </Title>

                <Header
                    captainTeamA={config.captainTeamA}
                    captainTeamB={config.captainTeamB}
                    winner={draftResult.winner}
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
                        imageSize={12}
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

                <div className='w-80 flex justify-between items-center text-center text-xs'>
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

            </div>

        </div>
    )
}