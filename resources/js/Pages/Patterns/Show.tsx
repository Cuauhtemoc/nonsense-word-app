import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import CreateWordListForm from './Partials/CreateWordListForm';
import { GeneralPattern, WordLIst } from '@/types';

interface Props {
    availablePatterns: GeneralPattern[];
    wordList: WordLIst
}
export default function Show({availablePatterns, wordList}:Props){

    return(
        <AppLayout
            title="Word Lists"
            renderHeader={() => (
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Word Lists
            </h2>
        )}
        >
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <CreateWordListForm availablePatterns={availablePatterns}  wordList={wordList}/>
        </div>
        
        </AppLayout>
    )

}