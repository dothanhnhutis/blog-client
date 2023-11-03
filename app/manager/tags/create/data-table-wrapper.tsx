"use client";
import { http } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataTable from "./data-table";
import { columns } from "./columns";
import { SessionInterface } from "@/common.type";

const DataTableWrapper = ({ session }: { session: SessionInterface }) => {
  const { data } = useQuery({
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
      }>("/tags");
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
        <DataTable session={session} data={data ?? []} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default DataTableWrapper;
