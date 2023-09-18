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
        Schema::table('word_lists', function (Blueprint $table) {
            $table->uuid('folder_id')->nullable();
            $table->foreign('folder_id')->references('id')->on('folders');
          

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('word_lists', function (Blueprint $table) {
            $table->dropForeign(["folder_id"]);
        });
    }
};
