import { FANTASY_PLAYER_STATS } from "@/utils/constants";
import { FantasyTeam } from "@/utils/types";
import React, { useState } from 'react';

export default function AllStarPlayerStats({team} : {team: FantasyTeam | undefined}) { 

    const [playerSelected, setPlayerSelected] = useState('');

    function isPlayerSelected(id: string): boolean {
        return id == playerSelected
    }

    return (
        <div className="flex flex-col justify-start my-4">
            <div className="mx-auto py-2 italic underline">
                {team?.teamCaptain}
            </div>

            {/* hover:bg-purple-800 hover:text-white */}

            <div className="text-xs bg-purple-100 rounded-lg md:text-base">
                {/* Table */}
                <div className="flex flex-row">
                    {/* Player Column */}
                    <div className="w-28 md:w-44 p-3 bg-purple-200 rounded-tl-lg rounded-bl-lg">
                        <div className="underline italic pb-1 decoration-purple-900 underline-offset-2 "> Player </div>
                        {
                            team?.players.map((player) => (
                                <div className={isPlayerSelected(player.personId) ? "rounded-lg bg-purple-800 text-white" : ""} key={"wrapper_" + player.personId} >
                                    <div className="truncate p-1 md:p-1" onMouseEnter={() => setPlayerSelected(player.personId)} onMouseLeave={() => setPlayerSelected('')}> {player.name} </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* Stats Columns*/}
                    <div className="flex flex-row py-3 w-72 md:w-max overflow-scroll">
                        {/* For every stat */}
                        {
                            FANTASY_PLAYER_STATS.map((stat) => (
                                <div className="text-center w-14 md:w-fit" key={"wrapper_stat_" + stat.id}>
                                    <div className={"px-2 pb-1 underline italic decoration-purple-900 underline-offset-2 " + stat.classes}> {stat.label} </div>
                                    {/* Display all the player stats */}
                                    {
                                        team?.players.map((player) => (
                                            <div className={isPlayerSelected(player.personId) ? "bg-purple-800 text-white" : ""} key={stat.id + "_" + player.personId}>
                                                <div className="px-2 p-1" onMouseEnter={() => setPlayerSelected(player.personId)} onMouseLeave={() => setPlayerSelected('')}> {player[stat.id]} </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            
        </div>
    )
} 