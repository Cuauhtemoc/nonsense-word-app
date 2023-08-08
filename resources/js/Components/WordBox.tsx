import useRoute from "@/Hooks/useRoute";
import { Word } from "@/types";
import { router } from "@inertiajs/core";
import axios from "axios";
import React, { useState } from "react";




interface Props {
    w : Word
}
export default function WordBox({w} : Props){
   
    const route = useRoute();
   
    const [word, setWord] = useState(w);
    function refreshWord(word : Word) : void {
        
        axios.get(route('word.refresh', word.id)).then(response => {
            const wordData = response.data;
            setWord(wordData.word);
            console.log(response.data)
        }).catch(error => {
            console.error('Error fetching new word:', error);
        });
       
    }
    return (
        <div key={'word_' + word.id} className="flex border border-slate-300">
            <div  className="ml-2"> {word.word}</div>
            <div onClick={() => refreshWord(word)} className="ml-auto cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div> 
        </div>
    )
}