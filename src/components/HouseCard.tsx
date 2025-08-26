import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HouseCardProps {
  house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  name: string;
  description: string;
  crest: string;
  className?: string;
  onClick?: () => void;
}

export const HouseCard = ({ house, name, description, crest, className, onClick }: HouseCardProps) => {
  const houseColors = {
    gryffindor: "from-red-700 to-yellow-500 border-red-500/30",
    slytherin: "from-green-800 to-gray-400 border-green-500/30", 
    ravenclaw: "from-blue-700 to-yellow-600 border-blue-500/30",
    hufflepuff: "from-yellow-500 to-gray-900 border-yellow-500/30"
  };

  return (
    <Card 
      className={cn(
        "card-magical group cursor-pointer transform transition-all duration-300 hover:scale-105",
        "bg-gradient-to-br",
        houseColors[house],
        className
      )}
      onClick={onClick}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <img 
            src={crest} 
            alt={`${name} Crest`}
            className="w-20 h-20 group-hover:scale-110 transition-transform duration-300 float"
          />
        </div>
        <h3 className="text-2xl font-magical font-bold text-foreground">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};