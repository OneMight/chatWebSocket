import { TypographyH3 } from "@/components";
export const Aside = () => {
  return (
    <aside className="w-1/3">
      <div>
        <TypographyH3> Welcome Home! ☕️</TypographyH3>
        <p>
          Grab a virtual cup of coffee and join the conversation. This is a safe
          space for creativity and connection.
        </p>
        <button>Read Guidlines</button>
      </div>
      <div>
        <TypographyH3>Community Pulse</TypographyH3>
        <div>
          <p>1000</p>
          <p>members</p>
        </div>
      </div>
    </aside>
  );
};
