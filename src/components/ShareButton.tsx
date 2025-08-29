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

    const template = new Image();
    template.src = "/assets/certificate-template.png"; // certificate template

    const crestImages: Record<string, string> = {
      gryffindor: "/assets/gryffindor.png",
      slytherin: "/assets/slytherin.png",
      ravenclaw: "/assets/ravenclaw.png",
      hufflepuff: "/assets/hufflepuff.png",
    };
    const crest = new Image();
    crest.src = crestImages[house.toLowerCase()] || "";
    template.onload = () => {
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    // Load crest after template
    crest.onload = () => {
      // Draw crest (adjust size & position as needed)
      const crestSize = 180;
      ctx.drawImage(
        crest,
        canvas.width / 2 - crestSize / 2,
        250, // y-position (place under title area on certificate)
        crestSize,
        crestSize
      );

    // Title
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 36px serif";
    ctx.textAlign = "center";
    ctx.fillText("HOGWARTS SCHOOL", 400, 100);
    ctx.fillText("OF WITCHCRAFT AND WIZARDRY", 400, 140);

    // Certificate text
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px serif";
    ctx.fillText("This is to certify that", 400, 220);
    
    ctx.font = "bold 32px serif";
    ctx.fillStyle = "#d4af37";
    ctx.fillText(playerName, 400, 280);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "24px serif";
    ctx.fillText("has been sorted into", 400, 340);
    
    ctx.font = "bold 48px serif";
    const houseColors: Record<string, string> = {
      gryffindor: "#740001",
      slytherin: "#1a472a",
      ravenclaw: "#0e1a40",
      hufflepuff: "#ecb939"
    };
    ctx.fillStyle = houseColors[house] || "#d4af37";
    ctx.fillText(house.toUpperCase(), 400, 420);

    // Download
    const link = document.createElement("a");
    link.download = `${playerName}-${house}-certificate.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Certificate downloaded!",
      description: "Your magical certificate is ready to share.",
    });
    setIsOpen(false);
  };

  return (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="lg"
        className="font-magical"
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
