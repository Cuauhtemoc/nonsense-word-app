import ActionMessage from "@/Components/ActionMessage";
import Checkbox from "@/Components/Checkbox";
import FormSection from "@/Components/FormSection";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import WordListPDF from "@/Components/WordListPDF";
import WordListTable from "@/Components/WordListTable";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import { WordPattern } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { InertiaFormProps } from "@inertiajs/react/types/useForm";
import { PDFDownloadLink } from "@react-pdf/renderer";
import classNames from "classnames";
import React, { useState } from "react";

interface Props {
    availablePatterns: string[]
    wordPatterns: WordPattern[]
}


export default function CreateWordListForm({availablePatterns, wordPatterns} : Props){
    
    const route = useRoute();
    const page = useTypedPage();
  
    const createWordListForm = useForm("Create/List",{
      patterns: availablePatterns,
    });
    const storeWordListForm = useForm("Store/List", {
      name: '',
      wordPatterns: wordPatterns,
    });
    
    function createList(): void{
      createWordListForm.post(route("patterns.show"), {
          preserveState : true,
          onSuccess: () => storeWordListForm.setData('wordPatterns', wordPatterns)
        });
    }
    function storeList() : void{   
      storeWordListForm.post(route("word-list.store"), {
          preserveState : true,
        });
    }
   return(
    <>
      <FormSection
        onSubmit={storeList}
        title={'List Details'}
        description={'Create a new word list from the available patterns.'}
        renderActions={() => (
          <>
            <ActionMessage on={createWordListForm.recentlySuccessful} className="mr-3">
              Done
            </ActionMessage>

            <div onClick={() => createList()} className={classNames('diabled:opacity-25 inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'invisible': createWordListForm.processing || storeWordListForm.processing })}>
              {wordPatterns ? "Create New List":"Create List"}
            </div>
            {wordPatterns && <PDFDownloadLink   className='mx-2' document={<WordListPDF wordPatterns={wordPatterns} />} fileName="wordlist">
            {({loading}) => (loading ? <PrimaryButton disabled={true}>Loading Document...</PrimaryButton> : <PrimaryButton disabled={createWordListForm.processing}>Download PDF</PrimaryButton> )}
            </PDFDownloadLink>}

            {wordPatterns && <PrimaryButton
              className={classNames({ 'opacity-25': storeWordListForm.processing })}
              disabled={createWordListForm.processing}
            >
              Save List
            </PrimaryButton>}
          </>
        )}
      >
          <div className="col-span-6">
              <InputLabel htmlFor="wordlist">Patterns</InputLabel>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePatterns.map(pattern => 
                  <div key={pattern}>
                      <label  className="flex items-center">
                          <Checkbox 
                              value={pattern}
                              checked={createWordListForm.data.patterns.includes(
                              pattern,
                              )}
                              onChange={e => {
                              if (
                                  createWordListForm.data.patterns.includes(
                                  e.currentTarget.value,
                                  )
                              ) {
                                  createWordListForm.setData(
                                  'patterns',
                                  createWordListForm.data.patterns.filter(
                                      p => p !== e.currentTarget.value,
                                  ),
                                  );
                              } else {
                                  createWordListForm.setData('patterns', [
                                  e.currentTarget.value,
                                  ...createWordListForm.data.patterns,
                                  ]);
                              }
                              }}
                          />
                          <span className="ml-2 mr-4 text-sm text-gray-600 dark:text-gray-400">{pattern} </span>
                      
                      </label>
                  </div>
                  )
              }
              
              </div>
          </div>
      </FormSection>
      {wordPatterns && <WordListTable wordPatterns={wordPatterns}/>}
      
    </>

   )
}