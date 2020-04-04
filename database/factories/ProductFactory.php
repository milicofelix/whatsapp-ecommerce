<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->city,
//        'slug' => $faker->slug,
        'description' => $faker->text(400),
        'price' => $faker->randomFloat(2,100,1000)
    ];
});
