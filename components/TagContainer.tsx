"use client";
import React from "react";
import { Input } from "./ui/input";
import TagForm from "./TagForm";
import { Button } from "./ui/button";
import { SessionInterface } from "@/common.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { cn, http } from "@/lib/utils";
import {
  CellContext,
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EditIcon,
  LockIcon,
  MoreHorizontalIcon,
  Trash,
  UnlockIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    updateData: (id: string, value: { name: string; slug: string }) => void;
  }
}
type TagData = {
  id: string;
  name: string;
  slug: string;
  post: number;
};

const columns: ColumnDef<TagData>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return <div className="lg:w-[300px]">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "slug",
    header: "SLUG",
    cell({ row }) {
      return <div>{row.getValue("slug")}</div>;
    },
  },
  {
    accessorKey: "post",
    header: "POST",
    cell({ row }) {
      return <div>{row.getValue("post")}</div>;
    },
  },

  {
    id: "actions",
    cell(ctx) {
      console.log(ctx.row.original.id);
      return <ActionCell {...ctx} />;
    },
  },
];

function ActionCell({
  getValue,
  row,
  column,
  table,
}: CellContext<TagData, unknown>) {
  const [editable, setEditable] = React.useState(false);
  return (
    <AlertDialog>
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
              <AlertDialogTrigger className="flex items-center w-full">
                <EditIcon className="mr-2 h-4 w-4" /> Edit
              </AlertDialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                console.log(1);
                table.options.meta?.updateData(row.original.id, {
                  name: row.original.name,
                  slug: row.original.slug,
                });
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <form>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit tag</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="flex flex-col space-y-4 mt-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Tag name</Label>
              <Input
                id="name"
                name="name"
                className="focus-visible:ring-transparent "
                placeholder="Tag name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  name="slug"
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

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Save</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function TankStackTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (id: string, value: { name: string; slug: string }) => {
        console.log(id, value);
      },
    },
  });
  return (
    <div className="rounded-md border p-0">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroups) => (
            <TableRow key={headerGroups.id}>
              {headerGroups.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const TagContainer = ({ session }: { session: SessionInterface }) => {
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

      return data.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        post: tag._count.post,
      }));
    },
  });
  return (
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

          <TagForm
            type="create"
            token={session.user.token}
            render={(setOpen) => {
              return (
                <Button
                  onClick={() => setOpen(true)}
                  type="button"
                  variant="secondary"
                >
                  +
                </Button>
              );
            }}
          />
        </div>
        <TankStackTable columns={columns} data={tagQuery.data ?? []} />
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            10 of 100 row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select value={"10"}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={10} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page 1 of 2
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TagContainer;
