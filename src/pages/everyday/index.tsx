import { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons';
import Scoreboard from '@/components/Scoreboard';
import Head from 'next/head'

const monthNames = [
    "January", "February", "March", 
    "April", "May", "June",
    "July", "August", "September", 
    "October", "November", "December"
];

const dayNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday"
]

export default function Home() {
    const [activeDate, setActiveDate] = useState<Date>(new Date())
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>(null)

    const renderDate = useCallback(() => {
        const dayOfWeek = activeDate.getDay()
        const day = activeDate.getDate()
        const month = activeDate.getMonth()
        const year = activeDate.getFullYear()

        return `${dayNames[dayOfWeek]}, ${monthNames[month]}, ${day}, ${year}`
    }, [activeDate])

    const fetchData = useCallback(async (date: Date) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const data = await fetch(`/api/scoreboard/${year}-${month}-${day}`)
                            .then(r => r.json())

        setData(data)
        setIsLoading(false)
    }, [])

    const backADay = useCallback(() => {
        const yesterday = new Date(activeDate)
        yesterday.setDate(activeDate.getDate() - 1)
        setActiveDate(yesterday)

        fetchData(yesterday)

        setIsLoading(true)
    }, [activeDate, fetchData])

    const forwardADay = useCallback(() => {
        const tomorrow = new Date(activeDate)
        tomorrow.setDate(activeDate.getDate() + 1)
        setActiveDate(tomorrow)

        fetchData(tomorrow)

        setIsLoading(true)
    }, [activeDate, fetchData])

    useEffect(() => {
        fetchData(activeDate)
    }, [activeDate, fetchData])

    return (
        <>
            <Head>
                <title>Hidden Sports Scoreboards</title>
                <meta name="description" content="Watch the highlights of close sports games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/basketball.ico" />
            </Head>

            <div className='p-10 flex flex-col items-center gap-10 justify-center'>
                <div className='flex flex-row gap-10 font-mono antialiased'>
                    <button className='text-sm p-2 rounded-lg hover:bg-purple-200' onClick={backADay}> Back </button>
                    <div className='mx-auto py-2 italic underline'> {renderDate()} </div>
                    <button className='text-sm p-2 rounded-lg hover:bg-purple-200' onClick={forwardADay}> Next </button>
                </div>
                <div>
                    {
                        isLoading ? <FontAwesomeIcon icon={faBasketball} bounce size="3x"/> : 
                        (
                            data ? <Scoreboard games={data.games} /> : <div className='font-mono antialiased mx-auto text-lg py-2 italic'> No Games Today! </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}