import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagicalButton } from "@/components/MagicalButton";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import hogwartsCastle from "@/assets/hogwarts-castle.jpg";
import hogwartsNight from "@/assets/Hogwarts.gif";

export const Landing = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.toLowerCase() === "gamemaster") {
      navigate("/admin-login");
    } else if (name.trim()) {
      navigate(`/registration?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hogwartsNight})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </div>
      
      {/* Magical Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "0s", animationDuration: "3s" }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: "1s", animationDuration: "4s" }}></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: "2s", animationDuration: "5s" }}></div>
        <div className="absolute bottom-48 right-10 w-1 h-1 bg-primary/35 rounded-full animate-pulse" style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: "3s", animationDuration: "6s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Title */}
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-magical font-bold text-primary drop-shadow-2xl relative z-10">
                HOGWARTS
              </h1>
              <div className="absolute inset-0 text-6xl md:text-8xl font-magical font-bold text-primary/20 blur-sm transform scale-110">
                HOGWARTS
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-magical font-semibold text-foreground drop-shadow-lg">
              House Sorting Ceremony
            </h2>
            <p className="text-xl md:text-2xl font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Step into the magical world and discover which Hogwarts house calls to your heart.
            </p>
          </div>

          {/* Welcome Card */}
          <Card className="card-magical max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-magical font-semibold text-foreground">
                Welcome, Young Wizard
              </h3>
              <p className="text-muted-foreground font-body">
                Enter your name to begin the sorting ceremony
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-lg font-body bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                onKeyPress={(e) => e.key === "Enter" && handleStart()}
              />
              
              <MagicalButton
                magical
                onClick={handleStart}
                disabled={!name.trim()}
                className="w-full text-lg font-magical"
                size="lg"
              >
                Begin Your Journey
              </MagicalButton>
            </div>
          </Card>

          {/* Magical Quote */}
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-lg md:text-xl font-body italic text-muted-foreground text-center leading-relaxed">
              "Oh you may not think I'm pretty, but don't judge on what you see, 
              I'll eat myself if you can find a smarter hat than me."
            </blockquote>
            <p className="text-sm font-magical text-primary mt-2">
              — The Sorting Hat
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};