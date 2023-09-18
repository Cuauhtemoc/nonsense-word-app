<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Pattern;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Word>
 */
class WordFactory extends Factory
{
    public array $consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'pattern_id' => 1,
        ];
    }
    public function pattern(string $patternName) 
    {
        return $this->state(function ($attributes) use ($patternName) {
            return [
                'word' => $this->generateWordForPattern($patternName),
            ];
        });
    }
    private function generateWordForPattern($pattern) : string
    {   
        $patterns = [
            "cvc - short a" => function () { return $this->generateCVCWord('a'); },
            "cvc - short o" => function () { return $this->generateCVCWord('o'); },
            "cvc - short i" => function () { return $this->generateCVCWord('i'); },
            "cvc - short u" => function () { return $this->generateCVCWord('u'); },
            "cvc - short e" => function () { return $this->generateCVCWord('e'); },
            "starts with sh" => function () { return $this->generateWordStartingWith('sh'); },
            "ends with sh" => function () { return $this->generateWordEndingWith('sh'); },
            "ends with ch" => function () { return $this->generateWordEndingWith('ch'); },
            "starts with ch" => function () { return $this->generateWordStartingWith('ch', 'start'); },
            "ends with tch" => function () { return $this->generateWordEndingWith('tch'); },
            "starts with th" => function () { return $this->generateWordStartingWith('th'); },
            "ends with th" => function () { return $this->generateWordEndingWith('th'); },
            "starts with wh" => function () { return $this->generateWordStartingWith('wh'); },
            "ends with ff" => function () { return $this->generateWordEndingWith('ff'); },
            "ends with ll" => function () { return $this->generateWordEndingWith('ll'); },
            "ends with ss" => function () { return $this->generateWordEndingWith('ss'); },
            "ends with zz" => function () { return $this->generateWordEndingWith('zz'); },
            "initial r-blends (br, cr, dr, fr, gr, pr, tr)" => function () { return $this->generateWordFromOptions(['br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr'], 'start'); },
            "initial l-blends (bl, cl, fl, pl, gl, sl)" => function () { return $this->generateWordFromOptions(['bl', 'cl', 'fl', 'pl', 'gl', 'sl'], 'start'); },
            "initial s-blends (st, sn, sp, sw, sm, sc, sk, sl)" => function () { return $this->generateWordFromOptions(['st', 'sn', 'sp', 'sw', 'sm', 'sc', 'sk', 'sl'], 'start'); },
            "final s-blends (-sp, -sk, -st)" => function () { return $this->generateWordFromOptions(['sp', 'sk', 'st']); },
            "final t-blends (-ft, -nt, -st, -ct, -pt, -xt, -lt)" => function () { return $this->generateWordFromOptions(['ft', 'nt', 'st','ct', 'pt', 'xt', 'lt']);},
            "final l-blends (-lk, lf, -ld, -lp)" => function () { return $this->generateWordFromOptions(['lk', 'lf', 'ld', 'lp']); },
            "ng (-ang, -ing, -ong, -ung)" => function () { return $this->generateWordFromOptions(['ang', 'ing', 'ong', 'ung'], 'end', false); },
            "nk (-ank, -ink, -onk, -unk)" => function () { return $this->generateWordFromOptions(['ank', 'ink', 'onk', 'unk'], 'end', false); },
            "initial w-blends (tw, dw, sw)" => function () { return $this->generateWordFromOptions(['tw', 'dw', 'sw'], 'start'); },
            "3 letter blends with digraphs (scr, shr, spl, spr, squ, str, thr)" => function () { return $this->generateWordFromOptions(['scr', 'shr', 'spl', 'spr', 'squ', 'str', 'thr'], 'start'); },
            "magic e: a_e, o_e, i_e, u_e, e_e" => function () { return $this->generateLongVowelWord(); },
            "open vowel: a, o, i, u, and e" => function () { return $this->generateWordFromOptions(['a', 'o', 'i', 'u', 'e'], 'end', false); },
            "ea" => function () { return $this->generateCVCWord('ea'); },
            "ee" => function () { return $this->generateCVCWord('ee'); },
            "oa" => function () { return $this->generateCVCWord('oa'); },
            "ow" => function () { return $this->generateCVCWord('ow'); },
            "ai" => function () { return $this->generateCVCWord('ai'); },
            "ay" => function () { return $this->generateCVCWord('ay'); },
            "oe" => function () { return $this->generateCVCWord('oe'); },
            "igh" => function () { return $this->generateCVCWord('igh'); },
            "ie" => function () { return $this->generateCVCWord('ie'); },
            "ar" => function () { return $this->generateCVCWord('ar'); },
            "er, ir, ur" => function () { return $this->generateCVCWord('er'); },
            "er, ir, ur" => function () { return $this->generateCVCWord('ir'); },
            "er, ir, ur" => function () { return $this->generateCVCWord('ur'); },
            "or" => function () { return $this->generateCVCWord('or'); },
            "ou" => function () { return $this->generateCVCWord('ou'); },
            "oo" => function () { return $this->generateCVCWord('oo'); },
            "oi" => function () { return $this->generateCVCWord('oi'); },
            "ew" => function () { return $this->generateCVCWord('ew'); },
            "aw" => function () { return $this->generateCVCWord('aw'); },
            "au" => function () { return $this->generateCVCWord('au'); },
            "oy" => function () { return $this->generateCVCWord('oy'); },
            "y (one syllable, ends in y)" => function () { return $this->generateMultiSyllableWordEndingWith('y', 1); },
            "y (multi-syllabic, ends in y)" => function () { return $this->generateMultiSyllableWordEndingWith('y', 2); },
            "ends with ild" => function () { return $this->generateWordEndingWith('ild', false); },
            "ends with old" => function () { return $this->generateWordEndingWith('old', false); },
            "ends with ind" => function () { return $this->generateWordEndingWith('ind', false); },
            "ends with olt" => function () { return $this->generateWordEndingWith('olt', false); },
            "ends with ost" => function () { return $this->generateWordEndingWith('ost', false); },
            "ends with dge" => function () { return $this->generateWordEndingWith('dge'); },
            "hard/soft c" => function () { return $this->generateWordStartingWith('c'); },
            "hard/soft g" => function () { return $this->generateWordStartingWith('g'); },
        ];
    
        // Check if the pattern exists in the associative array and execute the corresponding function.
        if (array_key_exists($pattern, $patterns)) {
            $word = $patterns[$pattern];
            return $word();
        }
    
        return "None of the specified options";
    }
    private function generateCVCWord(string $v): string
    {
        $allowedEndings = array_diff($this->consonants, ['h','q','r','w','a']);
        // Ensure 'c' or 'g' is never before 'e', 'i', or 'y'
        $allowedBeginnings= !in_array($v, ['e', 'i', 'y']) ? $this->consonants : array_diff($this->consonants, ['c', 'g']);
        $c1 = fake()->randomElement($allowedBeginnings);
    
        // Ensure 'g' is never before 'e', 'i', or 'y' 
        $c2 = fake()->randomElement($allowedEndings);
    
        // Ensure "ay" only comes at the end of a word when chosen
        if ($v === 'ay') {
            return $c1 . $v;
        }
    
        return $c1 . $v . $c2;
    }
    
    
    

    // by default we will place the diagraph a the start with the option adding a vowel to the middle of the word, by default this is true as it is the most common case
    private function generateWordStartingWith(string $d, bool $addV = true) {
        $allowedEndings = array_diff($this->consonants, ['h','q','r','w','a']);
        if(!$addV)  return $d . fake()->randomElement($allowedEndings);
        return $d . fake()->regexify('[aeiou]{1}') . fake()->randomElement($allowedEndings);
    }
    //generate a word with the ending sound with the option to add a vowel in the middle
    private function generateWordEndingWith(string $d, bool $addV = true)
    {
    
        if(!$addV)  return fake()->randomElement($this->consonants) . $d;;
        return fake()->randomElement($this->consonants) . fake()->regexify('[aeiou]{1}') . $d;
    }

    //function to loop through a list of sounds to create words, with the option of adding a vowel to the middle of the word, whcih is true by default as it the most conmmon case
    private function generateWordFromOptions(array $options, string $position = 'end', bool $addV = true)
    {
        $word = '';
        foreach($options as $option){
            if($position == 'end') $word = $this->generateWordEndingWith($option, $addV);
            else $word = $this->generateWordStartingWith($option, $addV);
            
        }

        return $word;
    }
    
    
    private function generateLongVowelWord()
    {
        // Ensure 'c' or 'g' is not before 'e', 'i', or 'y' 
        $c1 = in_array('e', ['e', 'i', 'y']) ? fake()->randomElement(array_diff($this->consonants, ['c', 'g'])) : fake()->randomElement($this->consonants);
        $longVowel = fake()->randomElement(['a', 'e', 'i', 'o', 'u']);
        $c2 = fake()->randomElement($this->consonants);
        return $c1 . $longVowel . $c2 . 'e';
    }
    

    private function generateMultiSyllableWordEndingWith(string $ending, int $numSyllables){
   
        // Ensure words never end with 'h', 'q', 'r', 'w' or a vowel unless "open vowel" is chosen
        $ending = ($ending === 'h' || $ending === 'q' || $ending === 'r' || $ending === 'w' || in_array($ending, ['a', 'e', 'i', 'o', 'u'])) 
        ? fake()->randomElement(array_diff($this->consonants, ['h', 'q', 'r', 'w'])) 
        : $ending;

        // Ensure words never end in 'y' unless "y as a vowel" is chosen
        if ($ending === 'y') {
            return fake()->randomElement($this->consonants) . fake()->regexify('[aeiou]{1}');
        }
        // Initialize the word with the first syllable.
        $word = $this->generateSyllable();

        // Generate additional syllables.
        for ($i = 1; $i < $numSyllables; $i++) {
            $word .= $this->generateSyllable();
        }

        // Add the ending 'y' to the word.
        $word .= $ending;

        return $word;
    }

    private function generateSyllable(){
        // Create a simple syllable structure (consonant + vowel).
        $consonant = fake()->randomElement($this->consonants);
        $vowel = fake()->randomElement(['a', 'o', 'i', 'u', 'e']);

        return $consonant . $vowel;
    }
}
