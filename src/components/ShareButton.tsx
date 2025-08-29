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
    // Create a simple certificate image using canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 900;

    // House colors for background gradients
    const houseColors: Record<string, { primary: string; secondary: string; text: string }> = {
      gryffindor: { primary: "#740001", secondary: "#ffc500", text: "#ffffff" },
      slytherin: { primary: "#1a472a", secondary: "#aaaaaa", text: "#ffffff" },
      ravenclaw: { primary: "#0e1a40", secondary: "#946b2d", text: "#ffffff" },
      hufflepuff: { primary: "#ecb939", secondary: "#000000", text: "#000000" }
    };

    const currentHouse = houseColors[house.toLowerCase()] || houseColors.gryffindor;

    // Create background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, currentHouse.primary);
    gradient.addColorStop(1, currentHouse.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative border
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Inner border
    ctx.strokeStyle = currentHouse.primary;
    ctx.lineWidth = 5;
    ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

    // Title
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 48px serif";
    ctx.textAlign = "center";
    ctx.fillText("HOGWARTS SCHOOL", canvas.width / 2, 180);
    
    ctx.font = "bold 36px serif";
    ctx.fillText("OF WITCHCRAFT AND WIZARDRY", canvas.width / 2, 230);

    // Decorative line
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(300, 260);
    ctx.lineTo(900, 260);
    ctx.stroke();

    // Certificate text
    ctx.fillStyle = currentHouse.text;
    ctx.font = "28px serif";
    ctx.fillText("This is to certify that", canvas.width / 2, 340);
    
    // Player name with emphasis
    ctx.font = "bold 42px serif";
    ctx.fillStyle = "#d4af37";
    ctx.fillText(playerName.toUpperCase(), canvas.width / 2, 400);
    
    // More certificate text
    ctx.fillStyle = currentHouse.text;
    ctx.font = "28px serif";
    ctx.fillText("has been sorted into", canvas.width / 2, 460);
    
    // House name
    ctx.font = "bold 56px serif";
    ctx.fillStyle = "#d4af37";
    ctx.strokeStyle = currentHouse.primary;
    ctx.lineWidth = 2;
    ctx.strokeText(house.toUpperCase(), canvas.width / 2, 540);
    ctx.fillText(house.toUpperCase(), canvas.width / 2, 540);

    // Add house motto/description
    const houseMottos: Record<string, string> = {
      gryffindor: "Where dwell the brave at heart",
      slytherin: "Where cunning folk use any means",
      ravenclaw: "Where those of wit and learning will find their kind",
      hufflepuff: "Where they are just and loyal"
    };

    ctx.fillStyle = currentHouse.text;
    ctx.font = "italic 24px serif";
    ctx.fillText(`"${houseMottos[house.toLowerCase()] || ""}"`, canvas.width / 2, 600);

    // Date
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    ctx.font = "20px serif";
    ctx.fillText(`Sorted on ${currentDate}`, canvas.width / 2, 700);

    // Signature line
    ctx.strokeStyle = currentHouse.text;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 780);
    ctx.lineTo(canvas.width / 2 + 150, 780);
    ctx.stroke();

    ctx.font = "18px serif";
    ctx.fillText("Professor McGonagall", canvas.width / 2, 800);
    ctx.font = "16px serif";
    ctx.fillText("Deputy Headmistress", canvas.width / 2, 820);

    // Try to download immediately since we're not using external images
    try {
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
      toast({
        title: "Download failed",
        description: "There was an error generating your certificate.",
        variant: "destructive",
      });
    }
    
    setIsOpen(false);
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
