type Drafter = 'peru' | 'hayden'

type PickFirstSelectorProps = {
    onSelect: (picker: Drafter) => void
}

export default function PickFirstSelector({ onSelect }: PickFirstSelectorProps) {
    return (
        <div className="m-auto p-4 bg-purple-100 rounded-lg flex flex-col items-center gap-4 py-4 min-w-[300px]">
            <p className="text-sm underline">Who won first pick?</p>
            <div className="flex gap-12">
                <button
                    onClick={() => onSelect('peru')}
                    className="hover:underline"
                >
                    Peru
                </button>
                <button
                    onClick={() => onSelect('hayden')}
                    className="hover:underline"
                >
                    Hayden
                </button>
            </div>
        </div>
    )
}

