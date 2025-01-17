import { BoxScore, Player } from "./types"

function fetchPlayers(data: BoxScore) : string[] {

    if (data) {
        const homePlayers: Player[] = data.game.homeTeam.players
        const awayPlayers: Player[] = data.game.awayTeam.players
        const allPlayers: Player[] = homePlayers.concat(awayPlayers)

        return allPlayers.map((player) => player.name)
    }

    return [`Well shit, you sure that's a valid game ID?`]
}

export { fetchPlayers }