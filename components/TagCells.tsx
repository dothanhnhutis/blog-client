import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { EditIcon, MoreHorizontalIcon, Trash } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "@/lib/utils";
import { SessionInterface } from "@/common.type";
import { TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import TagForm from "./TagForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const TagCells = ({ session }: { session: SessionInterface }) => {
  const queryClient = useQueryClient();
  const tagQuery = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await http.get<{
        message: string;
        tags: {
          id: string;
          name: string;
          slug: string;
          _count: { post: number };
        }[];
      }>("/tags", {
        headers: {
          Authorization: session.user.token,
        },
      });
      return data;
    },
  });

  const tagDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await http.delete("/tags/" + id, {
        headers: {
          Authorization: session.user.token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"], exact: true });
    },
  });

  return (
    <>
      {tagQuery.data ? (
        tagQuery.data.tags.length === 0 ? (
          <TableCell colSpan={5} className="text-center">
            <span className="text-muted-foreground">No element</span>
          </TableCell>
        ) : (
          tagQuery.data.tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.id}</TableCell>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.slug}</TableCell>
              <TableCell>{tag._count.post}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="focus-visible:outline-none"
                      variant="ghost"
                      size="sm"
                    >
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <TagForm
                          type="edit"
                          data={tag}
                          token={session.user.token}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          tagDeleteMutation.mutate(tag.id);
                        }}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )
      ) : (
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[50px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[50px]" />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TagCells;
