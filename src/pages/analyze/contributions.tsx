import { useMemo, useState, useEffect } from 'react'
import { useAnalyzeData } from '@/hooks/useAnalyzeData'
import { AnalyzeLayout, GameSelector } from '@/components/Analyze'
import { CONTRIBUTION_STATS } from '@/utils/analyzeStats'
import { AnalyzedPlayer } from '@/utils/types'

type PlayerContribution = {
  player: AnalyzedPlayer
  contributions: { [statId: string]: { value: number; percent: number } }
  totalContribution: number
}

function ContributionBar({ percent }: { percent: number }) {
  const width = Math.min(percent, 100)
  const getColor = () => {
    if (percent >= 15) return 'bg-purple-600'
    if (percent >= 10) return 'bg-purple-500'
    if (percent >= 5) return 'bg-purple-400'
    return 'bg-purple-300'
  }

  return (
    <div className='flex items-center gap-1'>
      <div className='flex-1 h-1.5 bg-purple-200 rounded-full overflow-hidden'>
        <div 
          className={`h-full ${getColor()} rounded-full transition-all`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className='text-[10px] text-purple-600 w-8 text-right'>{percent.toFixed(1)}%</span>
    </div>
  )
}

export default function ContributionsPage() {
  const { allPlayers, games, isLoading, selectedGame, setSelectedGame } = useAnalyzeData()
  const [sortBy, setSortBy] = useState<string>('total')

  // Auto-select first game if none selected
  useEffect(() => {
    if (!selectedGame && games?.length) {
      setSelectedGame(games[0].gameId)
    }
  }, [games, selectedGame, setSelectedGame])

  // Get players for selected game and calculate contributions
  const playerContributions = useMemo(() => {
    if (!selectedGame || !allPlayers) return []

    const gamePlayers = allPlayers.filter(p => p.gameId === selectedGame)
    
    // Calculate game totals for each stat
    const gameTotals: { [statId: string]: number } = {}
    CONTRIBUTION_STATS.forEach(stat => {
      gameTotals[stat.id] = gamePlayers.reduce((sum, p) => sum + stat.getValue(p), 0)
    })

    // Calculate each player's contribution percentages
    const contributions: PlayerContribution[] = gamePlayers.map(player => {
      const playerContribs: { [statId: string]: { value: number; percent: number } } = {}
      let totalPercent = 0

      CONTRIBUTION_STATS.forEach(stat => {
        const value = stat.getValue(player)
        const total = gameTotals[stat.id]
        const percent = total > 0 ? (value / total) * 100 : 0
        playerContribs[stat.id] = { value, percent }
        totalPercent += percent
      })

      return {
        player,
        contributions: playerContribs,
        totalContribution: totalPercent / CONTRIBUTION_STATS.length,
      }
    })

    // Sort by selected stat or total
    return contributions.sort((a, b) => {
      if (sortBy === 'total') {
        return b.totalContribution - a.totalContribution
      }
      const aVal = a.contributions[sortBy]?.percent ?? 0
      const bVal = b.contributions[sortBy]?.percent ?? 0
      return bVal - aVal
    })
  }, [allPlayers, selectedGame, sortBy])

  // Game totals for display
  const gameTotals = useMemo(() => {
    if (!selectedGame || !allPlayers) return {}
    const gamePlayers = allPlayers.filter(p => p.gameId === selectedGame)
    const totals: { [statId: string]: number } = {}
    CONTRIBUTION_STATS.forEach(stat => {
      totals[stat.id] = gamePlayers.reduce((sum, p) => sum + stat.getValue(p), 0)
    })
    return totals
  }, [allPlayers, selectedGame])

  if (isLoading) {
    return <AnalyzeLayout title="Stat Contributions" loading />
  }

  const activeGameInfo = games?.find(g => g.gameId === selectedGame)

  return (
    <AnalyzeLayout title="Stat Contributions" maxWidth="max-w-5xl">
      <GameSelector
        games={games}
        selectedGame={selectedGame}
        onSelect={setSelectedGame}
        showAllOption={false}
      />

      {activeGameInfo && (
        <div className='bg-purple-200 rounded-lg p-3 mb-4'>
          <h2 className='text-sm font-medium text-purple-900'>{activeGameInfo.gameLabel}</h2>
          <p className='text-xs text-purple-700'>{activeGameInfo.gameDate}</p>
        </div>
      )}

      {/* Game Totals */}
      <div className='grid grid-cols-4 gap-2 mb-4'>
        {CONTRIBUTION_STATS.map(stat => (
          <div key={stat.id} className='bg-purple-50 rounded-lg p-2 text-center'>
            <div className='text-xs text-purple-600'>{stat.shortLabel}</div>
            <div className='text-lg font-bold text-purple-900'>{gameTotals[stat.id] ?? 0}</div>
            <div className='text-[10px] text-purple-500'>game total</div>
          </div>
        ))}
      </div>

      {/* Sort Options */}
      <div className='flex flex-wrap gap-2 mb-4 items-center'>
        <span className='text-xs text-purple-700'>Sort by:</span>
        <button
          onClick={() => setSortBy('total')}
          className={`text-xs px-2 py-1 rounded ${
            sortBy === 'total' ? 'bg-purple-300 underline' : 'hover:underline'
          }`}
        >
          Overall
        </button>
        {CONTRIBUTION_STATS.map(stat => (
          <button
            key={stat.id}
            onClick={() => setSortBy(stat.id)}
            className={`text-xs px-2 py-1 rounded ${
              sortBy === stat.id ? 'bg-purple-300 underline' : 'hover:underline'
            }`}
          >
            {stat.shortLabel}
          </button>
        ))}
      </div>

      {/* Contributions Table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='border-b border-purple-300'>
              <th className='py-2 px-2 text-left'>#</th>
              <th className='py-2 px-2 text-left'>Player</th>
              {CONTRIBUTION_STATS.map(stat => (
                <th key={stat.id} className='py-2 px-2 text-center'>
                  <div>{stat.shortLabel}</div>
                  <div className='font-normal text-purple-500'>val / %</div>
                </th>
              ))}
              <th className='py-2 px-2 text-center bg-purple-200'>
                <div>Avg</div>
                <div className='font-normal text-purple-600'>contrib</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {playerContributions.map((pc, idx) => {
              const isTopThree = idx < 3
              return (
                <tr 
                  key={`${pc.player.personId}-${pc.player.gameId}`} 
                  className={`border-b border-purple-200 ${isTopThree ? 'bg-purple-50' : 'hover:bg-purple-50'}`}
                >
                  <td className={`py-2 px-2 ${isTopThree ? 'font-bold text-purple-800' : 'text-gray-500'}`}>
                    {idx + 1}
                  </td>
                  <td className='py-2 px-2'>
                    <div className={`${isTopThree ? 'font-medium' : ''}`}>{pc.player.name}</div>
                    <div className='text-gray-500'>{pc.player.teamName}</div>
                  </td>
                  {CONTRIBUTION_STATS.map(stat => {
                    const contrib = pc.contributions[stat.id]
                    const isHighlight = sortBy === stat.id
                    return (
                      <td 
                        key={stat.id} 
                        className={`py-2 px-2 text-center ${isHighlight ? 'bg-purple-100' : ''}`}
                      >
                        <div className='font-mono'>{contrib.value}</div>
                        <ContributionBar percent={contrib.percent} />
                      </td>
                    )
                  })}
                  <td className='py-2 px-2 text-center bg-purple-100'>
                    <div className={`font-mono ${isTopThree ? 'font-bold text-purple-800' : ''}`}>
                      {pc.totalContribution.toFixed(1)}%
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className='text-center text-xs text-gray-500 mt-4'>
        {playerContributions.length} players in this game
      </p>
    </AnalyzeLayout>
  )
}
