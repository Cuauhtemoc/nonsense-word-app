import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import { Label } from "@headlessui/react/dist/components/label/label";
import React from "react";

interface Props {
    includeRealWords: boolean;
    includeNonsenseWords: boolean;
    setIncludeRealWords: (value: boolean) => void;
    setIncludeNonsenseWords: (value: boolean) => void;
}

export default function WordTypeSelector({
    includeRealWords,
    includeNonsenseWords,
    setIncludeRealWords,
    setIncludeNonsenseWords
}: Props) {

    return (
        <div className="col-span-12">
            {!includeRealWords && !includeNonsenseWords ? <div className='text-center text-red-500'>Please select at least one word type</div> : null}
            <div className="mt-4">
                <InputLabel><div className='text-center text-lg font-bold underline'>Select Word Type</div></InputLabel>
                <div className="m-4 flex justify-center">
                    <label className="flex items-center">
                        <Checkbox
                            value={'includeRealWords'}
                            checked={includeRealWords}
                            onChange={(e) => setIncludeRealWords(e.target.checked)}
                        />
                        <span className="ml-2 mr-4 text-md text-black-600 dark:text-gray-400">Include real words</span>
                    </label>
                    <label className="flex items-center">
                        <Checkbox
                            value={'includeNonsenseWords'}
                            checked={includeNonsenseWords}
                            onChange={(e) => setIncludeNonsenseWords(e.target.checked)}
                        />
                        <span className="ml-2 mr-4 text-md text-black-600 dark:text-gray-400">Include nonsense words</span>
                    </label>
                </div>
            </div>
        </div>
    )

}