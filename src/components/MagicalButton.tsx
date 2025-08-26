import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagicalButtonProps extends ButtonProps {
  house?: "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";
  magical?: boolean;
}

const MagicalButton = forwardRef<HTMLButtonElement, MagicalButtonProps>(
  ({ className, house, magical = false, children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          magical && "btn-magical",
          house === "gryffindor" && "btn-house-gryffindor",
          house === "slytherin" && "btn-house-slytherin", 
          house === "ravenclaw" && "btn-house-ravenclaw",
          house === "hufflepuff" && "btn-house-hufflepuff",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MagicalButton.displayName = "MagicalButton";

export { MagicalButton };