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
import { http } from "@/lib/utils";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const TagContainer = ({ session }: { session: SessionInterface }) => {
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
        <TankStackTable
          token={session.user.token}
          columns={columns}
          data={tagQuery.data ?? []}
        />
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
