import type { League, MockTeams } from '../types'

// Remove all the API-related code
export const mockTeams: MockTeams = {
  'premier-league': [
    { id: 1, name: 'Manchester United', league: 'Premier League', logo: '🔴', country: 'England', founded: 1878 },
    { id: 2, name: 'Arsenal', league: 'Premier League', logo: '⚪', country: 'England', founded: 1886 },
    { id: 3, name: 'Chelsea', league: 'Premier League', logo: '🔵', country: 'England', founded: 1905 },
    { id: 4, name: 'Liverpool', league: 'Premier League', logo: '🔴', country: 'England', founded: 1892 },
  ],
  'la-liga': [
    { id: 5, name: 'Real Madrid', league: 'La Liga', logo: '⚪', country: 'Spain', founded: 1902 },
    { id: 6, name: 'Barcelona', league: 'La Liga', logo: '🔴', country: 'Spain', founded: 1899 },
    { id: 7, name: 'Atletico Madrid', league: 'La Liga', logo: '🔴', country: 'Spain', founded: 1903 },
    { id: 8, name: 'Valencia', league: 'La Liga', logo: '🟠', country: 'Spain', founded: 1919 },
  ],
  'serie-a': [
    { id: 9, name: 'Juventus', league: 'Serie A', logo: '⚫', country: 'Italy', founded: 1897 },
    { id: 10, name: 'AC Milan', league: 'Serie A', logo: '🔴', country: 'Italy', founded: 1899 },
    { id: 11, name: 'Inter Milan', league: 'Serie A', logo: '🔵', country: 'Italy', founded: 1908 },
    { id: 12, name: 'AS Roma', league: 'Serie A', logo: '🟡', country: 'Italy', founded: 1927 },
  ],
  'bundesliga': [
    { id: 13, name: 'Bayern Munich', league: 'Bundesliga', logo: '🔴', country: 'Germany', founded: 1900 },
    { id: 14, name: 'Borussia Dortmund', league: 'Bundesliga', logo: '🟡', country: 'Germany', founded: 1909 },
    { id: 15, name: 'RB Leipzig', league: 'Bundesliga', logo: '🔴', country: 'Germany', founded: 2009 },
    { id: 16, name: 'Bayer Leverkusen', league: 'Bundesliga', logo: '🔴', country: 'Germany', founded: 1904 },
  ]
}

export const leagues: League[] = [
  { value: 'premier-league', label: 'Premier League', flag: '/flags/england.svg' },
  { value: 'la-liga', label: 'La Liga', flag: '/flags/spain.svg' },
  { value: 'serie-a', label: 'Serie A', flag: '/flags/italy.svg' },
  { value: 'bundesliga', label: 'Bundesliga', flag: '/flags/germany.svg' },
  { value: 'major-league-soccer', label: 'Major League Soccer', flag: '/flags/usa.svg'}]