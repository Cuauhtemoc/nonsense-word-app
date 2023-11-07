import React from "react";
import { RotatingSquare } from 'react-loader-spinner'

interface Props {
    
    size: number;
}

export default function LoadingGrid({size} : Props)  {
    let boxes = []; 
    for(let i = 0; i < size; i++){
        boxes.push(<div key={'word-box-'+i}  className="animate-pulse inline-flex items-center px-4 py-8 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-lg text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'">         
    </div>);
    } 

    return <div className='container m-auto grid md:sm:grid-cols-2 lg:grid-cols-5 gap-3 '>{boxes}</div>;
}