import { useState } from "react";
import { Button } from "@/components/index";

interface ButtonIconProps {
  children: (isActive: boolean) => React.ReactNode;
  initialCount: number;
}

export function ButtonIcon({ children, initialCount }: ButtonIconProps) {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(false);

  const toggleReaction = () => {
    if (isActive) {
      setCount((prev) => prev - 1);
    } else {
      setCount((prev) => prev + 1);
    }
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="hover:cursor-pointer bg-transparent size-5 p-0"
        onClick={toggleReaction}
      >
        {children(isActive)}
      </Button>
      <span className="text-sm font-medium">{count}</span>
    </div>
  );
}
