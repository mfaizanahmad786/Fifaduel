import type {Team} from '../types'

// API Configuration

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY

const BASE_URL = import.meta.env.VITE_FOOTBALL_API_BASE_URL

const headers = {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": API_KEY,
	}

const LEAGUE_IDS ={
    'premier-league' : 39,
    'la-liga' : 140,
    'serie-a' : 71,
    'major-league-soccer' : 253,
    'bundesliga' : 78
}

interface APITeam {
    id:number,
    name:string,
    code:string,
    country:string,
    founded:number,
    national:boolean,
    logo:string
}

interface APITeamData {
    team: APITeam
    venue:APIVenue
}

interface APIVenue{
    id: number
    name: string
    address: string
    city: string
    capacity: number
    surface: string
    image: string
}

interface TeamResponse {
    get: string,
    parameters : {
        league: string
        season: string
    }
    errors: any[]
    results: number
    paging: {
        current:number
        total:number
    }
    response: APITeamData[]
}

interface HeadtoHeadTeam {
    id: number;
    name: string;
    winner: boolean | null;
}

interface Fixture {
    fixture: {
        id: number;
        date: string;
        status: {
            long: string;
            short: string;
            elapsed: number | null;
        };
    };
    league: {
        id: number;
        name: string;
        country: string;
        season: number;
        round: string;
    };
    teams: {
        home: HeadtoHeadTeam;
        away: HeadtoHeadTeam;
    };
    goals: {
        home: number | null;
        away: number | null;
    };
    score: {
        halftime: {
            home: number | null;
            away: number | null;
        };
        fulltime: {
            home: number | null;
            away: number | null;
        };
        extratime: {
            home: number | null;
            away: number | null;
        };
        penalty: {
            home: number | null;
            away: number | null;
        };
    };
}

// New interfaces for team statistics
interface TeamStatsResponse {
    get: string;
    parameters: {
        league: string;
        season: string;
        team: string;
    };
    errors: any[];
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: {
        league: {
            id: number;
            name: string;
            country: string;
            logo: string;
            flag: string;
            season: number;
        };
        team: {
            id: number;
            name: string;
            logo: string;
        };
        form: string;
        fixtures: {
            played: { home: number; away: number; total: number };
            wins: { home: number; away: number; total: number };
            draws: { home: number; away: number; total: number };
            loses: { home: number; away: number; total: number };
        };
        goals: {
            for: {
                total: { home: number; away: number; total: number };
                average: { home: string; away: string; total: string };
            };
            against: {
                total: { home: number; away: number; total: number };
                average: { home: string; away: string; total: string };
            };
        };
        clean_sheet: { home: number; away: number; total: number };
        failed_to_score: { home: number; away: number; total: number };
        penalty: {
            scored: { total: number; percentage: string };
            missed: { total: number; percentage: string };
            total: number;
        };
        cards: {
            yellow: any;
            red: any;
        };
    };
}

interface TeamStats {
    rating: number;
    attacking: number;
    defensive: number;
    winPercentage: number;
}

