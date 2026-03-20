"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
    className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className={cn("w-16 h-8 rounded-full bg-muted", className)} />
    }

    const isDark = resolvedTheme === "dark"

    return (
        <div
            className={cn(
                "relative flex w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300",
                isDark ? "bg-zinc-950 border border-zinc-800" : "bg-zinc-100 border border-zinc-200",
                className
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    setTheme(isDark ? "light" : "dark")
                }
            }}
            aria-label="Toggle theme"
        >
            <div className="flex justify-between items-center w-full h-full px-0.5">
                <div className="flex justify-center items-center w-6 h-6 z-10">
                    <Sun
                        className={cn(
                            "w-4 h-4 transition-colors duration-300",
                            !isDark ? "text-orange-500" : "text-zinc-600"
                        )}
                        strokeWidth={2}
                    />
                </div>
                <div className="flex justify-center items-center w-6 h-6 z-10">
                    <Moon
                        className={cn(
                            "w-4 h-4 transition-colors duration-300",
                            isDark ? "text-blue-400" : "text-zinc-400"
                        )}
                        strokeWidth={2}
                    />
                </div>
            </div>
            <span
                className={cn(
                    "absolute top-1 left-1 w-6 h-6 rounded-full shadow-sm transition-transform duration-300 bg-background",
                    isDark ? "translate-x-8" : "translate-x-0"
                )}
            />
        </div>
    )
}
