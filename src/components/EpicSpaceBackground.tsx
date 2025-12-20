import { cn } from "@/lib/utils"

interface EpicSpaceBackgroundProps {
  className?: string
}

export function EpicSpaceBackground({ className }: EpicSpaceBackgroundProps) {
  return (
    <div className={cn("fixed inset-0 overflow-hidden z-0", className)}>
      {/* Layer 1: Deep Space - Radial gradient background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_#0a0a1a_0%,_#1a0a2e_50%,_#000000_100%)] pointer-events-none will-change-transform" />

      {/* Layer 2: Static Stars - Low opacity star pattern */}
      <div
        className="fixed inset-0 opacity-15 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='30' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='160' cy='80' r='2' fill='%23ffffff'/%3E%3Ccircle cx='90' cy='150' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='180' cy='20' r='1.8' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='170' r='1.3' fill='%23ffffff'/%3E%3Ccircle cx='130' cy='10' r='1' fill='%23ffffff'/%3E%3Ccircle cx='10' cy='120' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='190' cy='140' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='40' r='1' fill='%23ffffff'/%3E%3Ccircle cx='120' cy='100' r='1.3' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='110' r='1.1' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Layer 3: Small Stars - Slow forward-moving animation */}
      <div
        className="fixed inset-0 pointer-events-none stars-slow"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='30' r='1' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='60' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='30' cy='80' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='20' r='1' fill='%23ffffff'/%3E%3Ccircle cx='90' cy='90' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='20' cy='50' r='1' fill='%23ffffff'/%3E%3Ccircle cx='60' cy='70' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='40' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='15' cy='75' r='0.8' fill='%23ffffff'/%3E%3Ccircle cx='85' cy='35' r='0.8' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          opacity: 0.2
        }}
      />

      {/* Layer 4: Large Stars - Fast forward-moving animation for parallax depth */}
      <div
        className="fixed inset-0 pointer-events-none stars-fast"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2.5' fill='%23ffffff'/%3E%3Ccircle cx='100' cy='50' r='3' fill='%23ffffff'/%3E%3Ccircle cx='60' cy='110' r='2.8' fill='%23ffffff'/%3E%3Ccircle cx='130' cy='80' r='2.9' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='140' r='2.5' fill='%23ffffff'/%3E%3Ccircle cx='75' cy='25' r='2' fill='%23ffffff'/%3E%3Ccircle cx='110' cy='120' r='2.3' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          opacity: 0.25
        }}
      />
    </div>
  )
}
