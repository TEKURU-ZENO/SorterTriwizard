import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown, Shield, Lightbulb, Heart } from "lucide-react";

interface HouseWelcomeProps {
  house: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  playerName: string;
  className?: string;
}

const houseWelcomes = {
  gryffindor: {
    headOfHouse: "Professor McGonagall",
    icon: <Shield className="w-6 h-6" />,
    welcome: "Welcome to Gryffindor, {name}! I am Professor McGonagall, your Head of House. Your courage and determination have brought you here, and I have no doubt you will uphold the noble traditions of our house. Remember, true bravery is not the absence of fear, but acting in spite of it. Your journey at Hogwarts begins now!",
    commonRoom: "The Gryffindor common room awaits you - a cozy space with a roaring fireplace, comfortable armchairs, and the warmth of friendship. Your dormitory is up the spiral staircase, where you'll find your four-poster bed with crimson hangings.",
    expectations: "As a Gryffindor, you're expected to stand up for what's right, protect those who cannot protect themselves, and face challenges with courage. You'll find yourself drawn to Defense Against the Dark Arts and Transfiguration.",
    houseColors: "bg-gradient-to-r from-red-600 to-yellow-500"
  },
  slytherin: {
    headOfHouse: "Professor Snape",
    icon: <Crown className="w-6 h-6" />,
    welcome: "So, {name}, the Sorting Hat has placed you in Slytherin. I am Professor Snape, your Head of House. You have been chosen because you possess the ambition and cunning that marks true greatness. Here, you will learn that success comes to those who are determined enough to seize it. Use your gifts wisely.",
    commonRoom: "Your common room lies beneath the Black Lake in the dungeons, with its elegant green décor and the soft glow of underwater light. The dormitories feature four-poster beds with green silk hangings - a fitting environment for ambitious minds.",
    expectations: "Slytherins are expected to achieve excellence through cleverness and determination. You'll excel in Potions, and your natural leadership will guide you to positions of influence. Remember - greatness inspires envy, envy engenders spite, spite spawns lies.",
    houseColors: "bg-gradient-to-r from-green-700 to-gray-500"
  },
  ravenclaw: {
    headOfHouse: "Professor Flitwick",
    icon: <Lightbulb className="w-6 h-6" />,
    welcome: "Ah, {name}! How delightful to welcome another brilliant mind to Ravenclaw! I am Professor Flitwick, your Head of House. Your wit and wisdom have earned you a place among those who value knowledge above all else. Here, you'll find that learning is its own reward, and creativity knows no bounds.",
    commonRoom: "The Ravenclaw tower offers the most beautiful view in all of Hogwarts. Your common room is circular, with arched windows, blue silk hangings, and a domed ceiling painted with stars. Your dormitory features beds with sky-blue hangings.",
    expectations: "As a Ravenclaw, you're encouraged to pursue knowledge for its own sake, think outside the box, and appreciate the beauty in learning. You'll naturally gravitate toward subjects like Ancient Runes, Arithmancy, and Charms.",
    houseColors: "bg-gradient-to-r from-blue-600 to-yellow-600"
  },
  hufflepuff: {
    headOfHouse: "Professor Sprout",
    icon: <Heart className="w-6 h-6" />,
    welcome: "Welcome to Hufflepuff, dear {name}! I'm Professor Sprout, and I couldn't be more pleased to have you in our house. Your loyalty, kindness, and dedication are exactly what make Hufflepuff special. Here, everyone is valued, everyone belongs, and together we create something beautiful.",
    commonRoom: "Your common room is the coziest in Hogwarts - round, low-ceilinged, and filled with overstuffed yellow armchairs. Honey-colored light streams through the round windows, and the dormitories feature circular copper-framed beds with patchwork quilts.",
    expectations: "Hufflepuffs are the backbone of the magical world. You'll excel through hard work, patience, and treating everyone with kindness. Herbology will likely become a favorite subject, and you'll find strength in the friendships you build.",
    houseColors: "bg-gradient-to-r from-yellow-500 to-gray-800"
  }
};

export const HouseWelcome = ({ house, playerName, className }: HouseWelcomeProps) => {
  const welcome = houseWelcomes[house];
  const personalizedMessage = welcome.welcome.replace("{name}", playerName);

  return (
    <Card className={cn("card-magical space-y-6", className)}>
      {/* Header */}
      <div className={`text-center space-y-4 p-6 rounded-lg bg-gradient-to-br ${welcome.houseColors} text-white`}>
        <div className="flex items-center justify-center gap-3">
          {welcome.icon}
          <h3 className="text-2xl font-magical font-bold">
            Message from {welcome.headOfHouse}
          </h3>
          {welcome.icon}
        </div>
        <Badge className="bg-white/20 text-white border-white/30">
          Head of {house.charAt(0).toUpperCase() + house.slice(1)} House
        </Badge>
      </div>

      {/* Welcome Message */}
      <div className="space-y-4">
        <blockquote className="text-lg font-body italic text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
          "{personalizedMessage}"
        </blockquote>
      </div>

      {/* House Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-magical font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Your Common Room
          </h4>
          <p className="text-sm font-body text-muted-foreground leading-relaxed">
            {welcome.commonRoom}
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-magical font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            House Expectations
          </h4>
          <p className="text-sm font-body text-muted-foreground leading-relaxed">
            {welcome.expectations}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-border/50">
        <p className="text-sm font-body text-muted-foreground italic">
          Your magical journey at Hogwarts begins now. Make your house proud!
        </p>
      </div>
    </Card>
  );
};