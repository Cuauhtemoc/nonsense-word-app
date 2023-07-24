<?php

namespace App\Http\Controllers;

use App\Models\GeneralPattern;
use App\Models\Word;
use App\Models\Pattern;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatternsController extends Controller
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
   
    }

    /**
     * Display the specified resource.
     */
    public function show(Pattern $patterns, Request $request)
    {
   
        if($request->has("patterns")){
            $allWords = [];
            $patternData = $request->input("patterns");
            $patternCount = count($patternData);
            $totalWords = $request->input('totalWords');

            $numberOfWordsPerPattern = floor($totalWords / $patternCount);
            $remainingWords = $totalWords % $patternCount;

            foreach ($patternData as $pattern) {

                $wordsLimit = $numberOfWordsPerPattern + ($remainingWords > 0 ? 1 : 0);
                $remainingWords--;

                $words = Word::where('pattern_id', '=', $pattern)->inRandomOrder()->limit($wordsLimit)->get();  
                $allWords = array_merge($allWords, $words->toArray());
            
            }
            shuffle($allWords);

            return Inertia::render('Patterns/Show', 
            [
                "availablePatterns" => GeneralPattern::with('patterns')->get(),
                'wordList' => [
                    "name" => "",
                    "words" => $allWords
                ]
            ]);
        }
        
        return Inertia::render('Patterns/Show', 
        [
            "availablePatterns" => GeneralPattern::with('patterns')->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pattern $patterns)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pattern $patterns)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pattern $patterns)
    {
        //
    }
}
