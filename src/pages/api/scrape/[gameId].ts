import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import cheerio from 'cheerio'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const query = req.query;
    const { gameId } = query;

    const url = `https://www.espn.com/nba/boxscore/_/gameId/${gameId}`      
    const data: any = {}
  
    await axios.get(url)
      .then((req) => {
            const $ = cheerio.load(req.data)

            $('.Boxscore__AthleteName').each( function(i, a) {
                data[i] = {'name': $(a).text()}
            })

            let counter = 0;
            $('tr').each( function(i, tr) {
                var children = $(tr).children();

                if (children.length === 1 && !$(children[0]).hasClass('Table__customHeader')) {
                  if ($(children[0]).text().trim() == "DNP-COACH'S DECISION") {
                    var stats = {
                      'Min': "0",
                      'FG':  "0",
                      '3PT':  "0",
                      'FT':  "0",
                      'OREB':  "0",
                      'DREB':  "0",
                      'REB':  "0",
                      'AST':  "0",
                      'STL':  "0",
                      'BLK':  "0",
                      'TO':  "0",
                      'PF':  "0",
                      '+/-':  "0",
                      'PTS':  "0",
                    }

                    data[counter] = {...data[counter], ...stats}
                    counter += 1
                  }
                } else if (children.length === 14 && !$(children[0]).hasClass('Table__customHeader')) {
                  var stats = {
                    'Min': $(children[0]).text().trim(),
                    'FG': $(children[1]).text().trim(),
                    '3PT': $(children[2]).text().trim(),
                    'FT': $(children[3]).text().trim(),
                    'OREB': $(children[4]).text().trim(),
                    'DREB': $(children[5]).text().trim(),
                    'REB': $(children[6]).text().trim(),
                    'AST': $(children[7]).text().trim(),
                    'STL': $(children[8]).text().trim(),
                    'BLK': $(children[9]).text().trim(),
                    'TO': $(children[10]).text().trim(),
                    'PF': $(children[11]).text().trim(),
                    '+/-': $(children[12]).text().trim(),
                    'PTS': $(children[13]).text().trim(),
                  }

                  data[counter] = {...data[counter], ...stats}
                  counter += 1
                }
            })
        })
      .catch(function (error) {
        console.error(error);
        });

    res.status(200).json(data)

  } catch (error: any) {
    res.status(404).json(error)
  }
}