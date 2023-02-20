import { STAT_ID } from "./types"

// In milliseconds
const REFRESH_INTERVAL: number = 60*1000

const FANTASY_PLAYER_STATS: {id: STAT_ID, label: string, invert?: boolean, classes?: string}[] = [
    {
        id: 'points',
        label: 'Pts'
    },
    {
        id: 'assists',
        label: 'Ast',
        classes: 'font-bold'
    },
    {
        id: 'reboundsTotal',
        label: 'Reb',
        classes: 'font-bold'
    },
    {
        id: 'freeThrowsMade',
        label: `FT`
    },
    {
        id: 'twoPointersMade',
        label: `2PM`
    },
    {
        id: 'twoPointersFreeThrows',
        label: `Inside`,
        classes: 'font-bold'
    },
    {
        id: 'threePointersMade',
        label: `Trey's`,
        classes: 'font-bold'
    },
    {
        id: 'steals',
        label: `Stls`
    },
    {
        id: 'blocks',
        label: `Blks`
    },
    {
        id: 'stealsBlocks',
        label: `HslV1`,
        classes: 'font-bold'
    },
    {
        id: 'turnovers',
        label: `Tovs`,
        invert: true
    },
    {
        id: 'stealsBlocksTurnovers',
        label: `HslV2`,
        classes: 'font-bold'
    },
    {
        id: 'foulsTechnical',
        label: `Tech's`,
        classes: 'font-bold'
    },
]

const FANTASY_TEAM_STATS_2022: {id: STAT_ID, label: string, invert?: boolean}[] = [
    {
        id: 'points',
        label: `Points`
    },
    {
        id: 'threePointersMade',
        label: `Trey's`
    },
    {
        id: 'assists',
        label: 'Assists'
    },
    {
        id: 'reboundsTotal',
        label: 'Rebounds'
    },
    {
        id: 'stealsBlocks',
        label: `Hustle`
    },
    {
        id: 'foulsTechnical',
        label: `Technical's`
    },
]

const FANTASY_TEAM_STATS_2023: {id: STAT_ID, label: string, invert?: boolean}[] = [
    {
        id: 'twoPointersFreeThrows',
        label: `Inside the Arc`
    },
    {
        id: 'threePointersMade',
        label: `Trey's`
    },
    {
        id: 'assists',
        label: 'Assists'
    },
    {
        id: 'reboundsTotal',
        label: 'Rebounds'
    },
    {
        id: 'stealsBlocksTurnovers',
        label: `Hustle`
    },
    {
        id: 'foulsTechnical',
        label: `Technical's`
    },
]

