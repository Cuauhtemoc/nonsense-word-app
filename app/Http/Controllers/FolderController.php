<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;

class FolderController extends Controller
{
    public function getFolderHierarchy()
    {
        // Assuming root folder has a parent_id of null
        $rootFolder = Folder::whereNull('parent_id')->with('wordLists')->first();
        
        $formattedData = $this->formatFolder($rootFolder);

        return response()->json([
            "rootFolderId" => '1233456',
            "fileMap" => $formattedData,
        ]);
    }

    private function formatFolder($folder)
    {
        $formattedFolder = [
            "id" => $folder->id,
            "isDir" => true,
            "name" => $folder->name,
            "childrenIds" => [],
        ];

        foreach ($folder->wordLists as $wordList) {
            $formattedFolder["childrenIds"][] = (string)$wordList->id;
        }
        
        return $formattedFolder;
    }

    private function formatFileOrFolder($item)
    {
        return [
            "id" => $item->id,
            "name" => $item->name,
            "parentId" => $item->parent_id,
            "isDir" => $item->is_directory,
        ];
    }
      /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validateWithBag("folder", [
            'name' => ['required', 'string'],
            'parent_id' => ['required'],
        ]);

        $folder = new Folder();
        $folder->name = $validatedData['name'];
        $folder->parent_id = $validatedData['parent_id'];
        $folder->user_id = $request->user()->id;
        $folder->save();

        return response()->json([
            'folder_id' => (string)$folder->id

        ], 200);
    }
       /**
     * Remove the specified resource from storage.
     */
    public function destroy(Folder $folder)
    {

        // Delete all word lists inside the folder
        $folder->wordLists()->delete();

        // Recursively delete sub folders and their word lists
        foreach ($folder->folders as $subFolder) {
            $this->destroy($subFolder);
        }
    
            // Delete the current directory
        $folder->delete();
    }
}

