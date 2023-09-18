import useRoute from "@/Hooks/useRoute";
import { Word } from "@/types";
import axios from "axios";
import React, { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'


interface Props {
    w: Word,
 
}
export default function WordBox({ w }: Props) {

    const route = useRoute();
    const [word, setWord] = useState(w);
    const [loading, setLoading] = useState(false);

    function refreshWord(word: Word): void {
        setLoading(true);
        axios.get(route('word.refresh', word.id)).then(response => {
            const wordData = response.data;
            setWord(wordData.word);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching new word:', error);
        });

    }
    if (loading) {
        return (
            <div className="mx-auto">
                <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </div>
         
        )
    }
    return (
        <div onClick={() => refreshWord(word)} className="cursor-pointer inline-flex items-center p-4 bg-white border-5 dark:bg-gray-200 border border-black rounded-md font-semibold text-lg text-black dark:text-gray-800 uppercase tracking-widest hover:bg-black hover:animate-pulse dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'">
            <div className="mx-auto">
                {word.word}
            </div>
            
        </div>
    )
}