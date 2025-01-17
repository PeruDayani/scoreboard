import Head from 'next/head'
import ScoreboardDisplay from '@/components/ScoreboardDisplay'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import { useMemo } from 'react';
import { Scoreboard } from '@/utils/types';

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

type useScoreboardPayload = {
  data: Scoreboard,
  isLoading: boolean,
  isError: any
}

function useScoreboard(): useScoreboardPayload {
  const { data, error, isLoading } = useSWR(`/api/scoreboard/`, fetcher)

  return {
    data,
    isLoading,
    isError: error
  }
}

export default function Home() {
  const { data, isLoading } = useScoreboard()

  const content = useMemo(() => {
    if (isLoading) {
      return <FontAwesomeIcon icon={faBasketball} bounce size="3x"/>
    } else if (data) {
      return <ScoreboardDisplay title={data.date} games={data.games} />
    } else {
      return <div className='mx-auto text-lg py-2 italic underline'> No Games Today! </div>
    }
  }, [data, isLoading])

  return (
    <>
      <Head>
        <title>Hidden NBA Scoreboard</title>
        <meta name="description" content="Enjoy highlights of close NBA games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/basketball.ico" />
      </Head>

      <div className='p-10 flex justify-center'>
        { content }
      </div>
    </>
  )
}