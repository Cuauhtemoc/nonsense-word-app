<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GeneralPattern;
use App\Models\Pattern;
use App\Models\Word;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        $user = \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $user->folders()->create([
            'name' => 'root'
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "CVC - Short Vowel"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'cvc - short a'],
            ['pattern_name' => 'cvc - short o'],
            ['pattern_name' => 'cvc - short i'],
            ['pattern_name' => 'cvc - short u'],
            ['pattern_name' => 'cvc - short e'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Digraphs"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'starts with sh'],
            ['pattern_name' => 'ends with sh'],
            ['pattern_name' => 'ends with ch'],
            ['pattern_name' => 'starts with ch'],
            ['pattern_name' => 'ends with tch'],
            ['pattern_name' => 'starts with th'],
            ['pattern_name' => 'ends with th'],
            ['pattern_name' => 'starts with wh'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Double Consonants"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'ends with ff'],
            ['pattern_name' => 'ends with ll'],
            ['pattern_name' => 'ends with ss'],
            ['pattern_name' => 'ends with zz'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Blends"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => "initial r-blends (br, cr, dr, fr, gr, pr, tr)"],
            ['pattern_name' => "initial l-blends (bl, cl, fl, pl, gl, sl)"],
            ['pattern_name' => "initial s-blends (st, sn, sp, sw, sm, sc, sk, sl)"],
            ['pattern_name' => "final s-blends (-sp, -sk, -st)"],
            ['pattern_name' => "final t-blends (-ft, -nt, -st, -ct, -pt, -xt, -lt)"],
            ['pattern_name' => "final l-blends (-lk, lf, -ld, -lp)"],
            ['pattern_name' => "ng (-ang, -ing, -ong, -ung)"],
            ['pattern_name' => "nk (-ank, -ink, -onk, -unk)"],
            ['pattern_name' => "initial w-blends (tw, dw, sw)"],
            ['pattern_name' => "3 letter blends with digraphs (scr, shr, spl, spr, squ, str, thr)"],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Long Vowel Patterns"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => "magic e: a_e, o_e, i_e, u_e, e_e"],
            ['pattern_name' => "open vowel: a, o, i, u, and e"],
            ['pattern_name' => 'ea'],
            ['pattern_name' => 'ee'],
            ['pattern_name' => 'oa'],
            ['pattern_name' => 'ow'],
            ['pattern_name' => 'ai'],
            ['pattern_name' => 'ay'],
            ['pattern_name' => 'oe'],
            ['pattern_name' => 'igh'],
            ['pattern_name' => 'ie'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "R-Controlled"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'ar'],
            ['pattern_name' => 'er, ir, ur'],
            ['pattern_name' => 'or'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Diphthong"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'ow'],
            ['pattern_name' => 'ou'],
            ['pattern_name' => 'oo'],
            ['pattern_name' => 'oi'],
            ['pattern_name' => 'ew'],
            ['pattern_name' => 'aw'],
            ['pattern_name' => 'au'],
            ['pattern_name' => 'oy'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Y as a vowel"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'y (one syllable, ends in y)'],
            ['pattern_name' => 'y (multi-syllabic, ends in y)'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Other Long Vowel"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'ends with ild'],
            ['pattern_name' => 'ends with old'],
            ['pattern_name' => 'ends with ind'],
            ['pattern_name' => 'ends with olt'],
            ['pattern_name' => 'ends with ost'],
            ['pattern_name' => 'ends with dge'],
        ]);
        $genPattern = GeneralPattern::create(
            [
                'general_pattern_name' => "Other patterns"
            ],
        );
        $genPattern->patterns()->createMany([
            ['pattern_name' => 'hard/soft c'],
            ['pattern_name' => 'hard/soft g'],
        ]);
        
        $patterns = Pattern::all();
        foreach($patterns as $pattern){
            Word::factory(100)->pattern($pattern->pattern_name)->create(['pattern_id' => $pattern->id]);
        }
        
    }
}
