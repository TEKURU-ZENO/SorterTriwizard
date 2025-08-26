import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagicalButton } from "@/components/MagicalButton";
import { ShareButton } from "@/components/ShareButton";
import { HouseComparison } from "@/components/HouseComparison";
import { TraitRadar } from "@/components/TraitRadar";
import { BorderlineResults } from "@/components/BorderlineResults";
import { HouseWelcome } from "@/components/HouseWelcome";
import { LoadingSpell } from "@/components/LoadingSpell";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Crown, Star, Zap, Heart, Shield, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { SortingResult } from "@/utils/sortingAlgorithm";
import gryffindorCrest from "@/assets/gryffindor-crest.png";
import slytherinCrest from "@/assets/slytherin-crest.png";
import ravenclawCrest from "@/assets/ravenclaw-crest.png";
import hufflepuffCrest from "@/assets/hufflepuff-crest.png";

type House = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

interface HouseInfo {
  name: string;
  crest: string;
  colors: string;
  description: string;
  traits: string[];
  message: string;
  detailedDescription: string;
  famousMembers: string[];
  element: string;
  founder: string;
  animal: string;
  values: string[];
  icon: React.ReactNode;
}

const houseData: Record<House, HouseInfo> = {
  gryffindor: {
    name: "Gryffindor",
    crest: gryffindorCrest,
    colors: "from-gryffindor via-gryffindor-gold to-gryffindor-light",
    description: "Where dwell the brave at heart",
    traits: ["Courage", "Bravery", "Nerve", "Chivalry"],
    message: "You belong in Gryffindor, where the brave of heart reside. Your courage and determination will serve you well in facing any challenge that comes your way. Like Harry Potter, Hermione Granger, and Ron Weasley, you have the spirit of a true Gryffindor!",
    detailedDescription: "Gryffindor house prizes bravery, helping others, and chivalry. Its members are typically bold, courageous, and willing to fight for what's right, even in the face of great adversity.",
    famousMembers: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore", "Minerva McGonagall"],
    element: "Fire",
    founder: "Godric Gryffindor",
    animal: "Lion",
    values: ["Bravery", "Helping others", "Chivalry", "Standing up for what's right"],
    icon: <Shield className="w-6 h-6" />
  },
  slytherin: {
    name: "Slytherin",
    crest: slytherinCrest,
    colors: "from-slytherin via-slytherin-silver to-slytherin-light",
    description: "Where cunning folk use any means to achieve their ends",
    traits: ["Ambition", "Cunning", "Leadership", "Resourcefulness"],
    message: "You have been sorted into Slytherin, where ambitious wizards achieve greatness. Your cunning mind and natural leadership abilities mark you as someone destined for success. Like Severus Snape and Draco Malfoy, you possess the wit and determination of a true Slytherin!",
    detailedDescription: "Slytherin house values ambition, cunning, leadership, and resourcefulness. Its members are often determined to achieve their goals and possess strong leadership qualities.",
    famousMembers: ["Severus Snape", "Draco Malfoy", "Tom Riddle", "Horace Slughorn", "Merlin"],
    element: "Water",
    founder: "Salazar Slytherin",
    animal: "Serpent",
    values: ["Ambition", "Cunning", "Leadership", "Determination"],
    icon: <Crown className="w-6 h-6" />
  },
  ravenclaw: {
    name: "Ravenclaw",
    crest: ravenclawCrest,
    colors: "from-ravenclaw via-ravenclaw-bronze to-ravenclaw-light",
    description: "Where those of wit and learning will always find their kind",
    traits: ["Intelligence", "Wisdom", "Wit", "Creativity"],
    message: "Welcome to Ravenclaw, house of the wise and clever! Your thirst for knowledge and creative mind make you a perfect fit for this prestigious house. Like Luna Lovegood and Cho Chang, you possess the wisdom and wit that defines a true Ravenclaw!",
    detailedDescription: "Ravenclaw house prizes intelligence, knowledge, wit, and learning. Its members are typically clever, wise, and eager to learn new things.",
    famousMembers: ["Luna Lovegood", "Cho Chang", "Padma Patil", "Filius Flitwick", "Gilderoy Lockhart"],
    element: "Air",
    founder: "Rowena Ravenclaw",
    animal: "Eagle",
    values: ["Intelligence", "Knowledge", "Wit", "Learning"],
    icon: <Lightbulb className="w-6 h-6" />
  },
  hufflepuff: {
    name: "Hufflepuff",
    crest: hufflepuffCrest,
    colors: "from-hufflepuff via-hufflepuff-black to-hufflepuff-light",
    description: "Where they are just and loyal",
    traits: ["Loyalty", "Patience", "Kindness", "Dedication"],
    message: "You belong in Hufflepuff, where loyalty and friendship are most valued. Your kind heart and dedication to others make you a wonderful friend and ally. Like Cedric Diggory and Newt Scamander, you embody the best qualities of a true Hufflepuff!",
    detailedDescription: "Hufflepuff house values loyalty, patience, kindness, tolerance, and dedication. Its members are typically humble, inclusive, and fiercely loyal to their friends.",
    famousMembers: ["Cedric Diggory", "Newt Scamander", "Nymphadora Tonks", "Pomona Sprout", "Fat Friar"],
    element: "Earth",
    founder: "Helga Hufflepuff",
    animal: "Badger",
    values: ["Loyalty", "Patience", "Kindness", "Fair play"],
    icon: <Heart className="w-6 h-6" />
  }
};

