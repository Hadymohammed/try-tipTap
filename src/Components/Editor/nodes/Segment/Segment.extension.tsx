import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Segment from './Segment'

export default Node.create({
  name: 'segment',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      segmentId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          return {
            'data-id': attributes.segmentId || null, // Ensure the 'data-id' is rendered
          };
        },
      },

        speaker: {
            default: null,
            parseHTML: (element) => element.getAttribute('data-speaker'),
            renderHTML: (attributes) => {
            return {
                'data-speaker': attributes.speaker || null, // Ensure the 'data-speaker' is rendered
            };
            },
        },

        start: {
            default: null,
            parseHTML: (element) => element.getAttribute('data-start'),
            renderHTML: (attributes) => {
            return {
                'data-start': attributes.start || null, // Ensure the 'data-start' is rendered
            };
            },
        },

        end: {
            default: null,
            parseHTML: (element) => element.getAttribute('data-end'),
            renderHTML: (attributes) => {
            return {
                'data-end': attributes.end || null, // Ensure the 'data-end' is rendered
            };
            },
        }
    };
  },
  parseHTML() {
    return [
      {
        tag: 'segment',
      },
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        return this.editor.chain().insertContentAt(this.editor.state.selection.head, { type: this.type.name }).focus().run()
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['segment', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Segment)
  },
})