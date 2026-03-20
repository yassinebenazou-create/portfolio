import { Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useThemeColor, ThemeColor } from "@/hooks/use-theme-color";
import { ShineBorder } from "@/components/ui/shine-border";

const colorOptions: { name: string; value: ThemeColor; color: string }[] = [
  { name: "Green", value: "green", color: "hsl(120 61% 34%)" },
  { name: "Blue", value: "blue", color: "hsl(210 100% 45%)" },
  { name: "Orange", value: "orange", color: "hsl(30 100% 45%)" },
  { name: "Purple", value: "purple", color: "hsl(270 70% 45%)" },
  { name: "Pink", value: "pink", color: "hsl(330 70% 50%)" },
  { name: "Red", value: "red", color: "hsl(0 72% 51%)" },
];

interface SettingsDialogProps {
  variant?: "icon" | "text";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function SettingsDialog({ variant = "icon", open, onOpenChange, children }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useThemeColor();

  const currentColor = colorOptions.find(c => c.value === themeColor)?.color || "#000000";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : variant === "icon" ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open settings"
            className="h-12 w-12 rounded-xl transition-all duration-300 hover:bg-muted/60 text-muted-foreground hover:text-foreground group"
          >
            <Settings className="h-5 w-5 animate-spin-slow" strokeWidth={2} />
          </Button>
        ) : (
          <button className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted text-muted-foreground hover:text-foreground group">
            <Settings className="h-5 w-5 animate-spin-slow" />
            <span className="font-medium">Settings</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-md border-0 p-0 overflow-hidden rounded-lg">
        <ShineBorder
          className="relative w-full p-6 bg-background text-foreground"
          color={currentColor}
          borderRadius={12}
        >
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Customize your theme and color preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Theme Mode Selection */}
            {import.meta.env.VITE_THEME_MODE === 'true' && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Theme Mode</label>
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
              </div>
            )}

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Theme Color</label>
              <div className="flex gap-3 justify-center items-center">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setThemeColor(option.value)}
                    aria-label={`Set theme color to ${option.name}`}
                    className={`
                      relative h-10 w-10 rounded-full transition-all duration-300
                      ${themeColor === option.value ? "scale-110" : "hover:scale-105"}
                    `}
                    style={{
                      background: `linear-gradient(${option.color}, ${option.color})`,
                      padding: '3px'
                    }}
                    title={option.name}
                  >
                    <div
                      className="w-full h-full rounded-full bg-background transition-all duration-300"
                      style={{
                        boxShadow: themeColor === option.value ? `0 0 0 2px ${option.color}` : 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ShineBorder>
      </DialogContent>
    </Dialog>
  );
}
