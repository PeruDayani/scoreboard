import Head from 'next/head'
import { useState, useEffect } from 'react'
import AllStarScoreboard from '@/components/AllStarScoreboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'

export default function AllStar() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch(`api/allstar`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log("Fetched data from server: ", data)
            setData(data)
          }
          setLoading(false)
      })
    }, [])
  
    return (
      <>
        <Head>
          <title>All Star Fantasy Draft 3.0</title>
          <meta name="description" content="Watch the highlights of close sports games" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className='p-16 flex justify-center'>
            { isLoading ? <FontAwesomeIcon icon={faBasketball} bounce size="8x" /> : <AllStarScoreboard data={data} />}
        </div>
      </>
    )
  }