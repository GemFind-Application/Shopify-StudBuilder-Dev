<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CssConfigure;
use Illuminate\Http\Request;
use App\Models\User;
use DB;
use App\Webhook;
use Mail;

class InitToolController extends Controller
{
    // InitToolAPI - Fetch All data related to the Tool
    public function initToolApi(Request $request)
    {
        // header("Access-Control-Allow-Origin: *");

        //  echo "somin";
        //  exit;
        $settingData = DB::table('ringbuilder_config')
            ->where(['shop' => $request->shop_domain])
            ->get()
            ->first();
        $css_configuration = CssConfigure::where(['shop' => $request->shop_domain])->first();
        // echo '<pre>';print_r($settingData);exit;
        $jewelCloudApi = 'http://api.jewelcloud.com/api/RingBuilder/GetDiamondsJCOptions?DealerID=' . $settingData->dealerid;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $jewelCloudApi);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $response = curl_exec($curl);
        $server_output = json_decode($response, true);

        //echo '<pre>';print_r($server_output);exit;

        foreach ($server_output as $value) {
            foreach ($value as $val) {
                if ($val['internalUseLink']) {
                    $internalUseLink = $val['internalUseLink'];
                } else {
                    $internalUseLink = '0';
                }
                if ($val['scheduleViewing']) {
                    $scheduleViewing = $val['scheduleViewing'];
                } else {
                    $scheduleViewing = '0';
                }
                if ($val['show_In_House_Diamonds_First']) {
                    $show_In_House_Diamonds_First = $val['show_In_House_Diamonds_First'];
                } else {
                    $show_In_House_Diamonds_First = '0';
                }
                if ($val['show_Advance_options_as_Default_in_Diamond_Search']) {
                    $show_Advance_options_as_Default_in_Diamond_Search = $val['show_Advance_options_as_Default_in_Diamond_Search'];
                } else {
                    $show_Advance_options_as_Default_in_Diamond_Search = '0';
                }
                if ($val['show_Certificate_in_Diamond_Search']) {
                    $show_Certificate_in_Diamond_Search = $val['show_Certificate_in_Diamond_Search'];
                } else {
                    $show_Certificate_in_Diamond_Search = '0';
                }
                if ($val['show_Request_Certificate']) {
                    $show_Request_Certificate = $val['show_Request_Certificate'];
                } else {
                    $show_Request_Certificate = '0';
                }
                if ($val['show_Diamond_Prices']) {
                    $show_Diamond_Prices = $val['show_Diamond_Prices'];
                } else {
                    $show_Diamond_Prices = '0';
                }
                if ($val['markup_Your_Own_Inventory']) {
                    $markup_Your_Own_Inventory = $val['markup_Your_Own_Inventory'];
                } else {
                    $markup_Your_Own_Inventory = '0';
                }
                if ($val['show_Pinterest_Share']) {
                    $show_Pinterest_Share = $val['show_Pinterest_Share'];
                } else {
                    $show_Pinterest_Share = '0';
                }
                if ($val['show_Twitter_Share']) {
                    $show_Twitter_Share = $val['show_Twitter_Share'];
                } else {
                    $show_Twitter_Share = '0';
                }
                if ($val['show_Facebook_Share']) {
                    $show_Facebook_Share = $val['show_Facebook_Share'];
                } else {
                    $show_Facebook_Share = '0';
                }
                if ($val['show_Facebook_Like']) {
                    $show_Facebook_Like = $val['show_Facebook_Like'];
                } else {
                    $show_Facebook_Like = '0';
                }
                if ($val['show_AddtoCart_Buttom']) {
                    $show_AddtoCart_Buttom = $val['show_AddtoCart_Buttom'];
                } else {
                    $show_AddtoCart_Buttom = '0';
                }
                if ($val['drop_A_Hint']) {
                    $dropHint = $val['drop_A_Hint'];
                } else {
                    $dropHint = $settingData->enable_hint;
                }
                if ($val['email_A_Friend']) {
                    $emailFriend = $val['email_A_Friend'];
                } else {
                    $emailFriend = $settingData->enable_email_friend;
                }
            }
        }
        if (isset($_SERVER['HTTPS'])) {
            $protocol = $_SERVER['HTTPS'] && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
        } else {
            $protocol = 'http';
        }
        if ($settingData->type_1 == '2' || $settingData->type_1 == '3') {
            $settingData->is_api = 'false';
        } else {
            $settingData->is_api = 'true';
        }
        $settingData->type_1 = (string) $settingData->type_1;
        $settingData->internalUseLink = (string) $internalUseLink;
        $settingData->scheduleViewing = (string) $scheduleViewing;
        $settingData->show_In_House_Diamonds_First = (string) $show_In_House_Diamonds_First;
        $settingData->show_Advance_options_as_Default_in_Diamond_Search = (string) $show_Advance_options_as_Default_in_Diamond_Search;
        $settingData->show_Certificate_in_Diamond_Search = (string) $show_Certificate_in_Diamond_Search;
        $settingData->show_Request_Certificate = (string) $show_Request_Certificate;
        $settingData->show_Diamond_Prices = (string) $show_Diamond_Prices;
        $settingData->markup_Your_Own_Inventory = (string) $markup_Your_Own_Inventory;
        $settingData->show_Pinterest_Share = (string) $show_Pinterest_Share;
        $settingData->show_Twitter_Share = (string) $show_Twitter_Share;
        $settingData->show_Facebook_Share = (string) $show_Facebook_Share;
        $settingData->show_Facebook_Like = (string) $show_Facebook_Like;
        $settingData->show_AddtoCart_Buttom = (string) $show_AddtoCart_Buttom;
        $settingData->enable_hint = (string) $dropHint;
        $settingData->enable_email_friend = (string) $emailFriend;
        $settingData->store_id = (string) $settingData->store_id;
        $settingData->store_location_id = (string) $settingData->store_location_id;
        $settingData->dealerpassword = (string) $settingData->dealerpassword;
        $settingData->from_email_address = (string) $settingData->from_email_address;
        $settingData->shop_access_token = (string) $settingData->shop_access_token;
        $settingData->server_url = (string) $protocol . '://' . request()->getHost();
        $settingData->currency = $this->getCurrency($settingData->dealerid);



