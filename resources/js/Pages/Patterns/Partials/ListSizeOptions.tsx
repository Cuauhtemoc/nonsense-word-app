import Dropdown from "@/Components/Dropdown";
import React from "react";

interface Props {
    listSize: number,
    setData: Function
}
export default function ListSizeOptions({ listSize, setData }: Props): JSX.Element {
    return (
        <div className="cursor-pointer my-2 lg:md:inline-flex items-center px-4 py-4 lg:md:py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
            <div className="relative"> 
                <Dropdown
                    align="right"
                    width="50"
                    renderTrigger={() =>
                        <div className="flex">
                            <button  className="ml-auto" type="button">
                                <div className="text-xs text-white tracking-widest dark:text-gray-800 uppercase">
                                    List Size  {listSize}
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
                    <button onClick={() => setData(10)} type="button" className="block px-4 py-2 text-xs text-gray-600 dark:text-gray-400">10</button>
                    <div className="border-t border-gray-200 dark:border-gray-200" />
                    <button onClick={() => setData(20)} type="button" className="block px-4 py-2 text-xs text-gray-600 dark:text-gray-400">20</button>
                    <div className="border-t border-gray-200 dark:border-gray-200" />
                    <button onClick={() => setData(30)} type="button" className="block px-4 py-2 text-xs text-gray-600 dark:text-gray-400">30</button>
                    <div className="border-t border-gray-200 dark:border-gray-200" />
                    <button onClick={() => setData(40)} type="button" className="block px-4 py-2 text-xs text-gray-600 dark:text-gray-400">40</button>
                </Dropdown>
            </div>
        </div>
    )
}