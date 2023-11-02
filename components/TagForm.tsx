import React, { useState } from "react";
import slug from "slugify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn, http } from "@/lib/utils";
import { EditIcon, LockIcon, UnlockIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "domain";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const TagForm = ({
  type,
  token,
  data,
}: {
  type: "create" | "edit";

  data?: {
    name: string;
    slug: string;
  };
  token: string;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [editable, setEditable] = React.useState(false);

  const [form, setForm] = React.useState<{
    name: string;
    slug: string;
  }>(
    () =>
      data ?? {
        name: "",
        slug: "",
      }
  );

  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: slug(prev.name, { lower: true, locale: "vi" }),
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
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tags"], exact: true });
      setOpen(false);
      setForm({
        name: "",
        slug: "",
      });
    },
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    tagCreateMutation.mutate(form);
  };

  const { toast } = useToast();

  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger
        onClick={() => {
          // setOpen(true);
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }}
        asChild
      > */}
      {type === "create" ? (
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setOpen(true);
          }}
        >
          +
        </Button>
      ) : (
        <Button type="button" variant="secondary">
          <EditIcon className="mr-2 h-4 w-4" /> Edit
        </Button>
      )}
      {/* </AlertDialogTrigger> */}
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
                  className={cn("focus-visible:ring-transparent")}
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
              disabled={form.name.length === 0 || form.slug.length === 0}
            >
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TagForm;
