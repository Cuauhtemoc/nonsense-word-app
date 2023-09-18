import Dropdown from "@/Components/Dropdown";
import React from "react";

interface Props {
    setFontSize: Function,
    fontSize: string
}
export default function FontSizeOptions({ setFontSize, fontSize }: Props): JSX.Element {
    return (
        <div className="cursor-pointer my-2 lg:md:inline-flex items-center px-4 py-4 lg:md:py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
            <div className="relative">
                <Dropdown
                    align="right"
                    width="50"
                    renderTrigger={() =>
                        <div className="flex">
                            <button
                                type="button"
                                className="ml-auto"
                            >
                                <div className="font-semibold text-xs tracking-widest text-white dark:text-gray-800 uppercase ">
                                    Font Size {fontSize}
                                </div>
                            </button>



                            <svg
                                className="ml-2 mr-auto h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="white"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    }>
                    <button onClick={() => setFontSize('12px')} type="button" className="block px-4 py-2 text-sm text-gray-600">sm</button>
                    <div className="border-t border-gray-200 dark:border-gray-600" />
                    <button onClick={() => setFontSize('24px')} type="button" className="block px-4 py-2 text-sm text-gray-600">md</button>
                    <div className="border-t border-gray-200 dark:border-gray-600" />
                    <button onClick={() => setFontSize('48px')} type="button" className="block px-4 py-2 text-sm text-gray-600">lg</button>
                </Dropdown>
            </div>
        </div>
    )
}