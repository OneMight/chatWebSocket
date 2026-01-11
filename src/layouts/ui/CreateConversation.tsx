import { Activity, useState } from "react";
import { AddPostForm, Button } from "@/components";
import { DialogComponents } from "@/components";
import { DrawerComponents } from "@/components";
import PlusIcon from "@/assets/plus-icon.svg?react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuth } from "@/app/context/UserContext";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routes/routesPath";
import { DialogClose } from "@radix-ui/react-dialog";

export function CreateConversation() {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const context = useAuth();
  const navigate = useNavigate();

  const handleDirectToAuth = () => {
    navigate({ to: ROUTES.AUTH });
  };

  if (isDesktop) {
    return (
      <DialogComponents.Dialog open={open} onOpenChange={setOpen}>
        <DialogComponents.DialogTrigger asChild>
          <Button className=" hover:bg-hover-orange w-full text-white-color cursor-pointer flex flex-row gap-2 items-center transition-colors">
            <PlusIcon />
            Start a New Conversation
          </Button>
        </DialogComponents.DialogTrigger>
        {context?.isAuthenticated ? (
          <DialogComponents.DialogContent className="sm:max-w-106.25 bg-white-color">
            <DialogComponents.DialogHeader>
              <DialogComponents.DialogTitle>
                Create conversation
              </DialogComponents.DialogTitle>
              <DialogComponents.DialogDescription>
                Create a new conversation here. Click save when you&apos;re
                done.
              </DialogComponents.DialogDescription>
            </DialogComponents.DialogHeader>
            <Activity>
              <AddPostForm userId={context.user?.id || null} />
            </Activity>
          </DialogComponents.DialogContent>
        ) : (
          <DialogComponents.DialogContent className="bg-white-color">
            <DialogComponents.DialogHeader className="text-left">
              <DialogComponents.DialogTitle>
                Create conversation
              </DialogComponents.DialogTitle>
              <DialogComponents.DialogDescription>
                You need to be authorized to create conversation.
              </DialogComponents.DialogDescription>
            </DialogComponents.DialogHeader>
            <DialogComponents.DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" onClick={handleDirectToAuth}>
                  Login now
                </Button>
              </DialogClose>
            </DialogComponents.DialogFooter>
          </DialogComponents.DialogContent>
        )}
      </DialogComponents.Dialog>
    );
  }

  return (
    <DrawerComponents.Drawer open={open} onOpenChange={setOpen}>
      <DrawerComponents.DrawerTrigger asChild>
        <Button className="w-full hover:bg-hover-orange text-white-color cursor-pointer flex flex-row gap-2 items-center transition-colors">
          <PlusIcon />
          Start a New Conversation
        </Button>
      </DrawerComponents.DrawerTrigger>
      {context?.isAuthenticated ? (
        <DrawerComponents.DrawerContent className="bg-white-color">
          <DrawerComponents.DrawerHeader className="text-left">
            <DrawerComponents.DrawerTitle>
              Create conversation
            </DrawerComponents.DrawerTitle>
            <DrawerComponents.DrawerDescription>
              Create a new conversation here. Click save when you&apos;re done.
            </DrawerComponents.DrawerDescription>
          </DrawerComponents.DrawerHeader>
          <Activity>
            <AddPostForm
              className="px-4 mb-2"
              userId={context.user?.id || null}
            />
          </Activity>
        </DrawerComponents.DrawerContent>
      ) : (
        <DrawerComponents.DrawerContent className="bg-white-color">
          <DrawerComponents.DrawerHeader className="text-left">
            <DrawerComponents.DrawerTitle>
              Create conversation
            </DrawerComponents.DrawerTitle>
            <DrawerComponents.DrawerDescription>
              You need to be authorized to create conversation.
            </DrawerComponents.DrawerDescription>
          </DrawerComponents.DrawerHeader>
          <DrawerComponents.DrawerFooter className="pt-2">
            <DrawerComponents.DrawerClose asChild>
              <Button variant="outline" onClick={handleDirectToAuth}>
                Login now
              </Button>
            </DrawerComponents.DrawerClose>
          </DrawerComponents.DrawerFooter>
        </DrawerComponents.DrawerContent>
      )}
    </DrawerComponents.Drawer>
  );
}
