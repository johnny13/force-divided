import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showTagline?: boolean
}

const sizeClasses = {
  sm: {
    text: "text-xl",
    icon: "text-2xl",
    gap: "gap-2",
    tagline: "text-xs bottom-[-1.25rem]"
  },
  md: {
    text: "text-2xl sm:text-3xl",
    icon: "text-3xl sm:text-4xl",
    gap: "gap-2 sm:gap-3",
    tagline: "text-xs sm:text-sm bottom-[-1.5rem]"
  },
  lg: {
    text: "text-3xl sm:text-4xl lg:text-5xl",
    icon: "text-4xl sm:text-5xl lg:text-6xl",
    gap: "gap-3 sm:gap-4",
    tagline: "text-sm sm:text-base bottom-[-2rem]"
  },
  xl: {
    text: "text-4xl sm:text-5xl lg:text-6xl",
    icon: "text-5xl sm:text-6xl lg:text-7xl",
    gap: "gap-4 sm:gap-5",
    tagline: "text-base sm:text-lg bottom-[-2.5rem]"
  }
}

export function Logo({ className, size = "md", showTagline = false }: LogoProps) {
  const sizes = sizeClasses[size]

  return (
    <div className={cn("flex items-center relative font-['Orbitron',sans-serif] tracking-[0.1em] uppercase", sizes.gap, className)}>
      {/* Force */}
      <div className={cn(
        sizes.text,
        "font-black leading-none transition-all duration-300",
        "text-[#ff3e3e]",
        "[text-shadow:0_0_10px_rgba(255,62,62,0.5),0_0_20px_rgba(255,62,62,0.3)]"
      )}>
        Force
      </div>
      
      {/* Icon Divider */}
      <div className="relative flex items-center justify-center">
        <span 
          className={cn(
            sizes.icon,
            "material-icons relative",
            "bg-gradient-to-r from-[#ff3e3e] from-50% to-[#3e94ff] to-50%",
            "bg-clip-text text-transparent",
            "[filter:drop-shadow(0_0_8px_white)]",
            "rotate-180"
          )}
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          bolt
        </span>
        <div 
          className={cn(
            "absolute left-1/2 top-[10%] bottom-[10%] w-0.5 bg-white",
            "[box-shadow:0_0_15px_2px_white]",
            "-translate-x-1/2 z-10",
            "animate-[flicker_0.15s_infinite]"
          )}
        />
      </div>

      {/* Divided */}
      <div className={cn(
        sizes.text,
        "font-black leading-none transition-all duration-300",
        "text-[#3e94ff]",
        "[text-shadow:0_0_10px_rgba(62,148,255,0.5),0_0_20px_rgba(62,148,255,0.3)]"
      )}>
        Divided
      </div>

      {/* Tagline */}
      {showTagline && (
        <div className={cn(
          "absolute left-0 right-0 text-center",
          sizes.tagline,
          "text-gray-500 tracking-[0.5em]"
        )}>
          BALANCE IS BROKEN
        </div>
      )}
    </div>
  )
}

