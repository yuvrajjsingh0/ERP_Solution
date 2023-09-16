<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clients;
use App\Models\Payments;
use App\Models\Packages;
use Carbon\Carbon;

class InsightsController extends Controller
{
    public function totalNumberOfUsers(Request $request){
        $total = Clients::count();

        $fromDateLastMonth = Carbon::now()->subMonth()->startOfMonth()->toDateString();
        $tillDateLastMonth = Carbon::now()->subMonth()->endOfMonth()->toDateString();
        $totalLastMonth = Clients::whereBetween('created_at', [$fromDateLastMonth, $tillDateLastMonth])->count();

        $fromDateThisMonth = Carbon::now()->firstOfMonth()->toDateTimeString();
        $tillDateThisMonth = Carbon::now();
        $totalThisMonth = Clients::whereBetween('created_at', [$fromDateThisMonth, $tillDateThisMonth])->count();

        if($totalThisMonth == 0) {
            $percentChange = -100;
        }else {
            $percentChange = (1 - $totalLastMonth / $totalThisMonth) * 100;
        }

        $result = array(
            "count" => $total,
            "change" => $percentChange
        );
        return response()->json($result);
    }

    public function totalPayments(Request $request){
        $total = Payments::sum('amount');

        $fromDateLastMonth = Carbon::now()->subMonth()->startOfMonth()->toDateString();
        $tillDateLastMonth = Carbon::now()->subMonth()->endOfMonth()->toDateString();
        $totalLastMonth = Payments::whereBetween('created_at', [$fromDateLastMonth, $tillDateLastMonth])->sum('amount');

        $fromDateThisMonth = Carbon::now()->firstOfMonth()->toDateTimeString();
        $tillDateThisMonth = Carbon::now();
        $totalThisMonth = Payments::whereBetween('created_at', [$fromDateThisMonth, $tillDateThisMonth])->sum('amount');

        if($totalThisMonth == 0) {
            $percentChange = -100;
        }else {
            $percentChange = (1 - $totalLastMonth / $totalThisMonth) * 100;
        }

        $result = array(
            "count" => $total,
            "change" => $percentChange
        );
        return response()->json($result);
    }
}
