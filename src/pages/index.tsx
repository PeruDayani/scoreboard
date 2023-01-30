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
        if (data.scoreboard && data.scoreboard.games) {
          setGamesData(data.scoreboard.games)

          const gameTimeUTC = new Date(data.scoreboard.gameDate)
          const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const gameDateString = new Intl.DateTimeFormat('en-US', options).format(gameTimeUTC)
          setGameDate(gameDateString)  
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
