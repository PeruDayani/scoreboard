import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import { FANTASY_DRAFTS } from '@/utils/constants';
import { useRouter } from 'next/router'
import Navi from '@/components/Navi';

export default function Draft() {

    const router = useRouter()
    const { id } = router.query

    const config = FANTASY_DRAFTS.find((draft) => draft.urlId == id)

    if (!id) {
        return (
            <>
                <Head>
                    <title>Fantasy Draft</title>
                    <meta name="description" content="Fantasy Draft for an NBA Game" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/basketball.ico" />
                </Head>

                <div className='p-10 flex justify-center'>
                    <FontAwesomeIcon icon={faBasketball} bounce size="3x" />
                </div>
            </>
        )
    }

    if (!config) {
        return (
            <>
                <Head>
                    <title>Fantasy Draft</title>
                    <meta name="description" content="Fantasy Draft for an NBA Game" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/basketball.ico" />
                </Head>

                <div className='p-10 flex flex-col justify-center font-mono antialiased'>
                    <Navi label='Invalid Draft ID' />
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Fantasy Draft - {config.urlId}</title>
                <meta name="description" content="Fantasy Draft for an NBA Game" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/basketball.ico" />
            </Head>

            <div className='p-10 flex flex-col gap-8 justify-center font-mono antialiased'>
                <Navi label='Fantasy Draft' />
                <div className='flex flex-col flex-wrap justify-center max-w-5xl m-auto'>
                    <h1 className='text-2xl font-bold mb-4'>{config.title}</h1>
                </div>
            </div>
        </>
    )
}

