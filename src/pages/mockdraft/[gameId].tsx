import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MockDraftData } from '@/utils/types';
import Navi from '@/components/Navi';
import Link from 'next/link';
import ConductMockDraft from '@/components/MockDraft/ConductMockDraft';

export default function MockDraft() {

    const router = useRouter()
    const { gameId } = router.query

    const [data, setData] = useState<MockDraftData | null>(null)
    const [error, setError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
      if (!gameId) return

      fetch(`/api/mockdraft/${gameId}`)
        .then(res => res.json())
        .then(data => {
          setData(data)
          setIsLoading(false)
        })
        .catch(() => {
          setError(true)
          setIsLoading(false)
        })
    }, [gameId])

    if (isLoading) {
      return (
        <>
          <Head>
            <title>Mock Draft</title>   
            <meta name="description" content="Mock Draft for an NBA Game" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/basketball.ico" />
          </Head>
    
          <div className='p-10 flex justify-center'>
              <FontAwesomeIcon icon={faBasketball} bounce size="3x" />
          </div>
        </>
      )  
    }

    if (!data || !data.gameLabel || error) {
      return (
        <>
          <Head>
            <title>Mock Draft</title>
            <meta name="description" content="Mock Draft for an NBA Game" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/basketball.ico" />
          </Head>

          <div className='p-10 flex flex-col justify-center font-mono antialiased'>
            <Navi label='No game data found' />
          </div>
        </>
      )
    }

    return (
      <>
        <Head>
          <title>Mock Draft - {data.gameLabel}</title>
          <meta name="description" content="Mock Draft for an NBA Game" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/basketball.ico" />
        </Head>

        <div className='py-10 px-4 flex flex-col gap-4 items-center font-mono antialiased'>
            <Navi  label={`Mock Draft`} />

            <Link href={`https://www.nba.com/game/${data.gameId}/box-score`} target="_blank">
                <div className="text-xs text-center">
                    <div> {data.gameDate} </div>
                    <div>
                        <span>{data.gameLabel}</span>
                    </div>
                </div>  
            </Link>  

            <ConductMockDraft data={data} />
        </div>
      </>
    )
}
