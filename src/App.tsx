import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/Header"
import { EpicSpaceBackground } from "@/components/EpicSpaceBackground"
import { Home } from "@/pages/Home"
import { Explore } from "@/pages/Explore"
import { UserProfile } from "@/pages/UserProfile"
import { Login } from "@/pages/Login"

function App() {
  return (
    <div className="min-h-screen text-gray-100 w-full relative overflow-x-hidden">
      <EpicSpaceBackground />

      <Header />

      <main className="relative z-10 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
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
