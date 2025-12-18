import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MovieCardProps {
  title: string
  episode: string
  year: number
  posterUrl: string
  sentiment: number
  sentimentLabel: string
}

export function MovieCard({ title, episode, year, posterUrl, sentiment, sentimentLabel }: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-4">{episode} • {year}</p>
          <Badge 
            variant={sentiment >= 70 ? "default" : sentiment >= 50 ? "secondary" : "destructive"}
            className="w-fit mb-4"
          >
            {sentiment}% {sentimentLabel}
          </Badge>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            onClick={() => {
              // TODO: Implement view opinions functionality
              console.log(`View opinions for ${title}`)
            }}
          >
            View Opinions
          </Button>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{episode} • {year}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <Badge 
            variant={sentiment >= 70 ? "default" : sentiment >= 50 ? "secondary" : "destructive"}
            className="w-fit"
          >
            {sentiment}% {sentimentLabel}
          </Badge>
          <Button variant="outline" size="sm">
            Rate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

