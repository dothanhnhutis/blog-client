"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import slug from "slugify";

import { useEditor } from "@tiptap/react";
import {
  Check,
  ChevronsUpDown,
  ImagePlusIcon,
  LockIcon,
  UnlockIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const frameworks1 = [
  {
    name: "ThanhNhut",
    email: "dothanhnhutis@gmail.com",
    image: "https://avatars.githubusercontent.com/u/62380954?v=4",
    id: "ae29363d-4eff-462e-827f-7cf5dfd1392a",
  },
  {
    name: "ThanhNhut1",
    email: "dothanhnhutis1@gmail.com",
    image: "https://avatars.githubusercontent.com/u/62380954?v=4",
    id: "ae29363d-4eff-462e-827f-7cf5dfd1392b",
  },
];

const PostForm = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      Highlight,
      Underline,
      Link.configure({
        protocols: ["ftp", "mailto"],
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 underline",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image.configure({
        HTMLAttributes: {
          class: "w-[100px] h-[100px]",
        },
        allowBase64: true,
      }),
    ],
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          attrs: { textAlign: "left" },
        },
      ],
    },
    autofocus: true,
    editable: true,
    injectCSS: true,
  });

  const [data, setData] = useState<{
    thumnail: string;
    name: string;
    slug: string;
    category: string;
    content: string;
    userId: string;
  }>({
    thumnail: "",
    name: "",
    slug: "",
    category: "",
    content: "",
    userId: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, slug: slug(prev.name) }));
  }, [data.name]);

  const [editable, setEditable] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState(
    "ae29363d-4eff-462e-827f-7cf5dfd1392a"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create post</CardTitle>
        <CardDescription>Create new post now</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid sm:grid-cols-2 w-full gap-4">
            <Label
              htmlFor="thumnail"
              className="h-[200px] sm:h-auto text-muted-foreground border-2 border-dashed w-full rounded-lg flex items-center justify-center cursor-pointer"
            >
              <div>
                <ImagePlusIcon className="w-14 h-14" />
                <p>Thumnail</p>
              </div>

              <input
                type="file"
                name="thumnail"
                id="thumnail"
                className="hidden"
              />
            </Label>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleOnchange}
                  className="focus-visible:ring-transparent "
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex gap-2">
                  <Input
                    disabled={!editable}
                    id="slug"
                    name="slug"
                    value={data.slug}
                    onChange={handleOnchange}
                    className="focus-visible:ring-transparent "
                    placeholder="Name of your project"
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between"
                    >
                      {value
                        ? frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        : "Select framework..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 ">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-scroll">
                        <CommandItem>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              true ? "opacity-100" : "opacity-0"
                            )}
                          />
                          sdsd
                        </CommandItem>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Author</Label>
                <Popover open={open1} onOpenChange={setOpen1}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between h-auto"
                    >
                      <div className="flex gap-2 overflow-hidden">
                        <Avatar>
                          <AvatarImage
                            sizes=""
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <Skeleton className="h-12 w-12 rounded-full" />
                        </Avatar>
                        <div className="text-start w-full overflow-hidden">
                          <p className="truncate">Thanh Nhut</p>
                          <p className="text-sm text-muted-foreground truncate">
                            dothanhnhis@gmail.com
                          </p>
                        </div>
                      </div>

                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup className="max-w-full overflow-y-scroll">
                        <CommandItem className="justify-between gap-2">
                          <Avatar>
                            <AvatarImage
                              sizes=""
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <Skeleton className="h-12 w-12 rounded-full" />
                          </Avatar>
                          <div className="w-full overflow-hidden">
                            <p className="truncate">Thanh Nhut</p>
                            <p className="text-sm text-muted-foreground truncate">
                              dothanhnhis@gmail.com
                            </p>
                          </div>
                          <Check
                            className={cn(
                              "flex flex-shrink-0 h-4 w-4",
                              true ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                        {frameworks1.map((framework1) => (
                          <CommandItem
                            key={framework1.id}
                            value={framework1.id}
                            onSelect={(currentValue) => {
                              setValue1(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen1(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework1.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework1.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 mt-4">
            <Label htmlFor="">Content</Label>
            <Tiptap editor={editor} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default PostForm;
