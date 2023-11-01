"use client";
import React, { useState } from "react";
import MediaChatImage from "@/images/mediachat.png";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  EditIcon,
  LockIcon,
  MoreHorizontalIcon,
  Trash,
  UnlockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import slug from "slugify";

const TagModel = ({
  type,
  children,
}: {
  type: "create" | "edit";
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editable, setEditable] = React.useState(false);

  const [form, setForm] = React.useState<{
    name: string;
    slug: string;
  }>({
    name: "",
    slug: "",
  });

  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: slug(prev.name, { lower: true, locale: "vi" }),
    }));
  }, [form.name]);

  // const tagCreateMutation = trpc.tags.create.useMutation({
  //   onError(error, variables, context) {},
  //   onSuccess: (data) => {
  //     tagQuery.refetch();
  //     if (data) {
  //       setOpen(false);
  //       setForm({
  //         name: "",
  //         slug: "",
  //       });
  //     }
  //   },
  // });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateTag = () => {
    // tagCreateMutation.mutate(form);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => {
          setOpen(true);
        }}
        asChild
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new tag</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Tag name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleOnchange}
              className="focus-visible:ring-transparent "
              placeholder="Tag name"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <div className="flex gap-2">
              <Input
                disabled={!editable}
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleOnchange}
                className={cn("focus-visible:ring-transparent")}
                placeholder="Slug"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditable(!editable)}
              >
                {editable ? (
                  <UnlockIcon className="w-4 h-4" />
                ) : (
                  <LockIcon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateTag}>
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const TagsPage = () => {
  // const tagQuery = trpc.tags.getAll.useQuery();

  // const [slugError, setSlugError] = useState<boolean>(false);

  // const tagDeleteMutation = trpc.tags.delete.useMutation({
  //   onError(error, variables, context) {
  //     console.log(error.message);
  //   },
  //   onSuccess: (data) => {
  //     tagQuery.refetch();
  //   },
  // });

  return (
    <>
      <div className="relative bg-[#ecf2ff] dark:bg-primary-foreground rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Tag</h4>
        <h6 className="font-normal text-lg">Manage your tag</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <Image priority src={MediaChatImage} alt="mediachat" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tag</CardTitle>
          <CardDescription>Manage your Tag</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <Input
              type="text"
              className="max-w-[400px]"
              placeholder="Filter tag name..."
            />
            <TagModel type="create">
              <Button type="button" variant="secondary">
                +
              </Button>
            </TagModel>
          </div>
          <div className="rounded-md border p-0">
            <Table>
              <TableCaption>A list of your tag</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tag name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {false ? (
                  [].map((tag) => (
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>name</TableCell>
                      <TableCell>slug</TableCell>
                      <TableCell>_countpost</TableCell>
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
                          <DropdownMenuContent
                            align="end"
                            className="w-[200px]"
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                              // onClick={() => {
                              //   setForm({
                              //     name: tag.name,
                              //     slug: tag.slug,
                              //   });
                              //   setOpen(true);
                              // }}
                              >
                                <EditIcon className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  // tagDeleteMutation.mutate({ id: tag.id });
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
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TagsPage;
