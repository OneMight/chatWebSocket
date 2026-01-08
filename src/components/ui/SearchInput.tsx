import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Input } from "./Input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useSearchByInput } from "@/api/conversation/queries";
import React from "react";
import { ScrollArea } from "./scroll-area";
import { Spinner } from "./spinner";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/routesPath";

export const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { searchedPosts, postsLoading } =
    useSearchByInput(debouncedSearch) || [];

  const condition = isOpen && searchedPosts?.posts.length != 0;
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  return (
    <div className="revative" ref={containerRef}>
      <Input
        data-testid="test-input"
        id="SearchInput"
        className="w-md hidden md:block"
        placeholder="Search discussions..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onClick={() => setIsOpen(true)}
      />
      {condition && (
        <ScrollArea
          data-testid="OpenedSearch"
          className="absolute top-13 h-50 bg-white z-20 w-112.5 rounded-xl"
          style={{ position: "absolute" }}
        >
          {postsLoading ? (
            <Spinner className="size-10" />
          ) : (
            searchedPosts?.posts.map((post) => (
              <React.Fragment key={post.id}>
                <Link
                  to={ROUTES.POSTPAGE}
                  params={{ postId: String(post.id) }}
                  className="flex flex-col gap-1 w-100 p-3"
                >
                  <p className="font-bold  w-full truncate">{post.title}</p>
                  <p className=" w-full truncate">{post.body}</p>
                </Link>
                <Separator className="h-0.5 bg-black" />
              </React.Fragment>
            ))
          )}
        </ScrollArea>
      )}
    </div>
  );
};
