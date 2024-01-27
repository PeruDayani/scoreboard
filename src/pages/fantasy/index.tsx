import { FANTASY_DRAFTS } from '@/utils/constants'
import FantasyGameCard from '@/components/FantasyGameCard'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Fantasy Draft 3.0</title>
                <meta name="description" content="Watch the highlights of close sports games" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='p-10 flex flex-col justify-center font-mono antialiased'>
                <div className='mx-auto py-2 italic underline'> Fantasy Drafts </div>
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