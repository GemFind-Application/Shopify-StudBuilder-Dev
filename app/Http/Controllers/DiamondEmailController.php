<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use DB;
use Mail;

class DiamondEmailController extends Controller
{

    public static function getDiamondById($id, $shop)
    {

        // header('Access-Control-Allow-Origin: *');

        $diamondData = DB::table('ringbuilder_config')->select('*')->where(['shop' => $shop])->get()->first();

        $DealerID = 'DealerID=' . $diamondData->dealerid . '&';

        $PairID = 'PairID=' . $id;

        $query_string = $DealerID . $PairID;

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

        if ($results->diamondID1 != "" && $results->diamondID1 > 0 && $results->diamondID2 != "" && $results->diamondID2 > 0) {

            $diamondData = (array) $results;

            $returnData = ['diamondData' => $diamondData];
        } else {

            $returnData = ['diamondData' => []];
        }

        return $returnData;
    }

    public function getDiamondDetailsApi($diamondId, $shop, $showRetailerInfo)
    {

        $diamondData = $this->getDiamondById($diamondId, $shop);

        if (empty($diamondData['diamondData'])) {
            $emptyResponse = [
                '$id' => '1',
                'diamondId' => null,
                'mainHeader' => null,
                'subHeader' => null,
                'stockNumber' => null,
                'price' => null,
                'caratWeight' => null,
                'cut' => null,
                'color' => null,
                'colorID' => null,
                'clarity' => null,
                'clarityID' => null,
                'cutGrade' => null,
                'cutGradeID' => null,
                'depth' => null,
                'table' => null,
                'polish' => null,
                'symmetry' => null,
                'gridle' => null,
                'culet' => null,
                'fluorescence' => null,
                'measurement' => null,
                'originFancy' => null,
                'contactNo' => null,
                'contactEmail' => null,
                'image1' => null,
                'image2' => null,
                'colorDiamond' => null,
                'videoFileName' => null,
                'certificate' => null,
                'price1' => null,
                'price2' => null,
                'lotNumber' => null,
                'additionalImage' => null,
                'fltPrice' => null,
                'txtInhouse' => false,
                'shape' => null,
                'providerImageUrl' => null,
                'certificateNo' => null,
                'certificateUrl' => null,
                'certificateIconUrl' => null,
                'dealerId' => null,
                'stoneCarat' => null,
                'origin' => null,
                'skun' => null,
                'isFavorite' => false,
                'vendorsku' => false,
                'ratio' => null,
                'costPerCarat' => null,
                'vendorName' => null,
                'vendorID' => null,
                'vendorEmail' => null,
                'vendorContactNo' => null,
                'vendorFax' => null,
                'vendorAddress' => null,
                'vendorStockNo' => null,
                'sOrigin' => null,
                'wholeSalePrice' => null,
                'fancyColorMainBody' => null,
                'fancyColorIntensity' => null,
                'fancyColorOvertone' => null,
                'currencyFrom' => null,
                'currencySymbol' => null,
                'retailerStockNo' => null,
                'retailerInfo' => null,
                'internalUselink' => null,
                'girdleThin' => null,
                'girdleThick' => null,
                'country' => null,
                'diamondDeatilAdditionalInfo' => null,
                'showPrice' => false,
                'isLabCreated' => false,
                'dsEcommerce' => false,
                'defaultDiamondImage' => null
            ];

            return $emptyResponse;
        } else {

            $diamondData = $diamondData['diamondData'];

            if ($showRetailerInfo == 'false') {

                unset($diamondData['contactNo']);
                unset($diamondData['contactEmail']);
                unset($diamondData['costPerCarat']);
                unset($diamondData['vendorName']);
                unset($diamondData['vendorEmail']);
                unset($diamondData['vendorContactNo']);
                unset($diamondData['vendorAddress']);
                unset($diamondData['wholeSalePrice']);

                if (isset($diamondData['retailerInfo'])) {
                    unset($diamondData['retailerInfo']->retailerCompany);
                    unset($diamondData['retailerInfo']->retailerName);
                    unset($diamondData['retailerInfo']->retailerCity);
                    unset($diamondData['retailerInfo']->retailerState);
                    unset($diamondData['retailerInfo']->retailerContactNo);
                    unset($diamondData['retailerInfo']->retailerEmail);
                    unset($diamondData['retailerInfo']->retailerLotNo);
                    unset($diamondData['retailerInfo']->retailerStockNo);
                    unset($diamondData['retailerInfo']->wholesalePrice);
                    unset($diamondData['retailerInfo']->thirdParty);
                    unset($diamondData['retailerInfo']->sellerName);
                    unset($diamondData['retailerInfo']->sellerAddress);
                    unset($diamondData['retailerInfo']->retailerAddress);
                }
            }

            return $diamondData;
        }
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

            $diamondData =  $this->getDiamondById($hint_post_data['pair_id'], $hint_post_data['shopurl']);

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

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
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

            $diamondData =  $this->getDiamondById($req_post_data['pair_id'],  $req_post_data['shopurl']);

            $jc_options = $this->getJCOptions($req_post_data['shopurl']);

            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];

