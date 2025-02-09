import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import useSWR, { Fetcher } from 'swr'
import { FANTASY_DRAFTS, REFRESH_INTERVAL } from '@/utils/constants';
import { useRouter } from 'next/router'
import { MultiFantasyDraftResult } from '@/utils/types';
import FantasyDraftResults from '@/components/FantasyDraftResults';
import Navi from '@/components/Navi';

const fetcher: Fetcher<MultiFantasyDraftResult> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export default function Fantasy() {

    const router = useRouter()
    const { id } = router.query

    const { data, error, isLoading } = useSWR(id ? `/api/fantasy/${id}` : null, fetcher, { refreshInterval: REFRESH_INTERVAL })
    const config = FANTASY_DRAFTS.find((draft) => draft.urlId == id)

    console.log("Fetched data: ", data)

    if (!data || isLoading) {
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

    if (!config || error) {
      return (
        <>
          <Head>
            <title>Fantasy Drafts</title>
            <meta name="description" content="Fantasy Drafts for an NBA Game" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/basketball.ico" />
          </Head>

          <div className='p-10 flex flex-col justify-center font-mono antialiased'>
            <Navi label='Invalid Draft ID' />
          </div>
        </>
      )
    }

    if (data.draftResults.length < 1) {
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
                    The NBA has not started publishing these games yet.
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
          <title>Fantasy Drafts</title>
          <meta name="description" content="Fantasy Drafts for an NBA Game" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/basketball.ico" />
        </Head>

        {
          <div className='py-10 px-4 flex justify-center'>
            <FantasyDraftResults config={config} draftResult={data} />
          </div>
        }
      </>
    )
}