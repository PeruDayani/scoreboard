import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons';
import Scoreboard from '@/components/Scoreboard';
import Head from 'next/head'

const ONE_DAY = 86400000

export default function Home() {
    const [activeDate, setActiveDate] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>(null)

    function backADay() {
        const newDate = activeDate - ONE_DAY
        setActiveDate(newDate)
        fetchData(newDate)
    }

    function forwardADay() {
        const newDate = activeDate - ONE_DAY
        setActiveDate(newDate)
        fetchData(newDate)
    }

    function renderDate() {
        const currentDate = new Date(activeDate)

        return `${currentDate.getDate()} - ${currentDate.getMonth()} - ${currentDate.getFullYear()}`
    }

    async function fetchData(newDate: number) {
        const currentDate = new Date(newDate)
        const data = await fetch(`/api/scoreboard/${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`)
                            .then(r => r.json())

        setData(data)
        setIsLoading(false)
    }

    useEffect(() => {
        setActiveDate(Date.now())
        fetchData(Date.now())
    }, [])


    if (isLoading) {
        return (
            <>
              <Head>
                <title>Hidden Sports Scoreboards</title>
                <meta name="description" content="Watch the highlights of close sports games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/basketball.ico" />
              </Head>
      
              <div className='p-10 flex justify-center'>
                <FontAwesomeIcon icon={faBasketball} bounce size="3x"/>
              </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Hidden Sports Scoreboards</title>
                <meta name="description" content="Watch the highlights of close sports games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/basketball.ico" />
            </Head>

            <div className='p-10 flex justify-center'>
                <div className='flex flex-row gap-10'>
                    <button onClick={backADay}> Back </button>
                    <div> {renderDate()} </div>
                    <button onClick={forwardADay}> Next </button>
                </div>
                <div>
                    <Scoreboard date={data.date} games={data.games} />
                </div>
            </div>
        </>
    )
}