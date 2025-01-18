import { BoxScore } from "./types"

function fetchPlayers(data: BoxScore) : { homePlayers: string[], awayPlayers: string[]} {

    if (data) {
        const homePlayers = data.game.homeTeam.players.map((player) => player.name)
        const awayPlayers = data.game.awayTeam.players.map((player) => player.name)

        return {
            homePlayers,
            awayPlayers
        }
    }

    return {
        homePlayers: [],
        awayPlayers: []
    }
}

export { fetchPlayers }