<?php
declare(strict_types=1);

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Category extends Model
{
    use Sluggable, Filterable;

    protected $fillable = ['name','active'];

    public function products()
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [

            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
