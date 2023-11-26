import { WordPattern } from '@/types';
import classNames from 'classnames';
import React from 'react';

interface Props {
    generateList: (listSize: number, selectedPatterns: string[], includeRealWords: boolean, includeNonsenseWords: boolean) => void, 
    processing: boolean,
    includeNonsenseWords: boolean,
    includeRealWords: boolean,
    selectedPatterns: string[],
    listSize: number
}
export default function ShowListButton({generateList, processing, selectedPatterns, listSize, includeRealWords, includeNonsenseWords} : Props) : JSX.Element {
    return (
        <div onClick={() => generateList(listSize, selectedPatterns, includeRealWords, includeNonsenseWords)} className={classNames('text-center mb-2 cursor-pointer lg:md:inline-flex items-center px-4 py-4 lg:md:py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'opacity-25 pointer-events-none': processing || selectedPatterns.length == 0 })}>
            Create new list
        </div>
    )
}