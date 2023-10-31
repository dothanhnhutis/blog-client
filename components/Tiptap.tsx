import { EditorContent, Editor } from "@tiptap/react";
import ToolBar from "./ToolBar";
import { Skeleton } from "./ui/skeleton";

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="p-4 border rounded-lg">
      <ToolBar editor={editor} />
      {editor ? (
        <EditorContent
          id="content"
          spellCheck={false}
          editor={editor}
          className="p-4 border rounded-lg w-full h-[300px] overflow-y-scroll outline-none"
        />
      ) : (
        <Skeleton className="rounded-lg w-full h-[300px]" />
      )}
    </div>
  );
};
export default Tiptap;
