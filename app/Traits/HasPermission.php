<?php
namespace App\Traits;

trait HasPermission {
    public function hasPermissionTo(...$permissions) {
        return $this->permissions()-whereIn('slug', $permissions)->count() ||
            $this->roles()->whereHas('permissions', function ($q) use ($permissions) {
                $q->whereIn('slug', $permissions);
            })->count();
    }

    public function givePermissionsTo(...$permissions) {
        $this->$permissions->attach($this->getPermissionIdBySlag($permissions));
    }

    public function getPermissionIdBySlag($permission) {
        return \App\Models\Permission::whereIn('slug', $permission)->get()->pluch('id')->toArray();
    }

    public function setPermission(...$permissions) {
        $this->permissions()->sync($this->getPermissionIdBySlag($permissions));
    }

    public function detachPermissions(...$permissions) {
        $this->permissions()->detach($this->getPermissionIdBySlag($permissions));
    }
}
