<?php

declare(strict_types=1);

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class ProductPhotosTableSeeder extends Seeder
{
    /** @var  Collection */
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakePhoto();
        /** @var Collection $products */
        $products = Product::all();
        $this->deleteAllPhotosInProductPath();
        $self = $this;
        $products->each(function ($product) use ($self) {
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function getFakePhoto(): Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function deleteAllPhotosInProductPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path),true);

    }
    private function createPhotoDir(Product $product)
    {
        $path = ProductPhoto::photosPath($product->id);
        \File::makeDirectory($path,0777,true);
    }

    private function createPhotosModels(Product $product)
    {
        foreach (range(1,5) as $v){
            $this->createPhotoModel($product);
        }
    }
    private function createPhotoModel(Product $product)
    {
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'Imagem.jpg'
        ]);

        $this->generatePhoto($photo);
    }

    private function generatePhoto(ProductPhoto $productPhoto)
    {
        $productPhoto->file_name = $this->uploadPhoto($productPhoto->product_id);
        $productPhoto->save();
    }

    private function uploadPhoto($productId)
    {
        /** @var SplFileInfo $photoFile **/
        $photoFile = $this->allFakerPhotos->random();
        $uploadeFile = new \Illuminate\Http\UploadedFile(
            $photoFile->getRealPath(),
            str_random(16). '.'. $photoFile->getExtension()
        );

        ProductPhoto::uploadFiles($productId,[$uploadeFile]);

        return $uploadeFile->hashName();
    }
}
