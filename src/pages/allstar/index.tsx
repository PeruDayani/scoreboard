import Head from 'next/head'
import AllStarScoreboard from '@/components/AllStarScoreboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import { REFRESH_INTERVAL } from '@/utils/constants';

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

function useAllStarData () {
  const { data, error, isLoading } = useSWR(`/api/allstar/`, fetcher, { refreshInterval: REFRESH_INTERVAL })

  return {
    data: data,
    isLoading,
    isError: error
  }
}

export default function AllStar() {
    const { data, isLoading, isError } = useAllStarData()
    console.log("Recieved data: ", data, isLoading)
  
    return (
      <>
        <Head>
          <title>All Star Fantasy Draft 3.0</title>
          <meta name="description" content="Watch the highlights of close sports games" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className='p-10 flex justify-center'>
            { isLoading ? <FontAwesomeIcon icon={faBasketball} bounce size="3x" /> : <AllStarScoreboard data={data} />}
        </div>
      </>
    )
}