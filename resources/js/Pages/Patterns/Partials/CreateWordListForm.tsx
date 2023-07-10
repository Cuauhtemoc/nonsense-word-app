import ActionMessage from "@/Components/ActionMessage";
import Checkbox from "@/Components/Checkbox";
import FormSection from "@/Components/FormSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
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


export default function form({availablePatterns, wordPatterns} : Props){
    
    const route = useRoute();
    const page = useTypedPage();
    const [listName, setListName] = useState('');

    const form = useForm("Create/List",{
      patterns: availablePatterns,
      name: '',
    });
    
    function createList(): void{
      form.post(route("patterns.show"), {
          preserveState : true,
        });
    }
    function storeList() : void{   
      let data = {
        name: form.data.name,
        wordPatterns: JSON.parse(JSON.stringify(wordPatterns))
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
   
            {wordPatterns && <PrimaryButton
              className={classNames({ 'opacity-25 pointer-events-none': form.processing || !form.data.name}
              )}
              disabled={!form.data.name}
            >
              Save List
            </PrimaryButton>}

            {wordPatterns && <PDFDownloadLink  className={classNames('mx-3', { 'opacity-40 pointer-events-none': form.processing})}document={<WordListPDF wordPatterns={wordPatterns} />} fileName="wordlist">
            {({loading}) => (<div className={classNames('inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'pointer-events-none': form.processing || loading})}>Download PDF</div> )}
            </PDFDownloadLink>}              
            <div onClick={() => createList()} className={classNames('cursor-pointer inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'opacity-25 pointer-events-none': form.processing })}>
              {wordPatterns ? "Create New List":"Create List"}
            </div>
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
                            checked={form.data.patterns.includes(
                            pattern,
                            )}
                            onChange={e => {
                            if (
                                form.data.patterns.includes(
                                e.currentTarget.value,
                                )
                            ) {
                                form.setData(
                                'patterns',
                                form.data.patterns.filter(
                                    p => p !== e.currentTarget.value,
                                ),
                                );
                            } else {
                                form.setData('patterns', [
                                e.currentTarget.value,
                                ...form.data.patterns,
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
      {wordPatterns && 
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
      {wordPatterns && <WordListTable wordPatterns={wordPatterns}/>}
      
    </>

   )
}