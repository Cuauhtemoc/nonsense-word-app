import ActionMessage from "@/Components/ActionMessage";
import Checkbox from "@/Components/Checkbox";
import Dropdown from "@/Components/Dropdown";
import FormSection from "@/Components/FormSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import WordListPDF from "@/Components/WordListPDF";
import WordListTable from "@/Components/WordListTable";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import { GeneralPattern, WordLIst, WordPattern } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import classNames from "classnames";
import React, { useState } from "react";

interface Props {
    availablePatterns: GeneralPattern[]
    wordList: WordLIst
}


export default function form({availablePatterns, wordList} : Props){
  
    const route = useRoute();
    const page = useTypedPage();
    const patterns : string[] = [];

    const form = useForm("Create/List",{
      patterns: patterns,
      name: '',
      totalWords: 10
    });
    
    function createList(): void{
      form.post(route("patterns.show"), {
          preserveState : true,
        });
    }
    function storeList() : void{   
      let data = {
        name: form.data.name,
        words: JSON.parse(JSON.stringify(wordList.words))
      };
      router.post('/word-list/store', data);
    }
   return(
    <>
      <FormSection
        onSubmit={storeList}
        title={'List Details'}
        description={'Create a new word list from the available patterns.'}
        renderActions={() => (
          <>
            <ActionMessage on={form.recentlySuccessful} className="mr-3">
              Done
            </ActionMessage>
   
            {wordList && <PrimaryButton
              className={classNames({ 'opacity-25 pointer-events-none': form.processing || !form.data.name}
              )}
              disabled={!form.data.name}
            >
              Save List
            </PrimaryButton>}

            {wordList && <PDFDownloadLink  className={classNames('mx-3', { 'opacity-40 pointer-events-none': form.processing})}document={<WordListPDF wordList={wordList} />} fileName="wordlist">
            {({loading}) => (<div className={classNames('inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'pointer-events-none': form.processing || loading})}>Download PDF</div> )}
            </PDFDownloadLink>}              
            <div onClick={() => createList()} className={classNames('cursor-pointer inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'opacity-25 pointer-events-none': form.processing || form.data.patterns.length == 0 })}>
              {wordList ? "Create New List":"Create List"}
            </div>
          </>
        )}
      >
        <div className="col-span-8">
            <InputLabel htmlFor="patterns">Patterns</InputLabel>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {availablePatterns.map(pattern =>  

                <div key={pattern.general_pattern_name}>
                    <span className="ml-2 mr-4 text-md text-black-600 dark:text-gray-400">{pattern.general_pattern_name} </span> 
                    {pattern.patterns.map( p =>
                       <label key={p.id} className="flex items-center">
                       <Checkbox
                         value={p.id.toString()} // Use the pattern ID as the checkbox value
                         checked={form.data.patterns.includes(p.id.toString())} // Check if the pattern ID is in the selected patterns array
                         onChange={e => {
                           const patternId = e.currentTarget.value;
                           if (form.data.patterns.includes(patternId)) {
                             form.setData('patterns', form.data.patterns.filter(p => p !== patternId));
                           } else {
                             form.setData('patterns', [patternId, ...form.data.patterns]);
                           }
                         }}
                       />
                      <span className="ml-2 mr-4 text-sm text-gray-600 dark:text-gray-400">{p.pattern_name} </span>
                    
                    </label>)}
                  
                </div>
                )}
              <div className="flex">
                <div className="relative">
                  <Dropdown    
                    align="right"
                    width="100" 
                    renderTrigger={() =>  
                      <span className="inline-flex rounded-md">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                        >
                          List Size

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                        </button>
                        </span>
                      }>
                      <button onClick={() => form.setData('totalWords', 10)} type="button" className="block px-4 py-2 text-xs text-gray-400">10</button>
                      <div className="border-t border-gray-200 dark:border-gray-600" />
                      <button  onClick={() => form.setData('totalWords', 20)} type="button" className="block px-4 py-2 text-xs text-gray-400">20</button>
                      <div className="border-t border-gray-200 dark:border-gray-600" />
                      <button onClick={() => form.setData('totalWords', 30)} type="button" className="block px-4 py-2 text-xs text-gray-400">30</button>
                      <div className="border-t border-gray-200 dark:border-gray-600" />
                      <button  onClick={() => form.setData('totalWords', 40)} type="button" className="block px-4 py-2 text-xs text-gray-400">40</button>                
                    </Dropdown>
                </div>
              </div>
            </div>
        </div>
      </FormSection>
      {wordList && 
        <div className="col-span-6 sm:col-span-4">
          <InputLabel htmlFor="name">Word List Name</InputLabel>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={form.data.name}
              onChange={e =>
                form.setData('name', e.currentTarget.value)
              }
              autoFocus
            />
            <InputError
              message={form.errors.name}
              className="mt-2"
            />
          </div>}
      {wordList && <WordListTable wordList={wordList}/>}
      
    </>

   )
}