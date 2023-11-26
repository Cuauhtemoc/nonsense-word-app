<?php

namespace App\Http\Controllers;

use App\Models\Pattern;
use App\Models\WordList;
use App\Models\Folder;
use App\Models\GeneralPattern;
use App\Models\Word;
use Illuminate\Http\Request;
use Sassnowski\LaravelShareableModel\Shareable\ShareableLink;
use Sassnowski\LaravelShareableModel\Shareable\SharedLink;
use Inertia\Inertia;

class WordListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rootFolder =  $request->user()->folders()->whereNull('parent_id')->first();
        $wordLists = $request->user()->wordLists()->get();
        $folders = $request->user()->folders()->get();
        $formattedData = [];

        foreach ($wordLists as $list) {
            $formattedData[$list->id] = $this->formatWordList($list);
        }
        foreach ($folders as $folder) {
            $formattedData[$folder->id] = $this->formatFolder($folder);
        }

        //fs represents all the data to represent out file system on the front end
        return Inertia::render('Dashboard', [
            "fs" => [
                "rootFolderId" => (string)$rootFolder->id,
                "fileMap" => $formattedData,
            ],
            "availablePatterns" => GeneralPattern::with('patterns')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function generateList(Request $request)
    {
        $data = $request->validate([
            'patterns' => 'required|array',
            'listSize' => 'required|integer',
            'includeRealWords' => 'required|boolean',
            'includeNonsenseWords' => 'required|boolean',
        ]);


        $allWords = [];
        $patternData = $data['patterns'];
        $patternCount = count($patternData);
        $totalWords = $data['listSize'];

        $numberOfWordsPerPattern = floor($totalWords / $patternCount);
        $remainingWords = $totalWords % $patternCount;

        foreach ($patternData as $pattern) {
            $wordsLimit = $numberOfWordsPerPattern + ($remainingWords > 0 ? 1 : 0);
            $remainingWords--;
        
            $wordsQuery = Word::query();
        
            if ($data['includeRealWords']) {
                $wordsQuery->orWhere(function ($query) use ($pattern) {
                    $query->where('pattern_id', '=', $pattern)
                          ->where('is_real_word', '=', true);
                });
            }
        
            if ($data['includeNonsenseWords']) {
                $wordsQuery->orWhere(function ($query) use ($pattern) {
                    $query->where('pattern_id', '=', $pattern)
                          ->where('is_real_word', '=', false);
                });
            }
        
            $words = $wordsQuery->inRandomOrder()->limit($wordsLimit)->get();
            $allWords = array_merge($allWords, $words->toArray());
        }
        shuffle($allWords);

        return response()->json(
            [
                'wordList' => [
                    "name" => "",
                    "words" => $allWords
                ]
            ]
        );
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validateWithBag("wordList", [
            'name' => ['required', 'string'],
            'folder_id' => ['required', 'string'],
            'words' => ['required', "array"],
        ]);

        $wordList = new WordList();
        $wordList->name = $validatedData['name'];
        $wordList->user_id = $request->user()->id;
        $wordList->folder_id = $request['folder_id'];
        $wordList->save();
        //attach all the associated workds with this list
        $wordData = $validatedData["words"];
        $filteredArray = array_column($wordData, 'id');
        $wordList->words()->attach($filteredArray);
        //create the sharable link for this word list
        ShareableLink::buildFor($wordList)
            ->setActive()
            ->setPrefix('word-list')
            ->build();

        return response()->json(
            $this->formatWordList($wordList),
            200
        );
    }
    /**
     * Transform the folder data for Chonky.js 
     */
    private function formatFolder($folder)
    {
        $formattedFolder = [
            "id" => (string)$folder->id,
            "isDir" => true,
            "name" => $folder->name,
            "childrenIds" => [],
            'parentId' => (string)$folder->parent_id,
            'childrenCount' => 0,
            'modDate' => $folder->updated_at ?? $folder->created_at
        ];

        foreach ($folder->wordLists as $wordList) {
            $formattedFolder["childrenIds"][] = (string)$wordList->id;
        }

        foreach ($folder->folders as $folder) {
            $formattedFolder["childrenIds"][] = (string)$folder->id;
        }

        $formattedFolder["childrenCount"] = count($formattedFolder["childrenIds"]);

        return $formattedFolder;
    }
    /**
     * Transform the list data for Chonky.js
     */
    private function formatWordList($wordList)
    {

        $formattedList = [
            'id' => (string)$wordList->id,
            'name' => $wordList->name,
            'parentId' => (string)$wordList->folder_id,
            'modDate' => $wordList->updated_at ?? $wordList->created_at,
            'ext' => '',
            'words' => $wordList->words,
            'shareableLink' => $wordList->links->first()->url
        ];
        return $formattedList;
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
    }
    public function showShared(ShareableLink $link)
    {
        return Inertia::render('SharedWordList/Show', [
            'wordList' => $link->shareable,
            'canLogin' => true,

        ]);
    }
    /**
     * Move the word list to another folder.
     */
    public function move(Request $request)
    {
        $validatedData = $request->validateWithBag("moveLists", [
            'destination_id' => ['required', 'string'],
            'moveFileIds' => ['required', 'array'],
        ]);
        WordList::whereIn('id', $validatedData['moveFileIds'])->update(['folder_id' => $validatedData['destination_id']]);

        return response()->json([
            'message' => 'success'

        ], 200);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WordList $wordList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WordList $wordList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WordList $wordList)
    {
        $wordList->delete();
    }
}
