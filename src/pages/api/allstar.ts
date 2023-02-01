import { calcAllStarData } from '@/utils/calcAllStarData'
import { cleanBoxscore } from '@/utils/cleanBoxscore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ALL_STAR_GAME_ID } from '@/utils/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|Error>
) {

  try {
    const  url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${ALL_STAR_GAME_ID}.json`
    const data  = await fetch(url)
        .then((res) => res.json())
        .then((data) => cleanBoxscore(data))
        .then((data) => calcAllStarData(data))

    res.status(200).json(data)
  } catch (error: any) {
    console.log("Error: ", error)
    res.status(404).json({error})
  }
}