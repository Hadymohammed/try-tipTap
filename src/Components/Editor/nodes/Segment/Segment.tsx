import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default () => {
  return (
    <NodeViewWrapper className="w-56 p-2">
      <label contentEditable={false} className='m-2'>Segment Component</label>

      <NodeViewContent className="p-2 border-black border-2" />
    </NodeViewWrapper>
  )
}