Watch highlights of the close NBA games without knowing who won.

Also, for all future Peru v Hayden All-Star draft competitions.

Client Endpoints:

1. /: Shows hidden scoreboard of today's games
2. /fantasy: Index page for all previous fantasy drafts
3. /fantasy/[id]: Fantasy draft results (live/final) for a specific draft

For Every Draft:

1. Find the GameID from NBA.com (eg: 0022300643 for https://www.nba.com/game/mia-vs-nyk-0022300643/box-score)
2. Find the players list at http://localhost:3000/api/players/{GameID}
3. Create a new Fantasy Draft in src/utils/constants
4. Deploy to Vercel: https://vercel.com/perudayanis-projects/scoreboard/deployments
5. Enjoy!

Thoughts:
1. Persist options selected to cookies
