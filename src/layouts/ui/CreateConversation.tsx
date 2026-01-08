import { Activity, ChangeEvent, FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  Checkbox,
  DialogFooter,
  ScrollArea,
  Separator,
  Spinner,
} from "@/components";
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
import PlusIcon from "@/assets/plus-icon.svg?react";
import { useMediaQuery } from "@/hooks/useMedaiQuery";
import { AddPostFields, useGetAllTags } from "@/api/conversation/queries";
import React from "react";
import { useAuth } from "@/app/context/UserContext";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";
import { DialogClose } from "@radix-ui/react-dialog";
import { addPost } from "@/api/conversation/queries";

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className=" hover:bg-hover-orange w-full text-white-color cursor-pointer flex flex-row gap-2 items-center transition-colors">
            <PlusIcon />
            Start a New Conversation
          </Button>
        </DialogTrigger>
        {context?.isAuthenticated ? (
          <DialogContent className="sm:max-w-106.25 bg-white-color">
            <DialogHeader>
              <DialogTitle>Create conversation</DialogTitle>
              <DialogDescription>
                Create a new conversation here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <Activity>
              <AddPostForm userId={context.user?.id} />
            </Activity>
          </DialogContent>
        ) : (
          <DialogContent className="bg-white-color">
            <DialogHeader className="text-left">
              <DialogTitle>Create conversation</DialogTitle>
              <DialogDescription>
                You need to be authorized to create conversation.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" onClick={handleDirectToAuth}>
                  Login now
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full hover:bg-hover-orange text-white-color cursor-pointer flex flex-row gap-2 items-center transition-colors">
          <PlusIcon />
          Start a New Conversation
        </Button>
      </DrawerTrigger>
      {context?.isAuthenticated ? (
        <DrawerContent className="bg-white-color">
          <DrawerHeader className="text-left">
            <DrawerTitle>Create conversation</DrawerTitle>
            <DrawerDescription>
              Create a new conversation here. Click save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          <Activity>
            <AddPostForm className="px-4 mb-2" userId={context.user?.id} />
          </Activity>
        </DrawerContent>
      ) : (
        <DrawerContent className="bg-white-color">
          <DrawerHeader className="text-left">
            <DrawerTitle>Create conversation</DrawerTitle>
            <DrawerDescription>
              You need to be authorized to create conversation.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleDirectToAuth}>
                Login now
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
}
type ProfileFormType = {
  className?: string;
  userId: number | undefined;
};
function AddPostForm({ className, userId }: ProfileFormType) {
  const { tags, tagsLoading } = useGetAllTags();
  const [selectedTags, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<AddPostFields>({
    userId: userId,
    body: "",
    tags: [],
    title: "",
  });
  const handleAddPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPost(data);
  };
  const handleSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
      setSelected(newTags);
      setData((prev) => ({ ...prev, tags: newTags }));
    } else {
      setSelected([...selectedTags, tag]);
      setData((prev) => ({ ...prev, tags: selectedTags }));
    }
  };
  if (tagsLoading) {
    return <Spinner className="size-10" />;
  }
  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={(e) => handleAddPost(e)}
    >
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          type="title"
          id="title"
          placeholder="title"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="description"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData((prev) => ({ ...prev, body: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-row gap-1 items-center  overflow-scroll">
        Tags{" "}
        {selectedTags &&
          selectedTags.map((tag, index) => (
            <p key={index} className="bg-tag-bg text-tag-text p-1 rounded-xl">
              {tag}
            </p>
          ))}
      </div>
      <ScrollArea className="rounded-md border h-30">
        <div className="p-4">
          {tags?.map((tag: string, index: number) => (
            <React.Fragment key={index}>
              <div className="flex flex-row gap-2 items-center justify-start">
                <Checkbox id={tag} onCheckedChange={() => handleSelect(tag)} />
                <Label htmlFor={tag}>{tag}</Label>
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
