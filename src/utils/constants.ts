import { STAT_ID } from "./types"

// In milliseconds
const REFRESH_INTERVAL: number = 60*1000

// All Star Data:
// 2022 All Star GameID : 0032100001
const ALL_STAR_GAME_ID: string = '0022200788'

const TEAM_A_CAPTAIN: string = 'Peru Dayani'
const TEAM_A: string[] = [
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
]

const TEAM_B_CAPTAIN: string = 'Hayden Davila'
const TEAM_B: string[] = [
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

const FANTASY_STATS: {id: STAT_ID, label: string, invert?: boolean}[] = [
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