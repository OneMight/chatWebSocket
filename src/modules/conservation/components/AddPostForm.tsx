import {
  addPost,
  AddPostFields,
  useGetAllTags,
} from "@/core/api/conversation/queries";
import { ProfileFormType } from "@/core/types/types";
import { useState, FormEvent, ChangeEvent } from "react";
import {
  ScrollArea,
  Checkbox,
  Separator,
  Button,
  Label,
  Spinner,
  Input,
} from "@/core/index";
import { cn } from "@/core/libs/utils";

export default function AddPostForm({ className, userId }: ProfileFormType) {
  const { tags, tagsLoading } = useGetAllTags();
  const [selectedTags, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<AddPostFields>({
    userId: userId || null,
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
      <div className="flex flex-row gap-1 items-center overflow-scroll overflow-y-hidden">
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
            <Label key={index} htmlFor={tag} className="cursor-pointer">
              <div className="flex flex-row gap-2 items-center justify-start">
                <Checkbox id={tag} onCheckedChange={() => handleSelect(tag)} />
                {tag}
              </div>
              <Separator />
            </Label>
          ))}
        </div>
      </ScrollArea>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
