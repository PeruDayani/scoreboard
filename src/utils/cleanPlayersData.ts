import { BoxScore, PlayerStats } from "./types"

function fetchPlayers(data: BoxScore) : string[] {

    if (data) {
        const homePlayers: PlayerStats[] = data.game.homeTeam.players
        const awayPlayers: PlayerStats[] = data.game.awayTeam.players
        const allPlayers: PlayerStats[] = homePlayers.concat(awayPlayers)

        return allPlayers.map((player) => player.name)
    }

    return [`Well shit, you sure that's a valid game ID?`]
}

export { fetchPlayers }