// Mock trait scores for comparison
const generateTraitScores = (house: House) => [
  { trait: "Courage", score: house === "gryffindor" ? 90 : Math.random() * 60 + 20, description: "Willingness to face danger and adversity" },
  { trait: "Ambition", score: house === "slytherin" ? 95 : Math.random() * 60 + 20, description: "Drive to achieve goals and succeed" },
  { trait: "Intelligence", score: house === "ravenclaw" ? 92 : Math.random() * 60 + 20, description: "Analytical thinking and problem-solving" },
  { trait: "Loyalty", score: house === "hufflepuff" ? 88 : Math.random() * 60 + 20, description: "Faithfulness to friends and principles" },
  { trait: "Creativity", score: house === "ravenclaw" ? 85 : Math.random() * 60 + 20, description: "Innovative thinking and imagination" },
  { trait: "Leadership", score: house === "slytherin" ? 87 : Math.random() * 60 + 20, description: "Ability to guide and inspire others" }
].sort((a, b) => b.score - a.score);

export const Result = () => {
  const navigate = useNavigate();
  const [sortingResult, setSortingResult] = useState<SortingResult | null>(null);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("sortingResult");
    const regData = sessionStorage.getItem("registrationData");
    
    if (!storedResult || !regData) {
      navigate("/");
      return;
    }
    
    // Simulate magical sorting delay
    setTimeout(() => {
      setSortingResult(JSON.parse(storedResult));
      setRegistrationData(JSON.parse(regData));
      setIsLoading(false);
      
      // Trigger animation phases
      setTimeout(() => setAnimationPhase(1), 500);
      setTimeout(() => setAnimationPhase(2), 1500);
      setTimeout(() => setAnimationPhase(3), 2500);
    }, 3000);
  }, [navigate]);

  const handleNewSorting = () => {
    sessionStorage.clear();
    navigate("/");
  };

  if (isLoading || !sortingResult || !registrationData) {
    return <LoadingSpell isLoading={true} />;
  }

  const house = sortingResult.primaryHouse as House;
  const houseInfo = houseData[house];
  const legacyTraitScores = generateTraitScores(house); // For HouseComparison component

  return (
    <div className="min-h-screen px-4 py-8 relative">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Dramatic Header */}
        <div className={`text-center space-y-6 ${animationPhase >= 1 ? 'reveal-animation' : 'opacity-0'}`}>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-magical font-bold text-foreground">
              The Sorting Hat Has Spoken!
            </h1>
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted-foreground font-body">
              <Sparkles className="w-6 h-6 text-primary" />
              <span>Your magical destiny awaits...</span>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* House Reveal Card */}
        <Card className={`card-magical bg-gradient-to-br ${houseInfo.colors} border-2 border-white/20 ${animationPhase >= 2 ? 'reveal-animation' : 'opacity-0'}`}>
          <div className="text-center space-y-8 p-8 md:p-12">
            {/* House Crest */}
            <div className="flex justify-center">
              <div className={`relative ${animationPhase >= 2 ? 'house-crest-reveal' : ''}`}>
                <img 
                  src={houseInfo.crest} 
                  alt={`${houseInfo.name} Crest`}
                  className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>

            {/* House Information */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  {houseInfo.icon}
                  <h2 className="text-4xl md:text-6xl font-magical font-bold text-white drop-shadow-lg">
                    {houseInfo.name.toUpperCase()}
                  </h2>
                  {houseInfo.icon}
                </div>
                <p className="text-xl md:text-2xl font-body italic text-white/90 max-w-2xl mx-auto">
                  "{houseInfo.description}"
                </p>
              </div>

              {/* House Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70 font-body">Founder</p>
                  <p className="font-magical text-white font-semibold">{houseInfo.founder}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70 font-body">Animal</p>
                  <p className="font-magical text-white font-semibold">{houseInfo.animal}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70 font-body">Element</p>
                  <p className="font-magical text-white font-semibold">{houseInfo.element}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white/70 font-body">Values</p>
                  <p className="font-magical text-white font-semibold">{houseInfo.values.length}</p>
                </div>
              </div>

              {/* Traits */}
              <div className={`flex flex-wrap justify-center gap-3 ${animationPhase >= 3 ? 'traits-reveal' : 'opacity-0'}`}>
                {houseInfo.traits.map((trait, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white font-magical font-semibold text-lg border border-white/30"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Personality Analysis */}
        <Card className="card-magical space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-8 h-8 text-primary" />
              <h3 className="text-3xl md:text-4xl font-magical font-semibold text-foreground">
                Welcome, {registrationData.name}!
              </h3>
              <Star className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-3">
              <Badge 
                variant="secondary" 
                className="bg-primary/20 text-primary font-magical text-base px-4 py-2"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Personality Type: {sortingResult.personalityType}
              </Badge>
              
              {sortingResult.isBorderline && (
                <Badge 
                  variant="outline" 
                  className="border-accent text-accent font-body"
                >
                  Multi-House Traits Detected
                </Badge>
              )}
            </div>
            
            <p className="text-lg md:text-xl font-body text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {houseInfo.message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <ShareButton 
              house={house} 
              playerName={registrationData.name}
            />
            
            <MagicalButton
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="font-magical"
              size="lg"
            >
              {showDetails ? "Hide Details" : "Discover More"}
            </MagicalButton>
          </div>
        </Card>

        {/* Enhanced Analysis */}
        <div className="grid lg:grid-cols-2 gap-8">
          <BorderlineResults 
            houseScores={sortingResult.housePercentages}
          />
          <TraitRadar 
            traits={sortingResult.traitScores}
          />
        </div>

        {/* Head of House Welcome */}
        <HouseWelcome 
          house={house}
          playerName={registrationData.name}
        />

        {/* Detailed Information */}
        {showDetails && (
          <div className="space-y-8 animate-fade-in">
            {/* House Details */}
            <Card className="card-magical space-y-6">
              <h4 className="text-2xl font-magical font-semibold text-foreground text-center">
                About {houseInfo.name}
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-magical font-semibold text-foreground mb-2">House Philosophy</h5>
                    <p className="font-body text-muted-foreground">{houseInfo.detailedDescription}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-magical font-semibold text-foreground mb-2">Core Values</h5>
                    <div className="flex flex-wrap gap-2">
                      {houseInfo.values.map((value, index) => (
                        <Badge key={index} variant="outline" className="font-body">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-magical font-semibold text-foreground mb-2">Famous Alumni</h5>
                  <div className="space-y-2">
                    {houseInfo.famousMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-body text-muted-foreground">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Legacy House Comparison for existing functionality */}
            <HouseComparison 
              selectedHouse={house}
              traitScores={legacyTraitScores}
            />
          </div>
        )}

        {/* Magical Quote */}
        <div className="text-center max-w-3xl mx-auto">
          <Separator className="mb-6" />
          <blockquote className="text-lg md:text-xl font-body italic text-muted-foreground">
            "It is our choices that show what we truly are, far more than our abilities."
          </blockquote>
          <p className="text-sm font-magical text-primary mt-3">
            — Albus Dumbledore
          </p>
        </div>
      </div>
    </div>
  );
};