<?php



namespace App\Http\Controllers;



use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Validator;

use DB;

use Mail;

use App\Models\User;



class RingEmailController extends Controller

{

    public static function getRingById($id, $shop)
    {



        $settingsData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $shop])->get()->first();

        //echo'<pre>';print_r($settingsData);exit;

        $DealerID = 'DealerID=' . $settingsData->dealerid . '&';


        $add_lab_para = '';

        $DID = 'SID=' . $id;


        // if ($isLabSettings == 1) {

        //     $add_lab_para = '&IsLabSetting=1';

        // }

        $query_string = $DealerID . $DID;
        //

        $requestUrl = $settingsData->mountinglistapifancy . $query_string;

        //echo'<pre>';print_r($requestUrl);exit;;



        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $requestUrl);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl, CURLOPT_HEADER, false);

        $responce = curl_exec($curl);

        //

        $results = json_decode($responce);

        if (curl_errno($curl)) {

            return $returnData = ['ringData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        if (isset($results->message) && $results->message != 'Successfull') {

            return $returnData = ['ringData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        curl_close($curl);

        if ($results->gfInventoryID != "" && $results->gfInventoryID) {

            $ringData = (array) $results;

            $returnData = ['ringData' => $ringData];
        } else {

            $returnData = ['ringData' => []];
        }


        return $returnData;
    }


    public function getStudDetailsApi($studId, $shop, $showRetailerInfo)
    {

        $studData = $this->getRingById($studId, $shop);


        if (empty($studData['ringData'])) {
            $emptyResponse = [
                '$id' => '1',
                'currencyFrom' => null,
                'currencySymbol' => null,
                'buyNowDisabled' => null,
                'priceDisabled' => null,
                'markUpRestricted' => null,
                'gfInventoryID' => null,
                'dealerID' => null,
                'styleNumber' => null,
                'dealerStockNumber' => null,
                'productName' => null,
                'productDescription' => null,
                'cost' => null,
                'productType' => null,
                'displayOrder' => null,
                'finalPrice' => null,
                'imagePath' => null,
                'brandName' => null,
                'matchingSKUs' => null,
                'designerID' => null,
                'gender' => null,
                'style' => null,
                'metalType' => null,
                'metalColor' => null,
                'categoryName' => null,
                'collectionName' => null,
                'centerStoneFit' => null,
                'centerStoneMinCarat' => null,
                'centerStoneMaxCarat' => null,
                'configList' => null,
                'extraImage' => null,
                'configurableProduct' => null,
                'prongMetal' => null,
                'settingType' => null,
                'width' => null,
                'videoURL' => false,
                'designerLogo' => null,
                'designerName' => null,
                'retailerInfo' => null,
                'addressList' => null,
                'timingList' => null,
                'vendorId' => null,
                'vendorCompany' => null,
                'vendorName' => null,
                'vendorEmail' => null,
                'vendorPhone' => false,
            ];

            return $emptyResponse;
        } else {

            $studData = $studData['ringData'];

            if ($showRetailerInfo == 'false') {

                unset($studData['contactNo']);
                unset($studData['contactEmail']);
                unset($studData['costPerCarat']);
                unset($studData['vendorName']);
                unset($studData['vendorEmail']);
                unset($studData['vendorContactNo']);
                unset($studData['vendorAddress']);
                unset($studData['wholeSalePrice']);

                if (isset($studData['retailerInfo'])) {
                    unset($studData['retailerInfo']->retailerCompany);
                    unset($studData['retailerInfo']->retailerName);
                    unset($studData['retailerInfo']->retailerCity);
                    unset($studData['retailerInfo']->retailerState);
                    unset($studData['retailerInfo']->retailerContactNo);
                    unset($studData['retailerInfo']->retailerEmail);
                    unset($studData['retailerInfo']->retailerLotNo);
                    unset($studData['retailerInfo']->retailerStockNo);
                    unset($studData['retailerInfo']->wholesalePrice);
                    unset($studData['retailerInfo']->thirdParty);
                    unset($studData['retailerInfo']->sellerName);
                    unset($studData['retailerInfo']->sellerAddress);
                    unset($studData['retailerInfo']->retailerAddress);
                }
            }

            return $studData;
        }
    }



    public function getStoreSmtp($shopDomain)
    {

        $getSmtpData = DB::table('smtp_config')->where(['shop_name' => $shopDomain])->first();

        return $getSmtpData;
    }



    public function dropHintApi(Request $request)

    {
        // header('Access-Control-Allow-Origin: *');


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

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $hintData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $hintData->secret_key == null) {


            $storeAdminEmail = $hintData->admin_email_address;

            $shopurl = "https://" . $hint_post_data['shopurl'];

            $store_logo = $hintData->shop_logo;



            //


            //MAIL TO USER

            $data = [

                'shopurl' => $shopurl,

                'name' => $hint_post_data['name'],

                'email' => $hint_post_data['email'],

                'hint_Recipient_name' => $hint_post_data['hint_Recipient_name'],

                'hint_Recipient_email' => $hint_post_data['hint_Recipient_email'],

                'reason_of_gift' => $hint_post_data['reason_of_gift'],

                'hint_message' => $hint_post_data['hint_message'],

                'deadline' => $hint_post_data['deadline'],

                'ring_url' => $hint_post_data['ring_url'],

                'shop_logo' => $store_logo,

                'shop_logo_alt' => $hintData->shop

            ];

            //echo"<pre>";print_r($data);exit;

            //Sender Email

            $user['to'] = $request->email;

            Mail::send('ringDropHintSender', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Someone Wants To Drop You A Hint');
            });



            //Retailer Email

            $user['to'] = $storeAdminEmail;

            Mail::send('ringDropHintRetailer', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Someone Wants To Drop You A Hint');
            });



            // Receiver Email

            $user['to'] = $request->hint_Recipient_email;

            Mail::send('ringDropHintReceiver', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Someone Wants To Drop You A Hint');
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }



    public function reqInfoApi(Request $request)

    {
        //header('Access-Control-Allow-Origin: *');

        $req_post_data = $request->all();
        // echo"<pre>";print_r($req_post_data);exit;

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

        $currency = $req_post_data['currency'];


        // $variantname = $req_post_data['variantname'] ? $req_post_data['variantname'] : 'NA';
        // $sku = $req_post_data['sku'];
        // $variantId = $req_post_data['variantId'];

        $reqData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $request->shopurl])->get()->first();

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $reqData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $reqData->secret_key == null) {

            $store_logo = $reqData->shop_logo;

            $storeAdminEmail = $reqData->admin_email_address;

            $shopurl = "https://" . $req_post_data['shopurl'];

            $shop_data = User::where('name', $request->shopurl)->firstOrFail();
            //echo"<pre>";print_r($shop_data);exit;
            if (isset($req_post_data['variantId'])  && isset($req_post_data['productType']) && $req_post_data['productType'] == 'StudBuilder') {

                $settingId = $req_post_data['variantId'];

                $url = 'https://' . $request->shopurl . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

                $qry = '{

                        productVariants(first: 1, query: "' . $settingId . '") {

                            edges {

                                node {

                                    price

                                    title

                                }

                            }

                        }

                    }';

                $ch = curl_init($url);

                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

                curl_setopt($ch, CURLOPT_POSTFIELDS, $qry);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    array(

                        'Content-Type: application/graphql',

                        'X-Shopify-Access-Token:' . $shop_data->password
                    )

                );

                $server_output = curl_exec($ch);

                $variantData = json_decode($server_output, true);
                //echo '<pre>';print_r($variantData);exit;

                $price = $variantData['data']['productVariants']['edges'][0]['node']['price'];

                $metalColor = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[0];
                $metalType = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[1];
                $BackingType = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[2];

                // $ringData = $this->getRingById($settingId, $req_post_data['shopurl'], $req_post_data['islabsettings']);

                // echo '<pre>';print_r($metalType);exit;

            } else {

                $settingId = $req_post_data['settingid'];

                $ringData = $this->getRingById($settingId, $req_post_data['shopurl']);

                // if ($ringData['ringData']['showPrice'] == true) {

                $price  = $ringData['ringData']['cost'] ? number_format($ringData['ringData']['cost']) : '';
                // } else {

                //     $price = 'Call For Price';
                // }

                $max_carat = $ringData['ringData']['centerStoneMinCarat'] ? $ringData['ringData']['centerStoneMinCarat'] : '';
            }

            $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $ringData['ringData']['vendorEmail']);

            $vendorName = $reqData->shop;

            // echo '<pre>';
            // print_r($ringData);
            // exit;

            //MAIL TO USER

            $data = [

                'name' => $req_post_data['name'],

                'email' => $req_post_data['email'],

                'phone_no' => $req_post_data['phone_no'],

                'req_message' => $req_post_data['message'],

                'contact_preference' => $req_post_data['contact_preference'],

                'ring_url' => $req_post_data['ring_url'],

                'variantname' => isset($req_post_data['variantname']) ? $req_post_data['variantname'] : $ringData['ringData']['productName'],

                'sku' => $req_post_data['sku'] ?? $ringData['ringData']['styleNumber'] ?: 'NA',

                'variantid' => $req_post_data['variantId'] ?? 'NA',

                // 'price' => $ringData['ringData']['cost'] ? $ringData['ringData']['currencySymbol'] . ' ' . number_format($ringData['ringData']['cost']) : '',

                'price' => $currency . $price,

                'setting_id' => $req_post_data['settingid'] ? $req_post_data['settingid'] : "NA",

                'metaltype' => $metalType ??  $ringData['ringData']['metalType'],

                'metalColor' => $metalColor ?? $ringData['ringData']['metalColor'] ?: 'NA',

                'BackingType' => $BackingType ?? 'NA',

                'vendorName' => $vendorName,

                'vendorEmail' => $storeAdminEmail,

                'vendorPhone' => '',

                'shop_logo' => $store_logo,

                'shop_logo_alt' => $reqData->shop,

                'shopurl' => $shopurl,

            ];



            //NEED TO GET DATA FROM DATABASE HERE

            //     $store_detail = $this->getStoreSmtp($req_post_data['shopurl']);

            //     if($store_detail){

            //         $config = array(

            //             'protocol' =>  'smtp',

            //             'smtp_host' => $store_detail->smtphost,

            //             'smtp_port' => $store_detail->smtpport,

            //             'smtp_user' => $store_detail->smtpusername,

            //             'smtp_pass' => $store_detail->smtppassword,

            //             'smtp_crypto' => $store_detail->protocol == "none" ? "tls" : $store_detail->protocol,

            //             'mailtype' => 'html',

            //             'smtp_timeout' => '4',

            //             'charset' => 'utf-8',

            //             'wordwrap' => TRUE,

            //             'newline' => "\r\n"

            //         );

            //    }

            //END FOR DATABASE QUERY



            //Sender Email

            $user['to'] = $req_post_data['email'];

            Mail::send('ringReqInfoSender', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Request For More Info');
            });



            //Retailer Email

            $user['to'] = $vendorEmail;

            Mail::send('ringReqInfoRetailer', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Request For More Info');
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }



    public function emailFriendApi(Request $request)

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

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $frndData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $frndData->secret_key == null) {

            $storeAdminEmail = $frndData->admin_email_address;

            $store_logo = $frndData->shop_logo;

            $shopurl = "https://" . $email_friend_post_data['shopurl'];

            $shop_data = User::where('name', $request->shopurl)->firstOrFail();

            if (isset($email_friend_post_data['variantId'])  && isset($email_friend_post_data['productType']) && $email_friend_post_data['productType'] == 'StudBuilder') {

                $settingId = $email_friend_post_data['variantId'];

                $url = 'https://' . $request->shopurl . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

                $qry = '{

                        productVariants(first: 1, query: "' . $settingId . '") {

                            edges {

                                node {

                                    price

                                    title

                                }

                            }

                        }

                    }';

                $ch = curl_init($url);

                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

                curl_setopt($ch, CURLOPT_POSTFIELDS, $qry);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    array(

                        'Content-Type: application/graphql',

                        'X-Shopify-Access-Token:' . $shop_data->password
                    )

                );

                $server_output = curl_exec($ch);

                $variantData = json_decode($server_output, true);

                $price = $variantData['data']['productVariants']['edges'][0]['node']['price'];

                $max_carat = $email_friend_post_data['max_carat'];

                $min_carat = $email_friend_post_data['min_carat'];

                $metalColor = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[0];
                $metalType = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[1];
                $BackingType = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[2];


                // echo '<pre>';print_r($price);exit;

            } else {

                $settingId = $email_friend_post_data['settingid'];

                $ringData = $this->getRingById($settingId, $email_friend_post_data['shopurl']);

                // if ($ringData['ringData']['showPrice'] == true) {

                $price  = $ringData['ringData']['cost'] ? number_format($ringData['ringData']['cost']) : '';
                // } else {

                // $price = 'Call For Price';
                // }

                $metalType = $ringData['ringData']['metalType'] ? $ringData['ringData']['metalType'] : '';
            }

            $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $ringData['ringData']['vendorEmail']);

            $vendorName =  $frndData->shop;


            //MAIL TO USER

            $data = [

                'name' => $email_friend_post_data['name'],

                'email' => $email_friend_post_data['email'],

                'frnd_name' => $email_friend_post_data['frnd_name'],

                'frnd_email' => $email_friend_post_data['frnd_email'],

                'frnd_message' => $email_friend_post_data['frnd_message'],

                'ring_url' => $email_friend_post_data['ring_url'] ? $email_friend_post_data['ring_url'] : '',

                'variantname' => isset($email_friend_post_data['variantname']) ? $email_friend_post_data['variantname'] : $ringData['ringData']['productName'],

                'sku' => $email_friend_post_data['sku'] ?? $ringData['ringData']['styleNumber'] ?: 'NA',

                'variantid' => $email_friend_post_data['variantId'] ?? 'NA',

                'setting_id' => $email_friend_post_data['settingid'] ? $email_friend_post_data['settingid'] : '',

                'metaltype' => $metalType ??  $ringData['ringData']['metalType'],

                'metalColor' => $metalColor ?? $ringData['ringData']['metalColor'] ?: 'NA',

                'BackingType' => $BackingType ?? 'NA',

                'price' => $currency . $price,

                'vendorName' => $vendorName,

                'vendorEmail' => $storeAdminEmail,

                'vendorPhone' => " ",

                'shop_logo' => $store_logo,

                'shop_logo_alt' => $frndData->shop,

                'shopurl' => $shopurl,

            ];

            // echo'<pre>';print_r($data);exit;


            //Sender Email

            $user['to'] = $email_friend_post_data['email'];

            Mail::send('ringEmailFriendSender', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('A Friend Wants To Share With You');
            });



            //Retailer Email

            $user['to'] = $vendorEmail;

            Mail::send('ringEmailFriendRetailer', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('A Friend Wants To Share With You');
            });



            // Receiver email

            $user['to'] = $email_friend_post_data['frnd_email'];

            Mail::send('ringEmailFriendReceiver', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('A Friend Wants To Share With You');
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }



    public function scheViewApi(Request $request)

    {
        // header('Access-Control-Allow-Origin: *');

        // echo '<pre>';print_r($request->all());exit;

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

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'secret' => $schldData->secret_key,
            'response' => $request->input('recaptchaToken'),
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $output = curl_exec($ch);
        $response = json_decode(($output));
        curl_close($ch);

        if ($response->success == 'true' || $schldData->secret_key == null) {

            $storeAdminEmail = $schldData->admin_email_address;

            $store_logo = $schldData->shop_logo;

            $shopurl = "https://" . $sch_view_post_data['shopurl'];

            $shop_data = User::where('name', $request->shopurl)->firstOrFail();

            if (isset($sch_view_post_data['variantId'])  && isset($sch_view_post_data['productType']) && $sch_view_post_data['productType'] == 'StudBuilder') {

                $settingId = $sch_view_post_data['variantId'];

                $url = 'https://' . $request->shopurl . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

                $qry = '{

                        productVariants(first: 1, query: "' . $settingId . '") {

                            edges {

                                node {

                                    price

                                    title

                                }

                            }

                        }

                    }';

                $ch = curl_init($url);

                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

                curl_setopt($ch, CURLOPT_POSTFIELDS, $qry);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    array(

                        'Content-Type: application/graphql',

                        'X-Shopify-Access-Token:' . $shop_data->password
                    )

                );

                $server_output = curl_exec($ch);

                $variantData = json_decode($server_output, true);



                $price = $variantData['data']['productVariants']['edges'][0]['node']['price'];

                $metalColor = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[0];
                $metalType = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[1];
                $BackingType = explode('/', $variantData['data']['productVariants']['edges'][0]['node']['title'])[2];
            } else {

                $settingId = $sch_view_post_data['settingid'];

                $ringData = $this->getRingById($settingId, $sch_view_post_data['shopurl']);

                // if ($ringData['ringData']['showPrice'] == true) {

                $price  = $ringData['ringData']['cost'] ? number_format($ringData['ringData']['cost']) : '';
                // } else {

                //     $price = 'Call For Price';
                // }

                $metalType = $ringData['ringData']['metalType'] ? $ringData['ringData']['metalType'] : '';
            }

            $vendorEmail = ($storeAdminEmail ? $storeAdminEmail : $ringData['ringData']['vendorEmail']);

            $vendorName = $schldData->shop;



            //MAIL TO USER

            $data = [

                'name' => $sch_view_post_data['name'],

                'email' => $sch_view_post_data['email'],

                'phone_no' => $sch_view_post_data['phone_no'],

                'schl_message' => $sch_view_post_data['schl_message'],

                'location' => $sch_view_post_data['location'],

                'availability_date' => $sch_view_post_data['availability_date'],

                'appnt_time' => $sch_view_post_data['appnt_time'],

                'ring_url' => $sch_view_post_data['ring_url'] ? $sch_view_post_data['ring_url'] : '',

                'setting_id' => $sch_view_post_data['settingid'] ? $sch_view_post_data['settingid'] : '',

                'variantname' => isset($sch_view_post_data['variantname']) ? $sch_view_post_data['variantname'] : $ringData['ringData']['productName'],

                'sku' => $sch_view_post_data['sku'] ?? $ringData['ringData']['styleNumber'] ?: 'NA',

                'variantid' => $sch_view_post_data['variantId'] ?? 'NA',

                'metaltype' => $metalType ??  $ringData['ringData']['metalType'],

                'metalColor' => $metalColor ?? $ringData['ringData']['metalColor'] ?: 'NA',

                'BackingType' => $BackingType ?? 'NA',

                'price' => $currency . $price,

                'vendorName' => $vendorName,

                'vendorEmail' => $storeAdminEmail,

                'vendorPhone' => " ",

                'shop_logo' => $store_logo,

                'shop_logo_alt' => $schldData->shop,

                'shopurl' => $shopurl,

            ];



            //Sender Email

            $user['to'] = $sch_view_post_data['email'];

            Mail::send('ringScheViewSender', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Request To Schedule A Viewing');
            });



            // Retailer Email

            $user['to'] = $vendorEmail;

            Mail::send('ringScheViewRetailer', $data, function ($messages) use ($user) {

                $messages->to($user['to']);

                $messages->subject('Request To Schedule A Viewing');
            });

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
    }
}
