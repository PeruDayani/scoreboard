import { cleanBoxscore } from '@/utils/cleanBoxscore';
import { BoxScore } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BoxScore|Error>
) {
    try {
      const query = req.query;
      const { gameId } = query;

      const  url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`
      const data  = await fetch(url)
          .then((res) => res.json())
      
      res.status(200).json(cleanBoxscore(data) as BoxScore)    
    } catch (error: any) {
      console.log("Error: ", error)
      res.status(404).json(error)
    }
}
