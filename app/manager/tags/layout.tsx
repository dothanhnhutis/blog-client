import React from "react";
import Image from "next/image";
import MediaChatImage from "@/images/mediachat.png";
import { getServerAuthSession } from "@/lib/auth";
import TagSideBar from "@/components/TagSideBar";

const TagLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="xl:max-w-7xl xl:mx-auto px-6 pb-4 pt-3 h-full">
      <div className="flex flex-col flex-grow h-full">
        <div className="relative bg-[#ecf2ff] dark:bg-primary-foreground rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
          <h4 className="font-semibold text-2xl">Tag</h4>
          <h6 className="font-normal text-lg">Manage your tag</h6>
          <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
            <Image priority src={MediaChatImage} alt="mediachat" />
          </div>
        </div>
        <div className="flex border rounded-md h-full overflow-hidden">
          <TagSideBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default TagLayout;
