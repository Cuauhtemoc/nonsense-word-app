<?php

namespace App\Http\Controllers;

use App\Models\Pattern;
use App\Models\WordList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WordListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'words' => ['required', "array"],
        ]);

        $wordList = new WordList();
        $wordList->name = $validatedData['name'];
        $wordList->user_id = $request->user()->id;
        $wordList->save();
       
        $wordData = $validatedData["words"];
        $filteredArray = array_column($wordData, 'id');
        $wordList->words()->attach($filteredArray); 

        return back()->with('message', 'My message');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
       $wordLists = $request->user()->wordLists()->get();

       return Inertia::render('Dashboard', [
            'wordLists' => $wordLists
       ]);
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
        //
    }
}
