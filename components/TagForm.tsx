import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn, generateSlug, http } from "@/lib/utils";
import { LockIcon, UnlockIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { isAxiosError } from "axios";

const TagForm = ({
  type,
  token,
  tag,
  render,
}: {
  render: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => JSX.Element;
  type: "create" | "edit";
  tag?: {
    id: string;
    name: string;
    slug: string;
  };
  token: string;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [editable, setEditable] = React.useState(false);
  const [errorSlug, setErrorSlug] = React.useState(false);

  const [form, setForm] = React.useState<{
    name: string;
    slug: string;
  }>(() =>
    type === "create"
      ? {
          name: "",
          slug: "",
        }
      : tag ?? {
          name: "",
          slug: "",
        }
  );

  React.useEffect(() => {
    setErrorSlug(false);
  }, [form]);

  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: generateSlug(prev.name),
    }));
  }, [form.name]);

  const tagCreateMutation = useMutation({
    mutationFn: async (data: { name: string; slug: string }) => {
      const { data: dataRes } = await http.post("/tags", data, {
        headers: {
          Authorization: token,
        },
      });
      return dataRes;
    },
    onError() {
      setErrorSlug(true);
      toast({
        description: "😟 Slug has been used",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tags"], exact: true });
      setOpen(false);
      setForm({
        name: "",
        slug: "",
      });
      toast({
        description: "🥳 Create tag success",
      });
    },
  });

  const tagUpdateMutation = useMutation({
    mutationFn: async (data: { name: string; slug: string }) => {
      const { data: dataRes } = await http.patch("/tags/" + tag?.id, data, {
        headers: {
          Authorization: token,
        },
      });
      return dataRes;
    },
    onError(error) {
      console.log(isAxiosError(error) && error.response?.data);
      setErrorSlug(true);
      toast({
        description: "😟 Slug has been used",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tags"], exact: true });
      setOpen(false);
      setForm({
        name: "",
        slug: "",
      });
      toast({
        description: "🥳 Edit tag success",
      });
    },
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "create") {
      tagCreateMutation.mutate({ name: form.name, slug: form.slug });
    } else {
      tagUpdateMutation.mutate({ name: form.name, slug: form.slug });
    }
  };

  return (
    <AlertDialog open={open}>
      {render(setOpen)}
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create new tag</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Tag name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
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
                  value={form.slug}
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

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="button" onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={
                form.name.length === 0 ||
                form.slug.length === 0 ||
                (type === "edit" && form.name === tag?.name) ||
                form.slug === tag?.slug
              }
            >
              {type === "create" ? "Create" : "Save"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TagForm;
