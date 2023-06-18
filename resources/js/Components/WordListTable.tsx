import { WordPattern } from "@/types";
import React from "react";

interface Props {
    wordPatterns: WordPattern[];
  }
export default function WordListTable({wordPatterns} : Props)  {
 
    return (
        <div className='flex justify-center col-span-12'>
            { wordPatterns.map(wordList => 
                <table key={wordList.pattern_name} className="m-2 table-auto border-separate border-spacing-2 border border-slate-400">
                    <thead>
                        <tr>
                            <th className='px-5 text-center border border-slate-300'> {wordList.pattern_name.toUpperCase()}</th> 
                        </tr>
                   
                    </thead>
                    <tbody>
                    
                    {wordList.words.map(
                        list => 
                        <tr key={list.word}> 
                            <td className='text-center border border-slate-300' > {list.word}</td>
                        </tr>
                    )}    
                    </tbody>
                </table>
            )}
        </div>
  
    )
}