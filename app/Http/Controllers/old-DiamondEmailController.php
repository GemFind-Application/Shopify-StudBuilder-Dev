<?php







namespace App\Http\Controllers;







use App\Http\Controllers\Controller;



use Illuminate\Http\Request;



use Validator;



use DB;



use Mail;







class DiamondEmailController extends Controller



{



    public static function getDiamondById($id, $type, $shop)
    {



        $IslabGrown = '';



        if ($type && $type == 'labcreated') {



            $diamond_type = '&IslabGrown=true';
        } elseif ($type == 'fancydiamonds') {



            $diamond_type = '&IsFancy=true';
        } else {



            $diamond_type = '';
        }







        $diamondData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $shop])->get()->first();







        $DealerID = 'DealerID=' . $diamondData->dealerid . '&';



        $DID = 'DID=' . $id;



        $query_string = $DealerID . $DID . $diamond_type;



        $requestUrl = $diamondData->diamonddetailapi . $query_string;







        $curl = curl_init();



        curl_setopt($curl, CURLOPT_URL, $requestUrl);



        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);



        curl_setopt($curl, CURLOPT_HEADER, false);



        $response = curl_exec($curl);



        $results = json_decode($response);







        if (curl_errno($curl)) {



            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }



        if (isset($results->message)) {



            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }



        curl_close($curl);



        if ($results->diamondId != "" && $results->diamondId > 0) {



            $diamondData = (array) $results;



            $returnData = ['diamondData' => $diamondData];
        } else {



            $returnData = ['diamondData' => []];
        }



        return $returnData;
    }







    public function getJCOptionsapi($shop)
    {



        return 'http://api.jewelcloud.com/api/RingBuilder/GetDiamondsJCOptions?';
    }







    function getJCOptions($shop)



    {



        $resultUsername = DB::table('ringbuilder_config')->select('*')->where(['shop' => $shop])->get()->first();



        $DealerID = "DealerID=" . $resultUsername->dealerid;



        $jc_options_api = $this->getJCOptionsapi($shop);







        $requestUrl = $jc_options_api . $DealerID;







        $curl = curl_init();



        curl_setopt($curl, CURLOPT_URL, $requestUrl);



        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);



        curl_setopt($curl, CURLOPT_HEADER, false);



        $responce = curl_exec($curl);



        $results = (array) json_decode($responce);



        if (isset($results[0])) {



            $results = (array) $results[0];





            if (curl_errno($curl)) {



                return $returnData = ['jc_options' => []];
            }



            if (sizeof($results) == 0) {



                return $returnData = ['jc_options' => []];
            }







            if (sizeof($results) > 0) {



                $returnData = ['jc_options' => $results[0]];



                return $returnData;
            }
        } else {



            return $returnData = ['jc_options' => []];
        }
    }







    public function dlDropHintApi(Request $request)



    {



        $validatedData = Validator::make($request->all(), [



            'name'                  => 'required',



            'email'                 => 'required',



            'hint_Recipient_name'   => 'required',



            'hint_Recipient_email'  => 'required',



            'reason_of_gift'        => 'required',



            'hint_message'          => 'required',



            'deadline'              => 'required',







        ]);



        if ($validatedData->fails()) {



            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());



            $validation_error['status']  = 'fail';



            $validation_error['data']    = [];



            return response()->json($validation_error);
        }







        $hint_post_data = $request->all();



        $hintData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();


        $storeAdminEmail = $hintData->admin_email_address;



        $shopurl = "https://" . $hint_post_data['shopurl'];



        $store_logo = $hintData->shop_logo;



        $diamondData =  $this->getDiamondById($hint_post_data['diamondid'], $hint_post_data['diamondtype'], $hint_post_data['shopurl']);



        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);



        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $hintData['shop']);







        //MAIL TO USER



        $data = [



            'shopurl' => $shopurl,



            'retailername' => $retailername,



            'retailerphone' => $diamondData['diamondData']['vendorContactNo'],



            'name' => $hint_post_data['name'],



            'email' => $hint_post_data['email'],



            'hint_Recipient_name' => $hint_post_data['hint_Recipient_name'],



            'hint_Recipient_email' => $hint_post_data['hint_Recipient_email'],



            'reason_of_gift' => $hint_post_data['reason_of_gift'],



            'hint_message' => $hint_post_data['hint_message'],



            'deadline' => $hint_post_data['deadline'],



            'diamondurl' => $hint_post_data['diamondurl'],



            'shop_logo' => $store_logo,



            'shop_logo_alt' => $hintData->shop,



            'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : '',



        ];


        //Sender Email



        $user['to'] = $request->email;



        Mail::send('diamondDropHintSender', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Someone Wants To Drop You A Hint');
        });



        //Retailer Email



        $user['to'] = $data['retailerEmail'];



        Mail::send('diamondDropHintRetailer', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Someone Wants To Drop You A Hint');
        });



        //Receiver Email



        $user['to'] = $request->hint_Recipient_email;



        Mail::send('diamondDropHintReceiver', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Someone Wants To Drop You A Hint');
        });



        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }







    public function dlReqInfoApi(Request $request)



    {



        $validatedData = Validator::make($request->all(), [



            'name'                  => 'required',



            'email'                 => 'required',



            'phone_no'              => 'required',



            'message'               => 'required',



            'contact_preference'    => 'required',



        ]);



        if ($validatedData->fails()) {



            $validation_error['message'] = implode('|| ', $validatedData->messages()->all());



            $validation_error['status']  = 'fail';



            $validation_error['data']    = [];



            return response()->json($validation_error);
        }







        $req_post_data = $request->all();





        $currency = $req_post_data['currency'];



        $reqData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();



        $store_logo = $reqData->shop_logo;



        $storeAdminEmail = $reqData->admin_email_address;



        $shopurl = "https://" . $req_post_data['shopurl'];



        $diamondData =  $this->getDiamondById($req_post_data['diamondid'], $req_post_data['diamondtype'], $req_post_data['shopurl']);

        $secondDiamondData =  $this->getDiamondById($req_post_data['second_diamondid'], $req_post_data['diamondtype'], $req_post_data['shopurl']);

        // echo "<pre>";
        // print_r($secondDiamondData);
        // exit;



        $jc_options = $this->getJCOptions($req_post_data['shopurl']);







        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);



        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop']);

        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {



            $color_to_display = 'NA';
        }


        // Second Diamond Color
        if ($secondDiamondData['diamondData']['color'] != '') {



            $second_d_color_to_display = $secondDiamondData['diamondData']['color'];
        } else {



            $second_d_color_to_display = 'NA';
        }




        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $price = 'Call For Price';
        }





        // Sencond Diamond Price

        if ($secondDiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $secondDiamondData['diamondData']['fltPrice'] ? $currency . number_format($secondDiamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $second_d_price = 'Call For Price';
        }


        //    echo "<pre>";
        // print_r($secondDiamondData);
        // exit; 




        //MAIL TO USER



        $data = [



            'name' => $req_post_data['name'],



            'email' => $req_post_data['email'],



            'phone_no' => $req_post_data['phone_no'],



            'req_message' => $req_post_data['message'],



            'contact_preference' => $req_post_data['contact_preference'],



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


            // Second diamond data


            'second_d_diamond_id' => $secondDiamondData['diamondData']['diamondId'] ? $secondDiamondData['diamondData']['diamondId'] : 'NA',



            'second_d_size' => $secondDiamondData['diamondData']['caratWeight'] ? $secondDiamondData['diamondData']['caratWeight'] : 'NA',



            'second_d_cut' => $secondDiamondData['diamondData']['cut'] ? $secondDiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_d_color_to_display,

            'second_d_clarity' => $secondDiamondData['diamondData']['clarity'] ? $secondDiamondData['diamondData']['clarity'] : 'NA',



            'second_d_depth' => $secondDiamondData['diamondData']['depth'] ? $secondDiamondData['diamondData']['depth'] : 'NA',



            'second_d_table' => $secondDiamondData['diamondData']['table'] ? $secondDiamondData['diamondData']['table'] : 'NA',



            'second_d_measurment' => $secondDiamondData['diamondData']['measurement'] ? $secondDiamondData['diamondData']['measurement'] : 'NA',



            'second_d_certificate' => $secondDiamondData['diamondData']['certificate'] ? $secondDiamondData['diamondData']['certificate'] : 'NA',



            'second_d_certificateNo' => $secondDiamondData['diamondData']['certificateNo'] ? $secondDiamondData['diamondData']['certificateNo'] : 'NA',



            'second_d_certificateUrl' => $secondDiamondData['diamondData']['certificateUrl'] ? $secondDiamondData['diamondData']['certificateUrl'] : 'NA',

            'second_d_price' => $second_d_price,


            'second_d_vendorID' => $secondDiamondData['diamondData']['vendorID'] ? $secondDiamondData['diamondData']['vendorID'] : 'NA',



            'second_d_vendorName' => $secondDiamondData['diamondData']['vendorName'] ? $secondDiamondData['diamondData']['vendorName'] : 'NA',



            'second_d_vendorEmail' => $secondDiamondData['diamondData']['vendorEmail'] ? $secondDiamondData['diamondData']['vendorEmail'] : 'NA',



            'second_d_vendorContactNo' => $secondDiamondData['diamondData']['vendorContactNo'] ? $secondDiamondData['diamondData']['vendorContactNo'] : 'NA',



            'second_d_vendorStockNo' => $secondDiamondData['diamondData']['vendorStockNo'] ? $secondDiamondData['diamondData']['vendorStockNo'] : 'NA',



            'second_d_vendorFax' => $secondDiamondData['diamondData']['vendorFax'] ? $secondDiamondData['diamondData']['vendorFax'] : 'NA',



            'second_d_vendorAddress' => $secondDiamondData['diamondData']['vendorAddress'] ? $secondDiamondData['diamondData']['vendorAddress'] : 'NA',



            'second_d_wholeSalePrice' => $secondDiamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($secondDiamondData['diamondData']['wholeSalePrice']) : 'NA',



            'second_d_vendorAddress' => $secondDiamondData['diamondData']['vendorAddress'] ? $secondDiamondData['diamondData']['vendorAddress'] : 'NA',



            'second_d_retailerName' => $secondDiamondData['diamondData']['retailerInfo']->retailerName ? $secondDiamondData['diamondData']['retailerInfo']->retailerName : 'NA',



            'second_d_retailerID' => $secondDiamondData['diamondData']['retailerInfo']->retailerID ? $secondDiamondData['diamondData']['retailerInfo']->retailerID : 'NA',



            'second_d_retailerEmail' => $secondDiamondData['diamondData']['retailerInfo']->retailerEmail ? $secondDiamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',



            'second_d_retailerContactNo' => $secondDiamondData['diamondData']['retailerInfo']->retailerContactNo ? $secondDiamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',



            'second_d_retailerStockNo' => $secondDiamondData['diamondData']['retailerInfo']->retailerStockNo ? $secondDiamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',



            'second_d_retailerFax' => $secondDiamondData['diamondData']['retailerInfo']->retailerFax ? $secondDiamondData['diamondData']['retailerInfo']->retailerFax : 'NA',



            'second_d_retailerAddress' => $secondDiamondData['diamondData']['retailerInfo']->retailerAddress ? $secondDiamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

            // 
            'shop_logo' => $store_logo,



            'shop_logo_alt' => $reqData->shop,



            'shopurl' => $shopurl,



        ];

        //  echo "<pre>";
        // print_r($data);
        // exit; 





        if ($diamondData['diamondData']['currencyFrom'] == 'USD') {



            $currency_symbol = "$";
        } else {



            $currency_symbol = $diamondData['diamondData']['currencyFrom'] . $diamondData['diamondData']['currencySymbol'];
        }







        if ($jc_options['jc_options']->show_Certificate_in_Diamond_Search) {



            $certificate_html = '<tr><td class="consumer-title">Lab:</td><td class="consumer-name">' . $data['certificateNo'] . ' <a href="' . $data['certificateUrl'] . '">GIA Certificate</a></td></tr>';
        } else {



            $certificate_html = '';
        }







        //Sender Email



        $user['to'] = $req_post_data['email'];



        Mail::send('diamondReqInfoSender', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Request For More Info');
        });







        //Retailer Email



        $user['to'] = $retaileremail;



        Mail::send('diamondReqInfoRetailer', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Request For More Info');
        });



        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }







    public function dlEmailFriendApi(Request $request)



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



            $validation_error['status']  = 'fail';



            $validation_error['data']    = [];



            return response()->json($validation_error);
        }







        $email_friend_post_data = $request->all();



        $currency = $email_friend_post_data['currency'];



        $frndData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();



        $storeAdminEmail = $frndData->admin_email_address;



        $store_logo = $frndData->shop_logo;



        $shopurl = "https://" . $email_friend_post_data['shopurl'];



        $diamondData =  $this->getDiamondById($email_friend_post_data['diamondid'], $email_friend_post_data['diamondtype'], $email_friend_post_data['shopurl']);

        $secondDiamondData =  $this->getDiamondById($email_friend_post_data['second_diamondid'], $email_friend_post_data['diamondtype'], $email_friend_post_data['shopurl']);

        //echo'<pre>';print_r($secondDiamondData);exit;    



        $jc_options = $this->getJCOptions($email_friend_post_data['shopurl']);







        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);



        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop']);






        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {



            $color_to_display = 'NA';
        }


        // Second Diamond Color
        if ($secondDiamondData['diamondData']['color'] != '') {

            $second_d_color_to_display = $secondDiamondData['diamondData']['color'];
        } else {

            $second_d_color_to_display = 'NA';
        }



        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $price = 'Call For Price';
        }

        // Second Diamond Price

        if ($secondDiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $secondDiamondData['diamondData']['fltPrice'] ? $currency . number_format($secondDiamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $second_d_price = 'Call For Price';
        }



        //MAIL TO USER



        $data = [



            'name' => $email_friend_post_data['name'],



            'email' => $email_friend_post_data['email'],



            'frnd_name' => $email_friend_post_data['frnd_name'],



            'frnd_email' => $email_friend_post_data['frnd_email'],



            'frnd_message' => $email_friend_post_data['frnd_message'],



            'diamond_url' => $email_friend_post_data['diamondurl'] ? $email_friend_post_data['diamondurl'] : 'NA',



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

            // Second diamond data


            'second_d_diamond_id' => $secondDiamondData['diamondData']['diamondId'] ? $secondDiamondData['diamondData']['diamondId'] : 'NA',



            'second_d_size' => $secondDiamondData['diamondData']['caratWeight'] ? $secondDiamondData['diamondData']['caratWeight'] : 'NA',



            'second_d_cut' => $secondDiamondData['diamondData']['cut'] ? $secondDiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_d_color_to_display,

            'second_d_clarity' => $secondDiamondData['diamondData']['clarity'] ? $secondDiamondData['diamondData']['clarity'] : 'NA',



            'second_d_depth' => $secondDiamondData['diamondData']['depth'] ? $secondDiamondData['diamondData']['depth'] : 'NA',



            'second_d_table' => $secondDiamondData['diamondData']['table'] ? $secondDiamondData['diamondData']['table'] : 'NA',



            'second_d_measurment' => $secondDiamondData['diamondData']['measurement'] ? $secondDiamondData['diamondData']['measurement'] : 'NA',



            'second_d_certificate' => $secondDiamondData['diamondData']['certificate'] ? $secondDiamondData['diamondData']['certificate'] : 'NA',



            'second_d_certificateNo' => $secondDiamondData['diamondData']['certificateNo'] ? $secondDiamondData['diamondData']['certificateNo'] : 'NA',



            'second_d_certificateUrl' => $secondDiamondData['diamondData']['certificateUrl'] ? $secondDiamondData['diamondData']['certificateUrl'] : 'NA',

            'second_d_price' => $second_d_price,


            'second_d_vendorID' => $secondDiamondData['diamondData']['vendorID'] ? $secondDiamondData['diamondData']['vendorID'] : 'NA',



            'second_d_vendorName' => $secondDiamondData['diamondData']['vendorName'] ? $secondDiamondData['diamondData']['vendorName'] : 'NA',



            'second_d_vendorEmail' => $secondDiamondData['diamondData']['vendorEmail'] ? $secondDiamondData['diamondData']['vendorEmail'] : 'NA',



            'second_d_vendorContactNo' => $secondDiamondData['diamondData']['vendorContactNo'] ? $secondDiamondData['diamondData']['vendorContactNo'] : 'NA',



            'second_d_vendorStockNo' => $secondDiamondData['diamondData']['vendorStockNo'] ? $secondDiamondData['diamondData']['vendorStockNo'] : 'NA',



            'second_d_vendorFax' => $secondDiamondData['diamondData']['vendorFax'] ? $secondDiamondData['diamondData']['vendorFax'] : 'NA',



            'second_d_vendorAddress' => $secondDiamondData['diamondData']['vendorAddress'] ? $secondDiamondData['diamondData']['vendorAddress'] : 'NA',



            'second_d_wholeSalePrice' => $secondDiamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($secondDiamondData['diamondData']['wholeSalePrice']) : 'NA',



            'second_d_vendorAddress' => $secondDiamondData['diamondData']['vendorAddress'] ? $secondDiamondData['diamondData']['vendorAddress'] : 'NA',



            'second_d_retailerName' => $secondDiamondData['diamondData']['retailerInfo']->retailerName ? $secondDiamondData['diamondData']['retailerInfo']->retailerName : 'NA',



            'second_d_retailerID' => $secondDiamondData['diamondData']['retailerInfo']->retailerID ? $secondDiamondData['diamondData']['retailerInfo']->retailerID : '',



            'second_d_retailerEmail' => $secondDiamondData['diamondData']['retailerInfo']->retailerEmail ? $secondDiamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',



            'second_d_retailerContactNo' => $secondDiamondData['diamondData']['retailerInfo']->retailerContactNo ? $secondDiamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',



            'second_d_retailerStockNo' => $secondDiamondData['diamondData']['retailerInfo']->retailerStockNo ? $secondDiamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',



            'second_d_retailerFax' => $secondDiamondData['diamondData']['retailerInfo']->retailerFax ? $secondDiamondData['diamondData']['retailerInfo']->retailerFax : 'NA',



            'second_d_retailerAddress' => $secondDiamondData['diamondData']['retailerInfo']->retailerAddress ? $secondDiamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',



            // 
            'shop_logo' => $store_logo,



            'shop_logo_alt' => $frndData->shop,



            'shopurl' => $shopurl,



        ];

        // echo'<pre>';print_r($data);exit;







        if ($diamondData['diamondData']['currencyFrom'] == 'USD') {



            $currency_symbol = "$";
        } else {



            $currency_symbol = $diamondData['diamondData']['currencyFrom'] . $diamondData['diamondData']['currencySymbol'];
        }







        if ($jc_options['jc_options']->show_Certificate_in_Diamond_Search) {



            $certificate_html = '<tr><td class="consumer-title">Lab:</td><td class="consumer-name">' . $data['certificateNo'] . ' <a href="' . $data['certificateUrl'] . '">GIA Certificate</a></td></tr>';
        } else {



            $certificate_html = '';
        }







        //Sender Email



        $user['to'] = $email_friend_post_data['email'];



        Mail::send('diamondEmailFriendSender', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('A Friend Wants To Share With You');
        });







        //Retailer Email



        $user['to'] = $retaileremail;



        Mail::send('diamondEmailFriendRetailer', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('A Friend Wants To Share With You');
        });







        // Receiver email



        $user['to'] = $email_friend_post_data['frnd_email'];



        Mail::send('diamondEmailFriendReceiver', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('A Friend Wants To Share With You');
        });



        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }







    public function dlScheViewApi(Request $request)



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



        $currency = $sch_view_post_data['currency'];



        $schldData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();



        $storeAdminEmail = $schldData->admin_email_address;



        $store_logo = $schldData->shop_logo;



        $shopurl = "https://" . $sch_view_post_data['shopurl'];







        $diamondData =  $this->getDiamondById($sch_view_post_data['diamondid'], $sch_view_post_data['diamondtype'], $sch_view_post_data['shopurl']);

        $secondDiamondData =  $this->getDiamondById($sch_view_post_data['second_diamondid'], $sch_view_post_data['diamondtype'], $sch_view_post_data['shopurl']);

        //echo'<pre>';print_r($secondDiamondData);exit;

        $jc_options = $this->getJCOptions($sch_view_post_data['shopurl']);







        $retaileremail = ($storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail']);



        $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $schldData['shop']);

        if ($diamondData['diamondData']['color'] != '') {

            $color_to_display = $diamondData['diamondData']['color'];
        } else {

            $color_to_display = 'NA';
        }

        // Second Diamond Color
        if ($secondDiamondData['diamondData']['color'] != '') {

            $second_d_color_to_display = $secondDiamondData['diamondData']['color'];
        } else {

            $second_d_color_to_display = 'NA';
        }





        if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice'] ? $currency . number_format($diamondData['diamondData']['fltPrice']) : 'NA';
        } else {

            $price = 'Call For Price';
        }

        // Second Diamond Price

        if ($secondDiamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $secondDiamondData['diamondData']['fltPrice'] ? $currency . number_format($secondDiamondData['diamondData']['fltPrice']) : 'NA';
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



            'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',



            'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

            // Second diamond data


            'second_d_diamond_id' => $secondDiamondData['diamondData']['diamondId'] ? $secondDiamondData['diamondData']['diamondId'] : 'NA',



            'second_d_size' => $secondDiamondData['diamondData']['caratWeight'] ? $secondDiamondData['diamondData']['caratWeight'] : 'NA',



            'second_d_cut' => $secondDiamondData['diamondData']['cut'] ? $secondDiamondData['diamondData']['cut'] : 'NA',

            'second_d_color' => $second_d_color_to_display,

            'second_d_clarity' => $secondDiamondData['diamondData']['clarity'] ? $secondDiamondData['diamondData']['clarity'] : 'NA',



            'second_d_depth' => $secondDiamondData['diamondData']['depth'] ? $secondDiamondData['diamondData']['depth'] : 'NA',



            'second_d_table' => $secondDiamondData['diamondData']['table'] ? $secondDiamondData['diamondData']['table'] : 'NA',



            'second_d_measurment' => $secondDiamondData['diamondData']['measurement'] ? $secondDiamondData['diamondData']['measurement'] : 'NA',



            'second_d_certificate' => $secondDiamondData['diamondData']['certificate'] ? $secondDiamondData['diamondData']['certificate'] : 'NA',



            'second_d_certificateNo' => $secondDiamondData['diamondData']['certificateNo'] ? $secondDiamondData['diamondData']['certificateNo'] : 'NA',



            'second_d_certificateUrl' => $secondDiamondData['diamondData']['certificateUrl'] ? $secondDiamondData['diamondData']['certificateUrl'] : 'NA',

            'second_d_price' => $second_d_price,


            'second_d_vendorID' => $secondDiamondData['diamondData']['vendorID'] ? $secondDiamondData['diamondData']['vendorID'] : 'NA',



            'second_d_vendorName' => $secondDiamondData['diamondData']['vendorName'] ? $secondDiamondData['diamondData']['vendorName'] : 'NA',



            'second_d_vendorEmail' => $secondDiamondData['diamondData']['vendorEmail'] ? $secondDiamondData['diamondData']['vendorEmail'] : 'NA',



            'second_d_vendorContactNo' => $secondDiamondData['diamondData']['vendorContactNo'] ? $secondDiamondData['diamondData']['vendorContactNo'] : 'NA',



            'second_d_vendorStockNo' => $secondDiamondData['diamondData']['vendorStockNo'] ? $secondDiamondData['diamondData']['vendorStockNo'] : 'NA',



            'second_d_vendorFax' => $secondDiamondData['diamondData']['vendorFax'] ? $secondDiamondData['diamondData']['vendorFax'] : 'NA',



            'second_d_vendorAddress' => $secondDiamondData['diamondData']['vendorAddress'] ? $secondDiamondData['diamondData']['vendorAddress'] : 'NA',



            'second_d_wholeSalePrice' => $secondDiamondData['diamondData']['wholeSalePrice'] ? $currency . number_format($secondDiamondData['diamondData']['wholeSalePrice']) : 'NA',



            'second_d_vendorAddress' => $secondDiamondData['diamondData']['vendorAddress'] ? $secondDiamondData['diamondData']['vendorAddress'] : 'NA',



            'second_d_retailerName' => $secondDiamondData['diamondData']['retailerInfo']->retailerName ? $secondDiamondData['diamondData']['retailerInfo']->retailerName : 'NA',



            'second_d_retailerID' => $secondDiamondData['diamondData']['retailerInfo']->retailerID ? $secondDiamondData['diamondData']['retailerInfo']->retailerID : 'NA',



            'second_d_retailerEmail' => $secondDiamondData['diamondData']['retailerInfo']->retailerEmail ? $secondDiamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',



            'second_d_retailerContactNo' => $secondDiamondData['diamondData']['retailerInfo']->retailerContactNo ? $secondDiamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',



            'second_d_retailerStockNo' => $secondDiamondData['diamondData']['retailerInfo']->retailerStockNo ? $secondDiamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',



            'second_d_retailerFax' => $secondDiamondData['diamondData']['retailerInfo']->retailerFax ? $secondDiamondData['diamondData']['retailerInfo']->retailerFax : 'NA',



            'second_d_retailerAddress' => $secondDiamondData['diamondData']['retailerInfo']->retailerAddress ? $secondDiamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',



            // 
            'shop_logo' => $store_logo,



            'shop_logo_alt' => $schldData->shop,



            'shopurl' => $shopurl,



        ];

        // echo'<pre>';print_r($data);exit;







        if ($diamondData['diamondData']['currencyFrom'] == 'USD') {



            $currency_symbol = "$";
        } else {



            $currency_symbol = $diamondData['diamondData']['currencyFrom'] . $diamondData['diamondData']['currencySymbol'];
        }







        if ($jc_options['jc_options']->show_Certificate_in_Diamond_Search) {



            $certificate_html = '<tr><td class="consumer-title">Lab:</td><td class="consumer-name">' . $data['certificateNo'] . ' <a href="' . $data['certificateUrl'] . '">GIA Certificate</a></td></tr>';
        } else {



            $certificate_html = '';
        }







        //Sender Email



        $user['to'] = $sch_view_post_data['email'];



        Mail::send('diamondScheViewSender', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Request To Schedule A Viewing');
        });







        //Retailer Email



        $user['to'] = 'dev@gemfind.com';



        Mail::send('diamondScheViewRetailer', $data, function ($messages) use ($user) {



            $messages->to($user['to']);



            $messages->subject('Request To Schedule A Viewing');
        });



        return response()->json(['message' => 'Email send successfully', 'status' => 'success']);
    }
}
