import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { useMemo, useState, useCallback } from 'react'
import { useAnalyzeData } from '@/hooks/useAnalyzeData'
import { AnalyzeLayout, GameSelector } from '@/components/Analyze'
import { DEFAULT_WEIGHTS, Weights, calculateDraftScore } from '@/utils/analyzeStats'

type SortColumn = 'name' | 'gameDate' | 'minutes' | 'twoPointersFreeThrows' | 'threePointersMade' | 
  'assists' | 'reboundsTotal' | 'stealsBlocksTurnovers' | 'twoPointersFreeThrowsPer36' | 
  'threePointersMadePer36' | 'assistsPer36' | 'reboundsTotalPer36' | 'stealsBlocksTurnoversPer36' | 'draftScore'

type SortDirection = 'asc' | 'desc'

interface WeightSliderProps {
  label: string
  value: number
  defaultValue: number
  onChange: (value: number) => void
}

function WeightSlider({ label, value, defaultValue, onChange }: WeightSliderProps) {
  const isModified = value !== defaultValue
  
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex justify-between items-center'>
        <span className={`text-xs ${isModified ? 'text-purple-800 font-medium' : 'text-purple-700'}`}>
          {label}
        </span>
        <span className={`text-xs font-mono tabular-nums ${isModified ? 'text-purple-900 font-bold' : 'text-purple-600'}`}>
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="2.5"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className='w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer accent-purple-600'
      />
      <div className='flex justify-between text-[10px] text-purple-500'>
        <span>0</span>
        <span className='opacity-50'>|</span>
        <span>2.5</span>
      </div>
    </div>
  )
}

