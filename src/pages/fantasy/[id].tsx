import Head from 'next/head'
import AllStarScoreboard from '@/components/AllStarScoreboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import { REFRESH_INTERVAL } from '@/utils/constants';
import { useRouter } from 'next/router'

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export default function Fantasy() {

    const router = useRouter()
    const { id } = router.query

    const { data, error, isLoading } = useSWR(id ? `/api/fantasy/${id}` : null, fetcher, { refreshInterval: REFRESH_INTERVAL })

    // console.log("Internal game id : ", id)
    // console.log("fetching data : ", isLoading)
    // console.log("recieved data : ", data)
  
    if (isLoading || !data) {
      return (
        <>
          <Head>
            <title>All Star Fantasy Draft 3.0</title>
            <meta name="description" content="Watch the highlights of close sports games" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <div className='p-10 flex justify-center'>
              <FontAwesomeIcon icon={faBasketball} bounce size="3x" />
          </div>
        </>
      )  
    }

    if (error) {
      return (
        <>
          <Head>
            <title>All Star Fantasy Draft 3.0</title>
            <meta name="description" content="Watch the highlights of close sports games" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <div className='p-10 flex justify-center'>
            <div className="mx-auto text-lg py-2 italic text-center"> 
                <p> 
                  Welp, it was going to break someday. 
                </p>
                <p> 
                  Let me know @ <span className='underline text-purple-600'> perudayani@berkeley.edu </span>
                </p>
              </div>
          </div>
        </>
      )
    }

    if (data.error) {

      return (
        <>
          <Head>
            <title>All Star Fantasy Draft 3.0</title>
            <meta name="description" content="Watch the highlights of close sports games" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <div className='p-10 flex justify-center'>
            <div className="mx-auto text-lg py-2 italic text-center"> 
                <p> 
                    The NBA has not started publishing the game data yet.
                </p>
                <p> 
                    They usually start 10 minutes before tipoff.
                </p>
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <Head>
          <title>All Star Fantasy Draft 3.0</title>
          <meta name="description" content="Watch the highlights of close sports games" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <div className='p-10 flex justify-center'>
          <AllStarScoreboard data={data} />
        </div>
      </>
    )
}