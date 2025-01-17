import { FANTASY_DRAFTS } from '@/utils/constants'
import FantasyGameCard from '@/components/FantasyGameCard'
import Head from 'next/head'
import Navi from '@/components/Navi'

export default function Home() {
    return (
        <>
            <Head>
                <title>Fantasy Drafts</title>
                <meta name="description" content="Fantasy Drafts for an NBA Game" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/basketball.ico" />
            </Head>
            <div className='p-10 flex flex-col justify-center font-mono antialiased'>
                <Navi label='Fantasy Drafts' />
                <div className='flex flex-col flex-wrap justify-center max-w-5xl m-auto'>
                    {FANTASY_DRAFTS.map((draft) => {
                        return (
                            <FantasyGameCard key={draft.urlId} fantasyDraft={draft}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}