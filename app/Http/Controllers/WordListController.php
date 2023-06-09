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
         
            'wordPatterns' => ['required', "array"],
        ]);

        $wordList = new WordList();
        $wordList->name = "test";
        $wordList->save();

        $patternData = $validatedData["wordPatterns"];

       
        foreach ($patternData as $pattern) {
            $filteredArray = array_column($pattern['words'], 'word_id');
            \Log::debug($filteredArray);
            $wordList->words()->attach($filteredArray); 

        }
    
    }

    /**
     * Display the specified resource.
     */
    public function show(WordList $wordList)
    {
       
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
