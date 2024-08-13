"use client";

export interface IWord {
    start: number;
    end: number;
    word: string;
}
export default function Word({ word }: {word:IWord}) {
    return (
        <span 
          className="m-1"
          data-start={word.start}
          data-end={word.end}
         >
            {word.word}
        </span>
    )
}