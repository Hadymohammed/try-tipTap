// components/extensions/SplitToSegmentOnEnter.ts
import { Extension } from '@tiptap/core';
import { Node } from '@tiptap/pm/model';
import { TextSelection } from '@tiptap/pm/state';

interface SplitToSegmentOnEnterOptions {
  splitHandler: (content: string, segmentId: string) => void;
}

const SplitToSegmentOnEnter = Extension.create<SplitToSegmentOnEnterOptions>({
  name: 'splitToSegmentOnEnter',

  addOptions() {
    return {
      splitHandler: () => {},
    };
  },

  addKeyboardShortcuts() {
    return {
      'Enter': () => {
        // disable the default behavior
        const { editor } = this;
        const { state } = editor;
        const { selection } = state;
        const { $cursor } = selection as TextSelection;

        if (!$cursor) {
          return false;
        }


        const pos = $cursor.pos;
        const nodeBefore = $cursor.nodeBefore;
        const nodeAfter = $cursor.nodeAfter;

        if (nodeBefore && nodeAfter) {
            const segmentId = $cursor.parent.attrs.segmentId || ''; 
            const content = nodeAfter.textContent;


          this.options.splitHandler(content, segmentId);

          const tr = state.tr;

          //delete nodeAfter
          tr.delete(pos, pos + nodeAfter.nodeSize);

          const newPos = pos + 1; // Adjust based on your requirements
          tr.setSelection(TextSelection.create(tr.doc, newPos, newPos));

          // Dispatch the transaction
          editor.view.dispatch(tr);

          return true;
        }
        
        return false;
      },
    };
  },
});

export default SplitToSegmentOnEnter;
