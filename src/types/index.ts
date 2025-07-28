export interface Team {
  id: number
  name: string
  league: string
  logo: string
  country: string
  founded: number
}

export interface League {
  value: string
  label: string
  flag: string
}

export interface MockTeams {
  [key: string]: Team[]
}

export interface TeamStats {
  rating: number
  attacking: number
  defensive: number
  winPercentage: number
}
