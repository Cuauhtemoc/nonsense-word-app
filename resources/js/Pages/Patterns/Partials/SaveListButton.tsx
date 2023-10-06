import PrimaryButton from "@/Components/PrimaryButton";
import classNames from "classnames";
import React from "react";

interface Props {
    name: string;
    processing: boolean;
    onSubmit: () => void;
}
export default function SaveListButton({ name, processing, onSubmit}: Props): JSX.Element {

    return (
        <div onClick={() => onSubmit()} className={classNames('text-center cursor-pointer mb-2 lg:mb-0 lg:md:inline-flex items-center px-4 py-4 lg:md:py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150', { 'opacity-25 pointer-events-none': processing || !name})}>
            Save List
        </div>

    )
}