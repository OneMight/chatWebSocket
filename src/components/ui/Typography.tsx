import { type Typography } from "@/types/types";
export function TypographyH3({ children, className }: Typography) {
  return (
    <h3
      className={`${className} scroll-m-20 text-2xl font-semibold tracking-tight`}
    >
      {children}
    </h3>
  );
}
