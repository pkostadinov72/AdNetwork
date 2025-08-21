import { FC, useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchQuery } from "@/services/searchApi";
import { Smile, User } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import { DialogType } from "@/types/dialog";
import { useDialog } from "@/hooks/useDialog";
import { Link } from "react-router-dom";

export const SearchCommand: FC = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { openDialog } = useDialog();

  const { data, isLoading, isFetching } = useSearchQuery(debouncedQuery);

  const users = data?.users ?? [];
  const posts = data?.posts ?? [];

  const hasResults = users.length > 0 || posts.length > 0;

  const handlePostClick = (postId: string, userId: string) => {
    openDialog(DialogType.POST_WITH_COMMENTS, {
      postId,
      userId
    });
  };

  return (
    <Command className="rounded-lg md:min-w-[450px]">
      <CommandInput
        placeholder="Search users or post content..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {(isLoading || isFetching) && (
          <div className="flex justify-center items-center py-4">
            <ClipLoader size={24} color="#4A4A4A" />
          </div>
        )}

        {query.length > 0 && !isFetching && !hasResults && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}

        {users.length > 0 && (
          <CommandGroup heading="Users">
            {users.map((user) => (
              <Link key={user.id} to={`/profile/${user?.username}`}>
                <CommandItem
                  key={user.id}
                  value={`${user.fullName} ${user.username}`}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>
                    {user.fullName} (@{user.username})
                  </span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        )}

        {posts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Posts">
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.content}
                  onSelect={() => handlePostClick(post.id, post.userId)}
                  className="cursor-pointer"
                >
                  <Smile className="mr-2 h-4 w-4" />
                  <span>{post.content}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
};
