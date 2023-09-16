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

    public function paymentsByWeek(Request $request){

        // This Week
        $fromDateThisWeek = Carbon::now()->startOfWeek()->toDateTimeString();
        $tillDateThisWeek = Carbon::now();
        $paymentsThisWeek = Payments::whereBetween('created_at', [$fromDateThisWeek, $tillDateThisWeek])->get();

        $paymentsThisWeekOrg = [
            'Sunday' => [],
            'Monday' => [],
            'Tuesday' => [],
            'Wednesday' => [],
            'Thursday' => [],
            'Friday' => [],
            'Saturday' => [],
        ];
        
        foreach ($paymentsThisWeek as $payment) {
            // Parse the 'created_at' field as a Carbon date
            $createdAt = Carbon::parse($payment['created_at']);
            
            // Get the day of the week using Carbon
            $dayOfWeek = $createdAt->dayName;
            
            // Append the payment to the corresponding day's array
            $paymentsThisWeekOrg[$dayOfWeek][] = $payment;
        }

        // Last Week
        $fromDateLastWeek = Carbon::now()->subWeek()->startOfWeek()->toDateString();
        $tillDateLastWeek = Carbon::now()->subWeek()->endOfWeek()->toDateString();
        $paymentsLastWeek = Payments::whereBetween('created_at', [$fromDateLastWeek, $tillDateLastWeek])->get();

        $paymentsLastWeekOrg = [
            'Sunday' => [],
            'Monday' => [],
            'Tuesday' => [],
            'Wednesday' => [],
            'Thursday' => [],
            'Friday' => [],
            'Saturday' => [],
        ];
        
        foreach ($paymentsLastWeek as $payment) {
            // Parse the 'created_at' field as a Carbon date
            $createdAt = Carbon::parse($payment['created_at']);
            
            // Get the day of the week using Carbon
            $dayOfWeek = $createdAt->dayName;
            
            // Append the payment to the corresponding day's array
            $paymentsLastWeekOrg[$dayOfWeek][] = $payment;
        }

        $result = array(
            "paymentsThisWeek" => $paymentsThisWeekOrg,
            "paymentsLastWeek" => $paymentsLastWeekOrg
        );
        return response()->json($result);
    }

    public function paymentsByMonth(Request $request){

        $paymentsLast12Months = [];
        $monthsOrder = [];

        for($i = 0; $i < 12; $i++){
            $j = $i;
            $fromDate = Carbon::now()->startOfMonth();
            while($j > 0){
                $fromDate = $fromDate->subMonth();
                $j--;
            }
            $endDate = Carbon::parse($fromDate->toDateString())->endOfMonth();

            $paymentsThisMonth = Payments::whereBetween('created_at', [$fromDate->toDateString(), $endDate->toDateString()])->sum('amount');
            $paymentsLast12Months[$endDate->isoFormat('MMM')] = $paymentsThisMonth;
            $monthsOrder[11-$i] = $endDate->isoFormat('MMM');
        }

        $result = array(
            "paymentsLast12Months" => $paymentsLast12Months,
            "monthsOrder" => $monthsOrder
        );
        return response()->json($result);
    }
}
