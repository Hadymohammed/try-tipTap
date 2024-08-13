"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import { Paragraph } from "./extensions/CustomParagraph";
import Toolbar from "./toolbar/toolbar";
import './styles.css';
import SplitToSegmentOnEnter from "./extensions/SplitText.extension";
import MergeSegmentOnBackspace from "./extensions/MergeSegment.extension";
import SegmentExtension from "./nodes/Segment/Segment.extension";
import WordMark from "./nodes/Word/WordMark";

interface TextEditorProps {
  id: string;
  content: string;
  // onUpdate: (updatedContent: string) => void;
  // appendSegment: (content: string, segmentId: string) => void;
  // mergeSegment: (segmentId: string) => void;
}

export default function TextEditor({ id, content}: TextEditorProps) {
  // read json file
  const jsonSample = require("../../../public/formate.json");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      SegmentExtension,
      WordMark,
    ],
    content: jsonSample, // Set the initial content with data-id
    // onUpdate: ({ editor }) => {
    //   const updatedContent = editor.getHTML();
    //   onUpdate(updatedContent);
    // },
  });

  return (
    <>
      {editor && (
        <>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </>
      )}
    </>
  );
}
