<?php

namespace App\Http\Controllers;



use App\Http\Controllers\RingEmailController;

use App\Http\Controllers\DiamondEmailController;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Validator;

use DB;

use Mail;



class CompleteRingEmailController extends Controller
{


    // Drop A Hint

    public function crDropHintApi(Request $request)
    {

        $validatedData = Validator::make($request->all(), [

            'name'                          => 'required',

            'email'                            => 'required',

            'hint_Recipient_name'             => 'required',

            'hint_Recipient_email'          => 'required',

            'reason_of_gift'                   => 'required',

            'hint_message'                    => 'required',

            'deadline'                        => 'required',

        ]);

        if ($validatedData->fails()) {

            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status']  = 'mail not send';

            $validation_error['data']    = [];

            return response()->json($validation_error);
        }


        $drophint_post_data = $request->all();

        $currency = '$';

        $reqData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();

        $store_logo = $reqData->shop_logo ? $reqData->shop_logo : 'NA';

        $storeAdminEmail = $reqData->admin_email_address;

        $shopurl = "https://" . $drophint_post_data['shopurl'];

        $price_rb  = $currency . $drophint_post_data['price'] ? $currency . $drophint_post_data['price'] : 'NA';

        $metalType = $drophint_post_data['metalType'] ? $drophint_post_data['metalType'] : 'NA';

        $backingType = $drophint_post_data['backingType'] ? $drophint_post_data['backingType'] : 'NA';

        $color = $drophint_post_data['color'] ? $drophint_post_data['color'] : 'NA';

        $styleNumber = $drophint_post_data['styleNumber'] ? $drophint_post_data['styleNumber'] : 'NA';

        $settingid = $drophint_post_data['settingid'] ? $drophint_post_data['settingid'] : 'NA';



        $diamondData = DiamondEmailController::getDiamondById($drophint_post_data['diamondid'], $drophint_post_data['diamondtype'], $drophint_post_data['shopurl']);

        $seconddiamondData = DiamondEmailController::getDiamondById($drophint_post_data['seconddiamondid'], $drophint_post_data['diamondtype'], $drophint_post_data['shopurl']);
        //echo '<pre>';print_r($second_diamondData);exit;
        $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $vendorName = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop']);

        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop']);
        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {

            $color_to_display = 'NA';
        }

        //second Diamond color
        if ($seconddiamondData['diamondData']['color'] != '') {

            $second_color_to_display = $seconddiamondData['diamondData']['color'];
        } else {

            $second_color_to_display = 'NA';
        }


        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $price = 'Call For Price';
        }

        //second Diamond color

