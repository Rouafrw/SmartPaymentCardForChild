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
        Schema::create('children', function (Blueprint $table) {
            $table->id();
            $table->string('National_number')->unique();
            $table->string('grade');  
            $table->decimal('balance', 10, 2)->default(0);
            $table->decimal('daily_balance')->default(0);
            $table->json('forbidden_foods')->nullable(); 
            $table->integer('points')->default(0); 
            // $table->string('card_serial_number')->unique(); // رقم البطاقة المرتبطة بالط
            $table->unsignedBigInteger('parent_id');
            $table->foreign('parent_id')->references('id')->on('parents')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('children');
    }
};
