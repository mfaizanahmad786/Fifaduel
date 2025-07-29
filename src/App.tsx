
import { useEffect, useState } from 'react'
import './App.css'
import { Header, LeagueSelection, MatchDisplay, Footer } from './components'
import { leagues } from './data/mockData'
import type { Team } from './types'
import { footballApi } from './services/footballApi'

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000

interface CachedTeamsData {
  teams: { [key: string]: Team[] }
  timestamp: number
}

function App() {
  const [selectedLeague1, setSelectedLeague1] = useState('')
  const [selectedLeague2, setSelectedLeague2] = useState('')
  const [availableTeams, setAvailableTeams] = useState<{ [key: string]: Team[] }>({})
  const [team1, setTeam1] = useState<Team | null>(null)
  const [team2, setTeam2] = useState<Team | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Load teams from localStorage on component mount
  useEffect(() => {
    try {
      const cachedData = localStorage.getItem('fifa-teams-cache')
      if (cachedData) {
        const parsedData: CachedTeamsData = JSON.parse(cachedData)
        const now = Date.now()
        
        // Check if cache is still valid (not expired)
        if (now - parsedData.timestamp < CACHE_EXPIRATION) {
          setAvailableTeams(parsedData.teams)
          console.log('✅ Loaded teams from localStorage:', Object.keys(parsedData.teams))
        } else {
          console.log('🕒 Cache expired, clearing old data')
          localStorage.removeItem('fifa-teams-cache')
        }
      }
    } catch (error) {
      console.error('Error loading teams from localStorage:', error)
      localStorage.removeItem('fifa-teams-cache') // Clear corrupted cache
    }
  }, [])

  // Save teams to localStorage whenever availableTeams changes
  useEffect(() => {
    if (Object.keys(availableTeams).length > 0) {
      try {
        const cacheData: CachedTeamsData = {
          teams: availableTeams,
          timestamp: Date.now()
        }
        localStorage.setItem('fifa-teams-cache', JSON.stringify(cacheData))
        console.log('💾 Saved teams to localStorage with timestamp')
      } catch (error) {
        console.error('Error saving teams to localStorage:', error)
      }
    }
  }, [availableTeams])

  // Optional: Clear cache function (can be called from console for debugging)
  const clearTeamsCache = () => {
    localStorage.removeItem('fifa-teams-cache')
    setAvailableTeams({})
    console.log('🗑️ Teams cache cleared')
  }

  // Make clearTeamsCache available globally for debugging
  useEffect(() => {
    (window as any).clearTeamsCache = clearTeamsCache
    return () => {
      delete (window as any).clearTeamsCache
    }
  }, [])

  const fetchTeamsIfNeeded = async (leagueKey: string) => {
    if(availableTeams[leagueKey] && availableTeams[leagueKey].length > 0){
      console.log(`✅ Using cached teams for ${leagueKey}`)
      return
    }else{
      console.log(`🔄 Fetching teams for ${leagueKey} (API call)`)

      try {
      const teams = await footballApi.getTeamsByLeague(leagueKey)
      console.log(`✅ Teams fetched for ${leagueKey}:`, teams.length)
      
      // Cache the teams in state (will auto-save to localStorage via useEffect)
      setAvailableTeams(prev => ({ 
        ...prev, 
        [leagueKey]: teams 
      }))
    } catch (error) {
      console.error(`❌ Error fetching teams for ${leagueKey}:`, error)
    }
  }
}

  useEffect(() => {
    
    if(selectedLeague1){
      fetchTeamsIfNeeded(selectedLeague1)
    }
    
  },[selectedLeague1])

  useEffect(() => {
    
    if(selectedLeague2){
      fetchTeamsIfNeeded(selectedLeague2)
    }
  },[selectedLeague2])

  const generateRandomMatch = async () => {
    if (!selectedLeague1 || !selectedLeague2) {
      alert('Please select leagues for both teams!')
      return
    } 

    const teams1: Team[] = availableTeams[selectedLeague1] || []
    const teams2: Team[] = availableTeams[selectedLeague2] || []
    
    setIsGenerating(true)
    
    const randomTeam1 = teams1[Math.floor(Math.random() * teams1.length)]
    const randomTeam2 = teams2[Math.floor(Math.random() * teams2.length)]
    
    setTeam1(randomTeam1)
    setTeam2(randomTeam2)

    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <Header />

      <div className="container mx-auto px-4 pb-12">
        <LeagueSelection
          selectedLeague1={selectedLeague1}
          selectedLeague2={selectedLeague2}
          setSelectedLeague1={setSelectedLeague1}
          setSelectedLeague2={setSelectedLeague2}
          onGenerateMatch={generateRandomMatch}
          isGenerating={isGenerating}
          leagues={leagues}
        />

        {(team1 && team2) && (
          <MatchDisplay
            team1={team1}
            team2={team2}
          />
        )}

        <Footer />
      </div>
    </div>
  )
}

export default App
