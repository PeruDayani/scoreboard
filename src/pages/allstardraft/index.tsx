import Head from 'next/head'
import { useState, useEffect } from 'react'
import AllStar from '@/components/AllStar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [game, setGame] = useState({})
    const [date, setDate] = useState('')
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch(`api/allstar`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data from server: ", data)
          if (data) {
            setGame(data.game)
            setDate(data.date)  
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
  
        <div className='p-10'>
          { isLoading ? <FontAwesomeIcon icon={faPersonHiking} shake size="10x" /> : <AllStar game={game} date={date} />}
        </div>
      </>
    )
  }