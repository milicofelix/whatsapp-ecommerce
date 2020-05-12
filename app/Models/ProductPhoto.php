<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use phpDocumentor\Reflection\Types\Self_;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['file_name','product_id'];

    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;

        return storage_path("{$path}/{$productId}");
    }

    public static function createWithPhotosFiles(int $product_id, array $files): Collection
    {
        try{
            Self::uploadFiles($product_id, $files);
            \DB::beginTransaction();
            $photos = self::createPhotosModels($product_id, $files);
//            throw new \Exception('Lançando uma exception');
            \DB::commit();
            return new Collection($photos);
        }catch (\Exception $e){
            \DB::rollBack();
            self::deleteFiles($product_id, $files);

            throw $e;
        }
    }

    /**
     * @param UploadedFile $file
     * @return ProductPhoto
     * @throws \Exception
     */
    public function updateWithPhotos(UploadedFile $file): ProductPhoto
    {
        try{
            Self::uploadFiles($this->product_id, [$file]);
            \DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $this->file_name = $file->hashName();
            $this->save();
            \DB::commit();
            return $this;
        }catch (\Exception $e){
            \DB::rollBack();
            self::deleteFiles($this->product_id, [$file]);
            throw $e;
        }

    }

    public function deleteWithPhotos(): bool
    {
        try{
            \DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $result = $this->delete();
            \DB::commit();
            return $result;
        }catch (\Exception $e){
            \DB::rollBack();
            throw $e;
        }
    }

    public function deletePhoto($fileName)
    {
        $dir = self::photosDir($this->productId);
        \Storage::disk('public')->delete("{$dir}/{$fileName}");
    }

    public static function deleteFiles(int $product_id, array $files)
    {

        /** @var UploadedFile $file */
        foreach ($files as $file){
            $path = self::photosPath($product_id);
            $photo_path = "{$path}/{$file->hashName()}";
            if(file_exists($photo_path)){
                \File::delete($photo_path);
            }
        }

    }

    public static function uploadFiles(int $productId, array $files)
    {
        $dir = self::photosDir($productId);
        /** @var UploadedFile $file */
        foreach ($files as $file){
            $file->store($dir,['disk' => 'public']);
        }

    }

    private static function createPhotosModels(int $product_id, array $files): array
    {
        $photos = [];
        /** @var UploadedFile $file */
        foreach ($files as $file){
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $product_id
            ]);
        }

        return $photos;
    }

    public function getPhotoUrlAttribute()
    {
        $path  = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    /*many to one*/

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
