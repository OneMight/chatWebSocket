import { Button, TypographyH3 } from "@/components";
export const Aside = () => {
  return (
    <aside className="w-1/3">
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
