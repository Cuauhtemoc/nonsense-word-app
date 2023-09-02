import { Word, WordList } from "@/types";
import React from "react";
import WordBox  from "./WordBox";

interface Props {
    wordList: WordList;
}

export default function WordListTable({wordList} : Props)  {
    
    const words = wordList.words.map((word: Word) => <WordBox key={'word-'+word.id} w={word} />);
   
    return <div className='container m-auto grid grid-cols-10 gap-3'>{words}</div>;
}