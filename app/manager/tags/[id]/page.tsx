"use client";
import { getToken } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getServerAuthSession } from "@/lib/auth";
import { cn, generateSlug, http } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LockIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  TrashIcon,
  UnlockIcon,
} from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const TagDetail = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split("/").pop();

  const tagQuery = useQuery({
    queryKey: ["tags", id],
    queryFn: async () => {
      const { data } = await http.get<{
        tag: {
          id: string;
          name: string;
          slug: string;
          _count: {
            post: number;
          };
        };
      }>("/tags/" + id);
      return data;
    },
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [tagSelected, setTagSelected] = useState<{
    name: string;
    slug: string;
  }>({
    name: tagQuery.data?.tag?.name ?? "",
    slug: tagQuery.data?.tag?.slug ?? "",
  });

  const [editable, setEditable] = React.useState(false);
  const [errorSlug, setErrorSlug] = React.useState(false);

  React.useEffect(() => {
    setErrorSlug(false);
  }, [tagSelected]);

  React.useEffect(() => {
    setTagSelected((prev) => ({
      ...prev,
      slug: generateSlug(prev.name),
    }));
  }, [tagSelected.name]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagSelected((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const tagDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      const { data: dataRes } = await http.delete("/tags/" + id, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"], exact: true });
      router.back();
      toast({
        description: "🥳 Delete tag success",
      });
    },
  });

  return (
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
          <Button
            onClick={() => tagDeleteMutation.mutate(id!)}
            variant="ghost"
            className="rounded-full w-10 h-10 p-2"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="rounded-full w-10 h-10 p-2">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {isEdit ? (
        <>
          <div className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Tag name</Label>
                <Input
                  id="name"
                  name="name"
                  value={tagSelected.name}
                  onChange={handleOnchange}
                  className="focus-visible:ring-transparent "
                  placeholder="Tag name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex gap-2">
                  <Input
                    disabled={!editable}
                    id="slug"
                    name="slug"
                    value={tagSelected.slug}
                    onChange={handleOnchange}
                    className={cn(
                      "focus-visible:ring-transparent",
                      errorSlug ? "border-red-400" : ""
                    )}
                    placeholder="Slug"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setEditable(!editable)}
                  >
                    {editable ? (
                      <UnlockIcon className="w-4 h-4" />
                    ) : (
                      <LockIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-2 px-4">
            <Button variant="outline">cancel</Button>
            <Button variant="default">Save</Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 p-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID:</p>
              <p className="text-muted-foreground">{tagQuery.data?.tag?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">NAME:</p>
              <p className="text-muted-foreground">
                {tagQuery.data?.tag?.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SLUG</p>
              <p className="text-muted-foreground">
                {tagQuery.data?.tag?.slug}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">POST</p>
              <p className="text-muted-foreground">
                {" "}
                {tagQuery.data?.tag?._count.post}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end gap-2 px-4">
            <Button variant="default" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TagDetail;
