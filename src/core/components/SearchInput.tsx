import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Input } from "@/core/index";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useSearchByInput } from "@/core/api/conversation/queries";
import React from "react";
import { ScrollArea } from "./ScrollArea";
import { Spinner } from "./Spinner";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/core/routes/routesPath";

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
          className="absolute top-13 h-auto bg-white z-20 w-112.5 rounded-xl *:data-[slot=scroll-area-viewport]:h-auto
    *:data-[slot=scroll-area-viewport]:max-h-50"
          style={{ position: "absolute" }}
        >
          {postsLoading ? (
            <div className="size-full flex items-center justify-center">
              <Spinner className="size-10" />
            </div>
          ) : (
            searchedPosts?.posts.map((post, index) => (
              <React.Fragment key={post.id}>
                <Link
                  to={ROUTES.POSTPAGE}
                  params={{ postId: String(post.id) }}
                  className="flex flex-col gap-1 w-100 p-3"
                >
                  <p className="font-bold  w-full truncate">{post.title}</p>
                  <p className=" w-full truncate">{post.body}</p>
                </Link>
                {index !== searchedPosts.posts.length - 1 && (
                  <Separator className="h-0.5 bg-black" />
                )}
              </React.Fragment>
            ))
          )}
        </ScrollArea>
      )}
    </div>
  );
};
