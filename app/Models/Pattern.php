<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pattern extends Model
{
    use HasFactory;

    protected $fillable = ['pattern_name'];

    public function words()
    {
        return $this->belongsTo(Word::class);
    }

}
