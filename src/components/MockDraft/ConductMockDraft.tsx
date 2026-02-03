import { useState } from 'react'
import { MockDraftData } from '@/utils/types'
import PickFirstSelector from './PickFirstSelector'
import CurrentPickerIndicator from './CurrentPickerIndicator'
import PlayersList from './PlayersList'

type Drafter = 'peru' | 'hayden'

type ConductMockDraftParams = {
  data: MockDraftData
}

export default function ConductMockDraft ({ data }: ConductMockDraftParams) {
  const { homePlayers, awayPlayers } = data
  const allPlayers = [...homePlayers, ...awayPlayers]

  const [draftStarted, setDraftStarted] = useState(false)
  const [currentPicker, setCurrentPicker] = useState<Drafter | null>(null)
  const [availablePlayers, setAvailablePlayers] = useState<string[]>(allPlayers)
  const [peruTeam, setPeruTeam] = useState<string[]>([])
  const [haydenTeam, setHaydenTeam] = useState<string[]>([])

  const startDraft = (picker: Drafter) => {
    setCurrentPicker(picker)
    setDraftStarted(true)
  }

  const selectPlayer = (player: string) => {
    if (!currentPicker) return

    // Add player to current picker's team
    if (currentPicker === 'peru') {
      setPeruTeam(prev => [...prev, player])
    } else {
      setHaydenTeam(prev => [...prev, player])
    }

    // Remove from available
    setAvailablePlayers(prev => prev.filter(p => p !== player))

    // Switch turns
    setCurrentPicker(currentPicker === 'peru' ? 'hayden' : 'peru')
  }

  const isDraftComplete = availablePlayers.length === 0

  return (
    <div className='flex flex-col gap-4'>
      {!draftStarted ? (
        <PickFirstSelector onSelect={startDraft} />
      ) : (
        <CurrentPickerIndicator 
          currentPicker={currentPicker} 
          isDraftComplete={isDraftComplete}
          peruTeam={peruTeam}
          haydenTeam={haydenTeam}
        />
      )}

      <div className='flex flex-col md:flex-row gap-4'>
        {draftStarted && (
          <div className='order-2 md:order-1'>
            <PlayersList
              title="Peru's team"
              homePlayers={homePlayers}
              awayPlayers={awayPlayers}
              players={peruTeam}
              allowPlayerSelection={false}
            />
          </div>
        )}

        {!isDraftComplete && (
          <div className='order-1 md:order-2'>
            <PlayersList
              title="Available players"
              homePlayers={homePlayers}
              awayPlayers={awayPlayers}
              players={availablePlayers}
              onSelect={selectPlayer}
              allowPlayerSelection={draftStarted}
            />
          </div>
        )}

        {draftStarted && (
          <div className='order-3'>
            <PlayersList
              title="Hayden's team"
              homePlayers={homePlayers}
              awayPlayers={awayPlayers}
              players={haydenTeam}
              allowPlayerSelection={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
