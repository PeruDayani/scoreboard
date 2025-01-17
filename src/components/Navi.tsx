import { NAVI_CONFIG } from "@/utils/constants"
import { link } from "fs"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"

type NaviParams = {
    label: string
}

export default function Navi({
    label
}: NaviParams) {

    const rounter = useRouter()
    const links = NAVI_CONFIG.filter((l) => l.url != rounter.pathname)

    return (
        <div className='mx-auto py-2 flex flex-col gap-2'>
            <div className="underline underline-offset-4">
                { label }
            </div>
            <div className="italic text-xs text-center">
                { links.map((l, i) => (
                    <span key={i}>
                        { !!i && ' | '}
                        <Link href={l.url}> {l.label}</Link>
                    </span>
                )) }
            </div>
        </div>
    )
}
