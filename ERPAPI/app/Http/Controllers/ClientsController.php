<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clients;

class ClientsController extends Controller
{
    public function index(Request $request){
        $Clients = Clients::latest()->get();
        return response()->json($Clients);
    }

    public function store(Request $request){
        $client = new Clients;
        $client->name = $request->name;
        $client->phone_num = $request->phone_num;
        $client->email = $request->email;
        $client->package_id = $request->package_id;
        $client->save();

        return response()->json([
            "message" => "Client added successfully!",
            "id" => $client->id
        ], 201);
    }

    public function show($id){
        $client = Clients::find($id);
        if(!empty($client)){
            return response()->json($client);
        }else{
            return response()->json([
                "message" => "Client not found!"
            ], 404);
        }
    }

    public function update(Request $request, $id){
        if(Clients::where('id', $id)->exists()){
            $client = Clients::find($id);
            $client->name = is_null($request->name) ? $client->name : $request->name;
            $client->phone_num = is_null($request->phone_num) ? $client->phone_num : $request->phone_num;
            $client->email = is_null($request->email) ? $client->email : $request->email;
            $client->package_id = is_null($request->package_id) ? $client->package_id : $request->package_id;
            $client->save();

            return response()->json([
                "message" => "Client details updated successfully!"
            ], 201);
        }else{
            return response()->json([
                "message" => "Client not found!"
            ], 404);
        }
    }

    public function destroy($id){
        if(Clients::where('id', $id)->exists()){
            $client = Clients::find($id);
            $client->delete();

            return response()->json([
                "message" => "Client deleted!"
            ], 202);
        }else{
            return response()->json([
                "message" => "Client not found!"
            ], 404);
        }
    }
}
