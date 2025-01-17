import { computeFantasyDraftResult, computeMultiFantasyDraftResult } from '@/utils/computeFantasyDrafts'
import { cleanBoxscore } from '@/utils/cleanBoxscore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { FANTASY_DRAFTS } from '@/utils/constants'
import { FantasyDraftResult } from '@/utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|Error>
) {
    const query = req.query;
    const { id } = query;

    try {
        if (id && typeof id === "string") {
            const config = FANTASY_DRAFTS.find((data) => data.urlId == id)

            if (!config) {
                throw Error('Invalid game ID provided')
            }

            const gamesDataRequests = config.games.map((game) => {
                return fetch(`https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${game.gameId}.json`)
            })

            const gamesDataResponses = await Promise.all(gamesDataRequests)

            const gamesDataObjects = await Promise.all(gamesDataResponses.map(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return null
                }
            }));

            const gamesDataCleaned = gamesDataObjects.map(cleanBoxscore)

            const draftResults = gamesDataCleaned.map((g, i) => {
                return computeFantasyDraftResult(g, config, i)
            })

            const multiDraftResults = computeMultiFantasyDraftResult(draftResults, config)

            res.status(200).json(multiDraftResults)
        }
    }
    catch (error: any) {
        console.log("Error while fetching Fantasy Games Data: ", error)
        res.status(404).json([])
    }

}