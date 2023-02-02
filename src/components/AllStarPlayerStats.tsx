import { FANTASY_STATS_2022 } from "@/utils/constants";
import { FantasyTeam, PlayerStats } from "@/utils/types";

export default function AllStarPlayerStats({team} : {team: FantasyTeam | undefined}) { 
    return (
        <div className="flex flex-col justify-start my-4">
            <div className="mx-auto py-2 italic underline">
                {team?.teamCaptain}
            </div>
            {/* Table */}
            <div className="text-xs p-4 bg-purple-100 rounded-lg md:text-base">
                {/* Table Header */}
                <div className="flex underline italic decoration-purple-900 underline-offset-2">
                    <div className="w-20 md:w-40"> Player </div>
                    {
                        FANTASY_STATS_2022.map((stat) => (
                            <div className="overflow-clip w-14 md:w-20 px-2 text-center" key={"table_" + stat.id}> {stat.label} </div>
                        ))
                    }
                </div>
                {/* Table Contents */}
                <div className="">
                    {
                        team?.players.map((player) => (
                            <div className="flex justify-between items-center my-1 hover:bg-purple-800 hover:text-white rounded-lg" key={player.name + player.personId}> 
                                <div className="overflow-clip p-1 w-20 md:w-40"> {player.name} </div>
                                    {
                                        FANTASY_STATS_2022.map((stat) => (
                                            <div className="w-14 md:w-20 px-2 text-center" key={player.name + stat.id}> {player[stat.id as keyof PlayerStats]} </div>
                                        ))
                                    }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
} 