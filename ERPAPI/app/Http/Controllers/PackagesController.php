<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Packages;

class PackagesController extends Controller
{
    public function index(){
        $packages = Packages::all();
        return response()->json($packages);
    }

    public function store(Request $request){
        $package = new Packages;
        $package->name = $request->name;
        $package->frequency = $request->frequency;
        $package->price = $request->price;
        $package->description = $request->description;
        $package->meta = $request->meta;
        $package->save();

        return response()->json([
            "message" => "Package added successfully!"
        ], 201);
    }

    public function show($id){
        $package = Packages::find($id);
        if(!empty($package)){
            return response()->json($package);
        }else{
            return response()->json([
                "message" => "Package not found!"
            ], 404);
        }
    }

    public function update(Request $request, $id){
        if(Packages::where('id', $id)->exists()){
            $package = Packages::find($id);
            $package->name = is_null($request->name) ? $package->name : $request->name;
            $package->frequency = is_null($request->frequency) ? $package->frequency : $request->frequency;
            $package->price = is_null($request->price) ? $package->price : $request->price;
            $package->description = is_null($request->description) ? $package->description : $request->description;
            $package->meta = is_null($request->meta) ? $package->meta : $request->meta;
            $package->save();

            return response()->json([
                "message" => "Package details updated successfully!"
            ], 201);
        }else{
            return response()->json([
                "message" => "Package not found!"
            ], 404);
        }
    }

    public function destroy(Request $request){
        if(Packages::where('id', $id)->exists()){
            $package = Packages::find($id);
            $package->delete();

            return response()->json([
                "message" => "Package deleted!"
            ], 202);
        }else{
            return response()->json([
                "message" => "Package not found!"
            ], 404);
        }
    }
}
