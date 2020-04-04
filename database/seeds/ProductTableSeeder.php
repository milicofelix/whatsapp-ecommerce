<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Collection $categories */

        $categories = Category::all();
        factory(Product::class,30)
            ->create()
            ->each(function (Product $product) use($categories){
                $category_id = $categories->random()->id;
                $product->categories()->attach($category_id);
            });
    }
}
