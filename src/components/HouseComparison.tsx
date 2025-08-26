import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TraitScore {
  trait: string;
  score: number;
  description: string;
}

interface HouseComparisonProps {
  selectedHouse: string;
  traitScores: TraitScore[];
  className?: string;
}

const houseData = {
  gryffindor: {
    name: "Gryffindor",
    color: "bg-gradient-to-r from-red-600 to-yellow-500",
    traits: ["Courage", "Bravery", "Nerve", "Chivalry"]
  },
  slytherin: {
    name: "Slytherin", 
    color: "bg-gradient-to-r from-green-700 to-gray-500",
    traits: ["Ambition", "Cunning", "Leadership", "Resourcefulness"]
  },
  ravenclaw: {
    name: "Ravenclaw",
    color: "bg-gradient-to-r from-blue-600 to-yellow-600", 
    traits: ["Intelligence", "Wisdom", "Wit", "Creativity"]
  },
  hufflepuff: {
    name: "Hufflepuff",
    color: "bg-gradient-to-r from-yellow-500 to-gray-800",
    traits: ["Loyalty", "Patience", "Kindness", "Dedication"]
  }
};

export const HouseComparison = ({ selectedHouse, traitScores, className }: HouseComparisonProps) => {
  const houses = Object.entries(houseData);

  return (
    <Card className={cn("card-magical space-y-6", className)}>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-magical font-semibold text-foreground">
          Your Magical Profile
        </h3>
        <p className="text-muted-foreground font-body">
          See how you align with each Hogwarts house
        </p>
      </div>

      <div className="space-y-4">
        {houses.map(([houseKey, house]) => {
          const isSelected = houseKey === selectedHouse;
          const houseScore = Math.random() * 40 + (isSelected ? 60 : 20); // Simulate scores
          
          return (
            <div key={houseKey} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "font-magical font-semibold",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {house.name}
                </span>
                <span className="text-sm font-body text-muted-foreground">
                  {Math.round(houseScore)}%
                </span>
              </div>
              
              <Progress 
                value={houseScore} 
                className={cn(
                  "h-3",
                  isSelected && "ring-2 ring-primary/50"
                )}
              />
              
              <div className="flex flex-wrap gap-1 mt-1">
                {house.traits.map((trait, index) => (
                  <span 
                    key={index}
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-body",
                      isSelected 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border/50 pt-4">
        <h4 className="font-magical font-semibold text-foreground mb-3">
          Your Top Traits
        </h4>
        <div className="space-y-2">
          {traitScores.slice(0, 3).map((trait, index) => (
            <div key={trait.trait} className="flex items-center justify-between">
              <div className="flex-1">
                <span className="font-body text-sm text-foreground">{trait.trait}</span>
                <p className="text-xs text-muted-foreground">{trait.description}</p>
              </div>
              <div className="w-16 ml-4">
                <Progress value={trait.score} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};