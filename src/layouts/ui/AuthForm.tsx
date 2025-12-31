import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import type React from "react";
import { useForm } from "react-hook-form";
import { getToken } from "@/api/users/queries";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import { useAuth } from "@/app/context/UserContext";
export function AuthForm() {
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
        console.log("invalidCredentionals");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => handleOnSubmit(e)}>
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <>
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    id={"username"}
                    value={username}
                    placeholder="username"
                    className="bg-bg-input border-none px-7"
                    onChange={handleSetUsername}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id={"password"}
                    onChange={handleSetPassword}
                    value={password}
                    placeholder="********"
                    className="bg-bg-input border-none px-7"
                    type="password"
                  />
                </FormControl>
              </FormItem>
            </>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
