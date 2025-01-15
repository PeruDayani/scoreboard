import Head from 'next/head'
import FantasyDraftScoreboard from '@/components/FantasyDraftScoreboard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import useSWR, { Fetcher } from 'swr'
import { REFRESH_INTERVAL } from '@/utils/constants';
import { useRouter } from 'next/router'
import { FantasyDraftData } from '@/utils/types';

const fetcher: Fetcher<FantasyDraftData[]> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export default function Fantasy() {

    const router = useRouter()
    const { id } = router.query

    const { data, error, isLoading } = useSWR(id ? `/api/fantasy/${id}` : null, fetcher, { refreshInterval: REFRESH_INTERVAL })
  
    if (isLoading || !data) {
      return (
        <>
          <Head>
            <title>Fantasy Drafts</title>   
            <meta name="description" content="Fantasy Drafts for an NBA Game" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/basketball.ico" />
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
            <title>Fantasy Drafts</title>
            <meta name="description" content="Fantasy Drafts for an NBA Game" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/basketball.ico" />
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

    // if (data.error) {
    //   return (
    //     <>
    //       <Head>
    //         <title>Fantasy Drafts</title>
    //         <meta name="description" content="Fantasy Drafts for an NBA Game" />
    //         <meta name="viewport" content="width=device-width, initial-scale=1" />
    //         <link rel="icon" href="/basketball.ico" />
    //       </Head>
    
    //       <div className='p-10 flex justify-center'>
    //         <div className="mx-auto text-lg py-2 italic text-center"> 
    //             <p> 
    //                 The NBA has not started publishing the game data yet.
    //             </p>
    //             <p> 
    //                 They usually start 10 minutes before tipoff.
    //             </p>
    //         </div>
    //       </div>
    //     </>
    //   )
    // }

    return (
      <>
        <Head>
          <title>Fantasy Drafts</title>
          <meta name="description" content="Fantasy Drafts for an NBA Game" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/basketball.ico" />
        </Head>
  
        {
          data.map((d) => {
            return (
              <div key={d.game.gameId} className='p-10 flex justify-center'>
                <FantasyDraftScoreboard data={d} />
              </div>
            )
          })
        }
      </>
    )
}