"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { SessionInterface } from "@/common.type";
import { Button } from "./ui/button";

import TagForm from "./TagForm";
import TagCells from "./TagCells";

const TagTable = ({ session }: { session: SessionInterface }) => {
  return (
    <>
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
      <div className="rounded-md border p-0">
        <Table>
          <TableCaption>A list of your tag</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>SLUG</TableHead>
              <TableHead>POST</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TagCells session={session} />
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TagTable;
