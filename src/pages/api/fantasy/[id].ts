import { calcAllStarData } from '@/utils/calcAllStarData'
import { cleanBoxscore } from '@/utils/cleanBoxscore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ID_TO_DATA_MAP } from '@/utils/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|Error>
) {
    const query = req.query;
    const { id } = query;

    try {
        if (id && typeof id === "string") {
            const fantasyData = ID_TO_DATA_MAP.find((data) => data.id == id)

            if (!fantasyData) {
                throw Error('Invalid game ID provided')
            }

            const  url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${fantasyData?.gameId}.json`
            const data  = await fetch(url)
                .then((res) => res.json())
                .then((data) => cleanBoxscore(data))
                .then((data) => calcAllStarData(data, id))

            res.status(200).json(data)
        }
    }
    catch (error: any) {
        console.log("Error: ", error)
        res.status(404).json({error})
    }

}