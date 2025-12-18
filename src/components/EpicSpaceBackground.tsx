import { cn } from "@/lib/utils"

interface EpicSpaceBackgroundProps {
  className?: string
}

export function EpicSpaceBackground({ className }: EpicSpaceBackgroundProps) {
  return (
    <div className={cn("fixed inset-0 overflow-hidden -z-10", className)}>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0a1a] via-[#000000] to-[#000000] pointer-events-none will-change-transform" />

      <div
        className="fixed inset-0 opacity-30 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='1' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='20' cy='30' r='0.8' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='160' cy='80' r='1' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='90' cy='150' r='0.6' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='180' cy='20' r='0.9' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='50' cy='170' r='0.7' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='130' cy='10' r='0.5' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='10' cy='120' r='0.8' fill='%23ffffff' filter='url(%23glow)'/%3E%3Ccircle cx='190' cy='140' r='0.6' fill='%23ffffff' filter='url(%23glow)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <div
        className="fixed inset-0 opacity-40 pointer-events-none will-change-transform animate-[stars-slow_120s_linear_infinite]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.5' fill='%23ffffff'/%3E%3Ccircle cx='50' cy='30' r='0.4' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='60' r='0.6' fill='%23ffffff'/%3E%3Ccircle cx='30' cy='80' r='0.5' fill='%23ffffff'/%3E%3Ccircle cx='70' cy='20' r='0.4' fill='%23ffffff'/%3E%3Ccircle cx='90' cy='90' r='0.5' fill='%23ffffff'/%3E%3Ccircle cx='20' cy='50' r='0.4' fill='%23ffffff'/%3E%3Ccircle cx='60' cy='70' r='0.6' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='40' r='0.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div
        className="fixed inset-0 opacity-60 pointer-events-none will-change-transform animate-[stars-fast_40s_linear_infinite]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.2' fill='%23ffffff'/%3E%3Ccircle cx='100' cy='50' r='1.5' fill='%23ffffff'/%3E%3Ccircle cx='60' cy='110' r='1.3' fill='%23ffffff'/%3E%3Ccircle cx='130' cy='80' r='1.4' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='140' r='1.2' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none will-change-transform" />
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none will-change-transform" />
    </div>
  )
}
