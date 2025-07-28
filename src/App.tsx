
import { useEffect, useState } from 'react'
import './App.css'
import { Header, LeagueSelection, MatchDisplay, Footer } from './components'
import { leagues } from './data/mockData'
import type { Team } from './types'
import { footballApi } from './services/footballApi'

function App() {
  const [selectedLeague1, setSelectedLeague1] = useState('')
  const [selectedLeague2, setSelectedLeague2] = useState('')
  const [availableTeams, setAvailableTeams] = useState<{ [key: string]: Team[] }>({})
  const [team1, setTeam1] = useState<Team | null>(null)
  const [team2, setTeam2] = useState<Team | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchTeamsIfNeeded = async (leagueKey: string) => {
    if(availableTeams[leagueKey] && availableTeams[leagueKey].length > 0){
      console.log("Using Cache")
      return
    }else{
      console.log("Fetching teams")

      try {
      const teams = await footballApi.getTeamsByLeague(leagueKey)
      console.log(`✅ Teams fetched for ${leagueKey}:`, teams.length)
      
      // Cache the teams
      setAvailableTeams(prev => ({ 
        ...prev, 
        [leagueKey]: teams 
      }))
    } catch (error) {
      console.error(` Error fetching teams for ${leagueKey}:`, error)
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
