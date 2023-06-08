<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patterns extends Model
{
    use HasFactory;

    protected $primaryKey = 'pattern_id';
    protected $fillable = ['pattern_name'];

    public function words()
    {
        return $this->belongsToMany(Word::class, 'words_patterns', 'pattern_id', 'word_id');
    }
}
