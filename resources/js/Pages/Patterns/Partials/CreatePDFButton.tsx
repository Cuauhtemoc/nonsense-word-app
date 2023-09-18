import WordListPDF from '@/Components/WordListPDF';
import { WordList } from '@/types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import classNames from 'classnames';
import React from 'react';

interface Props {
    wordList?: WordList,
    fontSize: string,
    processing: boolean,
    name:string
}
export default function CreatePDFButton({ wordList, fontSize, processing, name}: Props): JSX.Element {
    if (!wordList) return (
        <div className={classNames('text-center lg:md:inline-flex items-center px-4 py-4 lg:md:py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 opacity-25 pointer-events-none')}>Download PDF</div>
    )
    return (
        <PDFDownloadLink className={classNames('mx-3', { 'pointer-events-none': processing })} document={<WordListPDF wordList={wordList} fontSize={fontSize} />} fileName={name ? 'wordlist' : name }>
            {({ loading }) => (<div className={classNames('text-center lg:md:inline-flex items-center px-4 py-4 lg:md:py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'opacity-25 pointer-events-none': processing || loading || !wordList })}>Download PDF</div>)}
        </PDFDownloadLink>
    )
}