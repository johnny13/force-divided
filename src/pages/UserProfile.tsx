import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function UserProfile() {
  // Placeholder user data - in a real app, this would come from auth context or API
  const user = {
    name: "Jedi Master",
    email: "jedi@force-divided.com",
    joinDate: "2024-01-15",
    totalRatings: 12,
    favoriteFilm: "The Force Awakens"
  }

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
          User Profile
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since:</span>
                  <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total ratings:</span>
                  <span>{user.totalRatings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite film:</span>
                  <span>{user.favoriteFilm}</span>
                </div>
              </div>
              <Separator />
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Activity Card */}
          <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent ratings and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">The Force Awakens</h4>
                    <span className="text-sm text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Rated: <span className="font-semibold text-green-400">Positive</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    "A great return to the Star Wars universe!"
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">The Last Jedi</h4>
                    <span className="text-sm text-gray-400">5 days ago</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Rated: <span className="font-semibold text-yellow-400">Mixed</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    "Interesting direction, but divisive choices."
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">The Rise of Skywalker</h4>
                    <span className="text-sm text-gray-400">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Rated: <span className="font-semibold text-orange-400">Mixed</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    "A rushed conclusion to the trilogy."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

