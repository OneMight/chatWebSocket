import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
interface AlertMenuProps {
  title: string;
  className?: string;
  description: string;
  duration: number;
  setError: (value: boolean) => void;
}
export const AlertMenu = ({
  title,
  className,
  duration,
  description,
  setError,
}: AlertMenuProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setError(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, setError]);
  if (!isVisible) return null;
  return (
    <Alert
      className={cn(
        "bg-alert-color w-90",

        className,
      )}
    >
      <AlertTitle className="flex flex-row gap-3 items-center">
        {" "}
        <AlertCircleIcon />
        {title}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
