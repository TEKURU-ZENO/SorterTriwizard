import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HouseScore {
  house: string;
  percentage: number;
  isTop: boolean;
  difference: number;
}

interface BorderlineResultsProps {
  houseScores: HouseScore[];
  className?: string;
}

const houseColors = {
  gryffindor: "bg-gradient-to-r from-red-600 to-yellow-500",
  slytherin: "bg-gradient-to-r from-green-700 to-gray-500", 
  ravenclaw: "bg-gradient-to-r from-blue-600 to-yellow-600",
  hufflepuff: "bg-gradient-to-r from-yellow-500 to-gray-800"
};

export const BorderlineResults = ({ houseScores, className }: BorderlineResultsProps) => {
  const sortedHouses = [...houseScores].sort((a, b) => b.percentage - a.percentage);
  const topHouse = sortedHouses[0];
  const secondHouse = sortedHouses[1];
  
  const isBorderline = topHouse.percentage - secondHouse.percentage < 15;

  return (
    <Card className={cn("card-magical space-y-6", className)}>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-magical font-semibold text-foreground">
          House Compatibility Analysis
        </h3>
        {isBorderline && (
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            Borderline Result - You have strong traits from multiple houses!
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {sortedHouses.map((house, index) => {
          const isSecond = index === 1 && isBorderline;
          const houseKey = house.house.toLowerCase() as keyof typeof houseColors;
          
          return (
            <div key={house.house} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "font-magical font-semibold capitalize",
                    house.isTop ? "text-primary text-lg" : "text-foreground"
                  )}>
                    {house.house}
                  </span>
                  {house.isTop && (
                    <Badge className="bg-primary text-primary-foreground">
                      Primary House
                    </Badge>
                  )}
                  {isSecond && (
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      Secondary Traits
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-body text-muted-foreground">
                  {Math.round(house.percentage)}%
                </span>
              </div>
              
              <Progress 
                value={house.percentage} 
                className={cn(
                  "h-4",
                  house.isTop && "ring-2 ring-primary/50"
                )}
              />
              
              {house.isTop && house.difference < 15 && (
                <p className="text-xs text-muted-foreground italic">
                  You were also very close to {secondHouse.house} (difference: {Math.round(house.difference)}%)
                </p>
              )}
            </div>
          );
        })}
      </div>

      {isBorderline && (
        <div className="border-t border-border/50 pt-4">
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <h4 className="font-magical font-semibold text-foreground">
              🎭 Dual House Personality
            </h4>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Your personality shows strong traits from both {topHouse.house} and {secondHouse.house}. 
              You're someone who embodies the best of multiple houses - a rare and special magical combination!
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};