const ID_TO_DATA_MAP = [
    {
        id: '2022-peru-hayden-allstar',
        title: 'Peru V Hayden AllStar 2022',
        gameId: '0032100001',
        stats: FANTASY_TEAM_STATS_2022,
        captainTeamA: 'Peru Dayani',
        playersTeamA: [
            'Giannis Antetokounmpo',
            'LeBron James',
            'Ja Morant',
            'Nikola Jokic',
            'Andrew Wiggins',
            'Devin Booker',
            'Karl-Anthony Towns',
            'Khris Middleton',
            'Darius Garland',
            'Chris Paul',
            'Donovan Mitchell',
            'Dejounte Murray'
        ],
        captainTeamB: 'Hayden Davila',
        playersTeamB: [
            'Stephen Curry',
            'Trae Young',
            'Joel Embiid',
            'Jayson Tatum',
            'DeMar DeRozan',
            'Luka Doncic',
            'Zach LaVine',
            'Jarrett Allen',
            'Rudy Gobert',
            'LaMelo Ball',
            'Fred VanVleet',
            'Jimmy Butler'
        ]
    },
    {
        id: '2023-peru-hayden-random',
        title: 'Peru V Hayden Test',
        gameId: '0022200788',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'Peru Dayani',
        playersTeamA: [
            "Jaylen Brown",
            "Chris Paul",
            "Deandre Ayton",
            "Derrick White",
            "Bismack Biyombo",
            "Luke Kornet",
            "Robert Williams III",
            "Torrey Craig",
            "Josh Okogie",
            "Blake Griffin",
            "Sam Hauser",
            "Mfiondu Kabengele",
            "Saben Lee",
        ],
        captainTeamB: 'Hayden Davila',
        playersTeamB: [
            "Jayson Tatum",
            "Malcolm Brogdon",
            "Al Horford",
            "Mikal Bridges",
            "Grant Williams",
            "Payton Pritchard",
            "Damion Lee",
            "Dario Saric",
            "Ish Wainright",
            "Justin Jackson",
            "JD Davison",
            "Jock Landale",
        ]
    },
    {
        id: '2023-peru-hayden-allstar',
        title: 'Peru V Hayden AllStar 2023',
        gameId: '0032200001',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'Peru Dayani',
        playersTeamA: [
            'Joel Embiid',
            'Giannis Antetokounmpo',
            'Nikola Jokic',
            'Kyrie Irving',
            'Donovan Mitchell',
            'Damian Lillard',
            'Jaylen Brown',
            'Paul George',
            'DeMar DeRozan',
            'Jrue Holiday',
            'Bam Adebayo',
            `De'Aaron Fox`
        ],
        captainTeamB: 'Hayden Davila',
        playersTeamB: [
            'LeBron James',
            'Luka Doncic',
            'Jayson Tatum',
            'Ja Morant',
            'Lauri Markkanen',
            'Shai Gilgeous-Alexander',
            'Anthony Edwards',
            'Domantas Sabonis',
            'Tyrese Haliburton',
            'Jaren Jackson Jr.',
            'Julius Randle',
            'Pascal Siakam'
        ]
    },
    {
        id: '2023-peru-hayden-allstar-v2',
        title: 'Peru V Hayden AllStar 2023 v2',
        gameId: '0032200001',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'Peru Dayani',
        playersTeamA: [
            'Joel Embiid',
            'Nikola Jokic',
            'Kyrie Irving',
            'Donovan Mitchell',
            'Damian Lillard',
            'Jaylen Brown',
            'Paul George',
            'DeMar DeRozan',
            'Jrue Holiday',
            'Bam Adebayo',
            `De'Aaron Fox`
        ],
        captainTeamB: 'Hayden Davila',
        playersTeamB: [
            'LeBron James',
            'Luka Doncic',
            'Jayson Tatum',
            'Ja Morant',
            'Shai Gilgeous-Alexander',
            'Anthony Edwards',
            'Domantas Sabonis',
            'Tyrese Haliburton',
            'Jaren Jackson Jr.',
            'Julius Randle',
            'Pascal Siakam'
        ]
    },
    {
        id: '2023-seerat-kyle-allstar',
        title: 'Seerat V Kyle AllStar 2023',
        gameId: '0032200001',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'Seerat Sohi',
        playersTeamA: [
            'Giannis Antetokounmpo',
            'LeBron James',
            'Jayson Tatum',
            'Donovan Mitchell',
            'Kyrie Irving',
            'Ja Morant',
            'Jaren Jackson Jr.',
            'Shai Gilgeous-Alexander',
            'Jrue Holiday',
            'Domantas Sabonis',
            'DeMar DeRozan',
            `De'Aaron Fox`,
        ],
        captainTeamB: 'J. Kyle Mann',
        playersTeamB: [
            'Joel Embiid',
            'Nikola Jokic',
            'Luka Doncic',
            'Jaylen Brown',
            'Pascal Siakam',
            'Bam Adebayo',
            'Tyrese Haliburton',
            'Paul George',
            'Damian Lillard',
            'Anthony Edwards',
            'Lauri Markkanen',
            'Julius Randle',
        ]
    },
]

export { 
    ID_TO_DATA_MAP,
    FANTASY_PLAYER_STATS,
    REFRESH_INTERVAL
}