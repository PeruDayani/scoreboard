import { GameInfo } from '@/utils/types'

interface GameSelectorProps {
  games: GameInfo[] | undefined
  selectedGame: string | null
  onSelect: (gameId: string | null) => void
  showAllOption?: boolean
  label?: string
}

export function GameSelector({ 
  games, 
  selectedGame, 
  onSelect, 
  showAllOption = true,
  label = 'Select a game:'
}: GameSelectorProps) {
  if (!games?.length) return null

  return (
    <div className='mb-4'>
      {label && <p className='text-xs text-purple-700 mb-2'>{label}</p>}
      <div className='flex flex-wrap gap-2'>
        {showAllOption && (
          <button
            onClick={() => onSelect(null)}
            className={`text-xs px-2 py-1 rounded ${
              selectedGame === null ? 'bg-purple-300 underline' : 'hover:underline'
            }`}
          >
            All Games
          </button>
        )}
        {games.map(game => (
          <button
            key={game.gameId}
            onClick={() => onSelect(game.gameId)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              selectedGame === game.gameId
                ? 'bg-purple-500 text-white font-medium'
                : 'bg-purple-200 hover:bg-purple-300'
            }`}
          >
            {game.gameLabel}
          </button>
        ))}
      </div>
    </div>
  )
}

