import { MovieCard } from "@/components/MovieCard"
import { Header } from "@/components/Header"
import { Logo } from "@/components/Logo"

const movies = [
  {
    title: "The Force Awakens",
    episode: "Episode VII",
    year: 2015,
    posterUrl: "https://image.tmdb.org/t/p/w500/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg",
    sentiment: 78,
    sentimentLabel: "Positive"
  },
  {
    title: "The Last Jedi",
    episode: "Episode VIII",
    year: 2017,
    posterUrl: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    sentiment: 45,
    sentimentLabel: "Positive"
  },
  {
    title: "The Rise of Skywalker",
    episode: "Episode IX",
    year: 2019,
    posterUrl: "https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
    sentiment: 52,
    sentimentLabel: "Positive"
  }
]

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 w-full relative overflow-x-hidden">
      {/* Starry background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImEiIGN4PSI1MCUiIGN5PSI1MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTEwMCAxMDBIMTAwdjEwMEgxMDB6IiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20 pointer-events-none" />
      
      {/* Subtle lightsaber glow effect */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent pointer-events-none" />

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards] flex justify-center">
              <Logo size="xl" showTagline />
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              The sequel trilogy split the fandom.
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
              Share your takes. See where you stand.
            </p>
            
            {/* Lightsaber separator */}
            <div className="flex items-center justify-center gap-4 my-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-500" />
              <div className="h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />
              <div className="h-1 w-1 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
            </div>
          </div>
        </section>

        {/* Movie Grid Section */}
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
              Explore the Sequel Trilogy
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {movies.map((movie, index) => (
                <div
                  key={movie.title}
                  className="opacity-0"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`
                  }}
                >
                  <MovieCard {...movie} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-sm text-gray-500 mb-2">
            © {new Date().getFullYear()} Force Divided. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 italic">
            May the Force be with you.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
