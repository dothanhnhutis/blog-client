"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "./data-table-column-header";

export type Tag = {
  id: string;
  name: string;
  slug: string;
  post: number;
};

export const columns: ColumnDef<Tag>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell({ row }) {
      return <div className="lg:w-[300px]">{row.getValue("id")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader title="NAME" column={column} />;
    },
    cell({ row }) {
      return <div>{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return <DataTableColumnHeader title="SLUG" column={column} />;
    },
    cell({ row }) {
      return <div>{row.getValue("slug")}</div>;
    },
  },
  {
    accessorKey: "post",
    header: ({ column }) => {
      return <DataTableColumnHeader title="POST" column={column} />;
    },
    cell({ row }) {
      return <div>{row.getValue("post")}</div>;
    },
  },
];
