import TagFormAlertDialog from "@/components/TagFormAlertDialog";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";
import { PlusIcon } from "lucide-react";
import React from "react";

const TagsPage = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center justify-between p-2 border-b min-h-[57px]">
        <h3 className="text-lg">Tag Details</h3>
        <div className="flex gap-1">
          <TagFormAlertDialog token={session.user.token} />
        </div>
      </div>
      <div className="p-2 text-center">No selected</div>
    </div>
  );
};

export default TagsPage;
