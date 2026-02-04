import Head from 'next/head'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBasketball } from '@fortawesome/free-solid-svg-icons'
import { ReactNode } from 'react'

interface AnalyzeLayoutProps {
  title: string
  description?: string
  maxWidth?: string
  loading?: boolean
  children?: ReactNode
}

export function AnalyzeLayout({ 
  title, 
  description = 'NBA Player Analysis', 
  maxWidth = 'max-w-3xl',
  loading = false,
  children 
}: AnalyzeLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Analysis</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/basketball.ico" />
      </Head>

      {loading ? (
        <div className='p-10 flex justify-center'>
          <FontAwesomeIcon icon={faBasketball} bounce size="3x" />
        </div>
      ) : (
        <div className='p-6 flex justify-center'>
          <div className={`bg-purple-100 rounded-lg p-4 ${maxWidth} w-full`}>
            <div className='flex justify-between items-center mb-4'>
              <Link href='/analyze' className='text-xs hover:underline'>← Back</Link>
              <h1 className='text-center text-sm underline'>{title}</h1>
              <div className='w-10'></div>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

