import { useEffect, useState } from 'react'
import type { Team, TeamStats } from '../types'
import { footballApi, getTeamStatistics } from '../services/footballApi'

interface MatchDisplayProps {
  team1: Team
  team2: Team
  onReset: () => void
}

export default function MatchDisplay({ team1, team2, onReset }: MatchDisplayProps) {
  const [headToHeadData, setHeadToHeadData] = useState<[number, number]>([0, 0])
  const [isLoadingH2H, setIsLoadingH2H] = useState(false)
  const [team1Stats, setTeam1Stats] = useState<TeamStats | null>(null)
  const [team2Stats, setTeam2Stats] = useState<TeamStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  useEffect(() => {
    const fetchHeadToHead = async () => {
      setIsLoadingH2H(true)
      try {
        const data = await footballApi.getHeadToHead(team1.id, team2.id)
        setHeadToHeadData(data as [number, number])
        console.log('Head-to-head data:', data)
      } catch (error) {
        console.error('Error fetching head-to-head:', error)
        setHeadToHeadData([0, 0]) // Fallback to 0-0
      } finally {
        setIsLoadingH2H(false)
      }
    }

    fetchHeadToHead()
  }, [team1.id, team2.id])

  useEffect(() => {
    const fetchTeamStatistics = async () => {
      setIsLoadingStats(true)
      try {
        // Using Premier League (id: 39) and season 2023 for both teams
        // You can modify these values based on the selected league
        const [stats1, stats2] = await Promise.all([
          getTeamStatistics(team1.id, 39, 2023),
          getTeamStatistics(team2.id, 39, 2023)
        ])
        
        setTeam1Stats(stats1)
        setTeam2Stats(stats2)
        console.log('Team statistics:', { team1: stats1, team2: stats2 })
      } catch (error) {
        console.error('Error fetching team statistics:', error)
        // Fallback to null if API fails
        setTeam1Stats(null)
        setTeam2Stats(null)
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchTeamStatistics()
  }, [team1.id, team2.id])

  // Fallback stats if API data is not available
  const displayStats = {
    team1: team1Stats || {
      rating: Math.floor(Math.random() * 30) + 60,
      attacking: Math.floor(Math.random() * 30) + 60,
      defensive: Math.floor(Math.random() * 30) + 60,
      winPercentage: Math.floor(Math.random() * 40) + 40
    },
    team2: team2Stats || {
      rating: Math.floor(Math.random() * 30) + 60,
      attacking: Math.floor(Math.random() * 30) + 60,
      defensive: Math.floor(Math.random() * 30) + 60,
      winPercentage: Math.floor(Math.random() * 40) + 40
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
      {/* Match Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light text-gray-200 mb-2">Match Preview</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
      </div>

      {/* Main Match Display */}
      <div className="grid grid-cols-3 gap-8 items-center mb-8">
        {/* Team 1 */}
        <div className="text-center">
          <div className="mb-4">
            <img 
              src={team1.logo} 
              alt={`${team1.name} logo`}
              className="w-20 h-20 object-contain mx-auto mb-3 rounded-xl bg-white/5 p-3"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden text-4xl">⚽</div>
            {/* Rating display */}
            <div className="text-2xl font-bold text-blue-400 mb-2">{displayStats.team1.rating}</div>
          </div>
          <h3 className="text-xl font-medium text-gray-100 mb-1">{team1.name}</h3>
          <p className="text-sm text-gray-400">{team1.country}</p>
        </div>

        {/* Head to Head Score */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {isLoadingH2H ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-400">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-4xl font-light text-gray-200">{headToHeadData[0]}</div>
                <div className="text-2xl font-thin text-gray-500">-</div>
                <div className="text-4xl font-light text-gray-200">{headToHeadData[1]}</div>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Head to Head</div>
          <div className="text-xs text-gray-600 mt-1">Historical matches</div>
        </div>

        {/* Team 2 */}
        <div className="text-center">
          <div className="mb-4">
            <img 
              src={team2.logo} 
              alt={`${team2.name} logo`}
              className="w-20 h-20 object-contain mx-auto mb-3 rounded-xl bg-white/5 p-3"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden text-4xl">⚽</div>
            {/* Rating display */}
            <div className="text-2xl font-bold text-green-400 mb-2">{displayStats.team2.rating}</div>
          </div>
          <h3 className="text-xl font-medium text-gray-100 mb-1">{team2.name}</h3>
          <p className="text-sm text-gray-400">{team2.country}</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="space-y-6 mb-8">
        {isLoadingStats ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-400">Loading statistics...</p>
          </div>
        ) : (
          <>
            {/* WIN% (Win Percentage) */}
            <div className="flex items-center py-2">
              <div className="w-14 sm:w-16 text-right text-sm text-gray-300 mr-2 sm:mr-3">{displayStats.team1.winPercentage}%</div>
              <div className="flex-1 flex items-center">
                <div className="w-full bg-gray-800/50 rounded-full h-4 sm:h-5 mx-2 sm:mx-3">
                  <div className="flex h-full rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500/70 transition-all duration-1000"
                      style={{ width: `${(displayStats.team1.winPercentage / (displayStats.team1.winPercentage + displayStats.team2.winPercentage)) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500/70 transition-all duration-1000"
                      style={{ width: `${(displayStats.team2.winPercentage / (displayStats.team1.winPercentage + displayStats.team2.winPercentage)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide w-10 sm:w-12 text-center">WIN%</div>
              </div>
              <div className="w-14 sm:w-16 text-left text-sm text-gray-300 ml-2 sm:ml-3">{displayStats.team2.winPercentage}%</div>
            </div>

            {/* ATT (Attack) */}
            <div className="flex items-center py-2">
              <div className="w-14 sm:w-16 text-right text-sm text-gray-300 mr-2 sm:mr-3">{displayStats.team1.attacking}%</div>
              <div className="flex-1 flex items-center">
                <div className="w-full bg-gray-800/50 rounded-full h-4 sm:h-5 mx-2 sm:mx-3">
                  <div className="flex h-full rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500/70 transition-all duration-1000"
                      style={{ width: `${(displayStats.team1.attacking / (displayStats.team1.attacking + displayStats.team2.attacking)) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500/70 transition-all duration-1000"
                      style={{ width: `${(displayStats.team2.attacking / (displayStats.team1.attacking + displayStats.team2.attacking)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide w-10 sm:w-12 text-center">ATT</div>
              </div>
              <div className="w-14 sm:w-16 text-left text-sm text-gray-300 ml-2 sm:ml-3">{displayStats.team2.attacking}%</div>
            </div>

            {/* DEF (Defense) */}
            <div className="flex items-center py-2">
              <div className="w-14 sm:w-16 text-right text-sm text-gray-300 mr-2 sm:mr-3">{displayStats.team1.defensive}%</div>
              <div className="flex-1 flex items-center">
                <div className="w-full bg-gray-800/50 rounded-full h-4 sm:h-5 mx-2 sm:mx-3">
                  <div className="flex h-full rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500/70 transition-all duration-1000"
                      style={{ width: `${(displayStats.team1.defensive / (displayStats.team1.defensive + displayStats.team2.defensive)) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-green-500/70 transition-all duration-1000"
                      style={{ width: `${(displayStats.team2.defensive / (displayStats.team1.defensive + displayStats.team2.defensive)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide w-10 sm:w-12 text-center">DEF</div>
              </div>
              <div className="w-14 sm:w-16 text-left text-sm text-gray-300 ml-2 sm:ml-3">{displayStats.team2.defensive}%</div>
            </div>
          </>
        )}
      </div>

      {/* Reset Button */}
     
    </div>
  )
}
