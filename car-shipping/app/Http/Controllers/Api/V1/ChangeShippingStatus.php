<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarResource;
use App\Models\Cars;
use Illuminate\Http\Request;

class ChangeShippingStatus extends Controller
{
    public function __invoke(Request $request, Cars $car)
    {
        $car->shipping_status = $request->shipping_status;
        $car->save();

        return CarResource::make($car);
    }
}
