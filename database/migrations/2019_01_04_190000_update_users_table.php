<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('organization_id')->unsigned()->nullable()->after('name');
            $table->foreign('organization_id')->references('id')->on('organizations');
            $table->integer('last_editor_id')->unsigned()->nullable()->after('photo_uri');
            $table->foreign('last_editor_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_last_editor_id_foreign');
            $table->dropColumn('last_editor_id');
            $table->dropForeign('users_organization_id_foreign');
            $table->dropColumn('organization_id');
        });
    }
}
