<?php
declare(strict_types=1);

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use Sluggable;

    protected $fillable = ['name','active'];

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