        $styleSettingColors = $this->getStyleSetting($settingData->dealerid);
        $hoverEffect = $styleSettingColors['hoverEffect'];
        $columnHeaderAccent = $styleSettingColors['columnHeaderAccent'];
        $linkColor = $styleSettingColors['linkColor'];
        $callToActionButton = $styleSettingColors['callToActionButton'];

        //linkColor
        if (isset($css_configuration) && !empty($css_configuration->link)) {
            $settingData->link_colour = $css_configuration->link;
        } elseif (isset($linkColor) && !empty($linkColor)) {
            $settingData->link_colour = $linkColor;
        } else {
            $settingData->link_colour = '#999';
        }

        //hoverEffect
        if (isset($css_configuration) && !empty($css_configuration->hover)) {
            $settingData->hover_colour = $css_configuration->hover;
        } elseif (isset($hoverEffect) && !empty($hoverEffect)) {
            $settingData->hover_colour = $hoverEffect;
        } else {
            $settingData->hover_colour = '#92cddc';
        }

        //Sliders
        $settingData->slider_colour = $css_configuration ? $css_configuration->slider : '#828282';

        //columnHeaderAccent
        if (isset($css_configuration) && !empty($css_configuration->header)) {
            $settingData->header_colour = $css_configuration->header;
        } elseif (isset($columnHeaderAccent) && !empty($columnHeaderAccent)) {
            $settingData->header_colour = $columnHeaderAccent;
        } else {
            $settingData->header_colour = '#000000';
        }

        //callToActionButton
        if (isset($css_configuration) && !empty($css_configuration->button)) {
            $settingData->button_colour = $css_configuration->button;
        } elseif (isset($callToActionButton) && !empty($callToActionButton)) {
            $settingData->button_colour = $callToActionButton;
        } else {
            $settingData->button_colour = '#000022';
        }

