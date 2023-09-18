import { Word, WordList } from "@/types";
import React from "react";
import WordBox  from "./WordBox";

interface Props {
    wordList: WordList;
}

export default function WordListTable({wordList} : Props)  {
    let words = null;
    if(wordList){
        words = wordList.words.map((word: Word) => <WordBox key={'word-box-'+word.id} w={word} />);
    }
    return <div className='container m-auto grid md:sm:grid-cols-2 lg:grid-cols-5 gap-3'>{words}</div>;
}