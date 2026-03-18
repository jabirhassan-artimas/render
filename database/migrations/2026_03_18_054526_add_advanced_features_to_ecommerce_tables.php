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
        // Users Table
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_vip')->default(false)->after('role');
            $table->json('tags')->nullable()->after('is_vip');
            $table->boolean('is_blocked')->default(false)->after('tags');
            $table->string('ip_address')->nullable()->after('is_blocked');
            $table->string('city')->nullable()->after('address');
            $table->string('location')->nullable()->after('city');
        });

        // Couriers Table
        Schema::create('couriers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('third_party'); // internal, third_party
            $table->string('api_key')->nullable();
            $table->json('config')->nullable(); // For API endpoints, credentials
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        // Orders Table
        Schema::table('orders', function (Blueprint $table) {
            $table->text('cancellation_reason')->nullable()->after('order_status');
            $table->text('order_notes')->nullable()->after('cancellation_reason');
            $table->string('order_source')->default('web')->after('order_notes'); // web, mobile, manual
            $table->unsignedBigInteger('courier_id')->nullable()->after('order_source');
            $table->integer('delivery_partner_rating')->nullable()->after('courier_id');
            $table->decimal('advance_payment_amount', 10, 2)->default(0)->after('total');
            $table->decimal('discount_on_advance', 10, 2)->default(0)->after('advance_payment_amount');
            
            $table->foreign('courier_id')->references('id')->on('couriers')->onDelete('set null');
        });

        // Carts Table
        Schema::table('carts', function (Blueprint $table) {
            $table->string('status')->default('active')->after('qty'); // active, abandoned, recovered
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carts', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['courier_id']);
            $table->dropColumn(['cancellation_reason', 'order_notes', 'order_source', 'courier_id', 'delivery_partner_rating', 'advance_payment_amount', 'discount_on_advance']);
        });

        Schema::dropIfExists('couriers');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_vip', 'tags', 'is_blocked', 'ip_address', 'city', 'location']);
        });
    }
};
