<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $products = $query->paginate(10);
        return ProductResource::collection($products);
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        $product->refresh();

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([],200);
    }

    public function restaurar(Product $product)
    {
        exit('AQUI');
        $product->restore();

        return response()->json([],204);
    }

    public function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if($request->get('trashed') == 1){

            $query = $query->onlyTrashed();
        }

        return $query;
    }
}
