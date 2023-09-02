<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payments;

class PaymentsController extends Controller
{
    public function index(Request $request){
        $payments = null;
        if($request->has('client') && $request->input('client') != ''){
            info((int)$request->input('client'));
            $payments = Payments::where('client_id', (int)$request->input('client'))->latest()->get();
        }else{
            $payments = Payments::latest()->get();
        }
        return response()->json($payments);
    }

    public function store(Request $request){
        $payment = new Payments;
        $payment->client_id = $request->client_id;
        $payment->mode = $request->mode;
        $payment->amount = $request->amount;
        $payment->meta = $request->meta;
        $payment->package_id = $request->package_id;
        $payment->save();

        return response()->json([
            "message" => "Payment added successfully!",
            "id" => $payment->id
        ], 201);
    }

    public function show($id){
        $payment = Payments::find($id);
        if(!empty($payment)){
            return response()->json($payment);
        }else{
            return response()->json([
                "message" => "Payment not found!"
            ], 404);
        }
    }

    public function update(Request $request, $id){
        if(Payments::where('id', $id)->exists()){
            $payment = Payments::find($id);
            $payment->client_id = is_null($request->client_id) ? $payment->client_id : $request->client_id;
            $payment->mode = is_null($request->mode) ? $payment->mode : $request->mode;
            $payment->amount = is_null($request->amount) ? $payment->amount : $request->amount;
            $payment->meta = is_null($request->meta) ? $payment->meta : $request->meta;
            $payment->package_id = is_null($request->package_id) ? $payment->package_id : $request->package_id;
            $payment->save();

            return response()->json([
                "message" => "Payment details updated successfully!"
            ], 201);
        }else{
            return response()->json([
                "message" => "Payment not found!"
            ], 404);
        }
    }

    public function destroy(Request $request){
        if(Payments::where('id', $id)->exists()){
            $payment = Payments::find($id);
            $payment->delete();

            return response()->json([
                "message" => "Payment deleted!"
            ], 202);
        }else{
            return response()->json([
                "message" => "Payment not found!"
            ], 404);
        }
    }
}
