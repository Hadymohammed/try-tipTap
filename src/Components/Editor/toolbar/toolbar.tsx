import { Editor ,BubbleMenu} from "@tiptap/react";

export default function Toolbar ({editor}:{editor:Editor}){
    return (
        <BubbleMenu
          editor={editor}
          className="bg-white p-2 shadow-lg rounded-md border"
          tippyOptions={{ duration: 100 }}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`mr-2 ${
              editor.isActive("bold") ? "font-bold text-blue-500" : ""
            }`}
          >
            Bold
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`mr-2 ${
              editor.isActive("italic") ? "italic text-blue-500" : ""
            }`}
          >
            Italic
          </button>
        </BubbleMenu>
    )
}