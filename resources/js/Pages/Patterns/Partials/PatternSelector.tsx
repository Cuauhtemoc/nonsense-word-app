import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { GeneralPattern } from '@/types';
import { faCircleChevronRight, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';

interface Props {
    availablePatterns: GeneralPattern[];
    selectedPatterns: string[],
    setSelectedPatterns: React.Dispatch<React.SetStateAction<string[]>>
}

function PatternSelector({ availablePatterns, selectedPatterns, setSelectedPatterns }: Props) {

    const [generalPatternVisibility, setGeneralPatternVisibility] = useState<
        Record<string, boolean>
    >({});
    const [generalPatternChecked, setGeneralPatternChecked] = useState<
        Record<string, boolean>
    >({});
    const togglePattern = (patternId: string) => {
        if (selectedPatterns.includes(patternId)) {
            setSelectedPatterns(selectedPatterns.filter((id) => id !== patternId));
        } else {
            setSelectedPatterns([...selectedPatterns, patternId]);
        }
    };

    const toggleGeneralPattern = (generalPatternName: string) => {
        setGeneralPatternVisibility((prevState) => ({
            ...prevState,
            [generalPatternName]: !prevState[generalPatternName],
        }));
    };

    const toggleSelectAllPatterns = (checked: boolean, generalPatternName: string) => {
        if (checked) {
            // If the general pattern is visible, select all its patterns
            const patternIdsToSelect = availablePatterns
                .find((pattern) => pattern.general_pattern_name === generalPatternName)
                ?.patterns.map((p) => p.id.toString()) || [];
            setSelectedPatterns((prevSelected) =>
                prevSelected.concat(patternIdsToSelect)
            );
        } else {
            // If the general pattern is hidden, deselect all its patterns
            const patternIdsToDeselect = availablePatterns
                .find((pattern) => pattern.general_pattern_name === generalPatternName)
                ?.patterns.map((p) => p.id.toString()) || [];
            setSelectedPatterns((prevSelected) =>
                prevSelected.filter((patternId) => !patternIdsToDeselect.includes(patternId))
            );
        }
        setGeneralPatternChecked((prevState) => ({
            ...prevState,
            [generalPatternName]: checked,
        }));
    };

    return (
        <div className="col-span-12">
            <InputLabel htmlFor="patterns"><div className='text-center text-lg font-bold underline'>Patterns</div></InputLabel>
            <div className="mt-2 flex justify-center">
            <div className="mt-2 grid md:lg:grid-cols-4 sm:grid-cols-4 gap-2">
                {availablePatterns.map((pattern) => (
                    <div key={pattern.general_pattern_name}>
                        <div className='flex'>
                            <label className="flex lg:md:ml-4 items-center">
                                <Checkbox
                                    value={pattern.general_pattern_name}
                                    checked={pattern.patterns.some((p) =>
                                        selectedPatterns.includes(p.id.toString())
                                    ) && generalPatternChecked[pattern.general_pattern_name]}
                                    onChange={(e) =>
                                        toggleSelectAllPatterns(e.target.checked, pattern.general_pattern_name)
                                    }
                                />
                                <span className="ml-2 mr-4 text-md text-black-600 dark:text-gray-400">
                                    {pattern.general_pattern_name}{' '}
                                </span>
                            </label>
                            <div className="flex items-center ml-auto" onClick={() => toggleGeneralPattern(pattern.general_pattern_name)}>
                                {generalPatternVisibility[pattern.general_pattern_name] ? <FontAwesomeIcon icon={faCircleChevronDown}/> : <FontAwesomeIcon icon={faCircleChevronRight}/>}
                            </div>
                        </div>
                        {generalPatternVisibility[pattern.general_pattern_name] && (
                            <div>
                                {pattern.patterns.map((p) => (
                                    <label key={p.id} className="flex lg:md:ml-4 items-center">
                                        <Checkbox
                                            value={p.id.toString()}
                                            checked={selectedPatterns.includes(p.id.toString())}
                                            onChange={() => togglePattern(p.id.toString())}
                                        />
                                        <span className="ml-2 mr-4 text-sm text-gray-600 dark:text-gray-400">
                                            {p.pattern_name}{' '}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default PatternSelector;
