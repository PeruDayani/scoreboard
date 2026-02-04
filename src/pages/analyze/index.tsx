import Head from 'next/head'
import Link from 'next/link'

export default function AnalyzeIndex() {
  return (
    <>
      <Head>
        <title>Player Analysis</title>
        <meta name="description" content="NBA Player Analysis Tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/basketball.ico" />
      </Head>

      <div className='p-6 flex justify-center'>
        <div className='bg-purple-100 rounded-lg p-4 min-w-[300px]'>
          <h1 className='text-center text-sm underline mb-4'>Analysis Tools</h1>
          
          <div className='flex flex-col gap-4'>
            <Link href='/analyze/allplayers' className='text-center hover:underline'>
              All Players
            </Link>
            <Link href='/analyze/stats' className='text-center hover:underline'>
              Stats Leaderboard
            </Link>
            <Link href='/analyze/contributions' className='text-center hover:underline'>
              Stat Contributions
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

