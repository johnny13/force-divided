import { useSequelTrilogyCharacters, useSequelTrilogyStarships } from "@/lib/swapi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Explore() {
  const { data: characters, isLoading: charactersLoading, error: charactersError } = useSequelTrilogyCharacters()
  const { data: starships, isLoading: starshipsLoading, error: starshipsError } = useSequelTrilogyStarships()

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
          Explore Characters & Starships
        </h2>

        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="starships">Starships</TabsTrigger>
          </TabsList>

          <TabsContent value="characters">
            {charactersLoading && (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading characters...</p>
              </div>
            )}
            {charactersError && (
              <div className="text-center py-12">
                <p className="text-red-400">Error loading characters: {charactersError.message}</p>
                {charactersError instanceof Error && charactersError.stack && (
                  <pre className="text-xs text-red-300 mt-2 text-left max-w-2xl mx-auto">
                    {charactersError.stack}
                  </pre>
                )}
              </div>
            )}
            {characters && characters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No characters found.</p>
              </div>
            )}
            {characters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character) => (
                  <Card
                    key={character.url}
                    className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{character.name}</CardTitle>
                      <CardDescription>
                        {character.gender !== "n/a" && character.gender !== "none" && (
                          <span className="capitalize">{character.gender}</span>
                        )}
                        {character.birth_year !== "unknown" && (
                          <span> • Born: {character.birth_year}</span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {character.height !== "unknown" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Height:</span>
                            <span>{character.height} cm</span>
                          </div>
                        )}
                        {character.mass !== "unknown" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Mass:</span>
                            <span>{character.mass} kg</span>
                          </div>
                        )}
                        {character.hair_color !== "n/a" && character.hair_color !== "none" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Hair:</span>
                            <Badge variant="secondary" className="capitalize">
                              {character.hair_color}
                            </Badge>
                          </div>
                        )}
                        {character.eye_color !== "unknown" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Eyes:</span>
                            <Badge variant="secondary" className="capitalize">
                              {character.eye_color}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="starships">
            {starshipsLoading && (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading starships...</p>
              </div>
            )}
            {starshipsError && (
              <div className="text-center py-12">
                <p className="text-red-400">Error loading starships: {starshipsError.message}</p>
                {starshipsError instanceof Error && starshipsError.stack && (
                  <pre className="text-xs text-red-300 mt-2 text-left max-w-2xl mx-auto">
                    {starshipsError.stack}
                  </pre>
                )}
              </div>
            )}
            {starships && starships.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No starships found.</p>
              </div>
            )}
            {starships && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {starships.map((starship) => (
                  <Card
                    key={starship.url}
                    className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl">{starship.name}</CardTitle>
                      <CardDescription>{starship.model}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Manufacturer:</span>
                          <span>{starship.manufacturer}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Class:</span>
                          <Badge variant="secondary">{starship.starship_class}</Badge>
                        </div>
                        {starship.cost_in_credits !== "unknown" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Cost:</span>
                            <span>{parseInt(starship.cost_in_credits).toLocaleString()} credits</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Crew:</span>
                          <span>{starship.crew}</span>
                        </div>
                        {starship.passengers !== "unknown" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Passengers:</span>
                            <span>{starship.passengers}</span>
                          </div>
                        )}
                        {starship.length !== "unknown" && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Length:</span>
                            <span>{starship.length} m</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

