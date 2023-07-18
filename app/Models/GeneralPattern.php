<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class GeneralPattern extends Model
{
    use HasFactory;

   /**
     * Get all of the patterns for the GeneralPattern
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function patterns(): HasMany
    {
        return $this->hasMany(Pattern::class, 'general_pattern_id', 'id');
    }
}
