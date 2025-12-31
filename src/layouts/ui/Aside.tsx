import { Button, TypographyH3 } from "@/components";
import { cn } from "@/lib/utils";
interface AsideProp {
  className: string;
}
export const Aside = ({ className }: AsideProp) => {
  return (
    <aside className={cn(className)}>
      <div className="bg-bg-button p-4 rounded-xl flex flex-col gap-3 items-start">
        <TypographyH3 className="text-text-main">Welcome Home! ☕️</TypographyH3>
        <p className="text-text-main text-xs leading-6">
          Grab a virtual cup of coffee and join the conversation. This is a safe
          space for creativity and connection.
        </p>
        <Button className=" text-bg-button hover:bg-hover-orange hover:text-black rounded-xl bg-bg-app cursor-pointer">
          Read Guidlines
        </Button>
      </div>
    </aside>
  );
};
