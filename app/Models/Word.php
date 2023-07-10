<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;
    
    protected $fillable = ['word'];

    public function pattern()
    {
        return $this->hasOne(Pattern::class);
    }
    public function wordLists()
    {
        return $this->belongsToMany(WordList::class, 'word_list_words', "word_id", "word_list_id");
    }
 
}
