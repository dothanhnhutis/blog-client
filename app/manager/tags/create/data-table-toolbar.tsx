import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { Table } from "@tanstack/react-table";
import { cn, http } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  token: string;
}

export default function DataTableToolbar<TData>({
  table,
  token,
}: DataTableToolbarProps<TData>) {
  const queryClient = useQueryClient();

  const tagDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await http.delete("/tags/" + id, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"], exact: true });
    },
  });

  return (
    <div className="flex justify-between gap-4">
      <Input
        type="text"
        className="max-w-[400px]"
        placeholder="Filter tag name..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
      />

      <div className="ml-auto flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          disabled={!(table.getFilteredSelectedRowModel().rows.length === 1)}
          // onClick={() => {
          //   tagDeleteMutation.mutate(
          //     table.getRow(Object.keys(table.getState().rowSelection)[0])
          //       .original
          //   );
          // }}
        >
          <EditIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" className="">
          <TrashIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost">
          <PlusIcon className="h-4 w-4" />
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
