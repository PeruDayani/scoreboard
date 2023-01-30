// https://stats.nba.com/stats/boxscoretraditionalv2?GameID=0032100001
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const query = req.query;
    const { gameId } = query;

    const  url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`
    const data  = await fetch(url)
        .then((res) => res.json())
    res.status(200).json(data)
}
