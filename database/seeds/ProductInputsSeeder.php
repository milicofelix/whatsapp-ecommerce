<?php
declare(strict_types=1);

use App\Models\Product;
use App\Models\ProductInput;
use Illuminate\Database\Seeder;

class ProductInputsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();

        factory(ProductInput::class,200)
            ->make()
            ->each(function ($input) use($products){
                $product = $products->random();
                $input->product_id = $product->id;
                $input->save();
//                $product->stock += $input->amount;
//                $product->save();
            });
    }
}
