import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TraitRadarProps {
  traits: {
    trait: string;
    score: number;
    color: string;
  }[];
  className?: string;
}

export const TraitRadar = ({ traits, className }: TraitRadarProps) => {
  return (
    <Card className={cn("card-magical p-6", className)}>
      <div className="text-center space-y-6">
        <h3 className="text-xl font-magical font-semibold text-foreground">
          Your Magical Traits
        </h3>
        
        {/* Circular Trait Visualization */}
        <div className="relative w-64 h-64 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-muted/30"></div>
          <div className="absolute inset-4 rounded-full border-2 border-muted/20"></div>
          <div className="absolute inset-8 rounded-full border border-muted/10"></div>
          
          {traits.slice(0, 6).map((trait, index) => {
            const angle = (index * 60) - 90; // 60 degrees apart, starting from top
            const radius = 100; // Distance from center
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-magical font-bold text-background shadow-lg mb-1"
                  style={{ 
                    backgroundColor: trait.color,
                    borderColor: trait.color,
                    opacity: 0.1 + (trait.score / 100) * 0.9
                  }}
                >
                  {Math.round(trait.score)}
                </div>
                <div className="text-xs font-body text-foreground font-semibold whitespace-nowrap">
                  {trait.trait}
                </div>
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <span className="text-sm font-magical font-bold text-primary">YOU</span>
            </div>
          </div>
        </div>

        {/* Trait List */}
        <div className="space-y-3">
          {traits.map((trait, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: trait.color }}
                  />
                  <span className="text-sm font-body text-foreground">{trait.trait}</span>
                </div>
                <span className="text-sm font-magical font-semibold text-primary">
                  {Math.round(trait.score)}%
                </span>
              </div>
              <Progress 
                value={trait.score} 
                className="h-2"
                style={{
                  '--progress-background': trait.color
                } as any}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};