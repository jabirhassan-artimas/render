<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cms_pages', function (Blueprint $table) {
            $table->string('image')->nullable()->after('slug');
            $table->json('meta')->nullable()->after('content'); // For things like "Years of Experience"
        });

        Schema::table('banners', function (Blueprint $table) {
            $table->string('subtitle')->nullable()->after('title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cms_pages', function (Blueprint $table) {
            $table->dropColumn(['image', 'meta']);
        });

        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn('subtitle');
        });
    }
};
