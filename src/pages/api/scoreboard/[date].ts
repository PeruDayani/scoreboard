import type { NextApiRequest, NextApiResponse } from 'next'
const nba = require('nba-api-client');

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const query = req.query;
    const { date } = query;

    const data = await nba.scoreboard({
      DayOffset: "0",
      GameDate: date,
      LeagueID: "00"
    })
    res.status(200).json(data)
}
