type Drafter = 'peru' | 'hayden'

type CurrentPickerIndicatorProps = {
  currentPicker: Drafter | null
  isDraftComplete: boolean
  peruTeam: string[]
  haydenTeam: string[]
}

export default function CurrentPickerIndicator ({
  currentPicker,
  isDraftComplete,
  peruTeam,
  haydenTeam
}: CurrentPickerIndicatorProps) {
  const exportDraft = () => {
    const formatPlayers = (players: string[]) =>
      players.map(p => `"${p}",`).join('\n')
    const output = `playersTeamA:[${formatPlayers(peruTeam)}],playersTeamB:[${formatPlayers(haydenTeam)}]`
    navigator.clipboard.writeText(output)
  }

  if (isDraftComplete) {
    return (
      <div className='m-auto p-4 bg-purple-100 rounded-lg flex flex-col items-center gap-4 py-4 min-w-[300px]'>
        <p className='text-sm underline'>Let the games begin!</p>
        <button className='text-xs hover:underline' onClick={exportDraft}>
          Export draft
        </button>
      </div>
    )
  }

  if (!currentPicker) return null

  return (
    <div className='m-auto p-4 bg-purple-100 rounded-lg flex flex-col items-center gap-4 py-4 min-w-[300px]'>
      <p className='text-sm underline'>Currently picking</p>
      <p className='font-medium'>
        {currentPicker === 'peru' ? 'Peru' : 'Hayden'}
      </p>
    </div>
  )
}
