import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Data from "../elements/data";
import DataMounting from "../elements/data-mounting";
import Type from "./settings-element/Type";
import Shape from "./settings-element/Shapes";
import PriceSlider from "./settings-element/PriceSlider";
import Metal from "./settings-element/Metal";
import SettingsProduct from "./settings-element/SettingsProducts";
import Navigation from "./settings-element/Navigation";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import DataDiamond from "../elements/data-diamond";
import { useNavigate } from "react-router-dom";
// import Input_slider from "./settings-element/Input_slider";

const Setting = (props) => {
  ////console.log(("settings props coming here");
  const [shape, setShape] = useState([]);
  const [getCollectionData, setCollectionData] = useState([]);
  const [startValue, setstartValue] = useState(parseInt(0));
  const [lastValue, setlastValue] = useState(parseInt(0));
  const [getMetalData, setMetalData] = useState([]);
  const [getDataSettingProduct, setDataSettingProduct] = useState([]);
  const [getshapeselected, shapeselected] = useState("");
  const [getproductselected, productselected] = useState();
  const [getcaratmin, setcaratmin] = useState("");
  const [getcaratmax, setcaratmax] = useState("");
  const [gettotalcaratwieght, settotalcaratwieght] = useState("");
  const [getmetalselected, metalselected] = useState("");
  const [getcollectionselected, collectionselected] = useState("");
  const [getProductCount, setProductCount] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [getselectedpageSize, setpageSizeselected] = useState("12");
  const [getselectedpriceorder, setselectedpriceorder] = useState("cost+asc");
  const [getselectedpageno, setselectedpageno] = useState("1");
  const [getTotalPage, setTotalPage] = useState(35);
  const [getStartPage, setStartPage] = useState(1);
  const [getEndPage, setEndPage] = useState(12);
  const [skeltonLoad, setskeltonLoad] = useState(false);
  const [getfilledsearch, setfilledsearch] = useState("");
  const [cookies, setCookie] = useCookies(["_wpsaveringfiltercookie"]);
  const [loadvarible, setloadvariable] = useState(false);
  const search = useLocation().search;
  const searchshape = new URLSearchParams(search).get("shape");
  const [initdataload, setinitdataload] = useState(false);
  const [getpriceRange, setpriceRange] = useState([]);

  const [getbrowsercookies, setbrowsercookies, removeCookie] = useCookies([
    "shopify_ringbackvalue",
  ]);

  //const [delearid, setdelearid] = useState('1089');
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [gettabname, settabname] = useState("mined");

  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getShowPriceFilter, setShowPriceFilter] = useState();

  const navigate = useNavigate();
  const searchValueCurrent = (searchval) => {
    if (getfilledsearch !== searchval) {
      setfilledsearch(searchval);
      setLoaded(true);
    }
  };

  const currentpagevalue = (currentPage) => {
    setselectedpageno(currentPage);
    setLoaded(true);
  };

  const pagesizevalue = (sizevalue) => {
    setpageSizeselected(sizevalue);
    setLoaded(true);
  };

  const pageorder = (priceorder) => {
    setselectedpriceorder(priceorder);
    setLoaded(true);
  };

  const location = useLocation();
  var productUrl = location.pathname;
  var part = productUrl.substring(productUrl.lastIndexOf("/") + 1);

  console.log(part);

  const shapeName = (shapeName) => {
    if (getshapeselected === shapeName) {
      shapeselected("");
    } else {
      shapeselected(shapeName);
    }
    setLoaded(true);
  };

  const metalName = (metalName) => {
    if (getmetalselected === metalName) {
      metalselected("");
    } else {
      metalselected(metalName);
    }
    setLoaded(true);
  };

  const collectionName = (collectionName) => {
    console.log(collectionName);
    if (getcollectionselected === collectionName) {
      collectionselected("");
      collectionName = "";
    } else {
      collectionselected(collectionName);
    }
    setLoaded(true);
    getInitFilterData(window.initData.data[0].dealerid, collectionName);
  };

  const saveSearch = () => {
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 3000);
  };

  const tabvalue = (tabname) => {
    settabname(tabname);
    getSettingProductsData(tabname);
    setLoaded(true);

    //getInitFilterDiamondData(window.initData.data[0].dealerid, tabname);
    console.log(tabname);
  };

  const priceSliderValue = (priceValue) => {
    if (
      window.miniprice !== priceValue[0] ||
      window.maxprice !== priceValue[1]
    ) {
      setstartValue(parseInt(priceValue[0]));
      setlastValue(parseInt(priceValue[1]));
      window.miniprice = priceValue[0];
      window.maxprice = priceValue[1];
      setLoaded(true);
    }
    //console.log((window.maxprice);

    // //console.log(();maxprice);
  };

  // GET FILTER PRODUCT
  const getInitFilterData = async (DealerID, collectionName) => {
    console.log("call filter api");
    console.log(collectionName);

    console.log(gettabname);

    var islab;
    if (gettabname === "mined") {
      islab = "0";
    }

    if (gettabname === "labgrown") {
      islab = "1";
    }

    try {
      if (collectionName !== "") {
        var url = `${window.initData.data[0].ringfiltersapi}DealerID=${DealerID}&Collection=${collectionName}&IsLabSettingsAvailable=${islab}`;
      } else {
        var url = `${window.initData.data[0].ringfiltersapi}DealerID=${DealerID}&IsLabSettingsAvailable=${islab}`;
      }

      const res = await fetch(url);

      // const res = await fetch(url,{mode: 'no-cors', header: {
      //   'Content-Type':'application/json',
      // }
      // });
      const acrualRes = await res.json();
      console.log("filter ");
      console.log(acrualRes[1][0].isShowPrice);
      setShowPriceFilter(acrualRes[1][0].isShowPrice);
      setCollectionData(acrualRes[1][0].collections);
      setShape(acrualRes[1][0].shapes);

      setpriceRange(acrualRes[1][0].priceRange);
      // setstartValue(parseInt(acrualRes[1][0].priceRange[0].minPrice));
      // setlastValue(parseInt(acrualRes[1][0].priceRange[0].maxPrice));
      window.miniprice = parseInt(acrualRes[1][0].priceRange[0].minPrice);
      window.maxprice = parseInt(acrualRes[1][0].priceRange[0].maxPrice);
      setinitdataload(true);
      acrualRes[1][0].metalType.forEach(function (item) {
        if (item.metalType.indexOf("K ") > 0) {
          let startIndex = item.metalType.indexOf("K ");
          item.metalName = item.metalType.substring(0, startIndex + 1);
          item.typeName = item.metalType.substring(
            startIndex + 1,
            item.metalType.length
          );
        } else if (item.metalType === "Platinum") {
          item.metalName = "PT";
          item.typeName = "Platinum";
        }
      });
      setMetalData(acrualRes[1][0].metalType);
    } catch (error) {
      //console.log(();
    }
  };

  // GET SETTINGS PRODUCT
  const getSettingProductsData = async (gettabname) => {
    //For Price
    var minPrice;
    var maxPrice;
    console.log(lastValue);
    if (startValue === "") {
      minPrice = getpriceRange[0].minPrice;
    } else {
      minPrice = startValue;
    }
    if (lastValue === "") {
      maxPrice = getpriceRange[0].maxPrice;
    } else {
      maxPrice = lastValue;
    }

    try {
      //console.log(gettabname);
      // if (gettabname === "mined") {
      //   var url = `${window.initData.data[0].mountinglistapi}DealerID=${window.initData.data[0].dealerid}&Shape=${getshapeselected}&Collection=${getcollectionselected}&MetalType=${getmetalselected}&SID=${getfilledsearch}&CenterStoneMinCarat=${getcaratmin}&CenterStoneMaxCarat=${getcaratmax}&PriceMin=${minPrice}&PriceMax=${maxPrice}&OrderBy=${getselectedpriceorder}&PageNumber=${getselectedpageno}&PageSize=${getselectedpageSize}&IsLabSettingsAvailable=0`;
      // } else {
      //   var url = `${window.initData.data[0].mountinglistapi}DealerID=${window.initData.data[0].dealerid}&Shape=${getshapeselected}&Collection=${getcollectionselected}&MetalType=${getmetalselected}&SID=${getfilledsearch}&CenterStoneMinCarat=${getcaratmin}&CenterStoneMaxCarat=${getcaratmax}&PriceMin=${minPrice}&PriceMax=${maxPrice}&OrderBy=${getselectedpriceorder}&PageNumber=${getselectedpageno}&PageSize=${getselectedpageSize}&IsLabSettingsAvailable=1`;
      // }

      var url = `${window.initData.data[0].mountinglistapi}DealerID=${window.initData.data[0].dealerid}&shape=${getshapeselected}&TotalCarat=${gettotalcaratwieght}&StyleNumber=${getfilledsearch}&PageNumber=${getselectedpageno}&PageSize=${getselectedpageSize}`;

      // const res = await fetch(
      //   `${window.initData.data[0].mountinglistapi}DealerID=${window.initData.data[0].dealerid}&Shape=${getshapeselected}&Collection=${getcollectionselected}&MetalType=${getmetalselected}&SID=${getfilledsearch}&CenterStoneMinCarat=${getcaratmin}&CenterStoneMaxCarat=${getcaratmax}&PriceMin=${startValue}&PriceMax=${lastValue}&OrderBy=${getselectedpriceorder}&PageNumber=${getselectedpageno}&PageSize=${getselectedpageSize}&IsLabSettingsAvailable=0`
      // );

      const res = await fetch(url);

      const settingProduct = await res.json();
      console.log("Mounting Data");
      console.log(settingProduct.mountingList);
      setDataSettingProduct(settingProduct.mountingList);
      setProductCount(settingProduct.count);
      var totalPages = Math.ceil(settingProduct.count / getselectedpageSize);
      setTotalPage(totalPages);
      var offset = (getselectedpageno - 1) * getselectedpageSize + 1;
      setStartPage(offset);
      var end = parseInt(getselectedpageno * getselectedpageSize);
      setEndPage(end);
      setLoaded(false);
      setskeltonLoad(true);
      setloadvariable(true);
    } catch (error) {
      //console.log(();
    }
  };

  useEffect(() => {
    //console.log(getcollectionselected);
    console.log(cookies._wpsaveringfiltercookie);

    if (!getdiamondcookies._shopify_diamondsetting) {
      navigate("/apps/studbuilder/diamonds");
    }

    if (part === "labgrownsettings") {
      settabname("labgrown");
      setLoaded(true);
    }

    //THIS IS FOR SAVED SEARCH VALUE LOAD ON PAGE LOAD
    ////console.log(("coming in settings.js");
    if (window.initData.data[0].is_api === "false") {
      window.location.href = "/collections/studbuilder-settings";
    }
    if (loadvarible === false) {
      if (
        getdiamondcookies._shopify_diamondsetting &&
        getdiamondcookies._shopify_diamondsetting[0].diamondId
      ) {
        console.log(getdiamondcookies._shopify_diamondsetting[0].centerStone);
        shapeselected(getdiamondcookies._shopify_diamondsetting[0].centerStone);
      }
      console.log(getbrowsercookies.shopify_ringbackvalue);
      if (getbrowsercookies.shopify_ringbackvalue) {
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].settingId
        ) {
          productselected(getbrowsercookies.shopify_ringbackvalue[0].settingId);
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].collection
        ) {
          collectionselected(
            getbrowsercookies.shopify_ringbackvalue[0].collection
          );
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].shape
        ) {
          shapeselected(getbrowsercookies.shopify_ringbackvalue[0].shape);
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].metaltype
        ) {
          metalselected(getbrowsercookies.shopify_ringbackvalue[0].metaltype);
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].orderby
        ) {
          setselectedpriceorder(
            getbrowsercookies.shopify_ringbackvalue[0].orderby
          );
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].pageno
        ) {
          setselectedpageno(getbrowsercookies.shopify_ringbackvalue[0].pageno);
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].minprice
        ) {
          setstartValue(getbrowsercookies.shopify_ringbackvalue[0].minprice);
        }
        if (
          getbrowsercookies.shopify_ringbackvalue &&
          getbrowsercookies.shopify_ringbackvalue[0].maxprice
        ) {
          setlastValue(getbrowsercookies.shopify_ringbackvalue[0].maxprice);
        }
        if (getbrowsercookies.shopify_ringbackvalue) {
          setTimeout(
            () => removeCookie("shopify_ringbackvalue", { path: "/" }),
            3000
          );
        }
      } else {
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.collectionName
        ) {
          collectionselected(cookies._wpsaveringfiltercookie.collectionName);
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.shapeName
        ) {
          shapeselected(cookies._wpsaveringfiltercookie.shapeName);
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.pagesize
        ) {
          setpageSizeselected(cookies._wpsaveringfiltercookie.pagesize);
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.metaltype
        ) {
          metalselected(cookies._wpsaveringfiltercookie.metaltype);
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.orderby
        ) {
          setselectedpriceorder(cookies._wpsaveringfiltercookie.orderby);
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.pageno
        ) {
          setselectedpageno(cookies._wpsaveringfiltercookie.pageno);
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.pricemin
        ) {
          setstartValue(cookies._wpsaveringfiltercookie.pricemin);
        } else {
          setstartValue("");
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.pricemax
        ) {
          setlastValue(cookies._wpsaveringfiltercookie.pricemax);
        } else {
          setlastValue("");
        }
        if (
          cookies._wpsaveringfiltercookie &&
          cookies._wpsaveringfiltercookie.searchitem
        ) {
          setfilledsearch(cookies._wpsaveringfiltercookie.searchitem);
        }
      }
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
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].centerstonemincarat
    ) {
      setcaratmin(
        getdiamondcookies._shopify_diamondsetting[0].centerstonemincarat
      );
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].centerstonemaxcarat
    ) {
      setcaratmax(
        getdiamondcookies._shopify_diamondsetting[0].centerstonemaxcarat
      );
    }

    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].totalCaratWeight
    ) {
      settotalcaratwieght(
        getdiamondcookies._shopify_diamondsetting[0].totalCaratWeight
      );
    }

    //THIS IS FOR SELECTED VALUE FROM QUERY STRING IF WE PASS
    if (searchshape) {
      shapeselected(searchshape);
    }

    if (initdataload === false) {
      //console.log(("coming everytime");
      getInitFilterData(
        window.initData.data[0].dealerid,
        getcollectionselected
      );
    }
    console.log("startValue ON LOAD");
    console.log(startValue);
    console.log(lastValue);
    // setstartValue(startValue);
    // setlastValue(lastValue);

    if (initdataload === true) {
      getSettingProductsData(gettabname);
    }
  }, [
    initdataload,
    getshapeselected,
    getcollectionselected,
    getselectedpageSize,
    getselectedpriceorder,
    getmetalselected,
    getselectedpageno,
    getfilledsearch,
    startValue,
    lastValue,
    loadvarible,
    getcaratmin,
    getcaratmax,
    getproductselected,
    gettabname,
  ]);

  if (skeltonLoad === false) {
    return (
      <>
        <div className="tool-container">
          <Skeleton height={80} /> <Skeleton />
          <div className="Skeleton-type">
            <Skeleton count={9} height={60} />{" "}
          </div>{" "}
          <div className="Skeleton-settings">
            <div className="skeleton-div">
              <div className="skelton-info">
                {" "}
                {/* <h4 className="div-left"><Skeleton /></h4> */}{" "}
                <div className="div-right">
                  {" "}
                  <Skeleton count={8} height={60} />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="skeleton-div">
              <div className="skelton-info">
                {" "}
                {/* <h4 className="div-left"><Skeleton /></h4> */}{" "}
                <div className="div-right-price">
                  <Skeleton height={60} />{" "}
                </div>{" "}
                <div className="div-right-metal">
                  <Skeleton height={60} />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="s_gridview">
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
              <Skeleton height={25} width={200} />{" "}
            </div>{" "}
          </div>{" "}
          <Skeleton />
        </div>{" "}
      </>
    );
  } else {
    return (
      <>
        <style>
          {`.diamond-filter .navigation_filter_left .n_filter_left li.active {
                background-color: ${window.initData.data[0].hover_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li.active a , .diamond-filter .navigation_filter_left .n_filter_left li.active span i{
                color:  ${window.initData.data[0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover a{
                 background-color: ${window.initData.data[0].hover_colour};
                 color:  ${window.initData.data[0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover span{
                 background-color: ${window.initData.data[0].hover_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover span i{
                 color:  ${window.initData.data[0].link_colour};
            }
            .diamond-filter .save-reset-filter .navigation_right li a:hover{
                color:  ${window.initData.data[0].hover_colour};
            }
            .range-slider_diamond .noUi-connect , .range-slider_diamond .noUi-horizontal .noUi-handle{
               background: ${window.initData.data[0].slider_colour};
            }
            .metal .metal_lists .metal_box:hover , .metal .metal_lists .active{
              border-bottom-color: ${window.initData.data[0].hover_colour};
            }
            .change-view ul .active a.grid-view-four, .change-view ul .active a.grid-view-three , .change-view ul li a:hover , .search-bar .search-btn{
               background-color: ${window.initData.data[0].hover_colour};
            }
            .product-pagination .pagination .active .page-link , .product-pagination .pagination li a.page-link:hover{
                  background-color:${window.initData.data[0].hover_colour};
                  border-color: ${window.initData.data[0].hover_colour};
                  color: ${window.initData.data[0].link_colour};
            }
            .search-product-listing .product-grid-view li.product-listing:hover a{
               color: ${window.initData.data[0].hover_colour};
            }
           .diamond-filter{
             background-color:${window.initData.data[0].header_colour}; 
           }
            `}
        </style>
        <div className="tool-container">
          <LoadingOverlay className="_loading_overlay_wrapper">
            <Loader fullPage loading={loaded} />{" "}
          </LoadingOverlay>

          {getsettingcookie === false && getDiamondCookie === true && (
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
          {getsettingcookie === true && getDiamondCookie === false && (
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
          {getsettingcookie === false && getDiamondCookie === false && (
            <div className="breadCumbs">
              {window.initData.data[0].is_api === "true" &&
                DataMounting.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}{" "}
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
          <div className="diamond-filter save-reset-filter">
            <Navigation />
          </div>
          <div className="SettingsContainer" id="ringbuilderSettingScrollUp">
            <SettingsProduct
              getDataSettingProductData={getDataSettingProduct}
              productCount={getProductCount}
              pagesize={pagesizevalue}
              priceascdesc={pageorder}
              currentpageno={currentpagevalue}
              totalPages={getTotalPage}
              startPage={getStartPage}
              endPage={getEndPage}
              searchvalue={searchValueCurrent}
              currentCollection={getcollectionselected}
              currentShape={getshapeselected}
              currentMinPrice={startValue}
              currentMaxPrice={lastValue}
              currentMetalType={getmetalselected}
              currentpagesize={getselectedpageSize}
              currentorderby={getselectedpriceorder}
              getpriceRangedata={getpriceRange}
              currenttab={gettabname}
            />
          </div>
        </div>
      </>
    );
  }
};

export default Setting;
