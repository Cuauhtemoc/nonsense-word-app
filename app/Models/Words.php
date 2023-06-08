<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Words extends Model
{
    use HasFactory;

    protected $primaryKey = 'word_id';
    protected $fillable = ['word'];

    public function patterns()
    {
        return $this->belongsToMany(Pattern::class, 'words_patterns', 'word_id', 'pattern_id');
    }
}