export default function AllPlayers() {
  const { players, games, isLoading, selectedGame, setSelectedGame } = useAnalyzeData()
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS)
  const [showWeights, setShowWeights] = useState(false)

  const updateWeight = useCallback((key: keyof Weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetWeights = useCallback(() => {
    setWeights(DEFAULT_WEIGHTS)
  }, [])

  const weightsChanged = useMemo(() => {
    return Object.keys(DEFAULT_WEIGHTS).some(
      key => weights[key as keyof Weights] !== DEFAULT_WEIGHTS[key as keyof Weights]
    )
  }, [weights])

  // Recalculate draft scores based on current weights
  const dataWithCustomScores = useMemo(() => {
    if (!players) return undefined
    return players.map(player => ({
      ...player,
      draftScore: calculateDraftScore(player, weights)
    }))
  }, [players, weights])

  const sortedData = useMemo(() => {
    if (!dataWithCustomScores) return undefined

    if (!sortColumn) return dataWithCustomScores

    return [...dataWithCustomScores].sort((a, b) => {
      const aVal = a[sortColumn] ?? 0
      const bVal = b[sortColumn] ?? 0

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal)
      }

      return sortDirection === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })
  }, [dataWithCustomScores, sortColumn, sortDirection])

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const SortIndicator = ({ column }: { column: SortColumn }) => (
    <span className='ml-1'>
      {sortColumn === column ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
    </span>
  )

  if (isLoading) {
    return <AnalyzeLayout title="All Players" loading />
  }

  return (
    <AnalyzeLayout title="All Players" maxWidth="max-w-7xl">
      <GameSelector
        games={games}
        selectedGame={selectedGame}
        onSelect={setSelectedGame}
        label=""
      />

      {/* Weights Control Panel */}
      <div className='mb-4'>
        <button
          onClick={() => setShowWeights(!showWeights)}
          className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all ${
            showWeights ? 'bg-purple-300' : 'bg-purple-200 hover:bg-purple-250'
          } ${weightsChanged ? 'ring-2 ring-purple-500' : ''}`}
        >
          <FontAwesomeIcon icon={faSliders} className={weightsChanged ? 'text-purple-700' : ''} />
          <span>Draft Score Weights</span>
          {weightsChanged && <span className='text-purple-700 font-medium'>•</span>}
        </button>

        {showWeights && (
          <div className='mt-3 p-4 bg-purple-200/50 rounded-lg border border-purple-300'>
            <div className='flex justify-between items-center mb-3'>
              <span className='text-xs font-medium text-purple-800'>Adjust Weights</span>
              <button
                onClick={resetWeights}
                disabled={!weightsChanged}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-all ${
                  weightsChanged 
                    ? 'bg-purple-300 hover:bg-purple-400 text-purple-800' 
                    : 'text-purple-400 cursor-not-allowed'
                }`}
              >
                <FontAwesomeIcon icon={faRotateLeft} size="xs" />
                Reset
              </button>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
              <WeightSlider
                label="Inside (2P+FT)"
                value={weights.inside}
                defaultValue={DEFAULT_WEIGHTS.inside}
                onChange={(v) => updateWeight('inside', v)}
              />
              <WeightSlider
                label="3-Pointers"
                value={weights.threes}
                defaultValue={DEFAULT_WEIGHTS.threes}
                onChange={(v) => updateWeight('threes', v)}
              />
              <WeightSlider
                label="Assists"
                value={weights.assists}
                defaultValue={DEFAULT_WEIGHTS.assists}
                onChange={(v) => updateWeight('assists', v)}
              />
              <WeightSlider
                label="Rebounds"
                value={weights.rebounds}
                defaultValue={DEFAULT_WEIGHTS.rebounds}
                onChange={(v) => updateWeight('rebounds', v)}
              />
              <WeightSlider
                label="Hustle (STL+BLK-TO)"
                value={weights.hustle}
                defaultValue={DEFAULT_WEIGHTS.hustle}
                onChange={(v) => updateWeight('hustle', v)}
              />
            </div>

            <div className='mt-4 pt-3 border-t border-purple-300'>
              <div className='text-xs text-purple-700 font-mono'>
                Draft Score = (In/36 × {weights.inside.toFixed(2)}) + (3P/36 × {weights.threes.toFixed(2)}) + (AST/36 × {weights.assists.toFixed(2)}) + (REB/36 × {weights.rebounds.toFixed(2)}) + (Hus/36 × {weights.hustle.toFixed(2)})
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className='overflow-x-auto'>
        <table className='w-full text-xs'>
          <thead>
            <tr className='border-b border-purple-300'>
              <th className='py-2 px-2 text-left'>#</th>
              <th className='py-2 px-2 text-left cursor-pointer hover:underline' onClick={() => handleSort('name')}>
                Player<SortIndicator column='name' />
              </th>
              <th className='py-2 px-2 text-left cursor-pointer hover:underline' onClick={() => handleSort('gameDate')}>
                Date<SortIndicator column='gameDate' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('minutes')}>
                MIN<SortIndicator column='minutes' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('twoPointersFreeThrows')}>
                Inside<SortIndicator column='twoPointersFreeThrows' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('threePointersMade')}>
                3PM<SortIndicator column='threePointersMade' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('assists')}>
                AST<SortIndicator column='assists' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('reboundsTotal')}>
                REB<SortIndicator column='reboundsTotal' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('stealsBlocksTurnovers')}>
                Hustle<SortIndicator column='stealsBlocksTurnovers' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('twoPointersFreeThrowsPer36')}>
                In/36<SortIndicator column='twoPointersFreeThrowsPer36' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('threePointersMadePer36')}>
                3P/36<SortIndicator column='threePointersMadePer36' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('assistsPer36')}>
                AST/36<SortIndicator column='assistsPer36' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('reboundsTotalPer36')}>
                REB/36<SortIndicator column='reboundsTotalPer36' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline' onClick={() => handleSort('stealsBlocksTurnoversPer36')}>
                Hus/36<SortIndicator column='stealsBlocksTurnoversPer36' />
              </th>
              <th className='py-2 px-1 text-right cursor-pointer hover:underline bg-purple-200' onClick={() => handleSort('draftScore')}>
                Draft<SortIndicator column='draftScore' />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((player, idx) => (
              <tr key={`${player.personId}-${player.gameId}`} className='border-b border-purple-200 hover:bg-purple-200'>
                <td className='py-2 px-2 text-gray-500'>{idx + 1}</td>
                <td className='py-2 px-2'>
                  <div className='font-medium'>{player.name}</div>
                  <div className='text-gray-500'>
                    {player.gameLabel.split(' • ').map((team, i) => (
                      <span key={team}>
                        {i > 0 && ' • '}
                        <span className={team.trim() === player.teamName.trim() ? 'underline' : ''}>
                          {team}
                        </span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className='py-2 px-2 text-gray-500'>{player.gameDate}</td>
                <td className='py-2 px-1 text-right'>{player.minutes}</td>
                <td className='py-2 px-1 text-right'>{player.twoPointersFreeThrows}</td>
                <td className='py-2 px-1 text-right'>{player.threePointersMade}</td>
                <td className='py-2 px-1 text-right'>{player.assists}</td>
                <td className='py-2 px-1 text-right'>{player.reboundsTotal}</td>
                <td className='py-2 px-1 text-right'>{player.stealsBlocksTurnovers}</td>
                <td className='py-2 px-1 text-right'>{player.twoPointersFreeThrowsPer36?.toFixed(1)}</td>
                <td className='py-2 px-1 text-right'>{player.threePointersMadePer36?.toFixed(1)}</td>
                <td className='py-2 px-1 text-right'>{player.assistsPer36?.toFixed(1)}</td>
                <td className='py-2 px-1 text-right'>{player.reboundsTotalPer36?.toFixed(1)}</td>
                <td className='py-2 px-1 text-right'>{player.stealsBlocksTurnoversPer36?.toFixed(1)}</td>
                <td className='py-2 px-1 text-right font-semibold bg-purple-50'>{player.draftScore?.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className='text-center text-xs text-gray-500 mt-4'>
        {sortedData?.length} players
        {selectedGame ? '' : ` across ${games?.length} games`}
      </p>
    </AnalyzeLayout>
  )
}
