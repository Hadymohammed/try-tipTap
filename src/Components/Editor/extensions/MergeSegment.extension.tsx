import { Extension } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';

interface MergeSegmentOnBackspaceOptions {
  mergeHandler: (segmentId: string) => void;
}

const MergeSegmentOnBackspace = Extension.create<MergeSegmentOnBackspaceOptions>({
  name: 'mergeSegmentOnBackspace',

  addOptions() {
    return {
      mergeHandler: () => {},
    };
  },

  addKeyboardShortcuts() {
    return {
      'Backspace': () => {
        const { editor } = this;
        const { state, view } = editor;
        const { selection } = state;
        const { $cursor } = selection as TextSelection;

        if (!$cursor) {
          return false;
        }

        const pos = $cursor.pos;
        const nodeBefore = $cursor.nodeBefore;
        const nodeAfter = $cursor.nodeAfter;

        if (!nodeBefore && nodeAfter) {
          const segmentId = $cursor.parent.attrs['segmentId'] || ''; 

          // Call the mergeHandler to handle merging
          this.options.mergeHandler(segmentId);

          const tr = state.tr;

          view.dispatch(tr);

          return true;
        }

        return false;
      },
    };
  },
});

export default MergeSegmentOnBackspace;
