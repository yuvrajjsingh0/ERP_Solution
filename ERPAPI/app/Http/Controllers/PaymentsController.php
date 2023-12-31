<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payments;

class PaymentsController extends Controller
{
    public function index(Request $request){
        $payments = null;
        if($request->has('client') && $request->input('client') != ''){
            $payments = Payments::where('client_id', (int)$request->input('client'))->with('package')->latest()->get();
        }else{
            $payments = Payments::with('client')->with('package')->latest()->paginate(10);
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
        $payment->fee = $request->fee;
        $payment->tax = $request->tax;
        $payment->total = $request->total;
        $payment->late_fee = $request->late_fee;
        $payment->from = $request->from;
        $payment->to = $request->to;
        $payment->due = $request->due;
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
            $payment->fee = is_null($request->fee) ? $payment->fee : $request->fee;
            $payment->tax = is_null($request->tax) ? $payment->tax : $request->tax;
            $payment->total = is_null($request->total) ? $payment->total : $request->total;
            $payment->late_fee = is_null($request->late_fee) ? $payment->late_fee : $request->late_fee;
            $payment->from = is_null($request->from) ? $payment->from : $request->from;
            $payment->to = is_null($request->to) ? $payment->to : $request->to;
            $payment->due = is_null($request->due) ? $payment->due : $request->due;
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

    public function destroy(Request $request, $id){
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

    public function search(Request $request){
        $payments = null;
        if($request->has('q') && $request->input('q') != ''){
            $q = $request->input('q');
            $payments = Payments::where('mode', 'like', '%' . $q . '%')
            ->orWhere('meta', 'like', '%' . $q . '%')
            ->orWhere('amount', 'like', '%' . $q . '%')
            ->orWhereHas('package', function($query) use($q){
                $query->where('name', 'like', '%' . $q . '%');
            })->orWhereHas('client', function($query) use($q){
                $query->where('name', 'like', '%' . $q . '%')
                    ->orWhere('email', 'like', '%' . $q . '%')
                    ->orWhere('phone_num', 'like', '%' . $q . '%');
            })->with('package')->with('client')->latest()->get();
        }else{
            $payments = Payments::with('client')->with('package')->latest()->paginate(10);
        }
        return response()->json($payments);
    }
}
