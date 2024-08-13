"use client";

import { useState } from "react";
import Word, { IWord } from "./Word";
import TextEditor from "./TextEditor";

export interface ISegment {
    id: string;
    start: number;
    end: number;
    speaker: string;
    words: IWord[];
  }

interface SegmentProps {
    segment: ISegment;
    appendSegment: (content: string, selectedSegmentId: string) => void;
    mergeSegment: (segmentId: string) => void;
}

interface SegmentProps {
  segment: ISegment;
  appendSegment: (content: string, selectedSegmentId: string) => void;
}

export default function Segment({ segment, appendSegment , mergeSegment}: SegmentProps) {
  // const [wordsString, setWordsString] = useState<string>(
  //   
  // );

  // const handleUpdate = (updatedContent: string) => {
  //   setWordsString(updatedContent);
  // };

  return (
    <div className="flex flex-col items-start justify-start m-2 border-2 border-black p-2">
      <span className="text-sm font-bold">{segment.speaker}</span>
      <div className="flex flex-row">
        <TextEditor
          id={segment.id}
          content={segment.words.map((word) => word.word).join(" ")}
          // onUpdate={handleUpdate}
          // appendSegment={appendSegment}
          // mergeSegment={mergeSegment}
        />
      </div>
    </div>
  );
}
