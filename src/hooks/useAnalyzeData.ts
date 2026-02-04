import useSWR, { Fetcher } from 'swr'
import { useMemo, useState } from 'react'
import { AnalyzedPlayer, AnalyzeApiResponse, GameInfo } from '@/utils/types'

const fetcher: Fetcher<AnalyzeApiResponse> = (url: RequestInfo | URL) => 
  fetch(url).then(r => r.json())

export interface UseAnalyzeDataResult {
  players: AnalyzedPlayer[] | undefined
  allPlayers: AnalyzedPlayer[] | undefined
  games: GameInfo[] | undefined
  isLoading: boolean
  selectedGame: string | null
  setSelectedGame: (gameId: string | null) => void
}

export function useAnalyzeData(): UseAnalyzeDataResult {
  const { data, isLoading } = useSWR<AnalyzeApiResponse>('/api/analyze', fetcher)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const filteredPlayers = useMemo(() => {
    if (!data?.players) return undefined
    if (!selectedGame) return data.players
    return data.players.filter(p => p.gameId === selectedGame)
  }, [data?.players, selectedGame])

  return {
    players: filteredPlayers,
    allPlayers: data?.players,
    games: data?.games,
    isLoading,
    selectedGame,
    setSelectedGame,
  }
}

