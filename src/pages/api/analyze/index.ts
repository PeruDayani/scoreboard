import { cleanBoxscore } from '@/utils/cleanBoxscore'
import { addFantasyPlayerStats, comparePlayers } from '@/utils/computeFantasyDrafts'
import { ANALYZE_STATS } from '@/utils/constants'
import { AnalyzedPlayer, AnalyzeApiResponse, BoxScore, GameInfo } from '@/utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const GAME_IDS = [
  '0032400011',
  '0032400021',
  '0032400031',
  '0032300001',
  '0032200001',
  '0032100001'
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyzeApiResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const boxScores: BoxScore[] = await Promise.all(
    GAME_IDS.map(async (gameId) => {
      const url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`
      const data = await fetch(url).then((res) => res.json())
      const boxScore = cleanBoxscore(data) as BoxScore

      // Apply fantasy stats to all players
      boxScore.game.homeTeam.players = boxScore.game.homeTeam.players.map(addFantasyPlayerStats)
      boxScore.game.awayTeam.players = boxScore.game.awayTeam.players.map(addFantasyPlayerStats)

      return boxScore
    })
  )

  // Extract unique games
  const gamesMap = new Map<string, GameInfo>()

  // Collect all players from all games with additional attributes
  const allPlayers: AnalyzedPlayer[] = boxScores.flatMap(boxScore => {
    const { game } = boxScore
    const gameId = game.gameId
    const gameLabel = `${game.homeTeam.teamName.trim()} • ${game.awayTeam.teamName.trim()}`
    const gameDate = boxScore.date

    // Store game info
    gamesMap.set(gameId, { gameId, gameLabel, gameDate })

    const homePlayers = game.homeTeam.players.map(player => ({
      ...player,
      gameId,
      gameLabel,
      gameDate,
      teamName: game.homeTeam.teamName
    }))

    const awayPlayers = game.awayTeam.players.map(player => ({
      ...player,
      gameId,
      gameLabel,
      gameDate,
      teamName: game.awayTeam.teamName
    }))

    return [...homePlayers, ...awayPlayers]
  })

  // Filter out players with 0 minutes and sort
  const rankedPlayers = allPlayers
    .filter(p => p.minutes && p.minutes > 0)
    .sort((a, b) => comparePlayers(a, b, ANALYZE_STATS))

  // Get games array from map
  const games = Array.from(gamesMap.values())

  res.status(200).json({ players: rankedPlayers, games })
}
