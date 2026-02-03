import { BoxScore, MockDraftData } from "./types"

function fetchMockDraftData(data: BoxScore | null): MockDraftData | null {
    if (!data) {
        return null
    }

    const { homeTeam, awayTeam, gameId } = data.game

    const gameLabel = `${homeTeam.teamName.trim()} • ${awayTeam.teamName.trim()}`
    const homePlayers = homeTeam.players.map((player) => player.name)
    const awayPlayers = awayTeam.players.map((player) => player.name)

    return {
        gameDate: data.date,
        gameId,
        gameLabel,
        homePlayers,
        awayPlayers,
    }
}

export { fetchMockDraftData }