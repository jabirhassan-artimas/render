<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('order_histories', function (Blueprint $table) {
            if (Schema::hasColumn('order_histories', 'status')) {
                $table->dropColumn('status');
            }
            if (!Schema::hasColumn('order_histories', 'action')) {
                $table->string('action')->after('user_id');
            }
            if (Schema::hasColumn('order_histories', 'comment')) {
                $table->dropColumn('comment');
            }
            if (!Schema::hasColumn('order_histories', 'description')) {
                $table->text('description')->nullable()->after('action');
            }
        });
    }

    public function down(): void
    {
        Schema::table('order_histories', function (Blueprint $table) {
            if (Schema::hasColumn('order_histories', 'action')) {
                $table->renameColumn('action', 'status');
            }
            if (Schema::hasColumn('order_histories', 'description')) {
                $table->renameColumn('description', 'comment');
            }
        });
    }
};
