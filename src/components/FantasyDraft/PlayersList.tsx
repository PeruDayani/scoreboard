import { Player } from "@/utils/types"

type PlayersListParams = {
    players: Player[],
    activePlayerId: string,
    onClickCb: (p: Player) => void
}

export default function PlayersList({
    players,
    activePlayerId,
    onClickCb
}: PlayersListParams) {

    return (
        <div className="w-1/3 flex flex-col h-full gap-8">
            {
                players.map((p) => (
                    <div
                        key={p.personId}
                        className={`${activePlayerId == p.personId ? 'underline' : 'hover:underline'} underline-offset-2`}
                        onClick={() => onClickCb(p)}
                    >
                        {p.name}
                    </div>
                ))
            }
        </div>
    )
}