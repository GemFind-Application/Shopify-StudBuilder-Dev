<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Coupon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AdminController extends Controller
{
    use AuthenticatesUsers;

    public function login()
    {
        return view('admin.login');
    }

    public function authenticate(Request $request)
    {
        // echo '<pre>';print_r($request->user_type);exit;
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($this->guard($request)->attempt($request->only('username', 'password'))) {
            //Authentication passed...
            return redirect('gfadmin/dashboard');
        } else {
            return redirect()->route('login')->withErrors(['error' => 'Oppes! You have entered invalid credentials']);
        }
    }

    protected function guard($request)
    {
        return Auth::guard('gfadmin');
    }

    public function logout(Request $request)
    {
        Auth::guard('gfadmin')->logout();
        return redirect()->route('login')->with('status', 'Admin has been logged out!');
    }

    public function dashboard()
    {
        return view('admin.dashboard.dashboards-analytics');
    }

    public function couons_index()
    {
        return view('admin.coupon.index');
    }

    public function create_coupon()
    {
        return view('admin.coupon.create');
    }

    public function create(Request $request)
    {
        // echo '<pre>';print_r($request->all());exit;
        $request->validate([
            'shop' => 'required|unique:coupon,shop',
            'discount_code' => 'required|unique:coupon,discount_code',
            'discount_type' => 'required',
            'discount_value' => 'required',
        ], [
                'shop.required' => 'The Shop field is required.',
                'shop.unique'    => 'Coupon is already exists for this shop.',
                'discount_code.unique' => 'You can\'t create more than one coupon for the same shop.',
                'discount_code.required' => 'The Discound Code field is required.',
                'discount_type.required' => 'The Discound Type field is required.',
                'discount_value.required' => 'The Discound Value field is required.',
            ]);

        $coupon = new Coupon;
        $coupon->shop = $request->shop;
        $coupon->discount_code = $request->discount_code;
        $coupon->discount_type = $request->discount_type;
        $coupon->discount_value = $request->discount_value;
        $coupon->save();

        return redirect(route('gfadmin.couons_index'))->with('success', "Coupon has been added Successfully.");
    }

    public function edit($id)
    {
        $data = Coupon::where('id', $id)->first();
        return view('admin.coupon.edit')->with('data', $data);
    }

    public function update(Request $request, $id)
    {
        // echo '<pre>';print_r($request->all());exit;
        $request->validate([
            'shop' => 'required|unique:coupon,shop,' . $id . ',id',
            'discount_code' => 'required|unique:coupon,discount_code,' . $id . ',id',
            'discount_type' => 'required',
            'discount_value' => 'required',
        ], [
                'shop.required' => 'The Shop field is required.',
                'shop.unique' => 'Coupon is already exists for this shop.',
                'discount_code.unique' => 'You can\'t create more than one coupon for the same shop.',
                'discount_code.required' => 'The Discound Code field is required.',
                'discount_type.required' => 'The Discound Type field is required.',
                'discount_value.required' => 'The Discound Value field is required.',
            ]);

        $coupon = Coupon::where('id', $id)->first();
        $coupon->shop = $request->shop;
        $coupon->discount_code = $request->discount_code;
        $coupon->discount_type = $request->discount_type;
        $coupon->discount_value = $request->discount_value;
        $coupon->save();

        return redirect(route('gfadmin.couons_index'))->with('success', "Coupon has been updated Successfully.");
    }

    public function destroy($id)
    {
        // echo '<pre>';print_r($id);exit;
        Coupon::where('id', $id)->delete();
        return redirect(route('gfadmin.couons_index'))->with('success', "Coupon has been deleted Successfully.");
    }

}
