import {
    ChonkyActions,
    FileArray,
    FileBrowserProps,
    FileData,
    FileHelper,
    FullFileBrowser,
} from '@aperturerobotics/chonky';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CopyShareableLink } from '@/types/custom-actions';
import { CustomFileData, GeneralPattern, WordList } from '@/types';
import useRoute from '@/Hooks/useRoute';
import axios from 'axios';
import CreateWordListForm from '@/Pages/Patterns/Partials/CreateWordListForm';



// We define a custom interface for file data because we want to add some custom fields
// to Chonky's built-in `FileData` interface.

interface CustomFileMap {
    [fileId: string]: CustomFileData;
}

// Helper method to attach our custom TypeScript types to the imported JSON file map.

// returns all word list data formatted for the file system brower

//List of any default actions that should be disabled
const actionsToDisable: string[] = [
    ChonkyActions.ToggleHiddenFiles.id,
    ChonkyActions.ToggleShowFoldersFirst.id,
    ChonkyActions.SortFilesBySize.id
];


// Hook that sets up our file map and defines functions used to mutate - `deleteFiles`,
// `moveFiles`, and so on.
const useCustomFileMap = (fs: CustomFileData, wordList: WordList) => {

    //set up the hook to use our laravel routes
    const route = useRoute();
    // Setup the React state for our file map and the current folder.
    const [fileMap, setFileMap] = useState(fs.fileMap);
    const [currentFolderId, setCurrentFolderId] = useState(fs.rootFolderId);
    const [currentWordList, setCurrentWordList] = useState(wordList);

    //ref for the download pdf button
    const pdfButton = useRef(null);
    // Setup logic to listen to changes in current folder ID without having to update
    // `useCallback` hooks. Read more about it here:
    // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
        currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    // Function that will be called when user deletes files either using the toolbar
    // button or `Delete` key.
    const deleteFiles = useCallback((files: CustomFileData[]) => {
        // We use the so-called "functional update" to set the new file map. This
        // lets us access the current file map value without having to track it
        // explicitly. Read more about it here:
        // https://reactjs.org/docs/hooks-reference.html#functional-updates
        setFileMap((currentFileMap: CustomFileData) => {
            // Create a copy of the file map to make sure we don't mutate it.
            const newFileMap = { ...currentFileMap };

            files.forEach((file) => {
                const url = file.isDir ? "folder.destroy" : "word-list.destroy";
                axios.post(route(url, file.id)).then((res) => {
                    delete newFileMap[file.id];
                })
                // Delete file from the file map.


                // Update the parent folder to make sure it doesn't try to load the
                // file we just deleted.
                if (file.parentId) {

                    const parent = newFileMap[file.parentId]!;
                    const newChildrenIds = parent.childrenIds!.filter(
                        (id: string) => id !== file.id
                    );
                    newFileMap[file.parentId] = {
                        ...parent,
                        childrenIds: newChildrenIds,
                        childrenCount: newChildrenIds.length,
                    };
                }
            });

            return newFileMap;
        });
    }, []);

    // Function that will be called when files are moved from one folder to another
    // using drag & drop.
    const moveFiles = useCallback(
        (
            files: CustomFileData[],
            source: CustomFileData,
            destination: CustomFileData
        ) => {

            const moveFileIds = new Set(files.map((f) => f.id));
            setFileMap((currentFileMap: any) => {
                axios.post('word-list/move', { destination_id: destination.id, moveFileIds: [...moveFileIds], source_id: source.id });
                // axios.post(route('word-list.move'), {destination_id:destination.id, moveFileIds: [...moveFileIds],source_id:source.id });
                const newFileMap = { ...currentFileMap };
                // Delete files from their source folder.
                const newSourceChildrenIds = source.childrenIds!.filter(
                    (id) => !moveFileIds.has(id)
                );
                newFileMap[source.id] = {
                    ...source,
                    childrenIds: newSourceChildrenIds,
                    childrenCount: newSourceChildrenIds.length,
                };

                // Add the files to their destination folder.
                const newDestinationChildrenIds = [
                    ...destination.childrenIds!,
                    ...files.map((f) => f.id),
                ];
                newFileMap[destination.id] = {
                    ...destination,
                    childrenIds: newDestinationChildrenIds,
                    childrenCount: newDestinationChildrenIds.length,
                };

                // Finally, update the parent folder ID on the files from source folder
                // ID to the destination folder ID.
                files.forEach((file) => {
                    newFileMap[file.id] = {
                        ...file,
                        parentId: destination.id,
                    };
                })
                return newFileMap;
            })



        },
        []
    );

    // Function that will be called when user creates a new folder using the toolbar
    // button. That that we use incremental integer IDs for new folder, but this is
    // not a good practice in production! Instead, you should use something like UUIDs
    // or MD5 hashes for file paths.
    const createFolder = useCallback((folderName: string) => {
        axios.post(route('folder.store'), { name: folderName, parent_id: currentFolderIdRef.current }).then(res => {

            setFileMap((currentFileMap: any) => {
                const newFileMap = { ...currentFileMap };

                // Create the new folder
                const newFolderId = res.data.folder_id;
                newFileMap[newFolderId] = {
                    id: newFolderId,
                    name: folderName,
                    isDir: true,
                    modDate: new Date(),
                    parentId: currentFolderIdRef.current,
                    childrenIds: [],
                    childrenCount: 0,
                };

                // Update parent folder to reference the new folder.
                const parent = newFileMap[currentFolderIdRef.current];
                newFileMap[currentFolderIdRef.current] = {
                    ...parent,
                    childrenIds: [...parent.childrenIds!, newFolderId],
                };

                return newFileMap;
            });
        })

    }, []);

    // Function that will be called when user creates a new folder using the toolbar
    // button. That that we use incremental integer IDs for new folder, but this is
    // not a good practice in production! Instead, you should use something like UUIDs
    // or MD5 hashes for file paths.
    const createList = useCallback((name: string, words: WordList) => {
        axios.post(route('word-list.store'), { name: name, folder_id: currentFolderIdRef.current, words: words }).then(res => {

            setFileMap((currentFileMap: any) => {
                const newFileMap = { ...currentFileMap };
                // Create the new folder
                const newListId = res.data.id;
                newFileMap[newListId] = {
                    ...res.data
                };

                // Update parent folder to reference the new folder.
                const parent = newFileMap[currentFolderIdRef.current];
                newFileMap[currentFolderIdRef.current] = {
                    ...parent,
                    childrenIds: [...parent.childrenIds!, newListId],
                };

                return newFileMap;
            });
        })

    }, []);
    const copyShareableLink = useCallback((wordList: WordList) => {
        navigator.clipboard.writeText(wordList.shareableLink)

    }, []);

    return {
        fileMap,
        currentFolderId,
        currentWordList,
        pdfButton,
        setCurrentFolderId,
        setCurrentWordList,
        deleteFiles,
        moveFiles,
        createFolder,
        createList,
        copyShareableLink
    };
};

