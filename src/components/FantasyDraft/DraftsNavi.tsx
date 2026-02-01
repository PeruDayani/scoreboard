import { FantasyDraftResult } from "@/utils/types"

type DraftsNaviParams = {
    games: FantasyDraftResult[],
    activeGame: number,
    onClick: (i: number) => void
}

export default function DraftsNavi ({ games, activeGame, onClick }: DraftsNaviParams) {
    
    const flexCSS = games.length > 2 ? 'flex justify-between' : 'flex justify-evenly'
    const draftDisplay = games.length > 3 ? 'D' : 'Draft'
    
    return (
        <div className={`${flexCSS} p-2 sticky top-0 bg-purple-100`}>
            {
                games.map((g, i) => (
                    <div
                        key={i}
                        className='flex flex-col gap-1 text-center text-sm'
                        onClick={() => onClick(i)}
                    >
                        <div className={`${activeGame == i? 'underline underline-offset-4' : ''} `}> {draftDisplay} {i+1} </div>
                        <div className="text-xs italic"> {g.status} </div>
                    </div>
                ))
            }
        </div>
    )
}