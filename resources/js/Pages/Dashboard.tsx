import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { CustomFileData, GeneralPattern, WordList } from '@/types';
import { VFSBrowser } from '@/Components/VFSBrowser';
import CreateWordListForm from './Patterns/Partials/CreateWordListForm';

interface Props {
  fs: any,
  availablePatterns: GeneralPattern[]
  wordList: WordList
}

export default function Dashboard({fs, availablePatterns, wordList} : Props) {
  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <VFSBrowser instanceId={'storyName'} fs={fs} availablePatterns={availablePatterns}  wordList={wordList}/>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
