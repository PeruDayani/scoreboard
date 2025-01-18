import { StatisticID, FantasyDraftConfig, Statistic } from "./types"

export const REFRESH_INTERVAL: number = 60*1000

export const NAVI_CONFIG = [
    {
        label: 'Home',
        url: '/',
    },
    {
        label: 'Fantasy',
        url: '/fantasy',
    }
]

export const CONFETTI_CONFIG = {
    angle: 90,
    spread: 45,
    startVelocity: 30,
    elementCount: 90,
    dragFriction: 0.12,
    duration: 6000,
    stagger: 3,
    width: "20px",
    height: "20px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export const FANTASY_PLAYER_STATS: {id: StatisticID, label: string, invert?: boolean, classes?: string}[] = [
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

const FANTASY_TEAM_STATS_2025: Statistic[] = [
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
        id: 'draftedAt',
        label: `Drafted`,
        ignore: true,
    },
]

export const FANTASY_DRAFTS: FantasyDraftConfig[] = [
    {
        urlId: '2025-peru-hayden-test',
        title: `B'day Party`,
        stats: FANTASY_TEAM_STATS_2025,
        captainTeamA: 'P. Dayani',
        captainTeamB: 'H. Davila',
        games: [
            {
                gameId: '0022400746',
                playersTeamA: ['TBD'],
                playersTeamB: ['TBD']
            },
            {
                gameId: '0022400748',
                playersTeamA: ['TBD'],
                playersTeamB: ['TBD']
            },
            {
                gameId: '0022400749',
                playersTeamA: ['TBD'],
                playersTeamB: ['TBD']
            }
        ] 
    },
    {
        urlId: '2025-test',
        title: '2025 Test Draft',
        stats: FANTASY_TEAM_STATS_2025,
        captainTeamA: 'Team A',
        captainTeamB: 'Team B',
        games: [
            {
                gameId: '0022400577',
                playersTeamA: [
                    "Jaylen Brown",
                    "Jayson Tatum",
                    "Kristaps Porziņģis",
                    "Derrick White",
                    "Jrue Holiday",
                    "Sam Hauser",
                    "Al Horford",
                    "Luke Kornet",
                    "Payton Pritchard",
                    "Neemias Queta",
                    "Baylor Scheierman",
                    "Jaden Springer",
                    "Xavier Tillman",
                    "Jordan Walsh",
                    "JD Davison",
                    "Drew Peterson",
                    "Anton Watson"
                ],
                playersTeamB: [
                    "Tristan da Silva",
                    "Paolo Banchero",
                    "Wendell Carter Jr.",
                    "Kentavious Caldwell-Pope",
                    "Cole Anthony",
                    "Anthony Black",
                    "Caleb Houstan",
                    "Jett Howard",
                    "Jonathan Isaac",
                    "Cory Joseph",
                    "Trevelin Queen",
                    "Jalen Suggs",
                    "Goga Bitadze",
                    "Gary Harris",
                    "Mac McClung",
                    "Franz Wagner",
                    "Moritz Wagner"
                ]
            },
            {
                gameId: '0022400578',
                playersTeamA: [
                    "Jaden McDaniels",
                    "Julius Randle",
                    "Rudy Gobert",
                    "Mike Conley",
                    "Anthony Edwards",
                    "Nickeil Alexander-Walker",
                    "Jaylen Clark",
                    "Rob Dillingham",
                    "Luka Garza",
                    "Joe Ingles",
                    "Josh Minott",
                    "Naz Reid",
                    "Donte DiVincenzo",
                    "Jesse Edwards",
                    "Leonard Miller",
                    "Tristen Newton",
                    "Terrence Shannon Jr."
                ],
                playersTeamB: [
                    "OG Anunoby",
                    "Josh Hart",
                    "Jericho Sims",
                    "Mikal Bridges",
                    "Jalen Brunson",
                    "Precious Achiuwa",
                    "Pacôme Dadiet",
                    "Ariel Hukporti",
                    "Tyler Kolek",
                    "Miles McBride",
                    "Cameron Payne",
                    "Matt Ryan",
                    "Landry Shamet",
                    "Jacob Toppin",
                    "Karl-Anthony Towns",
                    "Kevin McCullar Jr.",
                    "Mitchell Robinson"
                ]
            },
            {
                gameId: '0022400579',
                playersTeamA: [
                    "Haywood Highsmith",
                    "Jaime Jaquez Jr.",
                    "Kevin Love",
                    "Tyler Herro",
                    "Terry Rozier",
                    "Nikola Jović",
                    "Kel'el Ware",
                    "Duncan Robinson",
                    "Alec Burks",
                    "Bam Adebayo",
                    "Jimmy Butler",
                    "Josh Christopher",
                    "Keshad Johnson",
                    "Pelle Larsson",
                    "Isaiah Stevens",
                    "Josh Richardson",
                    "Dru Smith"
                ],
                playersTeamB: [
                    "Christian Braun",
                    "Michael Porter Jr.",
                    "DeAndre Jordan",
                    "Russell Westbrook",
                    "Jamal Murray",
                    "Peyton Watson",
                    "Julian Strawther",
                    "Dario Šarić",
                    "Jalen Pickett",
                    "Hunter Tyson",
                    "Zeke Nnaji",
                    "Trey Alexander",
                    "Vlatko Čančar",
                    "Aaron Gordon",
                    "PJ Hall",
                    "DaRon Holmes II",
                    "Nikola Jokić",
                    "Spencer Jones"
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