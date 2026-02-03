type PlayersListParams = {
  title: string
  players: string[]
  allowPlayerSelection: boolean
  onSelect?: (player: string) => void
  homePlayers: string[]
  awayPlayers: string[]
}

export default function PlayersList ({
  title,
  players,
  homePlayers,
  awayPlayers,
  allowPlayerSelection,
  onSelect
}: PlayersListParams) {
  const canSelectPlayer = onSelect && allowPlayerSelection

  return (
    <div className='m-auto p-4 bg-purple-100 rounded-lg flex flex-col items-center gap-4 py-4 min-w-[300px]'>
      <p className='text-sm underline'>{title} ({players.length})</p>
      <div className='flex flex-col gap-4'>
        {players.map(player => {
          const suffix = homePlayers.includes(player)
            ? '(H)'
            : awayPlayers.includes(player)
            ? '(A)'
            : ''
          return (
            canSelectPlayer ? (
              <button
                key={player}
                className='text-xs text-center hover:underline'
                onClick={() => onSelect(player)}
                disabled={!allowPlayerSelection}
              >
                {player} <span className='text-gray-500'>{suffix}</span>
              </button>
            ) : (
              <div key={player} className='text-xs text-center'>{player} <span className='text-gray-500'>{suffix}</span></div>
            )
          )
        })}
      </div>
    </div>
  )
}
