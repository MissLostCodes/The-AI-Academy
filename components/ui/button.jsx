import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:scale-105 hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:scale-105 hover:shadow-lg",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-lg",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:scale-105 hover:shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        fancy: "bg-black text-white rounded-xl px-4 py-1.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
       // fancy: "bg-black text-white rounded-xl px-6 py-2 w-full h-full" 
        // bg-black text-white rounded-xl border-2 border-gradient-to-r from-purple-500 via-blue-500 to-yellow-400
       
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
