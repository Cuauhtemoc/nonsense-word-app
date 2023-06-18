<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;
    
    protected $fillable = ['word'];
    protected $hidden = ['pivot'];

    public function patterns()
    {
        return $this->belongsToMany(Pattern::class, 'words_patterns', 'word_id', 'pattern_id');
    }
    public function wordLists()
    {
        return $this->belongsToMany(WordList::class, 'word_list_words', "word_id", "word_list_id");
    }
 
}
