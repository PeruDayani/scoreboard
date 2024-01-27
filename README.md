For people that want to watch the highlights of close games without knowwing the final score :)

Also, for all future Peru v Hayden All Star draft competitions.

Server Endpoints:

1. /scoreboard : Returns data on today's games
3. /boxscore/[gameId] : Returns the boxscore of requested game
5. /fantasy/[draftID] : The processed fantasy boxscore for a fantasy draft game

Client Side:

1. / : Show hidden scoreboard for today's games
2. /fantasy : all fantasy draft games
3. /fantasy/[id]: the live results for a fantasy draft game

For Every Draft:

1. Fetch the Game ID from the NBA.com boxscore url. Eg: https://www.nba.com/game/mia-vs-nyk-0022300643/box-score
2. Fetch the Players list from http://localhost:3000/api/players/{GAME_ID}
3. Create a new FANTASY_DRAFTS in src/utils/constants following convention
4. You should have it pop up on http://localhost:3000/fantasy