<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('patterns', function (Blueprint $table) {
            $table->foreignId('general_pattern_id')->after('pattern_name')->nullable()->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patterns', function (Blueprint $table) {
            $table->dropForeign(['general_pattern_id']);
            $table->dropColumn('general_pattern_id');
        });
    }
};
