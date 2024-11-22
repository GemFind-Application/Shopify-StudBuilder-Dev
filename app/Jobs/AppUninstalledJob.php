<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Actions\CancelCurrentPlan;
use Osiset\ShopifyApp\Contracts\Commands\Shop as IShopCommand;
use Osiset\ShopifyApp\Contracts\Queries\Shop as IShopQuery;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use Osiset\ShopifyApp\Util;
use stdClass;
use App\Models\User;
use App\Webhook;
use Mail;
use DB;

class AppUninstalledJob extends \Osiset\ShopifyApp\Messaging\Jobs\AppUninstalledJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    protected $domain;

    protected $data;

    public function __construct(string $domain, stdClass $data)
    {
        $path = public_path();
        file_put_contents($path . '/domain.txt', $domain);
        $this->domain = $domain;
        $this->data = $data;
    }

    public function handle(IShopCommand $shopCommand, IShopQuery $shopQuery, CancelCurrentPlan $cancelCurrentPlanAction): bool
    {
        $apiKey = env('VITE_SHOPIFY_API_KEY');
        $path = public_path();
        // $json = file_get_contents('php://input');
        // file_put_contents($path . '/heythere.txt', json_encode($json));
        // $shop = User::where('name', $this->domain)
        //     ->select('users.*')
        //     ->first();
        // $file = 'jsonloog.txt';
        // $getCustomerData = DB::table('customer')
        //     ->where('shop', $this->domain)
        //     ->orderBy('id', 'DESC')
        //     ->first();
        // file_put_contents($path . '/domain_uninstall_1123.txt', json_encode($shop));
        // file_put_contents($path . '/domain_uninstall_1111.txt', json_encode($getCustomerData));
        // $finalData = json_decode($shop, true);
        // file_put_contents($path . '/password.txt', json_encode($finalData['password']));
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        // $url = 'https://' . $apiKey . ':' . $finalData['password'] . '@' . $this->domain . '/admin/api/' . env('SHOPIFY_API_VERSION') . '/shop.json';
        // file_put_contents($path . '/url.txt', json_encode($url));
        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_HEADER, false);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
        // $output = curl_exec($ch);
        // $get_shop_data = json_decode($output);
        // file_put_contents($path . '/domain_uninstall_shop.txt', json_encode($get_shop_data));
        // $data = [
        //     'id' => $finalData['id'],
        //     'name' => $finalData['name'],
        //     // 'domain'=> $finalData['domain'],
        //     'email' => $finalData['email'],
        //     // 'plan_name'=> $finalData['plan_name'],
        //     'updated_at' => $finalData['updated_at'],
        // ];
        // $user['to'] = 'dev@gemfind.com';
        // Mail::send('uninstallEmail', $data, function ($messages) use ($user) {
        //     $messages->to($user['to']);
        //     $messages->subject('StudBuilder App Uninstall');
        // });

        // if ($getCustomerData) {
        //     //Hubspot Uninstall
        //     //HUBSPOT API INTEGRATION
        //     $current_date = date('Y-m-d H:i:s');
        //     $path = public_path();

        //     $arr = [
        //         'filters' => [
        //             [
        //                 'propertyName' => 'email',
        //                 'operator' => 'EQ',
        //                 'value' => $getCustomerData->email,
        //             ],
        //         ],
        //     ];

        //     $post_json = json_encode($arr);

        //$file = "arr_log2.txt";
        //file_put_contents($file, $post_json);

        //     file_put_contents($path . '/arr_log2.txt', $post_json);

        //     $email_id = $getCustomerData->email;
        //     $endpoint = 'https://api.hubapi.com/contacts/v1/contact/email/' . $email_id . '/profile';
        //     $ch = curl_init();
        //     $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
        //     //curl_setopt($ch, CURLOPT_POST, true);
        //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        //     curl_setopt($ch, CURLOPT_POSTFIELDS, $post_json);
        //     curl_setopt($ch, CURLOPT_URL, $endpoint);
        //     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //     $response = curl_exec($ch);
        //     $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        //     $curl_errors = curl_error($ch);
        //     curl_close($ch);

        //     $file = 'uninstall_status_log.txt';
        //     file_put_contents($file, $status_code);

        //     $file = 'uninstall_response_log.txt';
        //     file_put_contents($file, $response);

        //     if ($status_code == 200) {
        //         $arr1 = [
        //             'properties' => [
        //                 [
        //                     'property' => 'email',
        //                     'value' => $shop['email'],
        //                 ],
        //                 [
        //                     'property' => 'Uninstall_Date',
        //                     'value' => $current_date,
        //                 ],
        //                 [
        //                     'property' => 'app_status',
        //                     'value' => 'UNINSTALL-STUDBUILDER',
        //                 ],
        //             ],
        //         ];
        //         $post_json1 = json_encode($arr1);
        //         file_put_contents('uninstall_data.log', $post_json1);
        //         $email_id1 = $getCustomerData->email;
        //         $endpoint1 = 'https://api.hubapi.com/contacts/v1/contact/email/' . $email_id1 . '/profile';

        //         $ch1 = curl_init();
        //         $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
        //         curl_setopt($ch1, CURLOPT_POST, true);
        //         curl_setopt($ch1, CURLOPT_POSTFIELDS, $post_json1);
        //         curl_setopt($ch1, CURLOPT_URL, $endpoint1);
        //         curl_setopt($ch1, CURLOPT_HTTPHEADER, $headers);
        //         curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
        //         $response1 = curl_exec($ch1);
        //         $status_code1 = curl_getinfo($ch1, CURLINFO_HTTP_CODE);
        //         $curl_errors1 = curl_error($ch1);
        //         curl_close($ch1);

        //         $file = 'uninstall_status_log2.txt';
        //         file_put_contents($file, $status_code1);

        //         $file = 'uninstall_response_log2.txt';
        //         file_put_contents($file, $response1);
        //     } else {
        //         $arr2 = [
        //             'properties' => [
        //                 [
        //                     'property' => 'email',
        //                     'value' => $shop['email'],
        //                 ],
        //                 [
        //                     'property' => 'shop_name',
        //                     'value' => $shop['name'],
        //                 ],
        //                 [
        //                     'property' => 'domain_name',
        //                     'value' => $shop['name'],
        //                 ],
        //                 [
        //                     'property' => 'phone',
        //                     'value' => $shop['phone'],
        //                 ],
        //                 [
        //                     'property' => 'state',
        //                     'value' => $shop['province'],
        //                 ],
        //                 [
        //                     'property' => 'country',
        //                     'value' => $shop['country'],
        //                 ],
        //                 [
        //                     'property' => 'address',
        //                     'value' => $shop['address1'],
        //                 ],
        //                 [
        //                     'property' => 'city',
        //                     'value' => $shop['city'],
        //                 ],
        //                 [
        //                     'property' => 'Install_Date',
        //                     'value' => $current_date,
        //                 ],
        //                 [
        //                     'property' => 'app_status',
        //                     'value' => 'UNINSTALL-STUDBUILDER',
        //                 ],
        //             ],
        //         ];
        //         $post_json2 = json_encode($arr2);
        //         $file = 'post_data_log3.txt';
        //         file_put_contents($file, $post_json2);
        //         $endpoint2 = 'https://api.hubapi.com/contacts/v1/contact';
        //         $ch2 = curl_init();
        //         $headers = ['Content-Type: application/json', 'Authorization: Bearer ' . env('YOUR_ACCESS_TOKEN')];
        //         curl_setopt($ch2, CURLOPT_POST, true);
        //         curl_setopt($ch2, CURLOPT_POSTFIELDS, $post_json2);
        //         curl_setopt($ch2, CURLOPT_URL, $endpoint2);
        //         curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
        //         curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        //         $response2 = curl_exec($ch2);
        //         $status_code2 = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
        //         $curl_errors2 = curl_error($ch2);
        //         curl_close($ch2);
        //         $file = 'uninstall_response_log3.txt';
        //         file_put_contents($file, $response2);
        //         $file = 'uninstall_status_log3.txt';
        //         file_put_contents($file, $status_code2);
        //     }
        // }

        // // Convert the domain
        // $this->domain = ShopDomain::fromNative($this->domain);

        // // Get the shop
        // $shop_uninstall = $shopQuery->getByDomain($this->domain);

        // file_put_contents($path . '/shop.txt', $shop_uninstall);
        // $shopId = $shop_uninstall->getId();

        // // Cancel the current plan
        // $cancelCurrentPlanAction($shopId);

        // $userId = DB::table('users')
        //     ->where('name', $finalData['name'])
        //     ->value('id');

        // //Delete data from tables
        // // DB::table('diamondlink_config')->where(['shop' => $finalData['name']])->delete();
        // DB::table('customer')
        //     ->where(['shop' => $finalData['name']])
        //     ->delete();
        // DB::table('smtp_config')
        //     ->where(['shop_name' => $finalData['name']])
        //     ->delete();
        // DB::table('ringbuilder_config')
        //     ->where(['shop' => $finalData['name']])
        //     ->delete();
        // DB::table('charges')
        //     ->where(['user_id' => $userId])
        //     ->delete();

        // // Purge shop of token, plan, etc.
        // $shopCommand->clean($shopId);
        // // Soft delete the shop.
        // $shopCommand->softDelete($shopId);

        return true;
    }
}
