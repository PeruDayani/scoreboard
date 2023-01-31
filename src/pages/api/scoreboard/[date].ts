import { cleanScoreboardByDate } from '@/utils/cleanScoreboard';
import { Scoreboard } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next'
const nba = require('nba-api-client');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scoreboard|Error>
) {
  try {
    const query = req.query;
    const { date } = query;

    const data = await nba.scoreboard({
      DayOffset: "0",
      GameDate: date,
      LeagueID: "00"
    })
    res.status(200).json(cleanScoreboardByDate(data)) 
  } catch (error: any) {
    res.status(404).json(error)
  }
}