            $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $reqData['shop']);

            if ($diamondData['diamondData']['color1'] != '') {

                $color_to_display = $diamondData['diamondData']['color1'];
            } else {

                $color_to_display = 'NA';
            }

            // Second Diamond Color

            if ($diamondData['diamondData']['color2'] != '') {

                $second_d_color_to_display = $diamondData['diamondData']['color2'];
            } else {
                $second_d_color_to_display = 'NA';
            }

            //  if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice1'] ? $currency . number_format($diamondData['diamondData']['fltPrice1']) : 'NA';
            // } else {

            //     $price = 'Call For Price';
            // }

            // Sencond Diamond Price

            //if ($diamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $diamondData['diamondData']['fltPrice2'] ? $currency . number_format($diamondData['diamondData']['fltPrice2']) : 'NA';
            // } else {

            //     $second_d_price = 'Call For Price';
            // }

            //MAIL TO USER

            $data = [
                'name' => $req_post_data['name'],
                'email' => $req_post_data['email'],
                'phone_no' => $req_post_data['phone_no'],
                'req_message' => $req_post_data['message'],
                'contact_preference' => $req_post_data['contact_preference'],
                'diamond_url' => $req_post_data['diamondurl'] ? $req_post_data['diamondurl'] : 'NA',

                'diamond_id' => $diamondData['diamondData']['diamondID1'] ? $diamondData['diamondData']['diamondID1'] : 'NA',
                'size' => $diamondData['diamondData']['caratWeight1'] ? $diamondData['diamondData']['caratWeight1'] : 'NA',
                'cut' => $diamondData['diamondData']['cutGrade1'] ? $diamondData['diamondData']['cutGrade1'] : 'NA',
                'color' => $color_to_display,
                'clarity' => $diamondData['diamondData']['clarity1'] ? $diamondData['diamondData']['clarity1'] : 'NA',
                'depth' => $diamondData['diamondData']['depth1'] ? $diamondData['diamondData']['depth1'] : 'NA',
                'table' => $diamondData['diamondData']['tableMeasure1'] ? $diamondData['diamondData']['tableMeasure1'] : 'NA',
                'measurment' => $diamondData['diamondData']['measurements1'] ? $diamondData['diamondData']['measurements1'] : 'NA',
                'certificate' => $diamondData['diamondData']['certificate1'] ? $diamondData['diamondData']['certificate1'] : 'NA',
                'certificateNo' => $diamondData['diamondData']['certificateNo1'] ? $diamondData['diamondData']['certificateNo1'] : 'NA',
                'certificateUrl' => $diamondData['diamondData']['certificateUrl1'] ? $diamondData['diamondData']['certificateUrl1'] : 'NA',
                'price' => $price,

                'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',
                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',
                'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',
                'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',
                'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',
                'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',
                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',
                'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',
                'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',
                'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',
                'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',
                'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',
                'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',
                'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

                // Second diamond data

                'second_d_diamond_id' => $diamondData['diamondData']['diamondID2'] ? $diamondData['diamondData']['diamondID2'] : 'NA',
                'second_d_size' => $diamondData['diamondData']['caratWeight2'] ? $diamondData['diamondData']['caratWeight2'] : 'NA',
                'second_d_cut' => $diamondData['diamondData']['cutGrade2'] ? $diamondData['diamondData']['cutGrade2'] : 'NA',
                'second_d_color' => $second_d_color_to_display,
                'second_d_clarity' => $diamondData['diamondData']['clarity2'] ? $diamondData['diamondData']['clarity2'] : 'NA',
                'second_d_depth' => $diamondData['diamondData']['depth2'] ? $diamondData['diamondData']['depth2'] : 'NA',
                'second_d_table' => $diamondData['diamondData']['tableMeasure2'] ? $diamondData['diamondData']['tableMeasure2'] : 'NA',
                'second_d_measurment' => $diamondData['diamondData']['measurements2'] ? $diamondData['diamondData']['measurements2'] : 'NA',
                'second_d_certificate' => $diamondData['diamondData']['certificate2'] ? $diamondData['diamondData']['certificate2'] : 'NA',
                'second_d_certificateNo' => $diamondData['diamondData']['certificateNo2'] ? $diamondData['diamondData']['certificateNo2'] : 'NA',
                'second_d_certificateUrl' => $diamondData['diamondData']['certificateUrl2'] ? $diamondData['diamondData']['certificateUrl2'] : 'NA',
                'second_d_price' => $second_d_price,

                'shop_logo' => $store_logo,
                'shop_logo_alt' => $reqData->shop,
                'shopurl' => $shopurl,

            ];


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

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
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

            $diamondData =  $this->getDiamondById($email_friend_post_data['pair_id'],  $email_friend_post_data['shopurl']);

            $jc_options = $this->getJCOptions($email_friend_post_data['shopurl']);

            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];;

            $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $frndData['shop']);

            if ($diamondData['diamondData']['color1'] != '') {

                $color_to_display = $diamondData['diamondData']['color1'];
            } else {

                $color_to_display = 'NA';
            }

            // Second Diamond Color

            if ($diamondData['diamondData']['color2'] != '') {

                $second_d_color_to_display = $diamondData['diamondData']['color2'];
            } else {
                $second_d_color_to_display = 'NA';
            }

            //if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice1'] ? $currency . number_format($diamondData['diamondData']['fltPrice1']) : 'NA';
            // } else {

            //     $price = 'Call For Price';
            // }

            // Sencond Diamond Price

            //if ($diamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $diamondData['diamondData']['fltPrice2'] ? $currency . number_format($diamondData['diamondData']['fltPrice2']) : 'NA';
            // } else {

            //     $second_d_price = 'Call For Price';
            // }

            //MAIL TO USER

            $data = [
                'name' => $email_friend_post_data['name'],
                'email' => $email_friend_post_data['email'],
                'frnd_name' => $email_friend_post_data['frnd_name'],
                'frnd_email' => $email_friend_post_data['frnd_email'],
                'frnd_message' => $email_friend_post_data['frnd_message'],
                'diamond_url' => $email_friend_post_data['diamondurl'] ? $email_friend_post_data['diamondurl'] : 'NA',

                'diamond_id' => $diamondData['diamondData']['diamondID1'] ? $diamondData['diamondData']['diamondID1'] : 'NA',
                'size' => $diamondData['diamondData']['caratWeight1'] ? $diamondData['diamondData']['caratWeight1'] : 'NA',
                'cut' => $diamondData['diamondData']['cutGrade1'] ? $diamondData['diamondData']['cutGrade1'] : 'NA',
                'color' => $color_to_display,
                'clarity' => $diamondData['diamondData']['clarity1'] ? $diamondData['diamondData']['clarity1'] : 'NA',
                'depth' => $diamondData['diamondData']['depth1'] ? $diamondData['diamondData']['depth1'] : 'NA',
                'table' => $diamondData['diamondData']['tableMeasure1'] ? $diamondData['diamondData']['tableMeasure1'] : 'NA',
                'measurment' => $diamondData['diamondData']['measurements1'] ? $diamondData['diamondData']['measurements1'] : 'NA',
                'certificate' => $diamondData['diamondData']['certificate1'] ? $diamondData['diamondData']['certificate1'] : 'NA',
                'certificateNo' => $diamondData['diamondData']['certificateNo1'] ? $diamondData['diamondData']['certificateNo1'] : 'NA',
                'certificateUrl' => $diamondData['diamondData']['certificateUrl1'] ? $diamondData['diamondData']['certificateUrl1'] : 'NA',
                'price' => $price,

                'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',
                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',
                'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',
                'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',
                'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',
                'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',
                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',
                'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',
                'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',
                'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',
                'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',
                'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',
                'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',
                'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

                // Second diamond data

                'second_d_diamond_id' => $diamondData['diamondData']['diamondID2'] ? $diamondData['diamondData']['diamondID2'] : 'NA',
                'second_d_size' => $diamondData['diamondData']['caratWeight2'] ? $diamondData['diamondData']['caratWeight2'] : 'NA',
                'second_d_cut' => $diamondData['diamondData']['cutGrade2'] ? $diamondData['diamondData']['cutGrade2'] : 'NA',
                'second_d_color' => $second_d_color_to_display,
                'second_d_clarity' => $diamondData['diamondData']['clarity2'] ? $diamondData['diamondData']['clarity2'] : 'NA',
                'second_d_depth' => $diamondData['diamondData']['depth2'] ? $diamondData['diamondData']['depth2'] : 'NA',
                'second_d_table' => $diamondData['diamondData']['tableMeasure2'] ? $diamondData['diamondData']['tableMeasure2'] : 'NA',
                'second_d_measurment' => $diamondData['diamondData']['measurements2'] ? $diamondData['diamondData']['measurements2'] : 'NA',
                'second_d_certificate' => $diamondData['diamondData']['certificate2'] ? $diamondData['diamondData']['certificate2'] : 'NA',
                'second_d_certificateNo' => $diamondData['diamondData']['certificateNo2'] ? $diamondData['diamondData']['certificateNo2'] : 'NA',
                'second_d_certificateUrl' => $diamondData['diamondData']['certificateUrl2'] ? $diamondData['diamondData']['certificateUrl2'] : 'NA',
                'second_d_price' => $second_d_price,

                'shop_logo' => $store_logo,
                'shop_logo_alt' => $frndData->shop,
                'shopurl' => $shopurl,
            ];

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

            return response()->json(['success' => true, 'message' => 'Thanks for your submission.']);
        } else {
            // reCAPTCHA verification failed
            return response()->json(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
        }
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

            $diamondData =  $this->getDiamondById($sch_view_post_data['pair_id'],  $sch_view_post_data['shopurl']);

            $jc_options = $this->getJCOptions($sch_view_post_data['shopurl']);

            $retaileremail = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];

            $retailername = ($diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : $schldData['shop']);

            if ($diamondData['diamondData']['color1'] != '') {

                $color_to_display = $diamondData['diamondData']['color1'];
            } else {

                $color_to_display = 'NA';
            }

            // Second Diamond Color

            if ($diamondData['diamondData']['color2'] != '') {

                $second_d_color_to_display = $diamondData['diamondData']['color2'];
            } else {
                $second_d_color_to_display = 'NA';
            }

            //if ($diamondData['diamondData']['showPrice'] == true) {

            $price  = $diamondData['diamondData']['fltPrice1'] ? $currency . number_format($diamondData['diamondData']['fltPrice1']) : 'NA';
            // } else {

            //     $price = 'Call For Price';
            // }

            // Sencond Diamond Price

            //if ($diamondData['diamondData']['showPrice'] == true) {

            $second_d_price  = $diamondData['diamondData']['fltPrice2'] ? $currency . number_format($diamondData['diamondData']['fltPrice2']) : 'NA';
            // } else {

            //     $second_d_price = 'Call For Price';
            // }

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

                'diamond_id' => $diamondData['diamondData']['diamondID1'] ? $diamondData['diamondData']['diamondID1'] : 'NA',
                'size' => $diamondData['diamondData']['caratWeight1'] ? $diamondData['diamondData']['caratWeight1'] : 'NA',
                'cut' => $diamondData['diamondData']['cutGrade1'] ? $diamondData['diamondData']['cutGrade1'] : 'NA',
                'color' => $color_to_display,
                'clarity' => $diamondData['diamondData']['clarity1'] ? $diamondData['diamondData']['clarity1'] : 'NA',
                'depth' => $diamondData['diamondData']['depth1'] ? $diamondData['diamondData']['depth1'] : 'NA',
                'table' => $diamondData['diamondData']['tableMeasure1'] ? $diamondData['diamondData']['tableMeasure1'] : 'NA',
                'measurment' => $diamondData['diamondData']['measurements1'] ? $diamondData['diamondData']['measurements1'] : 'NA',
                'certificate' => $diamondData['diamondData']['certificate1'] ? $diamondData['diamondData']['certificate1'] : 'NA',
                'certificateNo' => $diamondData['diamondData']['certificateNo1'] ? $diamondData['diamondData']['certificateNo1'] : 'NA',
                'certificateUrl' => $diamondData['diamondData']['certificateUrl1'] ? $diamondData['diamondData']['certificateUrl1'] : 'NA',
                'price' => $price,

                'vendorID' => $diamondData['diamondData']['vendorID'] ? $diamondData['diamondData']['vendorID'] : 'NA',
                'vendorName' => $diamondData['diamondData']['vendorName'] ? $diamondData['diamondData']['vendorName'] : 'NA',
                'vendorEmail' => $diamondData['diamondData']['vendorEmail'] ? $diamondData['diamondData']['vendorEmail'] : 'NA',
                'vendorContactNo' => $diamondData['diamondData']['vendorContactNo'] ? $diamondData['diamondData']['vendorContactNo'] : 'NA',
                'vendorStockNo' => $diamondData['diamondData']['vendorStockNo'] ? $diamondData['diamondData']['vendorStockNo'] : 'NA',
                'vendorFax' => $diamondData['diamondData']['vendorFax'] ? $diamondData['diamondData']['vendorFax'] : 'NA',
                'vendorAddress' => $diamondData['diamondData']['vendorAddress'] ? $diamondData['diamondData']['vendorAddress'] : 'NA',
                'retailerName' => $diamondData['diamondData']['retailerInfo']->retailerName ? $diamondData['diamondData']['retailerInfo']->retailerName : 'NA',
                'retailerID' => $diamondData['diamondData']['retailerInfo']->retailerID ? $diamondData['diamondData']['retailerInfo']->retailerID : 'NA',
                'retailerEmail' => $diamondData['diamondData']['retailerInfo']->retailerEmail ? $diamondData['diamondData']['retailerInfo']->retailerEmail : 'NA',
                'retailerContactNo' => $diamondData['diamondData']['retailerInfo']->retailerContactNo ? $diamondData['diamondData']['retailerInfo']->retailerContactNo : 'NA',
                'retailerStockNo' => $diamondData['diamondData']['retailerInfo']->retailerStockNo ? $diamondData['diamondData']['retailerInfo']->retailerStockNo : 'NA',
                'retailerFax' => $diamondData['diamondData']['retailerInfo']->retailerFax ? $diamondData['diamondData']['retailerInfo']->retailerFax : 'NA',
                'retailerAddress' => $diamondData['diamondData']['retailerInfo']->retailerAddress ? $diamondData['diamondData']['retailerInfo']->retailerAddress : 'NA',

                // Second diamond data

                'second_d_diamond_id' => $diamondData['diamondData']['diamondID2'] ? $diamondData['diamondData']['diamondID2'] : 'NA',
                'second_d_size' => $diamondData['diamondData']['caratWeight2'] ? $diamondData['diamondData']['caratWeight2'] : 'NA',
                'second_d_cut' => $diamondData['diamondData']['cutGrade2'] ? $diamondData['diamondData']['cutGrade2'] : 'NA',
                'second_d_color' => $second_d_color_to_display,
                'second_d_clarity' => $diamondData['diamondData']['clarity2'] ? $diamondData['diamondData']['clarity2'] : 'NA',
                'second_d_depth' => $diamondData['diamondData']['depth2'] ? $diamondData['diamondData']['depth2'] : 'NA',
                'second_d_table' => $diamondData['diamondData']['tableMeasure2'] ? $diamondData['diamondData']['tableMeasure2'] : 'NA',
                'second_d_measurment' => $diamondData['diamondData']['measurements2'] ? $diamondData['diamondData']['measurements2'] : 'NA',
                'second_d_certificate' => $diamondData['diamondData']['certificate2'] ? $diamondData['diamondData']['certificate2'] : 'NA',
                'second_d_certificateNo' => $diamondData['diamondData']['certificateNo2'] ? $diamondData['diamondData']['certificateNo2'] : 'NA',
                'second_d_certificateUrl' => $diamondData['diamondData']['certificateUrl2'] ? $diamondData['diamondData']['certificateUrl2'] : 'NA',
                'second_d_price' => $second_d_price,

                'shop_logo' => $store_logo,
                'shop_logo_alt' => $schldData->shop,
                'shopurl' => $shopurl,

            ];

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

            $user['to'] = $storeAdminEmail ? $storeAdminEmail : $diamondData['diamondData']['vendorEmail'];;

            Mail::send('diamondScheViewRetailer', $data, function ($messages) use ($user) {

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
