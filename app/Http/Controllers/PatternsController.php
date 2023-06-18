<?php

namespace App\Http\Controllers;

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
            $wordList = array();
            $patternData = $request->input("patterns");
            foreach ($patternData as $pattern) {
                
                $p = Pattern::where('pattern_name', '=', $pattern)->firstOrFail();  
                $words = $p->words()->inRandomOrder()->limit(10)->get();

                array_push($wordList,[
                    "pattern_name" => $pattern,
                    "words" => $words
                ] );
            
            }
            return Inertia::render('Patterns/Show', 
            [
                "availablePatterns" => Pattern::all()->pluck("pattern_name"),
                'wordPatterns' => $wordList
            ]);
        }
        
        return Inertia::render('Patterns/Show', 
        [
            "availablePatterns" => Pattern::all()->pluck("pattern_name"),
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
