import type { League } from '../types'

interface LeagueSelectionProps {
  selectedLeague1: string
  selectedLeague2: string
  setSelectedLeague1: (league: string) => void
  setSelectedLeague2: (league: string) => void
  onGenerateMatch: () => void
  isGenerating: boolean
  leagues: League[]
}

export default function LeagueSelection({
  selectedLeague1,
  selectedLeague2,
  setSelectedLeague1,
  setSelectedLeague2,
  onGenerateMatch,
  isGenerating,
  leagues
}: LeagueSelectionProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/10">
      <h2 className="text-2xl font-light text-gray-200 mb-8 text-center">Select Teams</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Team 1 League Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-light text-gray-300 mb-2">
            Home Team League
          </label>
          <div className="flex items-center gap-3">
            {selectedLeague1 && (
              <img
                src={leagues.find(l => l.value === selectedLeague1)?.flag}
                alt="flag"
                className="w-8 h-6 object-cover rounded shadow-sm"
              />
            )}
            <select
              value={selectedLeague1}
              onChange={(e) => setSelectedLeague1(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all placeholder-gray-500"
            >
              <option value="" className="bg-gray-900 text-gray-300">Choose a league...</option>
              {leagues.map((league) => (
                <option key={league.value} value={league.value} className="bg-gray-900 text-gray-300">
                  {league.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Team 2 League Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-light text-gray-300 mb-2">
            Away Team League
          </label>
          <div className="flex items-center gap-3">
            {selectedLeague2 && (
              <img
                src={leagues.find(l => l.value === selectedLeague2)?.flag}
                alt="flag"
                className="w-8 h-6 object-cover rounded shadow-sm"
              />
            )}
            <select
              value={selectedLeague2}
              onChange={(e) => setSelectedLeague2(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all placeholder-gray-500"
            >
              <option value="" className="bg-gray-900 text-gray-300">Choose a league...</option>
              {leagues.map((league) => (
                <option key={league.value} value={league.value} className="bg-gray-900 text-gray-300">
                  {league.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center mt-10">
        <button
          onClick={onGenerateMatch}
          disabled={isGenerating || !selectedLeague1 || !selectedLeague2}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 disabled:from-gray-600/20 disabled:to-gray-700/20 disabled:cursor-not-allowed border border-white/10 hover:border-white/20 px-12 py-4 rounded-full font-light text-lg transition-all duration-300 text-gray-200"
        >
          {isGenerating ? (
            <span className="flex items-center gap-3 justify-center">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              Generating Match...
            </span>
          ) : (
            'Generate Match'
          )}
        </button>
      </div>
    </div>
  )
}