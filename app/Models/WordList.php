<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordList extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    
    public function words()
    {
        return $this->belongsToMany(Word::class, 'word_list_words', 'word_list_id', "word_id");
    }
}
