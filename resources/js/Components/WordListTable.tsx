import { WordLIst } from "@/types";
import React from "react";

interface Props {
    wordList: WordLIst;
  }
export default function WordListTable({wordList} : Props)  {
    const words = wordList.words.map(word => <div className='text-center border border-slate-300' > {word.word}</div>);
 
    return <div className='container m-auto grid grid-cols-10 gap-3'>{words}</div>;
}