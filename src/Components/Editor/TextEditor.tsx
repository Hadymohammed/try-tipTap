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

interface TextEditorProps {
  id: string;
  content: string;
  // onUpdate: (updatedContent: string) => void;
  appendSegment: (content: string, segmentId: string) => void;
  mergeSegment: (segmentId: string) => void;
}

export default function TextEditor({ id, content, appendSegment , mergeSegment}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false, // Disable the default paragraph extension
      }),
      Paragraph.configure({
        HTMLAttributes: {
          segmentId: id, // Pass the segment ID as data-id
        },
      }),
      Bold,
      Italic,
      SplitToSegmentOnEnter.configure({
        splitHandler: (content, segmentId) => {
          appendSegment(content, segmentId);
        },
      }),
      MergeSegmentOnBackspace.configure({
        mergeHandler: (segmentId) => {
          mergeSegment(segmentId);
        },
      }),
    ],
    content: `<p data-id="${id}">${content}</p>`, // Set the initial content with data-id
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
