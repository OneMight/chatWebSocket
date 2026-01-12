import { AlertMenu, Button, TypographyH3 } from "@/core/index";
import { Card } from "@/core/index";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/core/routes/routesPath";
import BackIcon from "@/assets/back-icon.svg?react";
import { AuthSide, AuthForm } from "@/modules/auth/index";
import { useState } from "react";
export default function Auth() {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const handleHomeNavigate = () => {
    navigate({ to: ROUTES.HOME });
  };
  return (
    <>
      {error && (
        <AlertMenu
          title="Error"
          duration={3000}
          setError={setError}
          description="Your login or password are incorrect"
          className="block bg-red-400 text-white"
        />
      )}

      <main className="flex flex-col md:flex-row rounded-2xl w-full bg-white-color">
        <Card.Card className="border-transparent w-full md:w-1/2 shadow-none flex flex-col p-9">
          <Card.CardHeader className="p-0">
            <Button
              className="bg-transparent text-black-text justify-between hover:bg-transparent hover:text-bg-button w-30  has-[>svg]:px-0"
              onClick={handleHomeNavigate}
            >
              <BackIcon />
              Back to home
            </Button>
          </Card.CardHeader>
          <Card.CardTitle className="flex flex-col gap-3">
            <TypographyH3>Welcome Back!</TypographyH3>
            <p className="text-sm text-text-subtitle">
              Enter your details to access your account.
            </p>
          </Card.CardTitle>
          <Card.CardDescription>
            <AuthForm setError={setError} />
          </Card.CardDescription>
        </Card.Card>
        <AuthSide />
      </main>
    </>
  );
}
