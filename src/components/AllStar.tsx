export default function AllStarBoxScore({date, game}: {date: string, game: any}) {    


    // TODO: Move all this to a backend function!

    // function calculateTeamStats(players: PlayerStats[]) : TeamStats {
    // }

    // console.log("Game data: ", game)

    // const homePlayers: PlayerStats[] = game.homeTeam.players
    // const awayPlayers: PlayerStats[] = game.awayTeam.players
    // const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

    // const peruTeam: PlayerStats[] = []
    // const haydenTeam: PlayerStats[] = []

    // allPlayers.forEach((player) => {
    //     if (PERU_TEAM.includes(player.name)) {
    //         peruTeam.push(player)
    //     } else if (HAYDEN_TEAM.includes(player.name)) {
    //         haydenTeam.push(player)
    //     }
    // })

    // console.log("Peru team: ", peruTeam)
    // console.log("Hayden team: ", haydenTeam)

    // const peruTeamStats:TeamStats = calculateTeamStats(peruTeam)
    // const haydenTeamStats: TeamStats = calculateTeamStats(haydenTeam)

    return (
        <div className='flex flex-col'>
            <div className='mx-auto py-2 text-xl italic underline'>
                {date}
            </div>

            <div className='flex flex-wrap justify-center'>
                {game.gameId}
            </div>

        </div>
    )
}