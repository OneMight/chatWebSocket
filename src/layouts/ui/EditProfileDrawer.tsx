import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className=" hover:text-hover-orange text-black-text cursor-pointer flex flex-row gap-2 items-center"
          >
            <SettingsIcon />
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 bg-white-color">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white-color">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
type ProfileFormType = {
  className?: string;
};
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
