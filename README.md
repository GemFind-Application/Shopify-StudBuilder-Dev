# Gemfind-StudBuilder

After taking git clone :

1.composer install

2.npm install

3.For backend app build run "npm run build" command -> build will be generated in public/build folder -> upload whole build folder in live

Always use npm run dev for generate build of react backend
if npm run watch will be used then env variables cannot be accessed
FOR RECURING APP CHARGES ACCORDING TO COUPON CODE

---

Please note that, whenever the kyon147 package will be upgraded, note this changes we have done in specific files..
Add below code in index() function of src\Traits\BillingController.php
$price = $request->get('price') ? urldecode($request->get('price')) : "null"; $url = $getPlanUrl( $shop->getId(), NullablePlanId::fromNative($plan), $host, $price );

Do needful changes according to below code in **invoke() function of src\Actions\GetPlanUrl.php
public function **invoke(ShopId $shopId, NullablePlanId $planId, string $host, string $price): string { // Get the shop $shop = $this->shopQuery->getById($shopId);

    // Get the plan
    $plan = $planId->isNull() ? $this->planQuery->getDefault() : $this->planQuery->getById($planId);

    // Confirmation URL
    if ($plan->getInterval()->toNative() === ChargeInterval::ANNUAL()->toNative()) {
        $api = $shop->apiHelper()
            ->createChargeGraphQL($this->chargeHelper->details($plan, $shop, $host, $price));

        $confirmationUrl = $api['confirmationUrl'];
    } else {
        $api = $shop->apiHelper()
            ->createCharge(
                ChargeType::fromNative($plan->getType()->toNative()),
                $this->chargeHelper->details($plan, $shop, $host, $price)
            );

        $confirmationUrl = $api['confirmation_url'];
    }

    return $confirmationUrl;

}
Do needful changes according to below code in details() function of src\Services\ChargeHelper.php
add 4th param in function as int $price like --- public function details(Plan $plan, IShopModel $shop, string $host, string $price="null"){ // Change $transfer-> price line to this // $transfer->price = $price != "null" ? (int)$price : $plan->price; }
