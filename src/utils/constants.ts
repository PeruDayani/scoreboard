import { StatisticID, FantasyDraftConfig, Statistic } from "./types"

const REFRESH_INTERVAL: number = 60*1000

const FANTASY_PLAYER_STATS: {id: StatisticID, label: string, invert?: boolean, classes?: string}[] = [
    {
        id: 'minutes',
        label: 'Mins'
    },
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
        label: `Treys`,
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

const FANTASY_TEAM_STATS_2022: Statistic[] = [
    {
        id: 'points',
        label: `Points`
    },
    {
        id: 'threePointersMade',
        label: `Treys`
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
        label: `Technicals`,
        ignore: true
    },
    {
        id: 'minutes',
        label: `Minutes`,
        ignore: true
    },
    {
        id: 'twoPointersFreeThrows',
        label: `Inside the Arc`,
        ignore: true
    },
]

const FANTASY_TEAM_STATS_2023: Statistic[] = [
    {
        id: 'twoPointersFreeThrows',
        label: `Inside the Arc`
    },
    {
        id: 'threePointersMade',
        label: `Treys`
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
        label: `Technicals`,
        ignore: true
    },
    {
        id: 'minutes',
        label: `Minutes`,
        ignore: true
    },
    {
        id: 'points',
        label: `Points`,
        ignore: true
    },
]

const FANTASY_TEAM_STATS_2024: Statistic[] = [
    {
        id: 'twoPointersFreeThrows',
        label: `Inside`
    },
    {
        id: 'threePointersMade',
        label: `Treys`
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
        label: `Technicals`,
        ignore: true
    },
    {
        id: 'minutes',
        label: `Minutes`,
        ignore: true
    },
    {
        id: 'points',
        label: `Points`,
        ignore: true
    },
]

const FANTASY_DRAFTS: FantasyDraftConfig[] = [
    {
        urlId: '2025-peru-hayden-allstar',
        title: 'All Star 2025',
        stats: FANTASY_TEAM_STATS_2024,
        captainTeamA: 'P. Dayani',
        captainTeamB: 'H. Davila',
        games: [
            {
                gameId: '0032300001',
                playersTeamA: [
                    'Giannis Antetokounmpo',
                    'Shai Gilgeous-Alexander',
                    'Damian Lillard',
                    'LeBron James',
                    'Nikola Jokic',
                    'Stephen Curry',
                    'Devin Booker',
                    'Jaylen Brown',
                    'Paul George',
                    'Karl-Anthony Towns',
                    'Trae Young',
                    'Kawhi Leonard',
                ],
                playersTeamB: [
                    'Tyrese Haliburton',
                    'Jayson Tatum',
                    'Luka Doncic',
                    'Bam Adebayo',
                    'Kevin Durant',
                    'Donovan Mitchell',
                    'Tyrese Maxey',
                    'Anthony Davis',
                    'Jalen Brunson',
                    'Anthony Edwards',
                    'Paolo Banchero',
                    'Scottie Barnes',
                ]
            },
            {
                gameId: '0032200001',
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
                gameId: '0032100001',
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
            }
        ] 
    },
    {
        urlId: '2024-peru-hayden-allstar',
        title: 'All Star 2024',
        stats: FANTASY_TEAM_STATS_2024,
        captainTeamA: 'P. Dayani',
        captainTeamB: 'H. Davila',
        games: [
            {
                gameId: '0032300001',
                playersTeamA: [
                    'Giannis Antetokounmpo',
                    'Shai Gilgeous-Alexander',
                    'Damian Lillard',
                    'LeBron James',
                    'Nikola Jokic',
                    'Stephen Curry',
                    'Devin Booker',
                    'Jaylen Brown',
                    'Paul George',
                    'Karl-Anthony Towns',
                    'Trae Young',
                    'Kawhi Leonard',
                ],
                playersTeamB: [
                    'Tyrese Haliburton',
                    'Jayson Tatum',
                    'Luka Doncic',
                    'Bam Adebayo',
                    'Kevin Durant',
                    'Donovan Mitchell',
                    'Tyrese Maxey',
                    'Anthony Davis',
                    'Jalen Brunson',
                    'Anthony Edwards',
                    'Paolo Banchero',
                    'Scottie Barnes',
                ]
            }
        ]
    },
    {
        urlId: '2023-peru-hayden-allstar',
        title: 'All Star 2023',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'P. Dayani',
        captainTeamB: 'H. Davila',
        games: [
            {
                gameId: '0032200001',
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
            }
        ]
    },
    {
        urlId: '2023-peru-hayden-allstar-v2',
        title: 'All Star 2023 (2)',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'P. Dayani',
        captainTeamB: 'H. Davila',
        games: [
            {
                gameId: '0032200001',
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
            }
        ]
    },
    {
        urlId: '2023-seerat-kyle-allstar',
        title: 'All Star 2023',
        stats: FANTASY_TEAM_STATS_2023,
        captainTeamA: 'S. Sohi',
        captainTeamB: 'J. Mann',
        games: [
            {
                gameId: '0032200001',
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
            }
        ]
    },
    {
        urlId: '2022-peru-hayden-allstar',
        title: 'All Star 2022',
        stats: FANTASY_TEAM_STATS_2022,
        captainTeamA: 'P. Dayani',
        captainTeamB: 'H. Davila',
        games: [
            {
                gameId: '0032100001',
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
            }
        ]
    }
]

export { 
    FANTASY_DRAFTS,
    FANTASY_PLAYER_STATS,
    REFRESH_INTERVAL
}