import { useMemo, useState } from 'react'
import { useAnalyzeData } from '@/hooks/useAnalyzeData'
import { AnalyzeLayout, GameSelector } from '@/components/Analyze'
import { LEADERBOARD_STATS, AnalyzeStatConfig } from '@/utils/analyzeStats'

export default function StatsPage() {
  const { players, games, isLoading, selectedGame, setSelectedGame } = useAnalyzeData()
  const [selectedStat, setSelectedStat] = useState<string>('points')

  const currentStat = LEADERBOARD_STATS.find(s => s.id === selectedStat) ?? LEADERBOARD_STATS[0]

  // Sort by selected stat (per 36)
  const sortedPlayers = useMemo(() => {
    if (!players) return undefined

    return [...players].sort((a, b) => {
      const aVal = currentStat.getPer36?.(a) ?? 0
      const bVal = currentStat.getPer36?.(b) ?? 0
      // For turnovers, lower is better
      if (currentStat.id === 'turnovers') {
        return aVal - bVal
      }
      return bVal - aVal
    })
  }, [players, currentStat])

  if (isLoading) {
    return <AnalyzeLayout title="Stats Leaderboard" loading />
  }

  return (
    <AnalyzeLayout title="Stats Leaderboard">
      {/* Stat Selector */}
      <div className='mb-4'>
        <p className='text-xs text-purple-700 mb-2'>Select a stat:</p>
        <div className='flex flex-wrap gap-2'>
          {LEADERBOARD_STATS.map(stat => (
            <button
              key={stat.id}
              onClick={() => setSelectedStat(stat.id)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                selectedStat === stat.id
                  ? 'bg-purple-500 text-white font-medium'
                  : 'bg-purple-200 hover:bg-purple-300'
              }`}
            >
              {stat.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <GameSelector
        games={games}
        selectedGame={selectedGame}
        onSelect={setSelectedGame}
        label=""
      />

      {/* Current Stat Header */}
      <div className='bg-purple-200 rounded-lg p-3 mb-4'>
        <h2 className='text-sm font-medium text-purple-900'>{currentStat.label}</h2>
        <p className='text-xs text-purple-700'>Ranked by per-36 minutes</p>
      </div>

      {/* Players List */}
      <div className='space-y-1'>
        {sortedPlayers?.slice(0, 50).map((player, idx) => {
          const per36Value = currentStat.getPer36?.(player) ?? 0
          const rawValue = currentStat.getValue(player)
          const isTopThree = idx < 3
          
          return (
            <div
              key={`${player.personId}-${player.gameId}`}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                isTopThree ? 'bg-purple-200' : 'hover:bg-purple-50'
              }`}
            >
              <span className={`w-8 text-right text-sm tabular-nums ${
                isTopThree ? 'font-bold text-purple-800' : 'text-gray-500'
              }`}>
                {idx + 1}
              </span>
              
              <div className='flex-1 min-w-0'>
                <div className={`text-sm truncate ${isTopThree ? 'font-medium' : ''}`}>
                  {player.name}
                </div>
                <div className='text-xs text-gray-500 truncate'>
                  {player.gameLabel.split(' • ').map((team, i) => (
                    <span key={team}>
                      {i > 0 && ' • '}
                      <span className={team.trim() === player.teamName.trim() ? 'underline' : ''}>
                        {team}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className='text-right'>
                <div className={`text-sm font-mono tabular-nums ${isTopThree ? 'font-bold text-purple-800' : ''}`}>
                  {per36Value.toFixed(1)}
                </div>
                <div className='text-xs text-gray-500'>
                  {rawValue} in {player.minutes}m
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className='text-center text-xs text-gray-500 mt-4'>
        Showing top {Math.min(sortedPlayers?.length ?? 0, 50)} of {sortedPlayers?.length} players
        {selectedGame ? '' : ` across ${games?.length} games`}
      </p>
    </AnalyzeLayout>
  )
}
