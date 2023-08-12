<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkersController extends Controller
{
    public function index(){
        $workers = Workers::latest();
        return response()->json($workers);
    }

    public function store(Request $request){
        $worker = new Workers;
        $worker->name = $request->name;
        $worker->phone_num = $request->phone_num;
        $worker->salary = $request->salary;
        $worker->email = $request->email;
        $worker->frequency = $request->frequency;
        $worker->save();

        return response()->json([
            "message" => "Worker added successfully!",
            "id" => $worker->id
        ], 201);
    }

    public function show($id){
        $worker = Workers::find($id);
        if(!empty($worker)){
            return response()->json($worker);
        }else{
            return response()->json([
                "message" => "Worker not found!"
            ], 404);
        }
    }

    public function update(Request $request, $id){
        if(Workers::where('id', $id)->exists()){
            $worker = Workers::find($id);
            $worker->name = is_null($request->name) ? $worker->name : $request->name;
            $worker->phone_num = is_null($request->phone_num) ? $worker->phone_num : $request->phone_num;
            $worker->salary = is_null($request->salary) ? $worker->salary : $request->salary;
            $worker->email = is_null($request->email) ? $worker->email : $request->email;
            $worker->frequency = is_null($request->frequency) ? $worker->frequency : $request->frequency;
            $worker->save();

            return response()->json([
                "message" => "Worker details updated successfully!"
            ], 201);
        }else{
            return response()->json([
                "message" => "Worker not found!"
            ], 404);
        }
    }

    public function destroy(Request $request){
        if(Workers::where('id', $id)->exists()){
            $worker = Workers::find($id);
            $worker->delete();

            return response()->json([
                "message" => "Worker deleted!"
            ], 202);
        }else{
            return response()->json([
                "message" => "Worker not found!"
            ], 404);
        }
    }
}
