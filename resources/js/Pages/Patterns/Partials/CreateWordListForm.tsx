
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
import ShowListButton from "./ShowListButton";
import PatternSelector from "./PatternSelector";
import LoadingGrid from "@/Components/LoadingGrid";
import WordTypeSelector from "./WordTypeSelector";

interface Props {
  availablePatterns: GeneralPattern[];
  wordList: WordList;
  processing: boolean;
  storeList: (name: string, words: WordList) => void
  generateList: (listSize: number, selectedPatterns: string[], includeRealWords: boolean, includeNonsenseWords: boolean) => void
}


export default function CreatelistForm({ availablePatterns, wordList, storeList, processing, generateList }: Props) {

  const route = useRoute();
  const page = useTypedPage();

  const [includeRealWords, setIncludeRealWords] = useState(true);
  const [includeNonsenseWords, setIncludeNonsenseWords] = useState(true);
  const [fontSize, setFontSize] = useState('24px');
  const [listSize, setListSize] = useState(10);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [name, setName] = useState(wordList ? wordList.name : "");
  const [list, setWordList] = useState(wordList);
  const [formEnabled, setFormEnabled] = useState(true);

  useEffect(() => {
    setWordList(wordList)
    setName(wordList ? wordList.name : "")
    setFormEnabled(includeRealWords || includeNonsenseWords);
  }, [wordList, includeRealWords, includeNonsenseWords]);

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
          <InputLabel htmlFor="name"><div className="mx-4 mt-6 text-xl"> List name: </div></InputLabel>
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
        <div></div>
        <div className="lg:flex items-center justify-around px-4 py-3 bg-white dark:bg-gray-800 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
          <ShowListButton processing={processing || !formEnabled} includeNonsenseWords={includeNonsenseWords} includeRealWords={includeRealWords} selectedPatterns={selectedPatterns} listSize={listSize} generateList={generateList} />
          <ListSizeOptions setData={setListSize} listSize={listSize} processing={processing || !formEnabled} />
          <FontSizeOptions fontSize={fontSize} setFontSize={setFontSize} processing={processing || !formEnabled} />
          <SaveListButton onSubmit={storeList} processing={processing || !formEnabled} name={name} words={list ? JSON.parse(JSON.stringify(list.words)) : null} />
          <CreatePDFButton wordList={list} fontSize="24px" processing={processing || !formEnabled} name={name} />
        </div>
        <WordTypeSelector
          includeRealWords={includeRealWords}
          includeNonsenseWords={includeNonsenseWords}
          setIncludeRealWords={setIncludeRealWords}
          setIncludeNonsenseWords={setIncludeNonsenseWords}
        />
        <PatternSelector availablePatterns={availablePatterns} selectedPatterns={selectedPatterns} setSelectedPatterns={setSelectedPatterns} />
      </div>
    </>

  )
}