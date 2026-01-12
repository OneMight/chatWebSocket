import Logo from "@/assets/logo-icon.svg?react";
import { TypographyH3 } from "@/core/index";

export const AuthSide = () => {
  return (
    <div className="w-full md:w-1/2 p-8 flex flex-col justify-around gap-6  md:px-9 md:py-0 bg-bg-auth-card rounded-b-xl md:rounded-r-xl">
      <Logo fill="rbga(255,255,255 / 10%)" />
      <div className="flex flex-col gap-2">
        <TypographyH3 className="text-text-main">
          Find your cozy corner on the internet.
        </TypographyH3>
        <p className="text-text-main">
          Join thousands of people sharing their stories, morning rituals, and
          creative journeys in a safe, welcoming space.
        </p>
      </div>
      <div className="flex flex-row gap-4 text-xs text-text-main">
        <p>© 2024 CozyCorner</p>
        <p>Privacy Policy</p>
        <p>Terms</p>
      </div>
    </div>
  );
};
