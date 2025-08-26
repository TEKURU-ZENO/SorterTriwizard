import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingSpellProps {
  isLoading: boolean;
  spells?: string[];
  className?: string;
}

const defaultSpells = [
  "Summoning the Sorting Hat...",
  "Consulting the ancient wisdom...",
  "Reading your magical aura...",
  "Determining your destiny...",
  "Revealing your true house..."
];

export const LoadingSpell = ({ isLoading, spells = defaultSpells, className }: LoadingSpellProps) => {
  const [currentSpell, setCurrentSpell] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;

    const spellInterval = setInterval(() => {
      setCurrentSpell((prev) => (prev + 1) % spells.length);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(spellInterval);
      clearInterval(dotsInterval);
    };
  }, [isLoading, spells.length]);

  if (!isLoading) return null;

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen space-y-8", className)}>
      {/* Magical Circle */}
      <div className="relative">
        <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-spin">
          <div className="absolute inset-4 border-2 border-primary/40 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}>
            <div className="absolute inset-4 border border-primary rounded-full animate-spin">
              <div className="absolute inset-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        
        {/* Floating magical symbols */}
        <div className="absolute inset-0 animate-pulse">
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-primary text-2xl">⚡</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-primary text-2xl">🔮</span>
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-primary text-2xl">🪄</span>
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-primary text-2xl">✨</span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-magical font-semibold text-foreground">
          {spells[currentSpell]}{dots}
        </h2>
        <p className="text-muted-foreground font-body">
          The magic is working...
        </p>
      </div>
    </div>
  );
};