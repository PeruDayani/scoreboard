// 2022 All Star GameID : 0032100001

const REFRESH_INTERVAL: number = 10000
const ALL_STAR_GAME_ID: string = '0032100001'

const TEAM_A_CAPTAIN: string = 'Peru Dayani'
const TEAM_A: string[] = [
    'LeBron James',
    'Ja Morant',
    'Nikola Jokic',
    'Andrew Wiggins',
    'Devin Booker',
    'Karl-Anthony Towns',
    'Khris Middleton',
    'Darius Garland',
    'Chris Paul',
    'Dejounte Murray',
    'Giannis Antetokounmpo',
]

const TEAM_B_CAPTAIN: string = 'Hayden Davila'
const TEAM_B: string[] = [
    'DeMar DeRozan',
    'Stephen Curry',
    'Jimmy Butler',
    'Fred VanVleet',
    'Jarrett Allen',
    'Luka Doncic',
    'Jayson Tatum',
    'Joel Embiid',
    'Trae Young',
    'Zach LaVine',
    'Rudy Gobert',
    'LaMelo Ball',
]

const FANTASY_STATS_2022: {id: string, label: string, invert?: boolean}[] = [
    {
        id: 'points',
        label: 'Points'
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
        id: 'threePointersMade',
        label: `Trey's`
    },
    {
        id: 'stealsBlocks',
        label: `Hustle`
    },
]

const FANTASY_STATS: {id: string, label: string, invert?: boolean}[] = [
    {
        id: 'points',
        label: 'Points'
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
        id: 'threePointersMade',
        label: `Trey's`
    },
    {
        id: 'stealsBlocks',
        label: `Hustle (STL+BLK)`
    },
    {
        id: '',
        label: `More Options`
    },
    {
        id: 'reboundsWeighted',
        label: 'Rebounds Weighted'
    },
    {
        id: 'threePointersAttempted',
        label: `Trey's Attempted`
    },
    {
        id: 'blocks',
        label: `Blocks`
    },
    {
        id: 'blocksReceived',
        label: `Blocks Recieved`,
        invert: true
    },
    {
        id: 'steals',
        label: `Steals`
    },
    {
        id: 'turnovers',
        label: `Turnovers`,
        invert: true
    },
    {
        id: 'stealsBlocksTurnoversBlocksRecieved',
        label: `Hustle (STL+BK-BKR-TO)`
    },
]

export {TEAM_A, TEAM_A_CAPTAIN, TEAM_B, TEAM_B_CAPTAIN, ALL_STAR_GAME_ID, FANTASY_STATS, FANTASY_STATS_2022, REFRESH_INTERVAL}