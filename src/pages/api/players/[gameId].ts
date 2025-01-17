import { fetchPlayers } from '@/utils/cleanPlayersData'
import { cleanBoxscore } from '@/utils/cleanBoxscore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BoxScore } from '@/utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|Error>
) {

  try {
    const query = req.query;
    const { gameId } = query;

    const  url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`
    const data  = await fetch(url)
        .then((res) => res.json())
        .then((data) => cleanBoxscore(data))
        .then((data) => fetchPlayers(data as BoxScore))

    res.status(200).json(data)
  } catch (error: any) {
    console.log("Error: ", error)
    res.status(404).json({error})
  }
}