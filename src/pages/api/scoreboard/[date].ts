import type { NextApiRequest, NextApiResponse } from 'next'
import { cleanScoreboard } from '@/utils/cleanScoreboard'

const STATS_HEADERS = {
    "Host": "stats.nba.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "x-nba-stats-origin": "stats",
    "x-nba-stats-token": "true",
    "Connection": "keep-alive",
    "Referer": "https://stats.nba.com/",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {     
        const query = req.query;
        const { date } = query;

        const url = `https://stats.nba.com/stats/scoreboardv3?GameDate=${date}&LeagueID=00`
        console.log("API call for:  ", url, STATS_HEADERS)

        const data  = await fetch(url, { headers: new Headers(STATS_HEADERS)})
            .then((res) => res.json())
            .then((data) => cleanScoreboard(data))

        res.status(200).json(data)
    } catch (error: any) {
        res.status(404).json({status: '404', reason: error})
    }
}