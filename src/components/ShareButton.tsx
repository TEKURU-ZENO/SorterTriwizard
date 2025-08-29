import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Share2, Download, Copy, Twitter, Facebook } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface ShareButtonProps {
  house: string;
  playerName: string;
  className?: string;
}

export const ShareButton = ({ house, playerName, className }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareText = `🏰 I've been sorted into ${house.charAt(0).toUpperCase() + house.slice(1)}! Take the Hogwarts House Quiz and discover your magical destiny! ⚡`;
  const shareUrl = window.location.origin;

  const handleShare = async (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let url = "";
    
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          toast({
            title: "Copied to clipboard!",
            description: "Share your magical journey with friends.",
          });
          setIsOpen(false);
          return;
        } catch (err) {
          toast({
            title: "Failed to copy",
            description: "Please try again.",
            variant: "destructive",
          });
          return;
        }
      case "download":
        generateCertificate();
        return;
    }
    
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
      setIsOpen(false);
    }
  };

  const generateCertificate = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 900;

    // Load the background image
    const backgroundImg = new Image();
    backgroundImg.crossOrigin = "anonymous";
    
    backgroundImg.onload = () => {
      try {
        // Draw the background image
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        // Add a subtle overlay for house colors
        const houseColors: Record<string, string> = {
          gryffindor: "rgba(116, 0, 1, 0.1)",
          slytherin: "rgba(26, 71, 42, 0.1)",
          ravenclaw: "rgba(14, 26, 64, 0.1)",
          hufflepuff: "rgba(236, 185, 57, 0.1)"
        };

        const houseOverlay = houseColors[house.toLowerCase()] || houseColors.gryffindor;
        ctx.fillStyle = houseOverlay;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load medieval/gothic fonts
        const primaryFont   = "bold 50px 'Cinzel Decorative', 'Cinzel', 'Times New Roman', serif";
        const secondaryFont = "bold 36px 'Cinzel', 'Crimson Text', 'Times New Roman', serif";
        const bodyFont      = "30px 'Crimson Text', 'Cinzel', 'Times New Roman', serif";
        const nameFont      = "bold 54px 'Cinzel Decorative', 'Cinzel', 'Times New Roman', serif"; 
        const houseFont     = "bold 68px 'Cinzel Decorative', 'Cinzel', 'Times New Roman', serif";

        // Add text shadow function for better readability
        const addTextShadow = (text: string, x: number, y: number, font: string, fillColor: string, shadowColor: string = "rgba(0, 0, 0, 0.8)") => {
          ctx.font = font;
          ctx.textAlign = "center";
          
          // Draw shadow
          ctx.fillStyle = shadowColor;
          ctx.fillText(text, x + 3, y + 3);
          
          // Draw main text
          ctx.fillStyle = fillColor;
          ctx.fillText(text, x, y);
        };

        // Title - Hogwarts School
        addTextShadow("HOGWARTS SCHOOL", canvas.width / 2, 180, primaryFont, "#d4af37");
        addTextShadow("OF WITCHCRAFT AND WIZARDRY", canvas.width / 2, 230, secondaryFont, "#d4af37");

        // Decorative flourish (using Unicode characters for medieval feel)
        ctx.fillStyle = "#d4af37";
        ctx.font = "32px 'Cinzel Decorative', serif";
        ctx.textAlign = "center";
        ctx.fillText("❦ ◆ ❦", canvas.width / 2, 270);

        // Certificate text
        addTextShadow("This is to certify that", canvas.width / 2, 350, bodyFont, "#2c1810");
        
        // Player name with decorative emphasis
        addTextShadow(playerName.toUpperCase(), canvas.width / 2, 420, nameFont, "#8b0000", "rgba(212, 175, 55, 0.3)");
        
        // More certificate text
        addTextShadow("has been sorted into the noble house of", canvas.width / 2, 480, bodyFont, "#2c1810");
        
        // House name with special treatment
        const houseTextColors: Record<string, string> = {
          gryffindor: "#740001",
          slytherin: "#1a472a", 
          ravenclaw: "#0e1a40",
          hufflepuff: "#ecb939"
        };
        
        const houseColor = houseTextColors[house.toLowerCase()] || "#740001";
        
        // Add stroke to house name for dramatic effect
        ctx.font = houseFont;
        ctx.textAlign = "center";
        ctx.strokeStyle = "#d4af37";
        ctx.lineWidth = 3;
        ctx.strokeText(house.toUpperCase(), canvas.width / 2, 560);
        
        addTextShadow(house.toUpperCase(), canvas.width / 2, 560, houseFont, houseColor);

        // Add house motto/description
        const houseMottos: Record<string, string> = {
          gryffindor: "Where dwell the brave at heart",
          slytherin: "Where cunning folk use any means to achieve their ends",
          ravenclaw: "Where those of wit and learning will always find their kind", 
          hufflepuff: "Where they are just and loyal, those patient Hufflepuffs are true"
        };

        const motto = houseMottos[house.toLowerCase()] || "";
        addTextShadow(`"${motto}"`, canvas.width / 2, 620, "italic 24px 'Cinzel', serif", "#4a4a4a");

        // Decorative element
        ctx.fillStyle = "#d4af37";
        ctx.font = "24px 'Cinzel Decorative', serif";
        ctx.textAlign = "center";
        ctx.fillText("✦ ✧ ✦", canvas.width / 2, 660);

        // Date with medieval styling
        const currentDate = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        addTextShadow(`Anno Domini ${currentDate}`, canvas.width / 2, 720, "22px 'Cinzel', serif", "#2c1810");

        // Signature section with flourish
        ctx.strokeStyle = "#8b4513";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 200, 780);
        ctx.lineTo(canvas.width / 2 + 200, 780);
        ctx.stroke();

        // Add decorative ends to signature line
        ctx.fillStyle = "#d4af37";
        ctx.font = "16px serif";
        ctx.textAlign = "left";
        ctx.fillText("❦", canvas.width / 2 - 210, 785);
        ctx.textAlign = "right";
        ctx.fillText("❦", canvas.width / 2 + 210, 785);

        addTextShadow("Professor Minerva McGonagall", canvas.width / 2, 810, "20px 'Cinzel', serif", "#2c1810");
        addTextShadow("Deputy Headmistress & Head of Gryffindor House", canvas.width / 2, 835, "16px 'Cinzel', serif", "#666666");

        // Download the certificate
        const link = document.createElement("a");
        link.download = `${playerName.replace(/[^a-zA-Z0-9]/g, '_')}-${house}-certificate.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: "Certificate downloaded!",
          description: "Your magical certificate is ready to share.",
        });
      } catch (error) {
        console.error("Certificate generation error:", error);
        toast({
          title: "Download failed",
          description: "There was an error generating your certificate.",
          variant: "destructive",
        });
      }
      
      setIsOpen(false);
    };

    backgroundImg.onerror = () => {
      console.error("Failed to load background image");
      toast({
        title: "Image loading failed",
        description: "Could not load the certificate background. Please try again.",
        variant: "destructive",
      });
      setIsOpen(false);
    };

    // Set the source to your background image
    backgroundImg.src = "/certificatesorter.jpg"; // Adjust path as needed
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn("font-magical", className)}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Your Magic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-card/95 backdrop-blur-sm border border-border/50 z-50">
        <div className="space-y-2">
          <Button onClick={() => handleShare("twitter")} variant="ghost" size="sm" className="w-full justify-start font-body">
            <Twitter className="w-4 h-4 mr-2" /> Share on Twitter
          </Button>
          <Button onClick={() => handleShare("facebook")} variant="ghost" size="sm" className="w-full justify-start font-body">
            <Facebook className="w-4 h-4 mr-2" /> Share on Facebook
          </Button>
          <Button onClick={() => handleShare("copy")} variant="ghost" size="sm" className="w-full justify-start font-body">
            <Copy className="w-4 h-4 mr-2" /> Copy Link
          </Button>
          <Button onClick={() => handleShare("download")} variant="ghost" size="sm" className="w-full justify-start font-body">
            <Download className="w-4 h-4 mr-2" /> Download Certificate
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};



