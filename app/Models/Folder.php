<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Folder extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name', 'parent_id'];

    public static function rootFolderExists()
    {
        return self::whereNull('parent_id')->exists();
    }

    public function wordLists()
    {
        return $this->hasMany(WordList::class);
    }
    public function folders()
    {
        return $this->hasMany(Folder::class, 'parent_id', 'id');
    }
}
