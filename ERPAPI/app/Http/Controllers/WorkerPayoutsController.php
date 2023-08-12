<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkerPayoutsController extends Controller
{
    public function index(){
        $workerPayouts = WorkerPayouts::latest();
        return response()->json($workerPayouts);
    }

    public function store(Request $request){
        $payout = new WorkerPayouts;
        $payout->worker_id = $request->worker_id;
        $payout->mode = $request->mode;
        $payout->amount = $request->amount;
        $payout->meta = $request->meta;
        $payout->save();

        return response()->json([
            "message" => "Payout added successfully!",
            "id" => $payout->id
        ], 201);
    }

    public function show($id){
        $payout = WorkerPayouts::find($id);
        if(!empty($payout)){
            return response()->json($payout);
        }else{
            return response()->json([
                "message" => "Payout not found!"
            ], 404);
        }
    }

    public function update(Request $request, $id){
        if(WorkerPayouts::where('id', $id)->exists()){
            $payout = WorkerPayouts::find($id);
            $payout->worker_id = is_null($request->worker_id) ? $payout->worker_id : $request->worker_id;
            $payout->mode = is_null($request->mode) ? $payout->mode : $request->mode;
            $payout->amount = is_null($request->amount) ? $payout->amount : $request->amount;
            $payout->meta = is_null($request->meta) ? $payout->meta : $request->meta;
            $payout->save();

            return response()->json([
                "message" => "Payout details updated successfully!"
            ], 201);
        }else{
            return response()->json([
                "message" => "Payout not found!"
            ], 404);
        }
    }

    public function destroy(Request $request){
        if(WorkerPayouts::where('id', $id)->exists()){
            $payout = WorkerPayouts::find($id);
            $payout->delete();

            return response()->json([
                "message" => "Payout deleted!"
            ], 202);
        }else{
            return response()->json([
                "message" => "Payout not found!"
            ], 404);
        }
    }
}
