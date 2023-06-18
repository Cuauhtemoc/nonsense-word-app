<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pattern extends Model
{
    use HasFactory;

    protected $fillable = ['pattern_name'];

    protected $hidden = ['pivot'];

    public function words()
    {
        return $this->belongsToMany(Word::class, 'words_patterns', 'pattern_id', 'word_id')->select(['word_id', 'word']);;
    }

    public static function wordList(array $list){
        return $this->belongsToMany(Word::class)
                ->wherePivotIn('pattern_name', $list);
    }
}
