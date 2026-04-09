<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            // Embed URL (YouTube / Vimeo / any iframe-able URL)
            $table->string('video_url')->nullable()->after('image');
            // Uploaded video file path (stored in public/banner-videos/)
            $table->string('video_file')->nullable()->after('video_url');
            // Media type: 'image' | 'video_embed' | 'video_upload'
            $table->string('media_type')->default('image')->after('video_file');
        });
    }

    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(['video_url', 'video_file', 'media_type']);
        });
    }
};
