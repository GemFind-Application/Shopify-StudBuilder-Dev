<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function getCouponDetails($shop, $code){
        $data = Coupon::where(['shop' => $shop, 'discount_code' => $code])->first();

        $array = [];
        if($data){
            (int)$price = $data['discount_type'] === "Percentage"
                        ? (int)env('APP_TOTAL_CHARGE') - (int)env('APP_TOTAL_CHARGE') * ((int)$data['discount_value']/100)
                        : (int)env('APP_TOTAL_CHARGE') - (int)$data['discount_value'];
            $array = [
                // "subTotal"      => env('APP_TOTAL_CHARGE'),
                "discount"      => $data['discount_type'] === "Percentage"
                                    ? $data['discount_value'] . "%"
                                    : "$" . $data['discount_value'] ,
                "saving"        => $data['discount_type'] === "Percentage"
                                    ? (int)env('APP_TOTAL_CHARGE') * ((int)$data['discount_value']/100)
                                    : "$" . $data['discount_value'],
                "finalPrice"    => $price,
                "basic_url"     => route('billing', ['plan' => 1, 'price' => $price, 'test'=>0 , 'shop' => $shop]),
                // "basic_url"     => route('billing', ['plan' => 1,, 'shop' => $shop]),
            ];
            return response()->json(['message' => 'Coupon Details get Successfully', 'status' => 'success', 'data' =>$array]);
        }else{
            return response()->json(['message' => 'Coupon Not Found', 'status' => 'success', 'data' => null]);
        }
    }
}