// Function to calculate team statistics
export function calculateTeamStats(statsData: TeamStatsResponse['response']): TeamStats {
    const { fixtures, goals, clean_sheet, failed_to_score, penalty } = statsData;
    
    // Calculate win percentage
    const winPercentage = (fixtures.wins.total / fixtures.played.total) * 100;
    
    // Calculate goal difference per game
    const goalDifference = goals.for.total.total - goals.against.total.total;
    const goalDifferencePerGame = goalDifference / fixtures.played.total;
    
    // Calculate goals per game ratios
    const goalsForPerGame = goals.for.total.total / fixtures.played.total;
    const goalsAgainstPerGame = goals.against.total.total / fixtures.played.total;
    
    // Calculate clean sheet percentage
    const cleanSheetPercentage = (clean_sheet.total / fixtures.played.total) * 100;
    
    // Calculate scoring consistency (opposite of failed to score)
    const scoringConsistency = ((fixtures.played.total - failed_to_score.total) / fixtures.played.total) * 100;
    
    // Calculate penalty efficiency
    const penaltyEfficiency = penalty.total > 0 ? (penalty.scored.total / penalty.total) * 100 : 100;
    
    // OVERALL RATING (0-100)
    // Based on win percentage, goal difference, and overall performance
    const rating = Math.min(100, Math.max(0, 
        (winPercentage * 0.4) + 
        (Math.min(100, (goalDifferencePerGame + 2) * 25) * 0.3) + 
        (Math.min(100, goalsForPerGame * 20) * 0.2) + 
        (cleanSheetPercentage * 0.1)
    ));
    
    // ATTACKING POTENTIAL (0-100)
    // Based on goals scored, scoring consistency, and penalty efficiency
    const attacking = Math.min(100, Math.max(0,
        (Math.min(100, goalsForPerGame * 25) * 0.5) +
        (scoringConsistency * 0.3) +
        (penaltyEfficiency * 0.2)
    ));
    
    // DEFENSIVE POTENTIAL (0-100) 
    // Based on goals conceded (inverted), clean sheets, and defensive stability
    const defensiveGoalsConceded = Math.max(0, 100 - (goalsAgainstPerGame * 30));
    const defensive = Math.min(100, Math.max(0,
        (defensiveGoalsConceded * 0.6) +
        (cleanSheetPercentage * 0.4)
    ));
    
    return {
        rating: Math.round(rating),
        attacking: Math.round(attacking),
        defensive: Math.round(defensive),
        winPercentage: Math.round(winPercentage)
    };
}

// Function to get team statistics from API
export async function getTeamStatistics(teamId: number, leagueId: number, season: number): Promise<TeamStats | null> {
    try {
        const response = await fetch(
            `${BASE_URL}/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`,
            {
               headers
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: TeamStatsResponse = await response.json();
        
        if (data.results > 0 && data.response) {
            return calculateTeamStats(data.response);
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching team statistics:', error);
        return null;
    }
}


export const footballApi = {
    async getTeamsByLeague(leagueKey: string): Promise<Team[]>{
        try{
            const leagueID = LEAGUE_IDS[leagueKey as keyof typeof LEAGUE_IDS]

            const response = await fetch(`${BASE_URL}/teams?league=${leagueID}&season=${2023}`,{
                headers
            })

            const data: TeamResponse = await response.json()

            return data.response.map(item => ({
                id: item.team.id,
                name: item.team.name,
                league: leagueKey,
                logo: item.team.logo,
                country: item.team.country,
                founded: item.team.founded
            }))

        }catch(error){
            console.log(error)
            return []
        }
    },

    async getHeadToHead(team1Id: number, team2Id: number): Promise<number[]>{
        try{
            let team1Wins = 0;
            let team2Wins = 0;

            console.log(`Fetching head-to-head for teams ${team1Id} vs ${team2Id}`)

            const response = await fetch(`${BASE_URL}/fixtures/headtohead?h2h=${team1Id}-${team2Id}&from=2019-01-01&to=2023-12-01`, {
                headers
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log('Head-to-head response:', data)

            const fixtures = data.response

            fixtures.forEach((fixture: Fixture) => {
                if (fixture.teams.home.id === team1Id && fixture.teams.home.winner) {
                    team1Wins++;
                } else if (fixture.teams.away.id === team1Id && fixture.teams.away.winner) {
                    team1Wins++;
                } else if (fixture.teams.home.id === team2Id && fixture.teams.home.winner) {
                    team2Wins++;
                } else if (fixture.teams.away.id === team2Id && fixture.teams.away.winner) {
                    team2Wins++;
                }
            });

            console.log(`Head-to-head results: Team ${team1Id}: ${team1Wins} wins, Team ${team2Id}: ${team2Wins} wins`)
            return [team1Wins, team2Wins]
        } catch(error) {
            console.error('Error fetching head-to-head data:', error)
            return [0, 0];
        }
    }
}