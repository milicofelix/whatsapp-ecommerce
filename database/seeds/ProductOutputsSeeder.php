<?php

use App\Models\Product;
use App\Models\ProductOutput;
use Illuminate\Database\Seeder;

class ProductOutputsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();

        factory(ProductOutput::class,150)
            ->make()
            ->each(function ($output) use($products){
                $product = $products->random();
                $output->product_id = $product->id;
                $output->save();
            });
    }
}
