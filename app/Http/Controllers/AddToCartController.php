<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DB;
use Log;
use PDF;

class AddToCartController extends Controller
{
    public function addToCart(Request $request)
    {

        header('Access-Control-Allow-Origin: *');


        $shop_data = User::where('name', $request['shop_domain'])->firstOrFail();
        $shop_base_url = "https://" . $request['shop_domain'];
        $diamond_product_id = "";
        $second_diamond_product_id = "";
        $setting_product_id = "";
        $productDescription = $request['productDescription'] ? $request['productDescription'] : 'NA';
        $productName = $request['productName'] ? $request['productName'] : 'NA';
        $finalPrice = $request['finalPrice'] ? $request['finalPrice'] : 'NA';
        $imagePath = $request['imagePath'] ? $request['imagePath'] : 'NA';



        if ($request['diamond_id']) {
            try {

                $diamondData = $this->getDiamondById($request['pair_id'], $request['shop_domain']);

                // $diamondData = $this->getDiamondById($request['dealer_id'], $request['diamond_id'], $request['is_lab']);

                //For First Diamond

                $url = 'https://' . $request['shop_domain'] . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';
                $second_url = 'https://' . $request['shop_domain'] . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

                $qry = '{

                            productVariants(first: 250, query: "' . $request['diamond_id'] . '") {

                                edges {

                                cursor

                                node {

                                    product{

                                        id

                                    }

                                    inventoryItem {

                                        id

                                    }

                                    id

                                    sku

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

                $sku = json_decode($server_output, true);





                if ($sku['data']['productVariants']['edges']) {
                    $in_shopify = "1";
                } else {
                    $in_shopify = "0";
                }

                if ($in_shopify == "1") {

                    $finalSku = $sku['data']['productVariants']['edges'][0]['node'];

                    $variantGid = explode('/', $finalSku['id']);

                    $variantId = $variantGid[4];

                    $productGid = explode('/', $finalSku['product']['id']);

                    $productId = $productGid[4];

                    $InventoryGid = explode('/', $finalSku['inventoryItem']['id']);

                    $InventoryId = $InventoryGid[4];

                    $products_array = array(

                        "product" => array(

                            "id"                => $productId,

                            "variants"          => array(array("id" => $variantId, "price" => number_format($diamondData['diamondData']['fltPrice1']))),

                        )

                    );

                    $update_product = $shop_data->api()->rest('PUT', '/admin/products/' . $productId . '.json', $products_array);

                    $product_data = json_encode($update_product);

                    $finalProductData = json_decode($product_data);

                    $diamond_product_id = $finalProductData->body->product->variants[0]->id;
                } else {

                    $products_array = array(

                        "product" => array(

                            "title"             => $diamondData['diamondData']['mainHeader'],

                            "body_html"         => $diamondData['diamondData']['subHeader'],

                            "vendor"            => "GemFind",

                            "product_type"      => "GemFindDiamond",

                            "published_scope"   => "web",

                            "tags"              => "SEARCHANISE_IGNORE,GemfindDiamond",

                            "variants"          => array(array("sku" => $request->diamond_id, "price" => number_format($diamondData['diamondData']['fltPrice1']))),

                            "metafields"        => array(array("namespace" => "seo", "key" => "hidden", "value" => 1, "type" => "integer")),

                            "sales_channels"    => ["online"] // Adding sales_channels here

                        )

                    );

                    $create_product = $shop_data->api()->rest('POST', '/admin/products.json', $products_array);

                    $product_data = json_encode($create_product);

                    $finalProductData = json_decode($product_data);

                    $product_id = $finalProductData->body->product->id;

                    $diamond_product_id = $finalProductData->body->product->variants[0]->id;

                    $image_url = $diamondData['diamondData']['diamondImage2'] ? $diamondData['diamondData']['diamondImage2'] : '';

                    $ch = curl_init($image_url);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_USERAGENT, 'Your User-Agent Here');

                    $imageData = curl_exec($ch);

                    $image_array = array("image" => array("attachment" => base64_encode($imageData)));

                    $create_product_image = $shop_data->api()->rest('POST', '/admin/products/' . $product_id . '/images.json', $image_array);




                    // $image_array = array("image" => array("attachment" => base64_encode(file_get_contents($diamondData['diamondData']['diamondImage2']))));

                    // $create_product_image = $shop_data->api()->rest('POST', '/admin/products/' . $product_id . '/images.json', $image_array);
                }
            } catch (Exception $e) {

                redirect($this->agent->referrer() . '/error');
            }
        }


        if ($request['second_diamond_id']) {

            try {

                // $diamondData = $this->getDiamondById($request['dealer_id'], $request['second_diamond_id'], $request['is_lab']);

                //For First Diamond

                $url = 'https://' . $request['shop_domain'] . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

                $qry = '{

                            productVariants(first: 250, query: "' . $request['second_diamond_id'] . '") {

                                edges {

                                cursor

                                node {

                                    product{

                                        id

                                    }

                                    inventoryItem {

                                        id

                                    }

                                    id

                                    sku

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

                $sku = json_decode($server_output, true);

                // echo '<pre>';
                // print_r($sku);
                // exit;

                if ($sku['data']['productVariants']['edges']) {

                    $in_shopify = "1";
                } else {

                    $in_shopify = "0";
                }

                if ($in_shopify == "1") {



                    $finalSku = $sku['data']['productVariants']['edges'][0]['node'];

                    $variantGid = explode('/', $finalSku['id']);

                    $variantId = $variantGid[4];

                    $productGid = explode('/', $finalSku['product']['id']);

                    $productId = $productGid[4];

                    $InventoryGid = explode('/', $finalSku['inventoryItem']['id']);

                    $InventoryId = $InventoryGid[4];

                    $products_array = array(

                        "product" => array(

                            "id"                => $productId,

                            "variants"          => array(array("id" => $variantId, "price" => number_format($diamondData['diamondData']['fltPrice2']))),

                        )

                    );

                    $update_product = $shop_data->api()->rest('PUT', '/admin/products/' . $productId . '.json', $products_array);

                    $product_data = json_encode($update_product);

                    $finalProductData = json_decode($product_data);

                    $second_diamond_product_id = $finalProductData->body->product->variants[0]->id;
                } else {

                    $products_array = array(

                        "product" => array(

                            "title"             => $diamondData['diamondData']['mainHeader'],

                            "body_html"         => $diamondData['diamondData']['subHeader'],

                            "vendor"            => "GemFind",

                            "product_type"      => "GemFindDiamond",

                            "published_scope"   => "web",

                            "tags"              => "SEARCHANISE_IGNORE,GemfindDiamond",

                            "variants"          => array(array("sku" => $request->diamond_id, "price" => number_format($diamondData['diamondData']['fltPrice2']))),

                            "metafields"        => array(array("namespace" => "seo", "key" => "hidden", "value" => 1, "type" => "integer")),

                            "sales_channels"    => ["online"] // Adding sales_channels here

                        )

                    );



                    $create_product = $shop_data->api()->rest('POST', '/admin/products.json', $products_array);

                    $product_data = json_encode($create_product);

                    $finalProductData = json_decode($product_data);

                    $product_id = $finalProductData->body->product->id;

                    $second_diamond_product_id = $finalProductData->body->product->variants[0]->id;

                    $image_url = $diamondData['diamondData']['diamondImage2'] ? $diamondData['diamondData']['diamondImage2'] : '';

                    $ch = curl_init($image_url);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_USERAGENT, 'Your User-Agent Here');

                    $imageData = curl_exec($ch);

                    $image_array = array("image" => array("attachment" => base64_encode($imageData)));

                    $create_product_image = $shop_data->api()->rest('POST', '/admin/products/' . $product_id . '/images.json', $image_array);


                    // echo 'coming here';

                    // $image_array = array("image" => array("attachment" => base64_encode(file_get_contents($diamondData['diamondData']['diamondImage2']))));

                    // // echo '<pre>';
                    // // print_r($sku);

                    // // exit;

                    // $create_product_image = $shop_data->api()->rest('POST', '/admin/products/' . $product_id . '/images.json', $image_array);
                }
            } catch (Exception $e) {

                redirect($this->agent->referrer() . '/error');
            }
        }

        if ($request['setting_id']) {


            try {

                $urlRing = 'https://' . $request['shop_domain'] . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

                $qryRing = '{

                            productVariants(first: 250, query: "' . $request['setting_id'] . '") {

                                edges {

                                cursor

                                node {

                                    price

                                    product{

                                        id

                                    }

                                    inventoryItem {

                                        id

                                    }

                                    id

                                    sku

                                    }

                                }

                            }

                        }';

                $ch = curl_init($urlRing);

                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

                curl_setopt($ch, CURLOPT_POSTFIELDS, $qryRing);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    array(

                        'Content-Type: application/graphql',

                        'X-Shopify-Access-Token:' . $shop_data->password
                    )

                );

                $server_outputRing = curl_exec($ch);

                $skuRIng = json_decode($server_outputRing, true);

                if (!empty(($skuRIng['data']['productVariants']['edges']))) {

                    $in_ring_shopify = "1";
                } else {

                    $in_ring_shopify = "0";
                }

                if ($in_ring_shopify == "1") {

                    if ($request->sidestonequalityvalue) {

                        $roption_name = $request->ringsizesettingonly . " / " . $request->metaltype . " / " . $request->sidestonequalityvalue . " / " . $request->centerstonesizevalue;
                    } else {

                        $roption_name = $request->ringsizesettingonly . " / " . $request->metaltype;
                    }

                    $finalSkuRing = $skuRIng['data']['productVariants']['edges'][0]['node'];

                    $variantGidRIng = explode('/', $finalSkuRing['id']);

                    $variantIdRIng = $variantGidRIng[4];

                    $productGidRIng = explode('/', $finalSkuRing['product']['id']);

                    $productIdRIng = $productGidRIng[4];

                    $price = $skuRIng['data']['productVariants']['edges'][0]['node']['price'];

                    $products_array_ring = array(

                        "product" => array(

                            "id"                => $productIdRIng,

                            "variants"          => array(array("id" => $variantIdRIng, "price" => number_format($price), "option1" => $roption_name)),

                        )

                    );

                    $update_productRIng = $shop_data->api()->rest('PUT', '/admin/products/' . $productIdRIng . '.json', $products_array_ring);

                    $product_dataRIng = json_encode($update_productRIng);

                    $finalProductDataRIng = json_decode($product_dataRIng);

                    $setting_product_id = $finalProductDataRIng->body->product->variants[0]->id;

                    $product_id_ring = $finalProductDataRIng->body->product->id;

                    $image_array_ring = array("image" => array("attachment" => base64_encode(file_get_contents($imagePath))));

                    $create_product_image_ring = $shop_data->api()->rest('POST', '/admin/products/' . $product_id_ring . '/images.json', $image_array_ring);
                } else {



                    if ($request->sidestonequalityvalue) {

                        $roption_name = $request->ringsizesettingonly . " / " . $request->metaltype . " / " . $request->sidestonequalityvalue . " / " . $request->centerstonesizevalue;
                    } else {
                        $roption_name = $request->ringsizesettingonly . " / " . $request->metaltype . " / " . $request->centerstonesizevalue;
                    }


                    $products_array_ring = array(

                        "product" => array(

                            "title"             => $productName,

                            "body_html"         => $productDescription,

                            "vendor"            => "GemFindRB",

                            "product_type"      => "GemFindRing",

                            "published_scope"   => "web",

                            "tags"              => "SEARCHANISE_IGNORE,GemfindRing",

                            "variants"          => array(array("sku" => $request['setting_id'], "price" => number_format($finalPrice), "option1" => $roption_name)),

                            "metafields"        => array(array("namespace" => "seo", "key" => "hidden", "value" => 1, "type" => "integer")),

                            "sales_channels"    => ["online"] // Adding sales_channels here

                        )

                    );

                    $create_product_ring = $shop_data->api()->rest('POST', '/admin/products.json', $products_array_ring);

                    $product_data_ring = json_encode($create_product_ring);

                    $finalProductDataRIng = json_decode($product_data_ring);

                    $setting_product_id = $finalProductDataRIng->body->product->variants[0]->id;

                    $product_id_ring = $finalProductDataRIng->body->product->id;

                    $image_array_ring = array("image" => array("attachment" => base64_encode(file_get_contents($imagePath))));

                    $create_product_image_ring = $shop_data->api()->rest('POST', '/admin/products/' . $product_id_ring . '/images.json', $image_array_ring);
                }
            } catch (Exception $e) {

                redirect($this->agent->referrer() . '/error');
            }
        }

        //REDIRECTING URLS

        if ($diamond_product_id && $setting_product_id && $second_diamond_product_id) {

            $checkout_url = $shop_base_url . "/cart/add?id[]=" . $diamond_product_id . "&id[]=" . $second_diamond_product_id . "&id[]=" . $setting_product_id;

            $response = [

                'status' => true,

                'message' => "diamond & ring",

                'data'    => $checkout_url,

            ];

            // return response()->header('Access-Control-Allow-Origin', '*')->json($response, 200);

            echo json_encode($checkout_url);
            exit();
            redirect($checkout_url);
        }

        if ($diamond_product_id) {

            $checkout_url = $shop_base_url . "/cart/add?id[]=" . $diamond_product_id;

            $response = [

                'status' => true,

                'message' => "diamond",

                'data'    => $checkout_url,

            ];

            // return response()->header('Access-Control-Allow-Origin', '*')->json($response, 200);

            echo json_encode($checkout_url);
            exit;

            redirect($checkout_url);
        }

        if ($second_diamond_product_id) {

            $checkout_url = $shop_base_url . "/cart/add?id[]=" . $second_diamond_product_id;

            $response = [

                'status' => true,

                'message' => "diamond",

                'data'    => $checkout_url,

            ];

            echo json_encode($checkout_url);
            exit;

            redirect($checkout_url);
        }

        if ($setting_product_id) {

            $checkout_url = $shop_base_url . "/cart/add?id[]=&id[]=" . $setting_product_id;

            $response = [

                'status' => true,

                'message' => "diamond",

                'data'    => $checkout_url,

            ];

            echo json_encode($checkout_url);
            exit;
            redirect($checkout_url);
        }
    }

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



    public static function getRingById($dealerId, $settingId)
    {

        $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetStudDetail?DealerID=" . $dealerId . "&SID=" . $settingId;

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $requestUrl);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl, CURLOPT_HEADER, false);

        $response = curl_exec($curl);

        $results = json_decode($response);

        if (curl_errno($curl)) {

            return $returnData = ['settingData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        if (isset($results->message)) {

            return $returnData = ['settingData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        curl_close($curl);

        if ($results->settingId != "" && $results->settingId > 0) {

            $settingData = (array) $results;

            $returnData = ['settingData' => $settingData];
        } else {

            $returnData = ['settingData' => []];
        }

        return $returnData;
    }


    // Print For Diamond

    function printDiamond($shop_domain, $pairId)
    {

        // header('Access-Control-Allow-Origin: *');

        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

        $getDiamondData = self::getDiamondByIdForPdf($shop_domain, $pairId);

        view()->share('diamond', $getDiamondData);

        $pdf = PDF::loadView('printDiamond', $getDiamondData);

        $headers = array(

            'Content-Type: application/pdf',

        );

        return $pdf->download('Diamond-' . $pairId . '.pdf', $headers);
    }

    public static function getDiamondByIdForPdf($shop, $pairId)
    {

        $shop_data = DB::table('ringbuilder_config')->where('shop', $shop)->first();

        $requestUrl = $shop_data->diamonddetailapi . "DealerID=" . $shop_data->dealerid . "&PairID=" . $pairId;


        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $requestUrl);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl, CURLOPT_HEADER, false);

        $response = curl_exec($curl);

        $results = (array)json_decode($response);

        $getData[] = $results;

        if (curl_errno($curl)) {

            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        if (isset($results->message)) {

            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        curl_close($curl);

        if ($results['diamondID1'] != "" && $results['diamondID1'] > 0 && $results['diamondID2'] != "" && $results['diamondID2'] > 0) {

            $diamondData = (array) $results;

            $returnData = ['diamondData' => $diamondData];
        } else {
            $returnData = ['diamondData' => []];
        }

        return $returnData;
        //echo'<pre>';print_r($returnData); exit;
    }



    //Print For Diamond And Ring

    function printDiamondandStud($shop_domain, $pairId, $studId)
    {

        // header('Access-Control-Allow-Origin: *');

        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        $getDiamondData = self::getDiamondByIdForPdf($shop_domain, $pairId);

        $getStudData = self::getDiamondStudByIdForPdf($shop_domain,  $studId);


        $getStudDiamondData = array_merge($getStudData, $getDiamondData);


        view()->share('diamond', $getStudDiamondData);

        $pdf = PDF::loadView('completeRingPrintpdf', $getStudDiamondData);

        $headers = array(
            'Content-Type: application/pdf',
        );

        return $pdf->download('Diamond-' . $pairId . 'Stud-' . $studId . '.pdf', $headers);
    }

    public static function getDiamondStudByIdForPdf($shop,  $studId)
    {

        $shop_data = DB::table('ringbuilder_config')->where('shop', $shop)->first();

        $requestUrl = $shop_data->mountinglistapifancy . "DealerID=" . $shop_data->dealerid . "&SID=" . $studId;


        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $requestUrl);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($curl, CURLOPT_HEADER, false);

        $response = curl_exec($curl);

        $results = (array)json_decode($response);

        $getData[] = $results;

        if (curl_errno($curl)) {

            return $returnData = ['studData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        if (isset($results->message)) {

            return $returnData = ['studData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }

        curl_close($curl);

        if ($results['gfInventoryID'] != "" && $results['gfInventoryID'] > 0) {

            $studData = (array) $results;

            $returnData = ['studData' => $studData];
        } else {
            $returnData = ['studData' => []];
        }

        return $returnData;
        //echo'<pre>';print_r($returnData); exit;
    }

    // public static function getRingDiamondByIdForPdf($shop, $diamondId, $secondDiamondId)
    // {

    //     $shop_data = DB::table('ringbuilder_config')->where('shop', $shop)->first();

    //     $diamondDataArray = array($diamondId, $secondDiamondId);
    //     // print_r($diamondDataArray);
    //     // exit();

    //     foreach ($diamondDataArray as $key => $id) {

    //         $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $id;

    //         $curl = curl_init();

    //         curl_setopt($curl, CURLOPT_URL, $requestUrl);

    //         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    //         curl_setopt($curl, CURLOPT_HEADER, false);

    //         $response = curl_exec($curl);

    //         $results = (array)json_decode($response);

    //         $getData[] = $results;
    //     }
    //     //echo "string"; print_r($getData['0']['diamondId']);exit();

    //     if (curl_errno($curl)) {
    //         return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
    //     }

    //     if (isset($results->message)) {
    //         return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
    //     }
    //     curl_close($curl);

    //     if ($getData['0']['diamondId'] != "" && $getData['0']['diamondId'] > 0 && $getData['1']['diamondId'] != "" && $getData['1']['diamondId'] > 0) {

    //         $diamondData = (array) $getData[0];
    //         $diamondData = (array) $getData[1];

    //         $returnData = ['diamondData' => $diamondData, 'diamondData' => $diamondData];
    //     } else {

    //         $returnData = ['diamondData' => [], 'diamondData' => []];
    //     }

    //     return $returnData;
    //     // echo'<pre>';print_r($returnData); exit;
    // }

    function getProductDetails($shop_domain, $productId, $variantId)
    {

        //header('Access-Control-Allow-Origin: *');

        $settingData = DB::table('ringbuilder_config')->where('shop', $shop_domain)->first();

        // echo "<pre>";

        //     print_r($settingData);

        //     exit;

        $shop = User::where('name', $shop_domain)->firstOrFail();

        $product = $shop->api()->rest('GET', '/admin/products/' . $productId . '.json');

        $variant = $shop->api()->rest('GET', '/admin/variants/' . $variantId . '.json');

        $urlRing = 'https://' . $shop_domain . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/graphql.json';

        $finalvid = 'gid://shopify/ProductVariant/' . $variantId;

        $qryRing =  '{
                  productVariant(id: "' . $finalvid . '") {
                    image {
                      src
                    }
                  }
                }';

        $ch = curl_init($urlRing);

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

        curl_setopt($ch, CURLOPT_POSTFIELDS, $qryRing);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(

                'Content-Type: application/graphql',

                'X-Shopify-Access-Token:' . $shop->password
            )

        );

        $server_outputRing = curl_exec($ch);

        $skuRIng = json_decode($server_outputRing, true);

        // echo 'test';
        // echo "<pre>";print_r($skuRIng);exit;

        $meta_fields = $shop->api()->rest('GET', '/admin/products/' . $productId . '/metafields.json');

        if ($product) {

            $getProduct = $product['body']['container']['product'];

            // echo "<pre>";

            // print_r($variant['body']['container']['variant']);

            // exit;

            $getVariant = $variant['body']['container']['variant'];

            $getMetaFields = $meta_fields['body']['container']['metafields'];

            // echo "<pre>";print_r($getMetaFields);

            // exit;

            $variantImg = $skuRIng['data']['productVariant']['image'] ? $skuRIng['data']['productVariant']['image']['src'] : $getProduct['image']['src'];

            $groupMetaFields = array();

            foreach ($getMetaFields as $element) {

                $groupMetaFields[$element['key']] = $element;
            }

            if ($groupMetaFields) {

                foreach ($groupMetaFields as $meta) {

                    if (array_key_exists("ringSize", $groupMetaFields)) {

                        $ringSize = $groupMetaFields['ringSize']['value'];
                    } else {

                        $ringSize = "";
                    }

                    if (array_key_exists("shape", $groupMetaFields)) {

                        $shape = $groupMetaFields['shape']['value'];
                    } else {

                        $shape = "";
                    }

                    if (array_key_exists("MinimumCarat", $groupMetaFields)) {

                        $centerStoneMinCarat = $groupMetaFields['MinimumCarat']['value'];
                    } else {

                        $centerStoneMinCarat = "";
                    }

                    if (array_key_exists("MaximumCarat", $groupMetaFields)) {

                        $centerStoneMaxCarat = $groupMetaFields['MaximumCarat']['value'];
                    } else {

                        $centerStoneMaxCarat = "";
                    }

                    if (array_key_exists("islabsettings", $groupMetaFields)) {

                        $islabsettings = $groupMetaFields['islabsettings']['value'];
                    } else {

                        $islabsettings = "";
                    }
                }
            } else {

                $ringSize = "NA";

                $shape = "NA";

                $centerStoneMinCarat = "NA";

                $centerStoneMaxCarat = "NA";

                $islabsettings = "NA";
            }

            //echo '<pre>';print_r($centerStoneMinCarat);exit;

            $imageFinal = [];

            foreach ($getProduct['images'] as $image) {

                $imageFinal[] = $image['src'];
            }

            //echo '<pre>'; print_r($getProduct); exit;

            foreach ($getProduct as $prod) {

                // echo '<pre>'; print_r($getProduct); exit;

                $finalProduct = [

                    '$id'                   => $getProduct['id'] ? $getProduct['id'] : 'NA',

                    'styleNumber'           => $getProduct['variants'][0]['sku'] ? $getProduct['variants'][0]['sku'] : 'NA',

                    "settingName"           => $getProduct['title'] ? $getProduct['title'] : 'NA',

                    "description"           => $getProduct['body_html'] ? $getProduct['body_html'] : 'NA',

                    "metalType"             => $variant['body']['container']['variant']['option1'] ? $variant['body']['container']['variant']['option1'] : 'NA',

                    "metalColor"             => $variant['body']['container']['variant']['option2'] ? $variant['body']['container']['variant']['option2'] : 'NA',

                    "backingType"             => $variant['body']['container']['variant']['option3'] ? $variant['body']['container']['variant']['option3'] : 'NA',

                    "centerStoneFit"        => $shape,

                    "category"              => 'NA',

                    "settingId"             => $getVariant['sku'] ? $getVariant['sku'] : 'NA',

                    "vendorId"              => $settingData->dealerid,

                    "vendorCompany"         => "Retailer Demo",

                    "vendorName"            => $getProduct['vendor'] ? $getProduct['vendor'] : 'NA',

                    "vendorEmail"           => "gflink@gemfind.net,michael.mastros@gemfind.com",

                    "vendorPhone"           => "888-999-7755",

                    "imagePath"             => $variantImg ? $variantImg : 'NA',

                    "finalPrice"            => $variant['body']['container']['variant']['price'] ? $variant['body']['container']['variant']['price'] : 'NA',

                    "originalCost"          => $getProduct['variants'][0]['price'] ? $getProduct['variants'][0]['price'] : 'NA',

                    "mainImageURL"          => $getProduct['image']['src'] ? $getProduct['image']['src'] : 'NA',

                    "roundImageURL"         => "",

                    "asscherImageURL"       => "",

                    "emeraldImageURL"       => "",

                    "radiantImageURL"       => "",

                    "cushionImageURL"       => "",

                    "marquiseImageURL"      => "",

                    "ovalImageURL"          => "",

                    "heartImageURL"         => "",

                    "pearImageURL"          => "",

                    "princessImageURL"      => "",

                    "dealerId"              => null,

                    "thumbNailImage"        => null,

                    "extraImage"            => $imageFinal,

                    "relatedProductImage"   => "",

                    "configurableProduct"   => "",

                    "prongMetal"            => "",

                    "settingType"           => $getProduct['product_type'] ? $getProduct['product_type'] : 'NA',

                    "width"                 => "",

                    "videoURL"              => "",

                    "designerLogo"          => "",

                    "designerName"          => "Overnight Mountings Ring Builder",

                    "isFavorite"            => false,

                    "ringSize"              => $ringSize,

                    "sideStoneQuality"      => [],

                    "currencyFrom"          => "USD",

                    "currencySymbol"        => "US$",

                    "sideDiamondDetail1"    => [],

                    "sideDiamondDetail"     => "",

                    "retailerInfo"          => "",

                    "addressList"           => [],

                    "timingList"            => [],

                    "metalID"               => $getVariant['option1'] ? $getVariant['option1'] : 'NA',

                    "colorID"               => $getVariant['option2'] ? $getVariant['option2'] : 'NA',

                    "internalUselink"       => "No",

                    "ringSizeType"          => "",

                    "showPrice"             => true,

                    "rbEcommerce"           => true,

                    "showBuySettingOnly"    => false,

                    "tryon"                 => true,

                    "isLabSetting"          => $islabsettings

                ];
            }
        }

        // echo "<pre>";

        // print_r($finalProduct);

        // exit;

        return $finalProduct;
    }
}