        // $settingData->link_colour = $css_configuration->link;
        // $settingData->hover_colour = $css_configuration->hover;
        // $settingData->slider_colour = $css_configuration->slider;
        // $settingData->header_colour = $css_configuration->header;
        // $settingData->button_colour = $css_configuration->button;

        if (!empty($settingData)) {
            $msg['message'] = 'Init Tool Data Successfully';
            $msg['status'] = 'success';
            $msg['data'] = [$settingData];
            return response()->json($msg);
        } else {
            return response()->json(['message' => 'User Profile Fail', 'status' => 'fail', 'data' => []]);
        }
    }

    // Fetch Style API 
    public function getStyleSetting($dealerid)
    {
        $settingApi = 'http://api.jewelcloud.com/api/RingBuilder/GetStyleSetting?DealerID=' . $dealerid . '&ToolName=SB';
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $settingApi);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $response = curl_exec($curl);
        $server_output = json_decode($response, true);

        //hoverEffect
        if ($server_output[0][0]['hoverEffect']) {
            $hoverEffectColor = $server_output[0][0]['hoverEffect'];
            $hoverEffect = empty($hoverEffectColor[0]['color2']) ? $hoverEffectColor[0]['color1'] : $hoverEffectColor[0]['color2'];
        }

        //columnHeaderAccent
        if ($server_output[0][0]['columnHeaderAccent']) {
            $columnHeaderAccentColor = $server_output[0][0]['columnHeaderAccent'];
            $columnHeaderAccent = empty($columnHeaderAccentColor[0]['color2']) ? $columnHeaderAccentColor[0]['color1'] : $columnHeaderAccentColor[0]['color2'];
        }

        //linkColor
        if ($server_output[0][0]['linkColor']) {
            $linkColors = $server_output[0][0]['linkColor'];
            $linkColor = empty($linkColors[0]['color2']) ? $linkColors[0]['color1'] : $linkColors[0]['color2'];
        }

        //callToActionButton
        if ($server_output[0][0]['callToActionButton']) {
            $callToActionButtonColor = $server_output[0][0]['callToActionButton'];
            $callToActionButton = empty($callToActionButtonColor[0]['color2']) ? $callToActionButtonColor[0]['color1'] : $callToActionButtonColor[0]['color2'];
        }

        $styleSettingColors = [
            'hoverEffect' => $hoverEffect,
            'columnHeaderAccent' => $columnHeaderAccent,
            'linkColor' => $linkColor,
            'callToActionButton' => $callToActionButton,
        ];

        return $styleSettingColors;
    }

    // Get Currency from API
    public function getCurrency($dealerid)
    {
        $settingApi = 'http://api.jewelcloud.com/api/RingBuilder/GetStudList?DealerID=' . $dealerid;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $settingApi);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $response = curl_exec($curl);
        $server_output = json_decode($response, true);
        // echo '<pre>';print_r($server_output);exit;
        if (!empty($server_output['mountingList'])) {
            // if ($server_output['mountingList'][0]['showPrice'] == true) {
            if (isset($server_output['mountingList'][0]['currencyFrom']) && $server_output['mountingList'][0]['currencyFrom'] == 'USD') {
                $currency = '$';
            } else {
                $currency = isset($server_output['mountingList'][0]['currencySymbol']) ? $server_output['mountingList'][0]['currencySymbol'] : '';
            }
            // } else {
            //     $currency = '';
            // }
        } else {
            $currency = '';
        }



        return $currency;
    }

    // Uninstall Webhook and email code
    public static function appUninstallJob(Request $request)
    {
        try {
            $path = public_path();
            $getCustomerData = DB::table('customer')
                ->where('shop', $request->myshopify_domain)
                ->orderBy('id', 'DESC')
                ->first();

            $shop = User::where('name', $request->myshopify_domain)
                ->select('users.*')
                ->first();

            sleep(2);

            if ($shop) {
                // file_put_contents($path . '/domain_uninstall_1.txt', json_encode($request->all()));
                // file_put_contents($path . '/domain_uninstall_shop.txt', json_encode($shop));
                $data = [
                    'id' => $shop['id'],
                    'name' => $shop['name'],
                    'email' => $request->email,
                    'updated_at' => $shop['updated_at'],
                ];

                $recipients = ['dev@gemfind.com', 'support@gemfind.com', 'billing@gemfind.com', 'sales@gemfind.com', 'appinstall@gemfind.com'];

                $user['to'] = $recipients;
                Mail::send('uninstallEmail', $data, function ($messages) use ($user) {
                    $messages->to($user['to']);
                    $messages->subject('GemFind StudBuilderⓇ App Uninstall');
                });

                $user['to'] = $getCustomerData && $getCustomerData->email ? $getCustomerData->email : $request->email;
                $user['from'] = 'support@gemfind.com';
                $user['store'] = 'GemFind StudBuilderⓇ';

                Mail::send('uninstallStoreAdminEmail', $data, function ($messages) use ($user) {
                    $messages->to($user['to']);
                    $messages->replyTo($user['from'], $user['store']);
                    $messages->subject('How did GemFind StudBuilderⓇ not meet your needs?');
                });

                file_put_contents($path . '/getCustomerData.txt', json_encode($getCustomerData));

                $current_date = date('Y-m-d H:i:s');

                if ($getCustomerData) {
                    // Hubspot Uninstall
                    $arr = [
                        'filters' => [
                            [
                                'propertyName' => 'email',
                                'operator' => 'EQ',
                                'value' => $getCustomerData->email,
                            ],
                        ],
                    ];

                    $post_json = json_encode($arr);

                    file_put_contents($path . '/arr_log2.txt', $post_json);

                    $email_id = $getCustomerData->email;
                    $endpoint = 'https://api.hubapi.com/contacts/v1/contact/email/' . $email_id . '/profile';
                    $ch = curl_init();
                    $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
                    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_json);
                    curl_setopt($ch, CURLOPT_URL, $endpoint);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    $response = curl_exec($ch);
                    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                    $curl_errors = curl_error($ch);
                    curl_close($ch);

                    file_put_contents('uninstall_status_log.txt', $status_code);
                    file_put_contents('uninstall_response_log.txt', $response);

                    if ($status_code == 200) {
                        $arr1 = [
                            'properties' => [
                                [
                                    'property' => 'email',
                                    'value' => $request->email,
                                ],
                                [
                                    'property' => 'Uninstall_Date',
                                    'value' => $current_date,
                                ],
                                [
                                    'property' => 'app_status',
                                    'value' => 'UNINSTALL-STUDBUILDER',
                                ],
                            ],
                        ];
                        $post_json1 = json_encode($arr1);
                        file_put_contents('uninstall_data.log', $post_json1);
                        $email_id1 = $getCustomerData->email;
                        $endpoint1 = 'https://api.hubapi.com/contacts/v1/contact/email/' . $email_id1 . '/profile';

                        $ch1 = curl_init();
                        $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
                        curl_setopt($ch1, CURLOPT_POST, true);
                        curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_json1);
                        curl_setopt($ch1, CURLOPT_URL, $endpoint1);
                        curl_setopt($ch1, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
                        $response1 = curl_exec($ch1);
                        $status_code1 = curl_getinfo($ch1, CURLINFO_HTTP_CODE);
                        $curl_errors1 = curl_error($ch1);
                        curl_close($ch1);

                        file_put_contents('uninstall_status_log2.txt', $status_code1);
                        file_put_contents('uninstall_response_log2.txt', $response1);
                    } else {
                        $this->createHubspotContact($shop, $request, $current_date);
                    }
                } else {
                    $this->handleMissingCustomerData($request, $shop, $current_date, $path);
                }

                DB::table('users')
                    ->where('name', $request->myshopify_domain)
                    ->update(['password' => '']);

                $user_id = $shop['id'];

                if (DB::table('charges')->where('user_id', $user_id)->exists()) {
                    DB::table('charges')->where('user_id', $user_id)->delete();
                }
            }
        } catch (\Exception $e) {
            file_put_contents($path . '/error_log.txt', $e->getMessage());
        }
    }

    // Create new HubSpot entry
    public static function createHubspotContact($shop, $request, $current_date)
    {
        $arr2 = [
            'properties' => [
                [
                    'property' => 'email',
                    'value' => $request->email,
                ],
                [
                    'property' => 'shop_name',
                    'value' => $shop['name'],
                ],
                [
                    'property' => 'domain_name',
                    'value' => $shop['name'],
                ],
                [
                    'property' => 'phone',
                    'value' => $shop['phone'],
                ],
                [
                    'property' => 'state',
                    'value' => $shop['province'],
                ],
                [
                    'property' => 'country',
                    'value' => $shop['country'],
                ],
                [
                    'property' => 'address',
                    'value' => $shop['address1'],
                ],
                [
                    'property' => 'city',
                    'value' => $shop['city'],
                ],
                [
                    'property' => 'Uninstall_Date',
                    'value' => $current_date,
                ],
                [
                    'property' => 'app_status',
                    'value' => 'UNINSTALL-STUDBUILDER',
                ],
            ],
        ];
        $post_json2 = json_encode($arr2);
        file_put_contents('post_data_log3.txt', $post_json2);
        $endpoint2 = 'https://api.hubapi.com/contacts/v1/contact';
        $ch2 = curl_init();
        $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
        curl_setopt($ch2, CURLOPT_POST, true);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, $post_json2);
        curl_setopt($ch2, CURLOPT_URL, $endpoint2);
        curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        $response2 = curl_exec($ch2);
        $status_code2 = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
        $curl_errors2 = curl_error($ch2);
        curl_close($ch2);
        file_put_contents('uninstall_response_log3.txt', $response2);
        file_put_contents('uninstall_status_log3.txt', $status_code2);
    }

    // Update HubSpot entry
    public static function handleMissingCustomerData($request, $shop, $current_date, $path)
    {
        $arr = [
            'filters' => [
                [
                    'propertyName' => 'email',
                    'operator' => 'EQ',
                    'value' => $request->email,
                ],
            ],
        ];

        $post_json = json_encode($arr);

        file_put_contents($path . '/arr_log2.txt', $post_json);

        $email_id = $request->email;
        $endpoint = 'https://api.hubapi.com/contacts/v1/contact/email/' . $email_id . '/profile';
        $ch = curl_init();
        $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_json);
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curl_errors = curl_error($ch);
        curl_close($ch);

        file_put_contents('uninstall_status_log.txt', $status_code);
        file_put_contents('uninstall_response_log.txt', $response);

        if ($status_code == 200) {
            $arr1 = [
                'properties' => [
                    [
                        'property' => 'email',
                        'value' => $request->email,
                    ],
                    [
                        'property' => 'Uninstall_Date',
                        'value' => $current_date,
                    ],
                    [
                        'property' => 'app_status',
                        'value' => 'UNINSTALL-STUDBUILDER',
                    ],
                ],
            ];
            $post_json1 = json_encode($arr1);
            file_put_contents('uninstall_data.log', $post_json1);
            $email_id1 = $request->email;
            $endpoint1 = 'https://api.hubapi.com/contacts/v1/contact/email/' . $email_id1 . '/profile';

            $ch1 = curl_init();
            $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
            curl_setopt($ch1, CURLOPT_POST, true);
            curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_json1);
            curl_setopt($ch1, CURLOPT_URL, $endpoint1);
            curl_setopt($ch1, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            $response1 = curl_exec($ch1);
            $status_code1 = curl_getinfo($ch1, CURLINFO_HTTP_CODE);
            $curl_errors1 = curl_error($ch1);
            curl_close($ch1);

            file_put_contents('uninstall_status_log4.txt', $status_code1);
            file_put_contents('uninstall_response_log4.txt', $response1);
        } else {
            $this->createHubspotContact($shop, $request, $current_date);
        }
    }

    // Shop update webhook
    public function appShopUpdateJob(Request $request)
    {
        $response = [
            'status' => true,
            'message' => 'Shop updated successfully.',
            'data' => [],
        ];
        return response()->json($response, 200);
    }
}
