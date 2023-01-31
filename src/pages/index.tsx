import Head from 'next/head'
import { useState, useEffect } from 'react'
import Scoreboard from '@/components/Scoreboard'

export default function Home() {
  const [gamesData, setGamesData] = useState([])
  const [gameDate, setGameDate] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`api/scoreboard`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data from server: ", data)
        if (data) {
          setGamesData(data.games)
          setGameDate(data.date)  
        }
        setLoading(false)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Hidden Sports Scoreboards</title>
        <meta name="description" content="Watch the highlights of close sports games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='h-screen bg-purple-200 p-10 text-lg'>
        { isLoading ? <div className='text-center'> Loading ... </div> : <Scoreboard date={gameDate} games={gamesData} />}
      </div>
    </>
  )
}