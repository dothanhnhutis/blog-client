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

import { getServerAuthSession } from "@/lib/auth";
import TagTable from "@/components/TagTable";

const TagsPage = async () => {
  const session = await getServerAuthSession();

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
          <TagTable session={session} />
        </CardContent>
      </Card>
    </>
  );
};

export default TagsPage;
