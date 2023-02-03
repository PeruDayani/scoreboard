import { STAT_ID } from "./types"

// In milliseconds
const REFRESH_INTERVAL: number = 60*1000

// All Star Data:
// 2022 All Star GameID : 0032100001
const ALL_STAR_GAME_ID: string = '0022200787'

const TEAM_A_CAPTAIN: string = 'Peru Dayani'
const TEAM_A: string[] = [
    "Damian Lillard",
    "Kyle Kuzma",
    "Anfernee Simons",
    "Kendrick Nunn",
    "Daniel Gafford",
    "Will Barton",
    "Shaedon Sharpe",
    "Taj Gibson",
    "Nassir Little",
    "Jabari Walker",
    "Jordan Goodwin",
    "Corey Kispert",
    "Johnny Davis",
]

const TEAM_B_CAPTAIN: string = 'Hayden Davila'
const TEAM_B: string[] = [
    "Bradley Beal",
    "Kristaps Porzingis",
    "Josh Hart",
    "Drew Eubanks",
    "Monte Morris",
    "Gary Payton II",
    "Delon Wright",
    "Deni Avdija",
    "Keon Johnson",
    "Isaiah Todd",
    "Greg Brown III",
    "Vernon Carey Jr.",
    "John Butler Jr.",
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