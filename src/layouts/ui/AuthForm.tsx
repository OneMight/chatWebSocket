import { Button, FormComponents, Input } from "@/components";
import type React from "react";
import { useForm } from "react-hook-form";
import { getToken } from "@/api/users/queries";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/routesPath";
import { useAuth } from "@/app/context/UserContext";
interface AuthFormProp {
  setError: (value: boolean) => void;
}
export function AuthForm({ setError }: AuthFormProp) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const form = useForm();
  const context = useAuth();
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await getToken({ username, password });
      if (response?.accessToken && response?.refreshToken) {
        document.cookie = `accessToken=${response.accessToken}`;
        document.cookie = `refreshToken=${response.refreshToken}`;
        context?.setAccessToken(response.accessToken);
        navigate({ to: ROUTES.HOME });
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };
  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <FormComponents.Form {...form}>
      <form className="space-y-8" onSubmit={(e) => handleOnSubmit(e)}>
        <FormComponents.FormField
          control={form.control}
          name="username"
          render={() => (
            <>
              <FormComponents.FormItem>
                <FormComponents.FormLabel>Username</FormComponents.FormLabel>
                <FormComponents.FormControl>
                  <Input
                    id={"username"}
                    value={username}
                    placeholder="username"
                    className="bg-bg-input border-none px-7"
                    onChange={handleSetUsername}
                  />
                </FormComponents.FormControl>
                <FormComponents.FormMessage />
              </FormComponents.FormItem>
              <FormComponents.FormItem>
                <FormComponents.FormLabel>Password</FormComponents.FormLabel>
                <FormComponents.FormControl>
                  <Input
                    id={"password"}
                    onChange={handleSetPassword}
                    value={password}
                    placeholder="********"
                    autoComplete="false"
                    className="bg-bg-input border-none px-7"
                    type="password"
                  />
                </FormComponents.FormControl>
              </FormComponents.FormItem>
            </>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </FormComponents.Form>
  );
}
