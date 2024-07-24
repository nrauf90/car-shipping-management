<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Resources\CarResource;
use App\Models\Cars;

class CarController extends Controller
{
    /*
     * list all the resources.
     */
    public function index()
    {
        //add filter to query make, modal, year, shipping status
        $cars = Cars::query();
        if (request()->has('make')) {
            $cars->where('make', request('make'));
        }

        if (request()->has('model')) {
            $cars->where('model', request('model'));
        }

        if (request()->has('year')) {
            $cars->where('year', request('year'));
        }

        if (request()->has('shipping_status')) {
            $cars->where('shipping_status', request('shipping_status'));
        }

        $cars->orderBy('id', 'desc');

        return CarResource::collection($cars->paginate(10));
    }

    /*
     * create the specified resource in storage.
     */
    public function store(StoreCarRequest $request)
    {
        $car = Cars::create($request->validated());

        return response()->json([
            'data' => CarResource::make($car),
            'message' => 'Car created successfully'
        ], 201);

    }

    /*
     * show the specified resource.
     */
    public function show(Cars $car)
    {
        return CarResource::make($car);
    }

    /*
     * update the specified resource in storage.
     */
    public function update(UpdateCarRequest $request, Cars $car)
    {
        $car->update($request->validated());

        return  CarResource::make($car);
    }


    /*
     * Remove the specified resource from storage.
     */
    public function destroy(Cars $car)
    {
        $car->delete();

        return response()->noContent();
    }
}
