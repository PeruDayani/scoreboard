import { calcFantasyDraftData } from '@/utils/calcFantasyDraftData'
import { cleanBoxscore } from '@/utils/cleanBoxscore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { FANTASY_DRAFTS } from '@/utils/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|Error>
) {
    const query = req.query;
    const { id } = query;

    try {
        if (id && typeof id === "string") {
            const fantasyDraftConfig = FANTASY_DRAFTS.find((data) => data.urlId == id)

            if (!fantasyDraftConfig) {
                throw Error('Invalid game ID provided')
            }

            const gamesDataRequests = fantasyDraftConfig.games.map((game) => {
                return fetch(`https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${game.gameId}.json`)
            })

            const gamesDataResponses = await Promise.all(gamesDataRequests)
            const gamesDataObjects = await Promise.all(gamesDataResponses.map(res => res.json()));
            const gamesDataCleaned = gamesDataObjects.map(cleanBoxscore)

            const { captainTeamA, captainTeamB, stats, games } = fantasyDraftConfig
            const fantasyGamesData = gamesDataCleaned.map((g, i) => {
                const { playersTeamA, playersTeamB } = games[i]
                return calcFantasyDraftData(g, captainTeamA, captainTeamB, playersTeamA, playersTeamB, stats)
            })

            res.status(200).json(fantasyGamesData)
        }
    }
    catch (error: any) {
        console.log("Error: ", error)
        res.status(404).json({error})
    }

}