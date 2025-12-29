type Typography = {
  children: string;
};

export function TypographyH3({ children }: Typography) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}
