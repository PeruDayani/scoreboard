import { STAT_ID } from "./types"

// In milliseconds
const REFRESH_INTERVAL: number = 60*1000

// All Star Data:
// 2022 All Star GameID : 0032100001
// 2023 All Star GameID : 0032200001
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
        id: 'turnovers',
        label: `Tovs`,
        invert: true
    },
    {
        id: 'stealsBlocksTurnovers',
        label: `Hustle`,
        classes: 'font-bold'
    },
    {
        id: 'foulsTechnical',
        label: `Tech's`,
        classes: 'font-bold'
    },
]

const FANTASY_TEAM_STATS: {id: STAT_ID, label: string, invert?: boolean}[] = [
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

export { 
    TEAM_A, TEAM_A_CAPTAIN, 
    TEAM_B, TEAM_B_CAPTAIN, 
    ALL_STAR_GAME_ID, 
    FANTASY_PLAYER_STATS, FANTASY_TEAM_STATS, 
    REFRESH_INTERVAL
}