import type { Team } from '../types'

interface TeamCardProps {
  team: Team
  side: 'left' | 'right'
}

export default function TeamCard({ team, side }: TeamCardProps) {
  const gradientClass = side === 'left' 
    ? 'bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30'
    : 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30'

  return (
    <div className={`team-card ${gradientClass} rounded-xl p-6 text-center border`}>
      <div className="flex justify-center mb-4">
        <img 
          src={team.logo} 
          alt={`${team.name} logo`}
          className="w-16 h-16 object-contain rounded-lg bg-white/10 p-2"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden text-6xl">⚽</div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
      <div className="space-y-1 text-gray-300">
        <p className="text-sm">🏆 {team.league}</p>
        <p className="text-sm">🌍 {team.country}</p>
        <p className="text-sm">📅 Founded {team.founded}</p>
      </div>
    </div>
  )
}