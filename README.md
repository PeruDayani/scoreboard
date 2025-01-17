Watch highlights of the close NBA games without knowing who won.

Also, for all future Peru v Hayden All-Star draft competitions.

Client Endpoints:

1. /: Shows hidden scoreboard of today's games
2. /fantasy: Index page for all previous fantasy drafts
3. /fantasy/[id]: Fantasy draft results (live/final) for a specific draft

For Every Draft:

1. Fetch the Game ID from the NBA.com boxscore URL. Eg: https://www.nba.com/game/mia-vs-nyk-0022300643/box-score
2. Fetch the Players list from http://localhost:3000/api/players/{GAME_ID}
3. Create a new FANTASY_DRAFTS in src/utils/constants following convention
4. View it on on http://localhost:3000/fantasy
5. Merge to main to kick off a Vercel deploy

TODO:
1. Add Page for easily fetching Players list
2. Cleanup the Player Stats display code
