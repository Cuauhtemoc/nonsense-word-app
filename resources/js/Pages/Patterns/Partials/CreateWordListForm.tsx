
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import WordListTable from "@/Components/WordListTable";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import { GeneralPattern, WordList, WordPattern } from "@/types";
import React, { useEffect, useState } from "react";
import CreatePDFButton from "./CreatePDFButton";
import SaveListButton from "./SaveListButton";
import FontSizeOptions from "./FontSizeOptions";
import ListSizeOptions from "./ListSizeOptions";
import axios from "axios";
import ShowListButton from "./ShowListButton";
import PatternSelector from "./PatternSelector";
import { Grid } from 'react-loader-spinner'
import LoadingGrid from "@/Components/LoadingGrid";

interface Props {
  availablePatterns: GeneralPattern[]
  wordList: WordList,
  makeList: Function
}


export default function CreatelistForm({ availablePatterns, wordList, makeList }: Props) {

  const route = useRoute();
  const page = useTypedPage();

  const [fontSize, setFontSize] = useState('24px');
  const [listSize, setListSize] = useState(10);

  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [name, setName] = useState(wordList ? wordList.name : "");
  const [list, setWordList] = useState(wordList);
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    setWordList(wordList)
    setName(wordList ? wordList.name : "")
  }, [wordList])

  function showList(): void {
    setProcessing(true);
    axios.post(route('word-list.generate'), {
      patterns: selectedPatterns,
      listSize: listSize
    }).then(res => {
      setWordList(res.data.wordList);
      setProcessing(false)
    });
  }
  function storeList(): void {
    let data = {
      name: name,
      words: JSON.parse(JSON.stringify(list.words)),
    };
    makeList(data.name, data.words);
  }
  return (
    <>

      {processing ?
        <div className='align-middle'>
          <LoadingGrid size={listSize} />
        </div>
        :
        <WordListTable
          wordList={list}
        />}
      <div>
        <div className="col-span-6 sm:col-span-4">

          <InputLabel htmlFor="name"><div className="mx-4 mt-6 text-xl"> Name: </div></InputLabel>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full mx-4"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            autoFocus
          />

          <InputError
            message={page.props.errors.name}
            className="mt-2"
          />
        </div>
        <div className="lg:flex items-center justify-around px-4 py-3 bg-white dark:bg-gray-800 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
          <ShowListButton processing={processing} patternsSelected={selectedPatterns.length === 0} showList={showList} />
          <ListSizeOptions setData={setListSize} listSize={listSize} />
          <FontSizeOptions fontSize={fontSize} setFontSize={setFontSize} />
          <SaveListButton onSubmit={storeList} processing={processing} name={name} />
          <CreatePDFButton wordList={list} fontSize="24px" processing={processing} name={name}/>
        </div>
        <PatternSelector availablePatterns={availablePatterns} selectedPatterns={selectedPatterns} setSelectedPatterns={setSelectedPatterns} />
      </div>
    </>

  )
}