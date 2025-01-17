import { FantasyDraftResult } from "@/utils/types"

type DraftsNaviParams = {
    games: FantasyDraftResult[],
    activeGame: number,
    onClick: (i: number) => void
}

export default function DraftsNavi ({ games, activeGame, onClick }: DraftsNaviParams) {
    return (
        <div className='flex p-2 justify-between sticky top-0 text-sm bg-purple-100'>
            {
                games.map((g, i) => (
                    <div
                        key={i}
                        className={`${activeGame == i? 'underline underline-offset-4' : ''}`}
                        onClick={() => onClick(i)}
                    >
                        Draft {i+1}
                    </div>
                ))
            }
        </div>
    )
}