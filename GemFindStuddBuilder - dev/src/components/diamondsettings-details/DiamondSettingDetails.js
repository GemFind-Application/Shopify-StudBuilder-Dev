import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Data from "../elements/data";
import DataMounting from "../elements/data-mounting";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import DiamondProductGallary from "./diamondsettings-element/DiamondProductGallary";
import DiamondProductInformation from "./diamondsettings-element/DiamondProductInformation";
import { Modal } from "react-responsive-modal";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import DataDiamond from "../elements/data-diamond";
import DiamondDetailsListing from "./diamondsettings-element/DiamondDetailsListing";
import { useNavigate } from "react-router-dom";

const DiamondSettingDetails = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openDelearModel, setOpenDelearModel] = useState(false);
  const location = useLocation();
  var productUrl = location.pathname;
  var part = productUrl.substring(productUrl.lastIndexOf("-") + 1);
  // var part2 = productUrl.substring(productUrl.lastIndexOf("diamondID1"));
  // var getdid = part2.split("-");

  // console.log("diamond one");
  // console.log(getdid[1]);
  console.log("pair id");
  console.log(part);

  const [getCurrentProductId, setCurrentProductId] = useState(part);
  // const [getCurrentDiamondId, setCurrentDiamondId] = useState(part);

  var labcheck = productUrl.substring(productUrl.lastIndexOf("-islabgrown"));
  var getvalue = labcheck.split("-");
  const [getIslab, setIslab] = useState(getvalue[2]);

  const [skeltonLoad, setskeltonLoad] = useState(false);
  const [getProductData, setProductData] = useState("");
  const [getSecondProductData, setSecondProductData] = useState("");
  var selectedmetal = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  const [getIp, setIp] = useState("");
  const [geterror, seterror] = useState([""]);
  const [loaded, setLoaded] = useState(false);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getDataSettingProduct, setDataSettingProduct] = useState([]);
  const [getProductCount, setProductCount] = useState("");
  const [getcaratWeight, setcaratWeight] = useState("");
  const [getColorId, setColorId] = useState("");
  const [getCertificate, setCertificate] = useState("");
  const [getLabgown, setLabgown] = useState(false);
  const [getTotalPage, setTotalPage] = useState(35);
  const [getStartPage, setStartPage] = useState(1);
  const [getEndPage, setEndPage] = useState(12);
  const [getShape, setShape] = useState("");
  const [getminprice, setminprice] = useState("");
  const [getselectedpageSize, setpageSizeselected] = useState("20");
  const [getselectedpageno, setselectedpageno] = useState("1");
  const [getpageordertypeelected, setpageordertypeelected] = useState("");
  const [getascdescordertypeelected, setascdescordertypeelected] = useState("");
  const [getFancyColor, setFancyColor] = useState("");
  const [getFancyColordata, setFancyColordata] = useState("");
  const [getFancyIntensitydata, setFancyIntensitydata] = useState("");
  const [loadvarible, setloadvariable] = useState(false);
  const [getyourpassword, setyourpassword] = useState("");
  const [initdataload, setinitdataload] = useState(false);
  const [initdataloadsimilar, setinitdataloadsimilar] = useState(false);
  const [getpriceRange, setpriceRange] = useState([]);
  const [getPricemin, setPricemin] = useState("");
  const [getPricemax, setPricemax] = useState("");
  const [getdepthRange, setdepthRange] = useState([]);
  const [getDepthmin, setDepthmin] = useState("");
  const [getDepthmax, setDepthmax] = useState("");
  const [gettableRange, settableRange] = useState([]);
  const [getTablemin, setTablemin] = useState("");
  const [getTablemax, setTablemax] = useState("");
  const [getClarity, setClarity] = useState("");
  const [getCut, setCut] = useState("");
  const [getSymmetry, setSymmetry] = useState("");
  const [getPolish, setPolish] = useState("");
  const [getFluorescence, setFluorescence] = useState("");
  const [getfilledsearch, setfilledsearch] = useState("");
  const [showRetailerInfo, setshowRetailerInfo] = useState(false);

  const navigate = useNavigate();

  // const pageorderbytype = (type) => {
  //   console.log(type);
  //   //setpageordertypeelected(type);
  //   // setLoaded(true);
  //   if (getpageordertypeelected !== type) {
  //     setpageordertypeelected(type);
  //     setLoaded(true);
  //   } else {
  //     setpageordertypeelected(type);
  //   }
  // };

  const handleBackButton = (e) => {
    navigate("/apps/studbuilder/diamonds");
  };

  const pageorderbytype = (type) => {
    setpageordertypeelected(type);
    setLoaded(true);
  };

  const handlechangedpagesize = (sizevalue) => {
    setpageSizeselected(sizevalue);
    setLoaded(true);
  };

  const ascdesctype = (type1) => {
    console.log(type1);
    if (getascdescordertypeelected !== type1) {
      setascdescordertypeelected(type1);
      setLoaded(true);
    }
    // setascdescordertypeelected(type1);
    // setLoaded(true);
  };

  const currentpagevalue = (currentPage) => {
    setselectedpageno(currentPage);
    setLoaded(true);
  };

  const searchValueCurrent = (searchval) => {
    //console.log(searchval);
    if (getfilledsearch !== searchval) {
      setfilledsearch(searchval);
      setLoaded(true);
    }
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
      console.log(errors);
      seterror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        DealerPass: getyourpassword,
        DealerID: "1089",
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

  // const handleintstorageSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoaded(true);
  //   let errors = {};
  //   let formIsValid = true;

  //   //Validation

  //   //Name
  //   if (getyourpassword === "") {
  //     errors["yourpassword"] = "Please enter your password";
  //     formIsValid = false;
  //   }

  //   if (formIsValid == false) {
  //     console.log(errors);
  //     seterror(errors);
  //     setLoaded(false);
  //     return;
  //   }

  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       DealerPass: getyourpassword,
  //       DealerID: window.initData.data[0].dealerid,
  //     }),
  //   };
  //   try {
  //     const res = await fetch(
  //       `${window.initData.data[0].dealerauthapi}`,
  //       requestOptions
  //     );
  //     const Data = await res.json();
  //     if (Data === "User successfully authenticated.") {
  //       setOpenDelearModel(true);
  //     } else {
  //       toast("User is not authenticated");
  //     }
  //     setOpenModel(false);
  //     setLoaded(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getProductDetails = async (diamondId, shopDomain, internalUseOnly) => {
    try {
      // const res = await fetch(
      //   `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${productId}`
      // );
      // const res = await fetch(
      //   `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&PairID=${productId}`
      // );

      const res = await fetch(
        `${process.env.REACT_APP_URL}/getDiamondDetailsApi/` +
          diamondId +
          "/" +
          shopDomain +
          "/" +
          internalUseOnly
      );

      const productDetails = await res.json();
      console.log("productDetails");
      console.log(productDetails);

      //console.log(productId);
      setProductData(productDetails);
      setShape(productDetails.cut1);
      setcaratWeight(productDetails.caratWeight1);
      setminprice(productDetails.fltPrice1);
      setColorId(productDetails.color1);
      setCertificate(productDetails.certificate1);
      setLabgown(productDetails.isLabCreated);
      setFancyColordata(productDetails.color1);
      //console.log(productDetails.isLabCreated);
      setClarity(productDetails.clarity1);
      setCut(productDetails.cutGrade1);
      setFancyColor(productDetails.fancyColorIntensity);
      setFancyIntensitydata(productDetails.fancyColorIntensity);
      setSymmetry(productDetails.symmetry1);
      setPolish(productDetails.polish1);
      setFluorescence(productDetails.flouresence1);

      // setShape(productDetails.shape);
      // setcaratWeight(productDetails.caratWeight);
      // setminprice(productDetails.fltPrice);
      // setColorId(productDetails.colorID);
      // setCertificate(productDetails.certificate);
      // setLabgown(productDetails.isLabCreated);
      // setFancyColordata(productDetails.color);
      // //console.log(productDetails.isLabCreated);
      // setClarity(productDetails.clarity);
      // setCut(productDetails.cut);

      // setSymmetry(productDetails.symmetry);
      // setPolish(productDetails.polish);
      // setFluorescence(productDetails.fluorescence);

      setskeltonLoad(true);
      setinitdataload(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const getSecondProductDetails = async (DealerID, productId) => {
  //   console.log("productId");
  //   console.log(productId);
  //   try {
  //     const res = await fetch(
  //       `${window.initData.data[0].diamonddetailapi}DealerID=${DealerID}&DID=${productId}`
  //     );
  //     const secondProductDetails = await res.json();
  //     console.log("diamond detail data 2");
  //     console.log(secondProductDetails);
  //     //console.log(productId);
  //     setSecondProductData(secondProductDetails);
  //     setShape(secondProductDetails.shape);
  //     setcaratWeight(secondProductDetails.caratWeight);
  //     setminprice(secondProductDetails.fltPrice);
  //     setColorId(secondProductDetails.colorID);
  //     setCertificate(secondProductDetails.certificate);
  //     setLabgown(secondProductDetails.isLabCreated);
  //     setFancyColordata(secondProductDetails.color);
  //     //console.log(productDetails.isLabCreated);
  //     setClarity(secondProductDetails.clarity);
  //     setCut(secondProductDetails.cut);

  //     setSymmetry(secondProductDetails.symmetry);
  //     setPolish(secondProductDetails.polish);
  //     setFluorescence(secondProductDetails.fluorescence);
  //     setskeltonLoad(true);
  //     setinitdataload(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const initpingback = async () => {
  //   try {
  //     // const res = await fetch(
  //     //   `${window.initData.data[0].diamonddetailapi}DealerID=${window.initData.data[0].dealerid}&DID=${getCurrentProductId}`
  //     // );

  //     const res = await fetch(
  //       `https://api.jewelcloud.com/api/RingBuilder/GetPairDiamondDetail?DealerID=${window.initData.data[0].dealerid}&DID=${getCurrentProductId}`
  //     );

  //     const productDetails = await res.json();

  //     //GET THE  CURRENT USER IP
  //     const response = await fetch("https://geolocation-db.com/json/");
  //     const data = await response.json();
  //     setIp(data.IPv4);

  //     //POST THE  PINGBACK URL TO SERVER
  //     const response1 = await fetch(
  //       `http://platform.jewelcloud.com/DiamondTracking.aspx?RetailerID=${window.initData.data[0].dealerid}&VendorID=${productDetails.retailerInfo.retailerID}&GFInventoryID=${getCurrentProductId}&URL=${window.location.href}&DealerStockNo=${productDetails.vendorStockNo}&Carat=${productDetails.stoneCarat}&Cut=${productDetails.cut}&Color=${productDetails.color}&Clarity=${productDetails.clarity}&Depth=${productDetails.depth}&Polish=${productDetails.polish}&Symmetry=${productDetails.symmetry}&FltPrice=${productDetails.fltPrice}&SellingPrice=${productDetails.fltPrice}&Girdle=${productDetails.girdleThick}&Culet=${productDetails.culet}&Fluorescence=${productDetails.fluorescence}&Measurements=${productDetails.measurement}&Certificate=${productDetails.certificate}&CertificateNo=${productDetails.certificateNo}&TableMes=${productDetails.table}&CutGrade=${productDetails.cutGrade}&UsersIPAddress=${data.IPv4}
  //     `,
  //       {
  //         method: "POST",
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getInitFilterDiamondData = async (DealerID) => {
    try {
      var url = `${window.initData.data[0].filterapi}DealerID=` + DealerID;

      // console.log(url);
      const res = await fetch(url);
      const acrualRes = await res.json();

      //Price Range
      setpriceRange(acrualRes[1][0].priceRange);
      // setPricemin(acrualRes[1][0].priceRange[0].minPrice);
      // setPricemax(acrualRes[1][0].priceRange[0].maxPrice);

      //Depth Range
      setdepthRange(acrualRes[1][0].depthRange);
      setDepthmin(acrualRes[1][0].depthRange[0].minDepth);
      setDepthmax(acrualRes[1][0].depthRange[0].maxDepth);

      //Table Range
      settableRange(acrualRes[1][0].tableRange);
      setTablemin(acrualRes[1][0].tableRange[0].minTable);
      setTablemax(acrualRes[1][0].tableRange[0].maxTable);

      setinitdataloadsimilar(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getsimilarDiamondProductsData = async () => {
    var labGown = false;
    console.log(getLabgown);

    //For Price
    var minPrice;
    var maxPrice;

    if (getPricemin === "") {
      minPrice = getpriceRange[0].minPrice;
    } else {
      minPrice = getPricemin;
    }
    if (getPricemax === "") {
      maxPrice = getpriceRange[0].maxPrice;
    } else {
      maxPrice = getPricemax;
    }

    try {
      var centerstonemincarat = Number(getcaratWeight) - 0.1;
      var centerstonemaxcarat = Number(getcaratWeight) + 0.1;

      var url = `https://api.jewelcloud.com/api/RingBuilder/GetPairDiamond?DealerID=${window.initData.data[0].dealerid}&Shape=${getShape}&PriceMin=${minPrice}&PriceMax=${maxPrice}&CaratMin=${centerstonemincarat}&CaratMax=${centerstonemaxcarat}&TableMin=${getTablemin}&TableMax=${getTablemax}&DepthMin=${getDepthmin}&DepthMax=${getDepthmax}&Certificate=${getCertificate}&OrderBy=${getpageordertypeelected}&OrderType=${getascdescordertypeelected}&PageNumber=${getselectedpageno}&PageSize=${getselectedpageSize}&DID=${getfilledsearch}`;

      const res = await fetch(url);
      console.log(url);
      const settingProduct = await res.json();
      console.log("settingProduct");
      console.log(settingProduct.pairDiamondList);
      setDataSettingProduct(settingProduct.pairDiamondList);
      setProductCount(settingProduct.count);
      var totalPages = Math.ceil(settingProduct.count / getselectedpageSize);
      setTotalPage(totalPages);
      var offset = (getselectedpageno - 1) * getselectedpageSize + 1;
      setStartPage(offset);
      var end = parseInt(getselectedpageno * getselectedpageSize);
      setEndPage(end);
      setskeltonLoad(true);
      setLoaded(false);
    } catch (error) {
      console.log(error);
    }
    //  }
  };

  useEffect(() => {
    // if (
    //   window.initData.data[0].is_api === "false" &&
    //   !getsettingcookies._shopify_ringsetting
    // ) {
    //   window.location.href = "/collections/studbuilder-settings";
    // }
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].settingId
    ) {
      setsettingcookie(true);
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }
    if (initdataload === false) {
      // initpingback();

      getProductDetails(
        getCurrentProductId,
        window.initData.data[0].shop,
        showRetailerInfo
      );

      // setTimeout(() => {
      //   getSecondProductDetails(
      //     window.initData.data[0].dealerid
      //     // getCurrentDiamondId
      //   );
      // }, 1000);

      //setinitdataload(true);
    }
    if (initdataload === true) {
      getInitFilterDiamondData(window.initData.data[0].dealerid);
      //setinitdataloadsimilar(true);
    }
    if (initdataloadsimilar === true) {
      getsimilarDiamondProductsData();
    }
  }, [
    initdataload,
    initdataloadsimilar,
    getselectedpageno,
    getShape,
    getcaratWeight,
    getselectedpageSize,
    getpageordertypeelected,
    getascdescordertypeelected,
    getminprice,
    getColorId,
    getCertificate,
    getLabgown,
    getFancyColor,
    getPricemin,
    getPricemax,
    getTablemin,
    getTablemax,
    getDepthmin,
    getDepthmax,
    getFancyColordata,
    getFancyIntensitydata,
    getClarity,
    getCut,
    getSymmetry,
    getfilledsearch,
    // getCurrentDiamondId,
    getCurrentProductId,
  ]);

  if (skeltonLoad == false) {
    return (
      <>
        <div className="tool-container">
          <Skeleton height={80} />
          <Skeleton />
          <div className="Skeleton-type">
            <Skeleton count={9} height={60} />
          </div>
          <div className="Skeleton-settings">
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right2">
                  {" "}
                  <Skeleton height={300} />
                </div>
              </div>
            </div>
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right-price">
                  <Skeleton height={40} />
                  <Skeleton height={60} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={30} width={200} />
                  <Skeleton height={20} />
                  <Skeleton height={40} />
                  <div className="div-inner">
                    <div className="div-skelton-inner">
                      {" "}
                      <Skeleton height={40} />
                    </div>
                    <div className="div-skelton-inner">
                      {" "}
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
        {/* <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <style>
          {`.product-info .product-controller ul li a:hover{
                color: ${window.initData.data[0].hover_colour};
            }
            .product-info .product-controller ul li a:hover span i{
              background-color:${window.initData.data[0].hover_colour};
               color: ${window.initData.data[0].link_colour};
            }
            .product-info .diamond-tryon .btn-diamond , .btn-tryon{
              background-color:${window.initData.data[0].button_colour};
            }
            .diamond-change-view ul li a:hover{
               background-color:${window.initData.data[0].hover_colour};
            }
            
            .diamond-change-view ul .active a.listview , .diamond-change-view ul .active a.grid-view-four{
                background-color:${window.initData.data[0].hover_colour};
            }
            .product-list-viewdata .table thead {
            background-color:${window.initData.data[0].header_colour};
            }
            .product-list-viewdata .table tbody tr:hover{
              background-color:${window.initData.data[0].hover_colour};
            }
            .ellipsis-data:hover .icon-hover i:hover{
              background-color: ${window.initData.data[0].hover_colour};
              color: ${window.initData.data[0].link_colour};                  
              border-radius: 5px;
            }
             .btn:hover{
               background-color: ${window.initData.data[0].hover_colour} !important;
            }
            `}
        </style>
        <div className="tool-container">
          <LoadingOverlay className="_loading_overlay_wrapper">
            <Loader fullPage loading={loaded} />
          </LoadingOverlay>

          {getsettingcookie === false && getDiamondCookie === false && (
            <div className="breadCumbs">
              {Data.map((item) => (
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

          {getsettingcookie === true && getDiamondCookie === true && (
            <div className="breadCumbs">
              {window.initData.data[0].is_api === "true" &&
                Data.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}{" "}
              {window.initData.data[0].is_api === "false" &&
                DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
            </div>
          )}

          <div className="diamond-back-button">
            <a href="javascript:;" onClick={handleBackButton}>
              <i className="fas fa-angle-double-left"></i>
              <span>Change Diamond</span>
            </a>
          </div>
          <div className="product-info">
            <div className="product-info__box">
              <div className="product-info__image">
                <DiamondProductGallary
                  productDetailsData={getProductData}
                  secondProductDetailsData={getSecondProductData}
                />
              </div>
              {getProductData.internalUseLink === "1" && (
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
              <DiamondProductInformation
                productDetailsData={getProductData}
                secondProductDetailsData={getSecondProductData}
              />
            </div>
          </div>
          <div className="SettingsContainer" id="diamondDetailScrollUp">
            <DiamondDetailsListing
              getDataSettingProductData={getDataSettingProduct}
              productCount={getProductCount}
              searchvalue={searchValueCurrent}
              pagesize={getselectedpageSize}
              changedpagesize={handlechangedpagesize}
              currentpageno={currentpagevalue}
              totalPages={getTotalPage}
              startPage={getStartPage}
              endPage={getEndPage}
              orderbytype={pageorderbytype}
              orderType={ascdesctype}
              tabvalue={getFancyColor}
            />
          </div>
        </div>
      </>
    );
  }
};

export default DiamondSettingDetails;
