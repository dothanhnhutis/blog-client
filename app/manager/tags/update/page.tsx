"use client";
import React, { useState } from "react";
import MediaChatImage from "@/images/mediachat.png";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { PencilIcon, SaveIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Update = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tagSelected, setTagSelected] = useState<
    | {
        id: string;
        name: string;
        slug: string;
      }
    | undefined
  >();

  return (
    <>
      <div className="relative bg-[#ecf2ff] dark:bg-primary-foreground rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Tag</h4>
        <h6 className="font-normal text-lg">Manage your tag</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <Image priority src={MediaChatImage} alt="mediachat" />
        </div>
      </div>
      <div className="flex border rounded-md overflow-hidden h-full">
        <Command className="border-r rounded-none max-w-[220px]">
          <CommandInput placeholder="Search tag..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="border-none">
              <CommandItem>
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>

        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between p-2 border-b">
            <h3 className="text-lg">Tag Details</h3>
            <div className="flex gap-1">
              <Button
                onClick={() => setIsEdit(!isEdit)}
                variant="ghost"
                className="rounded-full w-10 h-10 p-2"
              >
                {isEdit ? (
                  <SaveIcon className="w-4 h-4" />
                ) : (
                  <PencilIcon className="w-4 h-4" />
                )}
              </Button>
              <Button variant="ghost" className="rounded-full w-10 h-10 p-2">
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div>asdasd</div>
        </div>
      </div>
    </>
  );
};

export default Update;
