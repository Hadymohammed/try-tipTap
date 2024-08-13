"use client";
import { useEffect, useState } from "react";
import Segment, { ISegment } from "./Segment";
import jsonSample from "../../../public/sample.json";
import TextEditor from "./TextEditor";

export interface ITranscript {
  segments: ISegment[];
}

const generateId = () => `segment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function EditorBlock() {
  const [transcript, setTranscript] = useState<ITranscript>(jsonSample);
  const [refresh, setRefresh] = useState(false);

  // const appendSegment = (content: string, selectedSegmentId: string) => {
  //   console.log("Appending segment:", content, selectedSegmentId);
  //   setTranscript((prevTranscript) => {
  //     const selectedSegmentIndex = prevTranscript.segments.findIndex(segment => segment.id === selectedSegmentId);

  //     if (selectedSegmentIndex === -1) return prevTranscript; // No segment with the given ID found

  //     const newSegment: ISegment = {
  //       id: generateId(),
  //       start: 0, // Set appropriate start and end values
  //       end: 0,   // These should be calculated based on your requirements
  //       speaker: "New Speaker",
  //       words: [{ start: 0, end: 0, word: content }], // Example word
  //     };

  //     // Insert the new segment after the selected segment
  //     const updatedSegments = [
  //       ...prevTranscript.segments.slice(0, selectedSegmentIndex + 1),
  //       newSegment,
  //       ...prevTranscript.segments.slice(selectedSegmentIndex + 1),
  //     ];

  //     console.log("Updated segments:", updatedSegments);

  //     return { segments: updatedSegments };
  //   });
  // };

  // const mergeSegment = (segmentId: string) => {
  //   console.log("Merging segment:", segmentId);
  //   setTranscript((prevTranscript) => {
  //     //merge the segment with the previous segment
  //     const selectedSegmentIndex = prevTranscript.segments.findIndex(segment => segment.id === segmentId);

  //     if (selectedSegmentIndex <= 0 ) return prevTranscript;

  //     const currentSegment = prevTranscript.segments[selectedSegmentIndex];
  //     const previousSegment = prevTranscript.segments[selectedSegmentIndex - 1];

  //     const updatedSegment: ISegment = {
  //       ...previousSegment,
  //       end: currentSegment.end,
  //       words: [
  //         ...previousSegment.words,
  //         ...currentSegment.words,
  //       ],
  //     };

  //     const updatedSegments = [
  //       ...prevTranscript.segments.slice(0, selectedSegmentIndex - 1),
  //       updatedSegment,
  //       ...prevTranscript.segments.slice(selectedSegmentIndex + 1),
  //     ];

  //     console.log("Updated segments:", updatedSegments);
  //     return { segments: updatedSegments };
  //   });
  // };

  useEffect(() => {
    console.log("Transcript changed:", transcript);
  }, [refresh]);
  

  return (
    <div>
      {/* <button onClick={() => {
        setRefresh(!refresh)}}>Refresh</button> */}
      {/* {transcript.segments.map((segment) => (
        <Segment key={segment.id} segment={segment} appendSegment={appendSegment} mergeSegment={mergeSegment} />
      ))} */}
      <TextEditor id="1" content="This is a test" />
    </div>
  );
}