        if ($seconddiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $seconddiamondData['diamondData']['fltPrice'] ? $currency . number_format($seconddiamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $second_d_price = 'Call For Price';
        }

        //MAIL TO USER

        $data = [

            'name' => $drophint_post_data['name'],

            'email' => $drophint_post_data['email'],

            'hint_Recipient_name' => $drophint_post_data['hint_Recipient_name'],

            'hint_Recipient_email' => $drophint_post_data['hint_Recipient_email'],

            'reason_of_gift' => $drophint_post_data['reason_of_gift'],

            'hint_message' =>    $drophint_post_data['hint_message'],

            'deadline' =>    $drophint_post_data['deadline'],

            'ring_url' => $drophint_post_data['ring_url'],

            // 'price_rb' => $ringData['ringData']['cost'] ? $ringData['ringData']['currencySymbol'] . ' ' . number_format($ringData['ringData']['cost']) : '',

            'price_rb' => $price_rb,

            'setting_id' => $settingid,

            'stylenumber' => $styleNumber,

            'metaltype' => $metalType,

            'vendorPhone' => $diamondData['diamondData']['vendorContactNo'],

            'diamond_url' => $drophint_post_data['diamondurl'] ? $drophint_post_data['diamondurl'] : 'NA',

            'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : 'NA',

            'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : 'NA',

            'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : 'NA',

            'color' => $color_to_display,

            'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : 'NA',

            'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : 'NA',

            'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : 'NA',

            'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : 'NA',

            'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : 'NA',

            'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : 'NA',

            'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : 'NA',

            // 'price' => $diamondData['diamondData']['fltPrice'] ? number_format($diamondData['diamondData']['fltPrice']) : '',

            'price' => $price,

            'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',

            'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',

            'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',

            'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',

            'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',

            'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',

            'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',

            'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',

            'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',

            'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',

            'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',

            'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

            //Second Diamond Data

            'second_d_diamond_id' => $seconddiamondData['diamondData']['diamondId'] ? $seconddiamondData['diamondData']['diamondId'] : 'NA',

            'second_d_size' => $seconddiamondData['diamondData']['caratWeight'] ? $seconddiamondData['diamondData']['caratWeight'] : 'NA',

            'second_d_cut' => $seconddiamondData['diamondData']['cut'] ? $seconddiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_color_to_display,

            'second_d_clarity' => $seconddiamondData['diamondData']['clarity'] ? $seconddiamondData['diamondData']['clarity'] : 'NA',

            'second_d_depth' => $seconddiamondData['diamondData']['depth'] ? $seconddiamondData['diamondData']['depth'] : 'NA',

            'second_d_table' => $seconddiamondData['diamondData']['table'] ? $seconddiamondData['diamondData']['table'] : 'NA',

            'second_d_measurment' => $seconddiamondData['diamondData']['measurement'] ? $seconddiamondData['diamondData']['measurement'] : 'NA',

            'second_d_certificate' => $seconddiamondData['diamondData']['certificate'] ? $seconddiamondData['diamondData']['certificate'] : 'NA',

            'second_d_price' => $second_d_price,

            'second_d_certificateUrl' => $seconddiamondData['diamondData']['certificateUrl'] ? $seconddiamondData['diamondData']['certificateUrl'] : 'NA',

            'shop_logo' => $store_logo,

            'shop_logo_alt' => $reqData->shop,

            'shopurl' => $shopurl,

        ];

        // echo'<pre>';print_r($data);exit;

        //Sender Email



        $user['to'] = $request->email;



        Mail::send('completeRingDropHintSender', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Someone Wants To Drop You A Hint');
        });



        //Retailer Email



        $user['to'] = $retaileremail;



