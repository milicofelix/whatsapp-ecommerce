<?php
/**
 * Created by PhpStorm.
 * User: Adriano
 * Date: 12/05/20
 * Time: 22:02
 */

namespace App\Common;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if($request->get('trashed') == 1){

            $query = $query->onlyTrashed();
        }

        return $query;
    }
}