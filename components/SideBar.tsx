import React from "react";
import { Circle, TextSelect } from "lucide-react";
import { Button } from "./ui/button";

const SideBar = () => {
  return (
    <div className="flex-shrink-0 p-2 max-w-[220px] flex flex-col gap-1">
      <Button variant="ghost" className="flex justify-start gap-3 px-3 w-full">
        <TextSelect className="flex flex-shrink-0 w-6 h-6" />
        <p className="hidden lg:block truncate">asdasdsadas</p>
      </Button>
      <Button variant="secondary" className="flex gap-3 px-3 w-full">
        <TextSelect className="flex flex-shrink-0 w-6 h-6" />
        <p className="hidden lg:block truncate">
          asdasdsadasdsadsadsadsadsadsadasdsad
        </p>
      </Button>
      <div className="hidden lg:block">
        <Button variant="secondary" className="flex gap-3 px-3 w-full">
          <Circle className="flex flex-shrink-0 w-6 h-6 p-2" />
          <p className="hidden lg:block truncate">
            asdasdsadasdsadsadsadsadsadsadasdsad
          </p>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
