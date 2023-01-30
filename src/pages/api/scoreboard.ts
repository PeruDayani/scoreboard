// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const  url = `https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json`
    const data  = await fetch(url)
        .then((res) => res.json())
    res.status(200).json(data)
}
