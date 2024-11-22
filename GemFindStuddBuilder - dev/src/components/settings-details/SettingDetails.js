import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Data from "../elements/data";
import DataMounting from "../elements/data-mounting";
import ProductGallary from "./settingsdetails-element/ProductGallary";
import ProductInformation from "./settingsdetails-element/ProductInformation";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import DataDiamond from "../elements/data-diamond";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { LoadingOverlay, Loader } from "react-overlay-loader";

const SettingDetails = () => {
  const location = useLocation();
  var productUrl = location.pathname;
  var stoneSize = [];
  // console.log(productUrl);
  var part = productUrl.substring(productUrl.lastIndexOf("-") + 1);
  const [getCurrentProductId, setCurrentProductId] = useState(part);
  const [getProductData, setProductData] = useState("");
  const [getselectedStone, setselectedStone] = useState("");
  const [skeltonLoad, setskeltonLoad] = useState(false);
  var selectedmetal = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  // console.log(selectedmetal);
  const [getIp, setIp] = useState("");
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const navigate = useNavigate();
  const [getstonesizedata, setstonesizedata] = useState([]);
  const [showRetailerInfo, setshowRetailerInfo] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [getyourpassword, setyourpassword] = useState("");
  const [geterror, seterror] = useState([""]);
  const [openDelearModel, setOpenDelearModel] = useState(false);

  const getProductDetails = async (productId, shopDomain, internalUseOnly) => {
    try {
      // const res = await fetch(
      //   `${window.initData.data[0].mountinglistapifancy}DealerID=${DealerID}&SID=${productId}`
      // );

      const res = await fetch(
        `${process.env.REACT_APP_URL}/getStudDetailsApi/` +
          productId +
          "/" +
          shopDomain +
          "/" +
          internalUseOnly
      );

      // console.log("res");
      // console.log(res);
      const productDetails = await res.json();
      setProductData(productDetails);

      // console.log("productDetails");
      // console.log(productDetails);

      var findConfigStone = productDetails.configList.filter(function (v) {
        return v.gfInventoryID == productId;
      });

      // console.log("productDetails");
      // console.log(productDetails.configList);

      // console.log("findConfigStone");
      // console.log(findConfigStone);

      if (findConfigStone.length > 0) {
        setselectedStone(findConfigStone[0].customAttribute);
      }

      const stoneItems = productDetails.configList.map((val) => {
        if (
          productDetails.metalType.replace(/\s+/g, "-").toLowerCase() ===
          val.metalType.replace(/\s+/g, "-").toLowerCase()
        ) {
          stoneSize.push({
            type: val.metalType,
            configid: val.gfInventoryID,
            stonesize: val.customAttribute,
          });
        }
      });
      // console.log("stoneSize");
      // console.log(stoneSize);

      setstonesizedata(stoneSize);
      setskeltonLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGallery = (e) => {
    var productUrl1 = location.pathname;
    var part = productUrl1.substring(productUrl.lastIndexOf("-") + 1);
    // console.log(part);
    setCurrentProductId(part);
    getProductDetails(part, window.initData.data[0].shop, showRetailerInfo);
  };

  //Internal Storage
  const handleYourpassword = (event) => {
    setyourpassword(event.target.value);
  };

  const handleShowModel = () => {
    setOpenModel(true);
    setshowRetailerInfo(true);
  };

  const handleintstorageSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    let errors = {};
    let formIsValid = true;

    //Validation

    //Name
    if (getyourpassword === "") {
      errors["yourpassword"] = "Please enter your password";
      formIsValid = false;
    }

    if (formIsValid == false) {
      // console.log(errors);
      seterror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        DealerPass: getyourpassword,
        DealerID: window.initData.data[0].dealerid,
      }),
    };
    try {
      const res = await fetch(
        `${window.initData.data[0].dealerauthapi}`,
        requestOptions
      );
      const Data = await res.json();
      if (Data === "User successfully authenticated.") {
        getProductDetails(
          getCurrentProductId,
          window.initData.data[0].shop,
          showRetailerInfo
        );
        setOpenDelearModel(true);
      } else {
        toast("User is not authenticated");
      }
      setOpenModel(false);
      setLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const initpingback = async (DealerID, productId) => {
  //   try {
  //     const res = await fetch(
  //       `${window.initData.data[0].mountinglistapifancy}DealerID=${DealerID}&SID=${productId}`
  //     );
  //     const productDetails = await res.json();
  //     //console.log(productDetails)

  //     //GET THE  CURRENT USER IP
  //     const response = await fetch("https://geolocation-db.com/json/");
  //     const data = await response.json();
  //     setIp(data.IPv4);

  //     //POST THE  PINGBACK URL TO SERVER
  //     const response1 = await fetch(
  //       `https://platform.jewelcloud.com/ProductTracking.aspx?RetailerID=${DealerID}&VendorID=${productDetails.retailerInfo.retailerID}&GFInventoryID=${productId}&URL=${window.location.href}&price=${productDetails.cost}&MetalType=${productDetails.metalType}&MetalColor=${productDetails.colorID}&UsersIPAddress=${data.IPv4}`,
  //       {
  //         method: "POST",
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleBackButton = (e) => {
    if (window.initData.data[0].is_api === "false") {
      navigate("/collections/studbuilder-settings");
    } else {
      navigate("/apps/studbuilder/settings");
    }
  };

  useEffect(() => {
    if (window.initData.data[0].is_api === "false") {
      window.location.href = "/collections/studbuilder-settings";
    }
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].setting_id
    ) {
      setsettingcookie(true);
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }
    // initpingback(window.initData.data[0].dealerid, getCurrentProductId);
    getProductDetails(
      getCurrentProductId,
      window.initData.data[0].shop,
      showRetailerInfo
    );
  }, []);

  if (skeltonLoad == false) {
    return (
      <>
        <div className="tool-container">
          <Skeleton height={80} /> <Skeleton />
          <div className="Skeleton-type">
            <Skeleton count={9} height={60} />
          </div>
          <div className="Skeleton-settings">
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right2">
                  <Skeleton height={300} />
                </div>
              </div>
            </div>
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right-price">
                  <Skeleton height={40} /> <Skeleton height={60} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={30} width={200} /> <Skeleton height={20} />
                  <Skeleton height={40} />
                  <div className="div-inner">
                    <div className="div-skelton-inner">
                      <Skeleton height={40} />
                    </div>
                    <div className="div-skelton-inner">
                      <Skeleton height={40} />
                    </div>
                  </div>
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
          <Skeleton />
        </div>
      </>
    );
  } else {
    return (
      <>
        <style>
          {`.product-info .top-icons span:hover i {
                color: ${window.initData.data[0].hover_colour};
            }
            .product-info .product-controller ul li a:hover{
                  color:  ${window.initData.data[0].hover_colour};
            }
            .product-info .product-controller ul li a:hover span i{
              background-color: ${window.initData.data[0].hover_colour};
              color:  ${window.initData.data[0].link_colour};
            }
            .product-info .diamond-tryon .btn-diamond{
              background-color:${window.initData.data[0].button_colour} ;
            }
            .btn:hover{
               background-color: ${window.initData.data[0].hover_colour};
            }
          `}
        </style>
        <div className="tool-container">
          {getsettingcookie === false && getDiamondCookie === true && (
            <div className="breadCumbs">
              {window.initData.data[0].is_api === "true" &&
                Data.map((item) => <Breadcumb Data={item} key={item.key} />)}
              {window.initData.data[0].is_api === "false" &&
                DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
            </div>
          )}
          {getsettingcookie === true && getDiamondCookie === false && (
            <div className="breadCumbs">
              {window.initData.data[0].is_api === "true" &&
                Data.map((item) => <Breadcumb Data={item} key={item.key} />)}
              {window.initData.data[0].is_api === "false" &&
                DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
            </div>
          )}
          {getsettingcookie === false && getDiamondCookie === false && (
            <div className="breadCumbs">
              {window.initData.data[0].is_api === "true" &&
                DataMounting.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
              {window.initData.data[0].is_api === "false" &&
                DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
            </div>
          )}
          {getsettingcookie === true && getDiamondCookie === true && (
            <div className="breadCumbs">
              {window.initData.data[0].is_api === "true" &&
                Data.map((item) => <Breadcumb Data={item} key={item.key} />)}
              {window.initData.data[0].is_api === "false" &&
                DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
            </div>
          )}
          <div className="diamond-back-button">
            <a href="javascript:;" onClick={handleBackButton}>
              <i className="fas fa-angle-double-left"></i>
              <span>Change Stud</span>
            </a>
          </div>
          <div className="product-info">
            <div className="product-info__image">
              <div className="product-info-p_gallary">
                <ProductGallary
                  productDetailsData={getProductData}
                  currenturl={selectedmetal}
                />
              </div>

              {getProductData.internalUseLink === "0" && (
                <div className="internam-use">
                  <p>
                    Internal use Only:
                    <a href="javascript:;" onClick={handleShowModel}>
                      Click Here
                    </a>
                  </p>
                  <Modal
                    open={openModel}
                    onClose={() => setOpenModel(false)}
                    center
                    classNames={{
                      overlay: "popup_Overlay",
                      modal: "popup-internal-form",
                    }}
                  >
                    <LoadingOverlay className="_loading_overlay_wrapper">
                      <Loader fullPage loading={loaded} />
                    </LoadingOverlay>
                    <div className="internal-use-form">
                      <form
                        className="internaluseform"
                        id="internaluseform"
                        onSubmit={handleintstorageSubmit}
                      >
                        <input
                          type="password"
                          id="auth_password"
                          name="password"
                          value={getyourpassword}
                          onChange={handleYourpassword}
                          placeholder="Enter Your Gemfind Password"
                        />
                        <p> {geterror.yourpassword} </p>

                        <button type="submit" title="Submit" className="gf-btn">
                          <span>Submit</span>
                        </button>
                      </form>
                    </div>
                  </Modal>

                  <Modal
                    open={openDelearModel}
                    onClose={() => setOpenDelearModel(false)}
                    center
                    classNames={{
                      overlay: "popup_Overlay",
                      modal: "popup_diamond-product",
                    }}
                  >
                    <LoadingOverlay className="_gfloading_overlay_wrapper">
                      <Loader fullPage loading={loaded} />
                    </LoadingOverlay>
                    <div className="popup_content">
                      <div className="diamond-information">
                        <div className="spacification-info">
                          <h2>Vendor Information</h2>
                        </div>
                        <div className="diamond_stud_lists">
                          <ul>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Name</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerName
                                    ? getProductData.retailerInfo.retailerName
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Company</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerCompany
                                    ? getProductData.retailerInfo
                                        .retailerCompany
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer City/State</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerCity
                                    ? getProductData.retailerInfo.retailerCity
                                    : "-"}
                                  /
                                  {getProductData.retailerInfo.retailerState
                                    ? getProductData.retailerInfo.retailerState
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Contact No.</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerContactNo
                                    ? getProductData.retailerInfo
                                        .retailerContactNo
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Email</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerEmail
                                    ? getProductData.retailerInfo.retailerEmail
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Lot number of the item</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerLotNo
                                    ? getProductData.retailerInfo.retailerLotNo
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Stock number of the item</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerStockNo
                                    ? getProductData.retailerInfo
                                        .retailerStockNo
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Wholesale Price</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {window.currency}
                                  {getProductData.retailerInfo.wholesalePrice
                                    ? getProductData.retailerInfo.wholesalePrice
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Third Party</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.thirdParty
                                    ? getProductData.retailerInfo.thirdParty
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Diamond Id</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.diamondId
                                    ? getProductData.diamondId
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Seller Name</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.sellerName
                                    ? getProductData.retailerInfo.sellerName
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Seller Address</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.sellerAddress
                                    ? getProductData.retailerInfo.sellerAddress
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Fax</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerFax
                                    ? getProductData.retailerInfo.retailerFax
                                    : "-"}
                                </p>
                              </div>
                            </li>
                            <li>
                              <div className="diamonds-details-title">
                                <p>Dealer Address</p>
                              </div>
                              <div className="diamonds-info">
                                <p>
                                  {getProductData.retailerInfo.retailerAddress
                                    ? getProductData.retailerInfo
                                        .retailerAddress
                                    : "-"}
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
            </div>

            <div className="product-info__detail">
              <ProductInformation
                productDetailsData={getProductData}
                centerstoneData={getstonesizedata}
                selectedCenterStone={getselectedStone}
                currenturl={selectedmetal}
                callback={handleGallery}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SettingDetails;
