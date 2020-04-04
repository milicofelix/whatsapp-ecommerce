<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        $product->refresh();

        return $product;
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([],200);
    }
}