        Mail::send('completeRingDropHintRetailer', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Someone Wants To Drop You A Hint');
        });



        //Receiver Email



        $user['to'] = $request->hint_Recipient_email;



        Mail::send('completeRingDropHintReceiver', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Someone Wants To Drop You A Hint');
        });



        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }


    // E-Mail A Friend

    public function crEmailFriendApi(Request $request)
    {

        $validatedData = Validator::make($request->all(), [

            'name'       => 'required',

            'email'        => 'required',

            'frnd_name'    => 'required',

            'frnd_email'   => 'required',

            'frnd_message' => 'required',

        ]);

        if ($validatedData->fails()) {

            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status']  = 'mail not send';

            $validation_error['data']    = [];

            return response()->json($validation_error);
        }

        $frndemail_post_data = $request->all();

        $currency = '$';

        $reqData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();

        $store_logo = $reqData->shop_logo ? $reqData->shop_logo : 'NA';

        $storeAdminEmail = $reqData->admin_email_address;

        $shopurl = "https://" . $frndemail_post_data['shopurl'];

        $price_rb  = $currency . $frndemail_post_data['price'] ? $currency . $frndemail_post_data['price'] : 'NA';

        $metalType = $frndemail_post_data['metalType'] ? $frndemail_post_data['metalType'] : 'NA';

        $backingType = $frndemail_post_data['backingType'] ? $frndemail_post_data['backingType'] : 'NA';

        $color = $frndemail_post_data['color'] ? $frndemail_post_data['color'] : 'NA';

        $styleNumber = $frndemail_post_data['styleNumber'] ? $frndemail_post_data['styleNumber'] : 'NA';

        $settingid = $frndemail_post_data['settingid'] ? $frndemail_post_data['settingid'] : 'NA';


        $diamondData = DiamondEmailController::getDiamondById($frndemail_post_data['diamondid'], $frndemail_post_data['diamondtype'], $frndemail_post_data['shopurl']);

        $seconddiamondData = DiamondEmailController::getDiamondById($frndemail_post_data['seconddiamondid'], $frndemail_post_data['diamondtype'], $frndemail_post_data['shopurl']);
        //echo '<pre>';print_r($second_diamondData);exit;
        $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $vendorName = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop']);

        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop']);

        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {

            $color_to_display = 'NA';
        }

        //second Diamond color
        if ($seconddiamondData['diamondData']['color'] != '') {

            $second_color_to_display = $seconddiamondData['diamondData']['color'];
        } else {

            $second_color_to_display = 'NA';
        }


        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $price = 'Call For Price';
        }

        //second Diamond color

        if ($seconddiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $seconddiamondData['diamondData']['fltPrice'] ? $currency . number_format($seconddiamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $second_d_price = 'Call For Price';
        }

        //MAIL TO USER

        $data = [

            'name' => $frndemail_post_data['name'],

            'email' => $frndemail_post_data['email'],

            'frnd_name' => $frndemail_post_data['frnd_name'],

            'frnd_email' => $frndemail_post_data['frnd_email'],

            'frnd_message' => $frndemail_post_data['frnd_message'],

            'ring_url' => $frndemail_post_data['ring_url'],

            // 'price_rb' => $ringData['ringData']['cost'] ? $ringData['ringData']['currencySymbol'] . ' ' . number_format($ringData['ringData']['cost']) : '',

            'price_rb' => $price_rb,

            'setting_id' => $settingid,

            'stylenumber' => $styleNumber,

            'metaltype' => $metalType,

            'ringcolor' => $color,

            'backingtype' => $backingType,


            'vendorPhone' => $diamondData['diamondData']['vendorContactNo'],

            'diamond_url' => $frndemail_post_data['diamondurl'] ? $frndemail_post_data['diamondurl'] : 'NA',

            'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : 'NA',

            'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : 'NA',

            'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : 'NA',

            'color' => $color_to_display,

            'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : 'NA',

            'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : 'NA',

            'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : 'NA',

            'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : 'NA',

            'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : 'NA',

            'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : 'NA',

            'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : 'NA',

            // 'price' => $diamondData['diamondData']['fltPrice'] ? number_format($diamondData['diamondData']['fltPrice']) : '',

            'price' => $price,

            'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',

            'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',

            'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',

            'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',

            'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',

            'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',

            'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',

            'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',

            'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',

            'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',

            'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',

            'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

            //Second Diamond Data

            'second_d_diamond_id' => $seconddiamondData['diamondData']['diamondId'] ? $seconddiamondData['diamondData']['diamondId'] : 'NA',

            'second_d_size' => $seconddiamondData['diamondData']['caratWeight'] ? $seconddiamondData['diamondData']['caratWeight'] : 'NA',

            'second_d_cut' => $seconddiamondData['diamondData']['cut'] ? $seconddiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_color_to_display,

            'second_d_clarity' => $seconddiamondData['diamondData']['clarity'] ? $seconddiamondData['diamondData']['clarity'] : 'NA',

            'second_d_depth' => $seconddiamondData['diamondData']['depth'] ? $seconddiamondData['diamondData']['depth'] : 'NA',

            'second_d_table' => $seconddiamondData['diamondData']['table'] ? $seconddiamondData['diamondData']['table'] : 'NA',

            'second_d_measurment' => $seconddiamondData['diamondData']['measurement'] ? $seconddiamondData['diamondData']['measurement'] : 'NA',

            'second_d_certificate' => $seconddiamondData['diamondData']['certificate'] ? $seconddiamondData['diamondData']['certificate'] : 'NA',

            'second_d_price' => $second_d_price,

            'second_d_certificateUrl' => $seconddiamondData['diamondData']['certificateUrl'] ? $seconddiamondData['diamondData']['certificateUrl'] : 'NA',

            'shop_logo' => $store_logo,

            'shop_logo_alt' => $reqData->shop,

            'shopurl' => $shopurl,

        ];
        //Sender Email



        $user['to'] = $frndemail_post_data['email'];



        Mail::send('completeRingEmailFriendSender', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('A Friend Wants To Share With You');
        });







        //Retailer Email



        $user['to'] = $retaileremail;



        Mail::send('completeRingEmailFriendRetailer', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('A Friend Wants To Share With You');
        });







        // Receiver email



        $user['to'] = $frndemail_post_data['frnd_email'];



        Mail::send('completeRingEmailFriendReceiver', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('A Friend Wants To Share With You');
        });



        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }

    // Request More Info

    public function crReqInfoApi(Request $request)
    {

        $validatedData = Validator::make($request->all(), [

            'name'                  => 'required',

            'email'                 => 'required',

            'phone_no'              => 'required',

            'req_message'           => 'required',

            'contact_preference'    => 'required',

        ]);

        if ($validatedData->fails()) {

            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status']  = 'mail not send';

            $validation_error['data']    = [];

            return response()->json($validation_error);
        }




        $req_post_data = $request->all();

        $currency = '$';

        $reqData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();

        $store_logo = $reqData->shop_logo ? $reqData->shop_logo : 'NA';

        $storeAdminEmail = $reqData->admin_email_address;

        $shopurl = "https://" . $req_post_data['shopurl'];

        $price_rb  = $currency . $req_post_data['price'] ? $currency . $req_post_data['price'] : 'NA';

        $metalType = $req_post_data['metalType'] ? $req_post_data['metalType'] : 'NA';

        $backingType = $req_post_data['backingType'] ? $req_post_data['backingType'] : 'NA';

        $color = $req_post_data['color'] ? $req_post_data['color'] : 'NA';

        $styleNumber = $req_post_data['styleNumber'] ? $req_post_data['styleNumber'] : 'NA';

        $settingid = $req_post_data['settingid'] ? $req_post_data['settingid'] : 'NA';






        $diamondData = DiamondEmailController::getDiamondById($req_post_data['diamondid'], $req_post_data['diamondtype'], $req_post_data['shopurl']);

        $seconddiamondData = DiamondEmailController::getDiamondById($req_post_data['seconddiamondid'], $req_post_data['diamondtype'], $req_post_data['shopurl']);
        //echo '<pre>';print_r($second_diamondData);exit;
        $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $vendorName = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop']);

        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop']);

        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {

            $color_to_display = 'NA';
        }

        //second Diamond color
        if ($seconddiamondData['diamondData']['color'] != '') {

            $second_color_to_display = $seconddiamondData['diamondData']['color'];
        } else {

            $second_color_to_display = 'NA';
        }


        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $price = 'Call For Price';
        }

        //second Diamond color

        if ($seconddiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $seconddiamondData['diamondData']['fltPrice'] ? $currency . number_format($seconddiamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $second_d_price = 'Call For Price';
        }

        //MAIL TO USER

        $data = [

            'name' => $req_post_data['name'],

            'email' => $req_post_data['email'],

            'phone_no' => $req_post_data['phone_no'],

            'req_message' => $req_post_data['req_message'],

            'contact_preference' => $req_post_data['contact_preference'],

            'ring_url' => $req_post_data['ring_url'],

            // 'price_rb' => $ringData['ringData']['cost'] ? $ringData['ringData']['currencySymbol'] . ' ' . number_format($ringData['ringData']['cost']) : '',

            'price_rb' => $price_rb,

            'setting_id' => $settingid,

            'stylenumber' => $styleNumber,

            'metaltype' => $metalType,

            'ringcolor' => $color,

            'backingtype' => $backingType,

            'vendorPhone' => $diamondData['diamondData']['vendorContactNo'],

            'diamond_url' => $req_post_data['diamondurl'] ? $req_post_data['diamondurl'] : 'NA',

            'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : 'NA',

            'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : 'NA',

            'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : 'NA',

            'color' => $color_to_display,

            'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : 'NA',

            'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : 'NA',

            'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : 'NA',

            'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : 'NA',

            'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : 'NA',

            'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : 'NA',

            'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : 'NA',

            // 'price' => $diamondData['diamondData']['fltPrice'] ? number_format($diamondData['diamondData']['fltPrice']) : '',

            'price' => $price,

            'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',

            'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',

            'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',

            'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',

            'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',

            'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',

            'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',

            'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',

            'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',

            'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',

            'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',

            'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

            //Second Diamond Data

            'second_d_diamond_id' => $seconddiamondData['diamondData']['diamondId'] ? $seconddiamondData['diamondData']['diamondId'] : 'NA',

            'second_d_size' => $seconddiamondData['diamondData']['caratWeight'] ? $seconddiamondData['diamondData']['caratWeight'] : 'NA',

            'second_d_cut' => $seconddiamondData['diamondData']['cut'] ? $seconddiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_color_to_display,

            'second_d_clarity' => $seconddiamondData['diamondData']['clarity'] ? $seconddiamondData['diamondData']['clarity'] : 'NA',

            'second_d_depth' => $seconddiamondData['diamondData']['depth'] ? $seconddiamondData['diamondData']['depth'] : 'NA',

            'second_d_table' => $seconddiamondData['diamondData']['table'] ? $seconddiamondData['diamondData']['table'] : 'NA',

            'second_d_measurment' => $seconddiamondData['diamondData']['measurement'] ? $seconddiamondData['diamondData']['measurement'] : 'NA',

            'second_d_certificate' => $seconddiamondData['diamondData']['certificate'] ? $seconddiamondData['diamondData']['certificate'] : 'NA',

            'second_d_price' => $second_d_price,

            'second_d_certificateUrl' => $seconddiamondData['diamondData']['certificateUrl'] ? $seconddiamondData['diamondData']['certificateUrl'] : 'NA',

            'shop_logo' => $store_logo,

            'shop_logo_alt' => $reqData->shop,

            'shopurl' => $shopurl,

        ];
        // echo "<pre>"; print_r($data); exit();

        //Sender Email

        $user['to'] = $req_post_data['email'];

        Mail::send('completeRingReqInfoSender', $data, function ($messages) use ($user) {

            $messages->to($user['to']);

            $messages->subject('Request For More Info');
        });

        //Retailer Email

        $user['to'] = $vendorEmail;

        Mail::send('completeRingReqInfoRetailer', $data, function ($messages) use ($user) {

            $messages->to($user['to']);

            $messages->subject('Request For More Info');
        });

        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }



    // Schedule Viewing

    public function crScheViewApi(Request $request)
    {

        $validatedData = Validator::make($request->all(), [

            'name'              => 'required',

            'email'             => 'required',

            'phone_no'          => 'required',

            'schl_message'      => 'required',

            'location'          => 'required',

            'availability_date' => 'required',

            'appnt_time'        => 'required',

        ]);

        if ($validatedData->fails()) {

            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());

            $validation_error['status']  = 'fail';

            $validation_error['data']    = [];

            return response()->json($validation_error);
        }

        $sch_view_post_data = $request->all();

        $currency = '$';

        $reqData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();

        $store_logo = $reqData->shop_logo ? $reqData->shop_logo : 'NA';

        $storeAdminEmail = $reqData->admin_email_address;

        $shopurl = "https://" . $sch_view_post_data['shopurl'];

        $price_rb  = $currency . $sch_view_post_data['price'] ? $currency . $sch_view_post_data['price'] : 'NA';

        $metalType = $sch_view_post_data['metalType'] ? $sch_view_post_data['metalType'] : 'NA';

        $backingType = $sch_view_post_data['backingType'] ? $sch_view_post_data['backingType'] : 'NA';

        $color = $sch_view_post_data['color'] ? $sch_view_post_data['color'] : 'NA';

        $styleNumber = $sch_view_post_data['styleNumber'] ? $sch_view_post_data['styleNumber'] : 'NA';

        $settingid = $sch_view_post_data['settingid'] ? $sch_view_post_data['settingid'] : 'NA';



        //$ringData = RingEmailController::getRingById($sch_view_post_data['settingid'], $sch_view_post_data['shopurl']);

        $diamondData = DiamondEmailController::getDiamondById($sch_view_post_data['diamondid'], $sch_view_post_data['diamondtype'], $sch_view_post_data['shopurl']);

        $seconddiamondData = DiamondEmailController::getDiamondById($sch_view_post_data['seconddiamondid'], $sch_view_post_data['diamondtype'], $sch_view_post_data['shopurl']);

        $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $vendorName = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop']);
        //echo'<pre>';print_r($vendorName);exit;
        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);

        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop']);
        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {

            $color_to_display = 'NA';
        }

        //second Diamond color
        if ($seconddiamondData['diamondData']['color'] != '') {

            $second_color_to_display = $seconddiamondData['diamondData']['color'];
        } else {

            $second_color_to_display = 'NA';
        }


        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : '';
        } else {

            $price = 'Call For Price';
        }

        //second Diamond color

        if ($seconddiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $seconddiamondData['diamondData']['fltPrice'] ? $currency . number_format($seconddiamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $second_d_price = 'Call For Price';
        }


        //MAIL TO USER

        $data = [

            'name' => $sch_view_post_data['name'],

            'email' => $sch_view_post_data['email'],

            'phone_no' => $sch_view_post_data['phone_no'],

            'schl_message' => $sch_view_post_data['schl_message'],

            'location' => $sch_view_post_data['location'],

            'availability_date' => $sch_view_post_data['availability_date'],

            'appnt_time' => $sch_view_post_data['appnt_time'],

            'ring_url' => $sch_view_post_data['ring_url'],

            // 'price_rb' => $ringData['ringData']['cost'] ? $ringData['ringData']['currencySymbol'] . ' ' . number_format($ringData['ringData']['cost']) : '',

            'price_rb' => $price_rb,

            'setting_id' => $settingid,

            'stylenumber' => $styleNumber,

            'metaltype' => $metalType,

            'ringcolor' => $color,

            'backingtype' => $backingType,


            'vendorPhone' => $diamondData['diamondData']['vendorContactNo'],

            'diamond_url' => $sch_view_post_data['diamondurl'] ? $sch_view_post_data['diamondurl'] : 'NA',

            'diamond_id' => $diamondData['diamondData']['diamondId'] ? $diamondData['diamondData']['diamondId'] : 'NA',

            'size' => $diamondData['diamondData']['caratWeight'] ? $diamondData['diamondData']['caratWeight'] : 'NA',

            'cut' => $diamondData['diamondData']['cut'] ? $diamondData['diamondData']['cut'] : 'NA',

            'color' => $color_to_display,

            'clarity' => $diamondData['diamondData']['clarity'] ? $diamondData['diamondData']['clarity'] : 'NA',

            'depth' => $diamondData['diamondData']['depth'] ? $diamondData['diamondData']['depth'] : 'NA',

            'table' => $diamondData['diamondData']['table'] ? $diamondData['diamondData']['table'] : 'NA',

            'measurment' => $diamondData['diamondData']['measurement'] ? $diamondData['diamondData']['measurement'] : 'NA',

            'certificate' => $diamondData['diamondData']['certificate'] ? $diamondData['diamondData']['certificate'] : 'NA',

            'certificateNo' => $diamondData['diamondData']['certificateNo'] ? $diamondData['diamondData']['certificateNo'] : 'NA',

            'certificateUrl' => $diamondData['diamondData']['certificateUrl'] ? $diamondData['diamondData']['certificateUrl'] : 'NA',

            // 'price' => $diamondData['diamondData']['fltPrice'] ? number_format($diamondData['diamondData']['fltPrice']) : '',

            'price' => $price,

            'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',

            'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',

            'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',

            'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',

            'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',

            'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'wholeSalePrice' => $diamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($diamondData['diamondData']['wholeSalePrice']) : 'NA',

            'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',

            'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',

            'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',

            'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',

            'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',

            'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',

            'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',

            'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',


            //Second Diamond Data

            'second_d_diamond_id' => $seconddiamondData['diamondData']['diamondId'] ? $seconddiamondData['diamondData']['diamondId'] : 'NA',

            'second_d_size' => $seconddiamondData['diamondData']['caratWeight'] ? $seconddiamondData['diamondData']['caratWeight'] : 'NA',

            'second_d_cut' => $seconddiamondData['diamondData']['cut'] ? $seconddiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_color_to_display,

            'second_d_clarity' => $seconddiamondData['diamondData']['clarity'] ? $seconddiamondData['diamondData']['clarity'] : 'NA',

            'second_d_depth' => $seconddiamondData['diamondData']['depth'] ? $seconddiamondData['diamondData']['depth'] : 'NA',

            'second_d_table' => $seconddiamondData['diamondData']['table'] ? $seconddiamondData['diamondData']['table'] : 'NA',

            'second_d_measurment' => $seconddiamondData['diamondData']['measurement'] ? $seconddiamondData['diamondData']['measurement'] : 'NA',

            'second_d_certificate' => $seconddiamondData['diamondData']['certificate'] ? $seconddiamondData['diamondData']['certificate'] : 'NA',

            'second_d_price' => $second_d_price,

            'second_d_certificateUrl' => $seconddiamondData['diamondData']['certificateUrl'] ? $seconddiamondData['diamondData']['certificateUrl'] : 'NA',


            'shop_logo' => $store_logo,

            'shop_logo_alt' => $reqData->shop,

            'shopurl' => $shopurl,

        ];

        //Sender Email

        $user['to'] = $sch_view_post_data['email'];

        Mail::send('completeRingScheViewSender', $data, function ($messages) use ($user) {

            $messages->to($user['to']);

            $messages->subject('Request To Schedule A Viewing');
        });

        //Retailer Email

        $user['to'] = $vendorEmail;

        Mail::send('completeRingScheViewRetailer', $data, function ($messages) use ($user) {

            $messages->to($user['to']);

            $messages->subject('Request To Schedule A Viewing');
        });

        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }
}
