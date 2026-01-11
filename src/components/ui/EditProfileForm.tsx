import { ChangeCredintionalsType, updateUser } from "@/api/users/queries";
import { useAuth } from "@/app/context/UserContext";
import { cn } from "@/lib/utils";
import { ProfileFormType } from "@/types/types";
import { ChangeEvent, useState } from "react";
import { Label, Input, Button } from "@/components/index";
export default function ProfileForm({ className }: ProfileFormType) {
  const context = useAuth();
  const [userProp, setUserProp] = useState<ChangeCredintionalsType>({
    lastname: "",
    username: "",
    id: context?.user?.id,
  });

  const handleSetUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProp({ ...userProp, [e.target.id]: e.target.value });
  };
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(userProp);
  };

  return (
    <form
      onSubmit={handleUpdate}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="Lastname">LastName</Label>
        <Input
          type="Lastname"
          id="lastname"
          placeholder="Lastname"
          onChange={handleSetUser}
          value={userProp.lastname}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Username"
          value={userProp.username}
          onChange={handleSetUser}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
