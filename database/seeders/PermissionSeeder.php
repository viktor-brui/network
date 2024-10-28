<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::insert([
            [
                'name' => 'View developer dashboard',
                'slug' => 'view_developer_dashboard'
            ],
            [
                'name' => 'View moderator dashboard',
                'slug' => 'view_moderator_dashboard'
            ],
            [
                'name' => 'View admin dashboard',
                'slug' => 'view_admin_dashboard'
            ]
        ]);
    }
}
