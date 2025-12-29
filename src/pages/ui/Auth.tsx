import { Button, TypographyH3 } from "@/components";
import { Card, CardDescription, CardHeader, CardTitle } from "@/utils/Card";
import { AuthForm } from "@/layouts";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import BackIcon from "@/assets/back-icon.svg?react";
import { AuthSide } from "@/layouts";
export default function Auth() {
  const navigate = useNavigate();
  const handleHomeNavigate = () => {
    navigate({ to: ROUTES.HOME });
  };
  return (
    <main className="flex flex-row rounded-2xl w-full bg-white-color">
      <Card className="border-transparent w-1/2 shadow-none flex flex-col p-9">
        <CardHeader className="p-0">
          <Button
            className="bg-transparent text-black-text justify-between cursor-pointer hover:bg-transparent hover:text-bg-button w-30  has-[>svg]:px-0"
            onClick={handleHomeNavigate}
          >
            <BackIcon />
            Back to home
          </Button>
        </CardHeader>
        <CardTitle className="flex flex-col gap-3">
          <TypographyH3>Welcome Back!</TypographyH3>
          <p className="text-sm text-text-subtitle">
            Enter your details to access your account.
          </p>
        </CardTitle>
        <CardDescription>
          <AuthForm />
        </CardDescription>
      </Card>
      <AuthSide />
    </main>
  );
}
