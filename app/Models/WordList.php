<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Sassnowski\LaravelShareableModel\Shareable\Shareable;
use Sassnowski\LaravelShareableModel\Shareable\ShareableInterface;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class WordList extends Model implements ShareableInterface
{
    use HasFactory, Shareable, HasUuids;

    protected $fillable = ['name'];
    protected $hidden = ['pivot'];
    protected $appends = [ 'words'];
    
    public function words()
    {
        return $this->belongsToMany(Word::class, 'word_list_words', 'word_list_id', "word_id")->withTimestamps();
    }
    public function model(): MorphOne 
    {
        return $this->morphOne(File::class, 'model');
    }
    
    public function getWordsAttribute(){
        return $this->words()->get();
    }
}
