import Head from 'next/head'
import Scoreboard from '@/components/Scoreboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import { REFRESH_INTERVAL } from '@/utils/constants';

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

function useScoreboard () {
  const { data, error, isLoading } = useSWR(`/api/scoreboard/`, fetcher)

  return {
    data: data,
    isLoading,
    isError: error
  }
}

export default function Home() {
  const { data, isLoading, isError } = useScoreboard()

  if (!data) {  
    return (
      <>
        <Head>
          <title>Hidden Sports Scoreboards</title>
          <meta name="description" content="Watch the highlights of close sports games" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/basketball.ico" />
        </Head>

        <div className='p-10 flex justify-center'>
          { isLoading ? <FontAwesomeIcon icon={faBasketball} bounce size="3x"/> : <div className='mx-auto text-lg py-2 italic underline'> No Games Today! </div>}
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Hidden NBA Scoreboard</title>
        <meta name="description" content="Enjoy highlights of close NBA games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/basketball.ico" />
      </Head>

      <div className='p-10 flex justify-center'>
        { isLoading ? <FontAwesomeIcon icon={faBasketball} bounce size="3x"/> : <Scoreboard date={data.date} games={data.games} />}
      </div>
    </>
  )
}