export const useFiles = (
    fileMap: CustomFileMap,
    currentFolderId: string
): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const childrenIds = currentFolder.childrenIds!;
        const files = childrenIds.map((fileId: string) => fileMap[fileId]);
        return files;
    }, [currentFolderId, fileMap]);
};

export const useFolderChain = (
    fileMap: CustomFileMap,
    currentFolderId: string
): FileArray => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                break;
            }
        }

        return folderChain;
    }, [currentFolderId, fileMap]);
};

export const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void,
    setCurrentWordList: (wordList: WordList) => void,
    deleteFiles: (files: CustomFileData[]) => void,
    moveFiles: (files: FileData[], source: FileData, destination: FileData) => void,
    createFolder: (folderName: string) => void,
    copyShareableLink: (wordList: WordList) => void,

) => {

    return useCallback(

        (data: any) => {
            const file = data.state.selectedFilesForAction[0]
            if (data.id == ChonkyActions.ChangeSelection.id) {

                if (file && !FileHelper.isDirectory(file)) {
                    setCurrentWordList(file);
                    return;
                }
                return;
            }
            else if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                }
            } else if (data.id === ChonkyActions.DeleteFiles.id) {
                deleteFiles(data.state.selectedFilesForAction!);
            } else if (data.id === ChonkyActions.MoveFiles.id) {
                moveFiles(
                    data.payload.files,
                    data.payload.source!,
                    data.payload.destination
                );
            } else if (data.id === ChonkyActions.CreateFolder.id) {
                const folderName = prompt('Provide the name for your new folder:');
                if (folderName) createFolder(folderName);
            }
            else if (data.id == CopyShareableLink.id) {

                copyShareableLink(file);
                return;
            }
            // else if(data.id == EditList.id) {
            //     const file = data.state.selectedFilesForAction[0]
            //     if (file && !FileHelper.isDirectory(file)) {
            //         setCurrentWordList(file);
            //         return;
            //     }

            //     return;
            // }
        },
        [createFolder, deleteFiles, moveFiles, setCurrentFolderId, setCurrentWordList, copyShareableLink]
    );
};

interface VFSProps extends Partial<FileBrowserProps> {
    fs: CustomFileData,
    availablePatterns: GeneralPattern[]
    wordList: WordList

}

export const VFSBrowser: React.FC<VFSProps> = React.memo((props) => {
    const {
        fileMap,
        currentFolderId,
        currentWordList,
        setCurrentFolderId,
        setCurrentWordList,
        deleteFiles,
        moveFiles,
        createFolder,
        createList,
        copyShareableLink
    } = useCustomFileMap(props.fs, props.wordList);
    const files = useFiles(fileMap, currentFolderId);
    const folderChain = useFolderChain(fileMap, currentFolderId);
    const handleFileAction = useFileActionHandler(
        setCurrentFolderId,
        setCurrentWordList,
        deleteFiles,
        moveFiles,
        createFolder,
        copyShareableLink
    );
    const fileActions = useMemo(
        () => [ChonkyActions.CreateFolder, ChonkyActions.DeleteFiles, CopyShareableLink],
        []
    );

    return (
        <>
            <div style={{ height: 400 }}>
                <FullFileBrowser
                    files={files}
                    folderChain={folderChain}
                    fileActions={fileActions}
                    onFileAction={handleFileAction}
                    disableDefaultFileActions={actionsToDisable}
                    defaultFileViewActionId={"grid"}

                    {...props}
                />
            </div>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateWordListForm availablePatterns={props.availablePatterns} wordList={currentWordList} makeList={createList} />
            </div>
        </>


    );
});