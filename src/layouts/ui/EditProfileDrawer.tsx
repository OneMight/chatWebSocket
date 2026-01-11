import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components";
import { type ProfileFormType } from "@/types/types";
import { DialogComponents } from "@/components";
import { DrawerComponents } from "@/components";
import { Input } from "@/components";
import { Label } from "@/components";
import SettingsIcon from "@/assets/settings-icon.svg?react";
import { useMediaQuery } from "@/hooks/useMedaiQuery";
import { updateUser, type ChangeCredintionalsType } from "@/api/users/queries";
import { useAuth } from "@/app/context/UserContext";
export function EditProfileDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <DialogComponents.Dialog open={open} onOpenChange={setOpen}>
        <DialogComponents.DialogTrigger asChild>
          <Button
            variant="outline"
            className=" hover:text-hover-orange text-black-text cursor-pointer flex flex-row gap-2 items-center"
          >
            <SettingsIcon />
            Edit Profile
          </Button>
        </DialogComponents.DialogTrigger>
        <DialogComponents.DialogContent className="sm:max-w-106.25 bg-white-color">
          <DialogComponents.DialogHeader>
            <DialogComponents.DialogTitle>
              Edit profile
            </DialogComponents.DialogTitle>
            <DialogComponents.DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogComponents.DialogDescription>
          </DialogComponents.DialogHeader>
          <ProfileForm />
        </DialogComponents.DialogContent>
      </DialogComponents.Dialog>
    );
  }

  return (
    <DrawerComponents.Drawer open={open} onOpenChange={setOpen}>
      <DrawerComponents.DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerComponents.DrawerTrigger>
      <DrawerComponents.DrawerContent className="bg-white-color">
        <DrawerComponents.DrawerHeader className="text-left">
          <DrawerComponents.DrawerTitle>
            Edit profile
          </DrawerComponents.DrawerTitle>
          <DrawerComponents.DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerComponents.DrawerDescription>
        </DrawerComponents.DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerComponents.DrawerFooter className="pt-2">
          <DrawerComponents.DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerComponents.DrawerClose>
        </DrawerComponents.DrawerFooter>
      </DrawerComponents.DrawerContent>
    </DrawerComponents.Drawer>
  );
}

function ProfileForm({ className }: ProfileFormType) {
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
