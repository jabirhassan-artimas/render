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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('invoice_no')->nullable()->unique()->after('order_number');
            $table->string('email_sent_status')->default('not_sent')->after('order_status');
            $table->timestamp('email_sent_at')->nullable()->after('email_sent_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['invoice_no', 'email_sent_status', 'email_sent_at']);
        });
    }
};
