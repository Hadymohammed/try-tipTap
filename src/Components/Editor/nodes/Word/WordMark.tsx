import { Mark, mergeAttributes } from '@tiptap/core';

 const WordMark = Mark.create({
  name: 'word',
  addAttributes() {
    return {
      start: {},
      end: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-type="word"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-type': 'word' }),
      0,
    ];
  },
});

export default WordMark;