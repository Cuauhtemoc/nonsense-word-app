import React from 'react';
import WordListTable from './WordListTable';
import { WordLIst, WordPattern } from '@/types';

interface Props {
  list: WordLIst
}
export default function SavedWordList({list} : Props) {
    console.log(list);
  return (
    <div>
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        <WordListTable wordPatterns={list.wordPatterns}/>
      </div>
      <div className="bg-gray-200 dark:bg-gray-800 bg-opacity-25 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
      </div>

        
    </div>
  );
}
