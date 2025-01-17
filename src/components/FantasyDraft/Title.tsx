import { ReactNode } from "react"

type TitleParams = {
    children: ReactNode
}
export default function Title({ children }: TitleParams ) {

    return (
        <div className="px-2 w-full text-center text-sm underline underline-offset-4">
            { children }
        </div>
    )
}