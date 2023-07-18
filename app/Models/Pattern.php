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
    /**
     * Get the General Pattern that owns the Pattern
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function generalPattern(): BelongsTo
    {
        return $this->belongsTo(GeneralPattern::class);
    }

}
