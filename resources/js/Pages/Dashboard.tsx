import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import type { GeneralPattern, WordList } from '@/types';
import { VFSBrowser } from '@/Components/VFSBrowser';

interface Props {
  fs: any,
  availablePatterns: GeneralPattern[]
  wordList: WordList
}

export default function Dashboard({fs, availablePatterns, wordList} : Props) : React.JSX.Element {
  return (
    <AppLayout
      title="Dashboard"
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
