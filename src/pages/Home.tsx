import { MovieCard } from "@/components/MovieCard"
import { Logo } from "@/components/Logo"

const movies = [
  {
    title: "A New Hope",
    episode: "Episode IV",
    year: 1977,
    posterUrl: "https://image.tmdb.org/t/p/w600_and_h900_face/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    sentiment: 92,
    sentimentLabel: "Positive"
  },
  {
    title: "The Empire Strikes Back",
    episode: "Episode V",
    year: 1980,
    posterUrl: "https://www.themoviedb.org/t/p/w600_and_h900_face/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg",
    sentiment: 95,
    sentimentLabel: "Positive"
  },
  {
    title: "Return of the Jedi",
    episode: "Episode VI",
    year: 1983,
    posterUrl: "https://www.themoviedb.org/t/p/w600_and_h900_face/jQYlydvHm3kUix1f8prMucrplhm.jpg",
    sentiment: 88,
    sentimentLabel: "Positive"
  }
]

export function Home() {
  return (
    <>
      {/* Black gradient overlay */}
      <div 
        className="fixed top-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: '60vh',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)'
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-8 sm:p-12 lg:p-16">
            <div className="mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards] flex justify-center">
              <Logo size="xl" showTagline />
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 mt-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              The original trilogy united the fandom.
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
        </div>
      </section>

      {/* Movie Grid Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
            Explore the Original Trilogy
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
    </>
  )
}

