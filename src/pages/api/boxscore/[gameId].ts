import { cleanBoxscore } from '@/utils/cleanBoxscore';
import { BoxScore } from '@/utils/types';
import type { NextApiRequest, NextApiResponse } from 'next'

// 2022 All Star GameID : 0032100001
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
      
      res.status(200).json(cleanBoxscore(data))    
    } catch (error: any) {
      console.log("Error: ", error)
      res.status(404).json(error)
    }
}
