import { useState } from "react";
import { Button, EditProfileForm } from "@/components";
import { DialogComponents } from "@/components";
import { DrawerComponents } from "@/components";
import SettingsIcon from "@/assets/settings-icon.svg?react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
          <EditProfileForm />
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
        <EditProfileForm className="px-4" />
        <DrawerComponents.DrawerFooter className="pt-2">
          <DrawerComponents.DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerComponents.DrawerClose>
        </DrawerComponents.DrawerFooter>
      </DrawerComponents.DrawerContent>
    </DrawerComponents.Drawer>
  );
}
