type StatComparisonDisplay = {
    valueA: number,
    valueB: number
}

function StatComparisonDisplay({
    valueA,
    valueB
}: StatComparisonDisplay) {

    const css = 'underline underline-offset-2'
    const cssA = valueA > valueB ? css : ''
    const cssB = valueA < valueB ? css : ''
    
    return (
        <div>
            <span className={cssA}>{valueA}</span>
            <span> • </span>
            <span className={cssB}>{valueB}</span>
        </div>
    )
}

type StatLabelParams = {
    label: string
    valueA?: number
    valueB?: number
}

export default function StatLabel({
    label,
    valueA,
    valueB
}: StatLabelParams) {

    const displayStatComp = (valueA !== undefined) && (valueB != undefined)

    return (
        <div className="flex flex-col gap-2 text-xs">
            <div> {label} </div>
            {
                displayStatComp &&
                    <StatComparisonDisplay
                        valueA={valueA}
                        valueB={valueB}
                    />
            }
        </div>
    )
}