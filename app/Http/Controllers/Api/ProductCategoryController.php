<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductCategoryController extends Controller
{
    public function index(Product $product)
    {
        return new ProductCategoryResource($product);
    }

    public function store(ProductCategoryRequest $request, Product $product)
    {
//        return $product->categories()->sync($request->categories);

        $changed = $product->categories()->sync($request->categories);
        $categoriesAttachedId = $changed['attached'];

        /** @var Collection $categories */
        $categories = Category::whereIn('id',$categoriesAttachedId)->get();

        return $categories->count() ? response()->json(new ProductCategoryResource($product),201): [];
    }

    public function destroy(Product $product, Category $category)
    {
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
