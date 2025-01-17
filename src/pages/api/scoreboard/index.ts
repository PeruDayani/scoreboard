import { cleanScoreboard } from '@/utils/cleanScoreboard'
import { Scoreboard } from '@/utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scoreboard>
) {
  try {
    const  url = `https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json`
    const data  = await fetch(url)
        .then((res) => res.json())
        .then((data) => cleanScoreboard(data))

    res.status(200).json(data)
  } catch (error: any) {
    res.status(404)
  }
}