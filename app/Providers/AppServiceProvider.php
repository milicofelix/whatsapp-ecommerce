<?php

namespace App\Providers;

use App\Models\ProductInput;
use App\Models\ProductOutput;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ProductInput::created(function($input){
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
        });

        ProductOutput::created(function($output){
//            if(is_null(!$output)) { /*descomentar condição qnd for executar uma seed*/
                $product = $output->product;
                $product->stock -= $output->amount;
                if ($product->stock < 0) {
                    throw new \Exception("Estoque de {$product->name} não pode ser negativo!");
                }
                $product->save();
//            }
        });
    }
}
