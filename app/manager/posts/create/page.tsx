import React from "react";
import MediaChatImage from "@/images/mediachat.png";
import Image from "next/image";
import PostForm from "@/components/PostForm";

const CreatePostPage = () => {
  return (
    <>
      <div className="relative bg-[#ecf2ff] dark:bg-primary-foreground rounded-xl overflow-hidden px-[25px] pt-[30px] pb-5 mb-6">
        <h4 className="font-semibold text-2xl">Blog app</h4>
        <h6 className="font-normal text-lg">Create new post now</h6>
        <div className="absolute right-[20px] top-0 w-[165px] h-[165px] ">
          <Image priority src={MediaChatImage} alt="mediachat" />
        </div>
      </div>
      <PostForm />
    </>
  );
};

export default CreatePostPage;
