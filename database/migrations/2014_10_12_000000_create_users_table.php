<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->nullable();
            $table->string('provider');
            $table->string('provider_id')->unique();
            $table->enum('type', ['super_admin', 'admin', 'minsal', 'general'])->default('general');
            $table->string('name');
            $table->string('position')->nullable();
            $table->enum('verified', ['yes', 'no'])->default('no');
            $table->enum('org_admin', ['yes', 'no'])->default('no');
            $table->string('photo_uri')->nullable();
            $table->string('access_token')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
