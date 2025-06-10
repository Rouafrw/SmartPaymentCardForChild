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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('National_number')->unique();
            $table->string('password');
            // $table->string('job_title');
            $table->enum('job_title', ['Financial Employee', 'Library employee', 'Sales employee' , 'admin']);

            $table->decimal('salary', 10, 2); //    الراتب
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
