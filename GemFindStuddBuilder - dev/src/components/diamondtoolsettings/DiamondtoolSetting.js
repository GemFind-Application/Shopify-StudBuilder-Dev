import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Data from "../elements/data";
import DataMounting from "../elements/data-mounting";
import DataDiamond from "../elements/data-diamond";
import Table from "react-bootstrap/Table";
import Filter from "./settings-element/Filter";
import DiamondShape from "./settings-element/DiamondShape";
import CutSlider from "./settings-element/CutSlider";
import ColorSlider from "./settings-element/ColorSlider";
import FancyColorSlider from "./settings-element/FancyColorSlider";
import FancyIntensity from "./settings-element/FancyIntensity";
import ClaritySlider from "./settings-element/ClaritySlider";
import CaratSlider from "./settings-element/CaratSlider";
import PriceSlider from "./settings-element/PriceSlider";
import DiamondSettingsProducts from "./settings-element/DiamondSettingsProducts";
import Skeleton from "react-loading-skeleton";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import DepthSlider from "./settings-element/DepthSlider";
import TableSlider from "./settings-element/TableSlider";
import PolishSlider from "./settings-element/PolishSlider";
import FluorescenceSlider from "./settings-element/FluorescenceSlider";
import SymmetrySlider from "./settings-element/SymmetrySlider";
import Certificates from "./settings-element/Certificates";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import emerald from "../../images/emerald_Large.jpg";
import marquise from "../../images/marquise_Large.png";
import { useNavigate } from "react-router-dom";

const DiamondtoolSetting = (props) => {
  const location = useLocation();
  var productUrl = location.pathname;
  var part = productUrl.substring(productUrl.lastIndexOf("/") + 1);
  const [shape, setShape] = useState([]);
  const [getshapeselected, shapeselected] = useState("");
  const [getSelectedCut, setSelectedCut] = useState("");
  const [initCut, setinitCut] = useState(false);
  const [getSelectedColor, setSelectedColor] = useState("");
  const [initColor, setinitColor] = useState(false);
  const [getSelectedClarity, setSelectedClarity] = useState("");
  const [getSelectedfancyColor, setSelectedfancyColor] = useState("");
  const [getSelectedintensity, setSelectedintensity] = useState("");
  const [inticlarit, setinitClarity] = useState(false);
  const [getCaratmin, setCaratmin] = useState("");
  const [getCaratmax, setCaratmax] = useState("");
  const [getPricemin, setPricemin] = useState("");
  const [getPricemax, setPricemax] = useState("");
  const [getDepthmin, setDepthmin] = useState("");
  const [getDepthmax, setDepthmax] = useState("");
  const [getTablemin, setTablemin] = useState("");
  const [getTablemax, setTablemax] = useState("");
  const [getDataSettingProduct, setDataSettingProduct] = useState([]);
  const [getProductCount, setProductCount] = useState("");
  const [skeltonLoad, setskeltonLoad] = useState(false);
  const [getDiamondCut, setDiamondCut] = useState([]);
  const [getDiamondColor, setDiamondColor] = useState([]);
  const [getDiamondClarity, setDiamondClarity] = useState([]);
  const [getDiamondCarat, setDiamondCarat] = useState([]);
  const [getpriceRange, setpriceRange] = useState([]);
  const [getPolish, setPolish] = useState([]);
  const [getfluorescenceRangeData, setfluorescenceRangeData] = useState([]);
  const [getsymmetry, setsymmetry] = useState([]);
  const [getcertificate, setcertificate] = useState([]);
  const [getSelectedpolish, setSelectedpolish] = useState("");
  const [getinitpolish, setinitpolish] = useState(false);
  const [getSelectedfluore, setSelectedfluore] = useState("");
  const [getinitfluore, setinitfluore] = useState(false);
  const [getSelectedsymmetry, setSelectedsymmetry] = useState("");
  const [getinitsymmetry, setinitsymmetry] = useState(false);
  const [getDepth, setDepth] = useState([]);
  const [getTable, setTable] = useState([]);
  const [getTotalPage, setTotalPage] = useState(35);
  const [getStartPage, setStartPage] = useState(1);
  const [getEndPage, setEndPage] = useState(12);
  const [getselectedpageSize, setpageSizeselected] = useState("20");
  const [getselectedpageno, setselectedpageno] = useState("1");
  const [loaded, setLoaded] = useState(false);
  const [getpageordertypeelected, setpageordertypeelected] = useState("");
  const [getascdescordertypeelected, setascdescordertypeelected] = useState("");
  const [getfilledsearch, setfilledsearch] = useState("");
  const [getDiamondDepth, setDiamondDepth] = useState([]);
  const [gettabname, settabname] = useState("mined");
  const [loadvarible, setloadvariable] = useState(false);
  const [cookies, setCookie] = useCookies(["_wpsavediamondfiltercookie"]);

  const [getbrowsercookies, setbrowsercookies] = useCookies([
    "shopify_ringbackvalue",
  ]);

  const [getlabcookies, setlabcookies] = useCookies([
    "_wpsavedlabgowndiamondfiltercookie",
  ]);
  const [getfancycookies, setfancycookies] = useCookies([
    "_wpsavedfancydiamondfiltercookie",
  ]);
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [getIntensity, setIntensity] = useState([]);
  const [getFancyColor, setFancyColor] = useState([]);
  const [getFancyStatus, setFancyStatus] = useState(false);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getbrowserdiamondcookies, setbrowserdiamondcookies, removeCookie] =
    useCookies(["shopify_diamondbackvalue"]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getfirsttimeload, setfirsttimeload] = useState(false);
  const [getDiamondCompareArrayCookie, setDiamondCompareArrayCookie] = useState(
    []
  );
  const [getfinalcomparedata, setfinalcomparedata] = useState([]);
  const [getcomparecookie, setcomparecookie] = useCookies([
    "finalcompareproductcookie",
  ]);
  const [getcookie, setcookie] = useCookies(["compareproductcookie"]);
  const [initdataload, setinitdataload] = useState(false);
  const [loadcomparedata, setloadcomparedata] = useState(false);
  const [skeletoncomparedata, setskeletoncomparedata] = useState(false);
  const [getShowPriceFilter, setShowPriceFilter] = useState();

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const shapeName = (shapeName) => {
    // console.log("shapeName");
    // console.log(shapeName);
    // if (getshapeselected === shapeName) {
    //   shapeselected("");
    // } else {

    // }
    // if (
    //   getsettingcookies._shopify_ringsetting &&
    //   getsettingcookies._shopify_ringsetting[0].centerStoneFit
    // ) {
    //   shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
    // } else {
    shapeselected(shapeName);
    //}
    // console.log(1);
    setLoaded(true);
  };

  // console.log(props);
  // console.log("props");

  const cutName = (cutName) => {
    const startCut = cutName[0];
    const endCut = cutName[1] - 1;
    var res = getDiamondCut.filter(function (v) {
      return v.cutId >= parseInt(startCut) && v.cutId <= parseInt(endCut);
    });
    const finalCut = res
      .map(function (m) {
        return m.cutId;
      })
      .join(",");

    if (getSelectedCut !== finalCut) {
      setSelectedCut(finalCut);
      // console.log(2);
      setLoaded(true);
    }
  };

  const inticutname = (cutName) => {
    setinitCut(cutName);
    // console.log(3);
    setLoaded(true);
  };

  const fancyColorName = (colorName) => {
    const startCut = colorName[0];
    const endCut = colorName[1] - 1;
    var res = getFancyColor.filter(function (v) {
      return v.$id >= parseInt(startCut) && v.$id <= parseInt(endCut);
    });

    const finalfancycolor = res
      .map(function (m) {
        return m.diamondColorName;
      })
      .join(",");

    setSelectedfancyColor(finalfancycolor);
    // console.log(4);
    setLoaded(true);
  };

  const fancyintensityname = (cutName) => {
    const startCut = cutName[0];
    const endCut = cutName[1] - 1;
    var res = getIntensity.filter(function (v) {
      return v.$id >= parseInt(startCut) && v.$id <= parseInt(endCut);
    });

    const finalIntensity = res
      .map(function (m) {
        return m.intensityName;
      })
      .join(",");

    setSelectedintensity(finalIntensity);
    // setTimeout(() => {
    // console.log(5);
    setLoaded(true);
    // }, 500);
  };

  //POLISH NAME
  const polishName = (polishName) => {
    const startpolish = polishName[0];
    const endpolish = polishName[1] - 1;
    var res = getPolish.filter(function (v) {
      return (
        v.polishId >= parseInt(startpolish) && v.polishId <= parseInt(endpolish)
      );
    });

    const finalpolish = res
      .map(function (m) {
        return m.polishId;
      })
      .join(",");

    setSelectedpolish(finalpolish);
    setTimeout(() => {
      // console.log(6);
      setLoaded(true);
    }, 500);
  };

  const intpolishname = (polishName) => {
    setinitpolish(polishName);
    // console.log(7);
    setLoaded(true);
  };

  //POLISH NAME
  const fluoreName = (fluoreName) => {
    const startfluore = fluoreName[0];
    const endfluore = fluoreName[1] - 1;
    var res = getfluorescenceRangeData.filter(function (v) {
      return (
        v.fluorescenceId >= parseInt(startfluore) &&
        v.fluorescenceId <= parseInt(endfluore)
      );
    });

    const finalfluorescence = res
      .map(function (m) {
        return m.fluorescenceId;
      })
      .join(",");

    setSelectedfluore(finalfluorescence);
    setTimeout(() => {
      // console.log(8);
      setLoaded(true);
    }, 500);
  };

  const intfluore = (fluoreName) => {
    setinitfluore(fluoreName);
    // console.log(9);
    setLoaded(true);
  };

  //SYMETRIC NAME
  const symmetryName = (symmetryName) => {
    const startsymmetry = symmetryName[0];
    const endsymmetry = symmetryName[1] - 1;
    var res = getsymmetry.filter(function (v) {
      return (
        v.symmetryId >= parseInt(startsymmetry) &&
        v.symmetryId <= parseInt(endsymmetry)
      );
    });

    const finalsymmetry = res
      .map(function (m) {
        return m.symmetryId;
      })
      .join(",");

    setSelectedsymmetry(finalsymmetry);
    setTimeout(() => {
      // console.log(11);
      setLoaded(true);
    }, 500);
  };

  const initsymmetry = (symmetryName) => {
    setinitsymmetry(symmetryName);
    // console.log(12);
    setLoaded(true);
  };

  const colorName = (colorName) => {
    const startColor = colorName[0];
    const endColor = colorName[1] - 1;
    var res = getDiamondColor.filter(function (v) {
      return (
        v.colorId >= parseInt(startColor) && v.colorId <= parseInt(endColor)
      );
    });

    const finalColor = res
      .map(function (m) {
        return m.colorId;
      })
      .join(",");
    setSelectedColor(finalColor);
    // setTimeout(() => {
    // console.log(13);
    setLoaded(true);
    // }, 500);
  };

  const inticolorname = (colorName) => {
    setinitColor(colorName);
    setLoaded(false);
  };

  const clarityName = (clarityName) => {
    const startColor = clarityName[0];
    const endColor = clarityName[1] - 1;
    var res = getDiamondClarity.filter(function (v) {
      return (
        v.clarityId >= parseInt(startColor) && v.clarityId <= parseInt(endColor)
      );
    });
    const finalClarity = res
      .map(function (m) {
        return m.clarityId;
      })
      .join(",");
    setSelectedClarity(finalClarity);
    // setTimeout(() => {
    // console.log(14);
    setLoaded(true);
    // }, 500);
  };

  const inticlarityname = (clarityName) => {
    setinitClarity(clarityName);
    setLoaded(false);
  };

  // const caratSliderValue = (caratValue) => {
  //   setCaratmin(caratValue[0]);
  //   setCaratmax(caratValue[1]);
  //   setLoaded(true);
  // };

  const caratSliderValue = (caratValue) => {
    if (
      window.minicarat !== caratValue[0] ||
      window.maxcarat !== caratValue[1]
    ) {
      // console.log(caratValue[0]);
      // console.log(caratValue[1]);
      setCaratmin(caratValue[0]);
      setCaratmax(caratValue[1]);
      window.minicarat = caratValue[0];
      window.maxcarat = caratValue[1];
      // console.log(15);
      setLoaded(true);
    }

    //console.log(getCaratmin);
  };

  // const depthSliderValue = (depthValue) => {
  //   setDepthmin(depthValue[0]);
  //   setDepthmax(depthValue[1]);
  //   setLoaded(true);
  // };

  const depthSliderValue = (depthValue) => {
    if (
      window.minidepth !== depthValue[0] ||
      window.maxdepth !== depthValue[1]
    ) {
      setDepthmin(parseInt(depthValue[0]));
      setDepthmax(parseInt(depthValue[1]));
      window.minidepth = depthValue[0];
      window.maxdepth = depthValue[1];
      // console.log(16);
      setLoaded(true);
    }
  };

  // const tableSliderValue = (tableValue) => {
  //   setTablemin(tableValue[0]);
  //   setTablemax(tableValue[1]);
  //   setLoaded(true);
  // };

  const tableSliderValue = (tableValue) => {
    if (
      window.minitable !== tableValue[0] ||
      window.maxtable !== tableValue[1]
    ) {
      setTablemin(parseInt(tableValue[0]));
      setTablemax(parseInt(tableValue[1]));
      window.minitable = tableValue[0];
      window.maxtable = tableValue[1];
      // console.log(17);
      setLoaded(true);
    }
  };

  // const priceSliderValue = (priceValue) => {
  //   setPricemin(priceValue[0]);
  //   setPricemax(priceValue[1]);
  //   setLoaded(true);
  // };

  const priceSliderValue = (priceValue) => {
    if (
      window.miniprice !== priceValue[0] ||
      window.maxprice !== priceValue[1]
    ) {
      setPricemin(parseInt(priceValue[0]));
      setPricemax(parseInt(priceValue[1]));
      window.miniprice = priceValue[0];
      window.maxprice = priceValue[1];
      // console.log(18);
      setLoaded(true);
    }
  };

  const pagesizevalue = (sizevalue) => {
    setpageSizeselected(sizevalue);
    // console.log(19);
    setLoaded(true);
  };

  const pageorderbytype = (type) => {
    // console.log("type");
    // console.log(type);
    setpageordertypeelected(type);
    // console.log(20);
    setLoaded(true);
  };

  const ascdesctype = (type1) => {
    // console.log("type1");
    // console.log(type1);
    if (getascdescordertypeelected !== type1) {
      setascdescordertypeelected(type1);
      // console.log(21);
      setLoaded(true);
    }
  };

  const currentpagevalue = (currentPage) => {
    setselectedpageno(currentPage);
    // console.log(22);
    setLoaded(true);
  };

  const searchValueCurrent = (searchval) => {
    //console.log(searchval);
    if (getfilledsearch !== searchval) {
      setfilledsearch(searchval);
      // console.log(23);
      setLoaded(true);
    }
  };

  const tabvalue = (tabname) => {
    settabname(tabname);
    // console.log(24);
    setLoaded(true);
    setfirsttimeload(true);
    setinitdataload(false);
    setloadvariable(false);
    getInitFilterDiamondData(window.initData.data[0].dealerid, tabname);
    ////console.log(tabname);
    // if (gettabname === "mined") {
    //   if (
    //     getsettingcookies._shopify_ringsetting &&
    //     getsettingcookies._shopify_ringsetting[0].setting_id
    //   ) {
    //     shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
    //   }
    // }
    // if (gettabname === "labgrown") {
    //   if (
    //     getsettingcookies._shopify_ringsetting &&
    //     getsettingcookies._shopify_ringsetting[0].setting_id
    //   ) {
    //     shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
    //   }
    // }

    // if (gettabname === "fancycolor") {
    //   if (
    //     getsettingcookies._shopify_ringsetting &&
    //     getsettingcookies._shopify_ringsetting[0].setting_id
    //   ) {
    //     shapeselected(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
    //   }
    // }

    //   //END OF  FIRST TIME LOAD
    //}
  };

  const [getgrid, setgrid] = useState(true);
  const [getlist, setlist] = useState(false);
  const onOpenGrid = (e) => {
    e.preventDefault();
    setgrid(false);
    setlist(true);
  };
  const onOpenList = (e) => {
    e.preventDefault();
    setlist(false);
    setgrid(true);
  };

  const saveSearch = () => {
    // console.log(25);
    setLoaded(true);
    setTimeout(() => {
      setLoaded(false);
    }, 3000);
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    // console.log(26);
    setLoaded(true);
    var deleteproduct = [];
    if (
      getcomparecookies._wpsavedcompareproductcookie &&
      getcomparecookies._wpsavedcompareproductcookie !== ""
    ) {
      deleteproduct = JSON.parse(
        JSON.stringify(getcomparecookies._wpsavedcompareproductcookie)
      );
    }

    var index = deleteproduct.indexOf(e.target.id);
    if (index !== -1) {
      deleteproduct.splice(index, 1);
    }

    if (deleteproduct !== "") {
      setCookie("_wpsavedcompareproductcookie", JSON.stringify(deleteproduct), {
        path: "/",
        maxAge: 604800,
      });
    }

    var deletecpproduct = [];
    if (
      getcookie.compareproductcookie &&
      getcookie.compareproductcookie !== ""
    ) {
      deletecpproduct = JSON.parse(
        JSON.stringify(getcookie.compareproductcookie)
      );
    }

    var indexcp = deletecpproduct.indexOf(e.target.id);
    if (indexcp !== -1) {
      deletecpproduct.splice(indexcp, 1);
    }

    if (deletecpproduct !== "") {
      setCookie("compareproductcookie", JSON.stringify(deletecpproduct), {
        path: "/",
        maxAge: 604800,
      });
    }

    //console.log(getcookie.compareproductcookie);

    var delLocaldatarb = JSON.parse(
      JSON.stringify(getcomparecookies.finalcompareproductcookie)
    );
    var removeLocaldata = delLocaldatarb.map(
      (delLocaldatarb) => delLocaldatarb.diamondId == e.target.id
    );
    var indexid = delLocaldatarb.findIndex(
      (delLocaldatarb) => delLocaldatarb.diamondId == e.target.id
    );

    if (indexid !== -1) {
      delLocaldatarb.splice(indexid, 1);
    }

    if (delLocaldatarb !== "") {
      setCookie("finalcompareproductcookie", JSON.stringify(delLocaldatarb), {
        path: "/",
        maxAge: 604800,
      });
    }

    settabname("compare");
    //setLoaded(false);
  };

  // GET FILTER PRODUCT
  const getInitFilterDiamondData = async (DealerID, tabname) => {
    try {
      if (tabname === "fancycolor") {
        var url =
          `${window.initData.data[0].filterapifancy}DealerID=` + DealerID;
      } else {
        var url = `${window.initData.data[0].filterapi}DealerID=` + DealerID;
      }
      const res = await fetch(url);
      // //console.log("filter url");
      // //console.log(url);
      const acrualRes = await res.json();
      //console.log("diamond-filter");
      //console.log(acrualRes[1][0].isShowPrice);
      setShowPriceFilter(acrualRes[1][0].isShowPrice);
      setShape(acrualRes[1][0].shapes);
      //DYNAMIC CUT
      if (tabname !== "fancycolor") {
        var cutData = acrualRes[1][0].cutRange;
        var dynamicLastCut = acrualRes[1][0].cutRange.length + 1;
        cutData.push({
          $id: "000",
          cutId: dynamicLastCut.toString(),
          cutName: "Last",
        });
        setDiamondCut(cutData);

        //DYNAMIC COLOR
        var colorData = acrualRes[1][0].colorRange;
        var dynamicLastColor =
          Number(
            acrualRes[1][0].colorRange[acrualRes[1][0].colorRange.length - 1]
              .colorId
          ) + 1;
        colorData.push({
          $id: "000",
          colorId: dynamicLastColor.toString(),
          colorName: "Last",
        });
        setDiamondColor(colorData);
      }

      // //console.log("tabname==" + gettabname);

      //DYNAMIC COLOR
      var clarityRange = acrualRes[1][0].clarityRange;
      var dynamicLastClarity =
        Number(
          acrualRes[1][0].clarityRange[acrualRes[1][0].clarityRange.length - 1]
            .clarityId
        ) + 1;
      clarityRange.push({
        $id: "46",
        clarityId: dynamicLastClarity.toString(),
        clarityName: "Last",
      });
      setDiamondClarity(clarityRange);

      //DYNAMIC CARAT RANGE
      setDiamondCarat(acrualRes[1][0].studCaratRange);
      // setCaratmin(acrualRes[1][0].caratRange[0].minCarat);
      // setCaratmax(acrualRes[1][0].caratRange[0].maxCarat);

      setDepth(acrualRes[1][0].depthRange);
      setTable(acrualRes[1][0].tableRange);
      //polishRange CUT
      var polishRangeData = acrualRes[1][0].polishRange;
      var dynamicLastpolish = acrualRes[1][0].polishRange.length + 1;
      polishRangeData.push({
        $id: "000",
        polishId: dynamicLastpolish.toString(),
        polishName: "Last",
      });
      setPolish(polishRangeData);
      //DYNAMIC CUT
      var fluorescenceRangeData = acrualRes[1][0].fluorescenceRange;
      var fluorescenceRangeDatalast =
        acrualRes[1][0].fluorescenceRange.length + 1;
      fluorescenceRangeData.push({
        $id: "000",
        fluorescenceId: fluorescenceRangeDatalast.toString(),
        fluorescenceName: "Last",
      });
      setfluorescenceRangeData(fluorescenceRangeData);
      //DYNAMIC CUT
      var symmetryRangeData = acrualRes[1][0].symmetryRange;
      var dynamicLastsymmetry = acrualRes[1][0].symmetryRange.length + 1;
      symmetryRangeData.push({
        $id: "000",
        symmetryId: dynamicLastsymmetry.toString(),
        symmteryName: "Last",
      });
      setsymmetry(symmetryRangeData);
      setcertificate(acrualRes[1][0].certificateRange);
      setpriceRange(acrualRes[1][0].studPriceRange);

      window.minicarat = parseInt(acrualRes[1][0].studCaratRange[0].minCarat);
      window.maxcarat = parseInt(acrualRes[1][0].studCaratRange[0].maxCarat);

      setTimeout(() => {
        setinitdataload(true);
      }, 1000);
    } catch (error) {
      //console.log(error);
    }
  };

  // GET SETTINGS PRODUCT
  const getDiamondProductsData = async () => {
    ////console.log(getshapeselected);
    var labGown = false;

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

    //For Carat
    var minCarat;
    var maxCarat;

    if (getCaratmin === "") {
      minCarat = getDiamondCarat[0].minCarat;
    } else {
      minCarat = getCaratmin;
    }
    if (getCaratmax === "") {
      maxCarat = getDiamondCarat[0].maxCarat;
    } else {
      maxCarat = getCaratmax;
    }

    // console.log("getCaratmin");
    // console.log(getCaratmin);

    //For Table
    // var minTable;
    // var maxTable;

    // if (getTablemin === "") {
    //   minTable = getTable[0].minTable;
    //   //console.log("if empty");
    // } else {
    //   minTable = getTablemin;
    //   //console.log("else not empty");
    // }
    // if (getTablemax === "") {
    //   maxTable = getTable[0].maxTable;
    // } else {
    //   maxTable = getTablemax;
    // }

    // //For Depth
    var minDepth;
    var maxDepth;

    if (getDepthmin === "") {
      minDepth = getDepth[0].minDepth;
      //console.log("if empty");
    } else {
      minDepth = getDepthmin;
      //console.log("else not empty");
    }
    if (getDepthmax === "") {
      maxDepth = getDepth[0].maxDepth;
    } else {
      maxDepth = getDepthmax;
    }

    //console.log(getFancyColor);
    if (getsettingcookies._shopify_ringsetting) {
      var shapeArrayLength =
        getsettingcookies._shopify_ringsetting[0].centerStoneFit.split(
          ","
        ).length;
      if (
        getsettingcookies._shopify_ringsetting &&
        getsettingcookies._shopify_ringsetting[0].centerStoneFit &&
        shapeArrayLength < 2
      ) {
        var cookieshape1 =
          getsettingcookies._shopify_ringsetting[0].centerStoneFit;
        cookieshape = cookieshape1.replace(/\s/g, "");
      } else if (shapeArrayLength < 1) {
        cookieshape = getsettingcookies._shopify_ringsetting[0].centerStoneFit;
      } else {
        if (getshapeselected === "" || getshapeselected === ",") {
          var cookieshape =
            getsettingcookies._shopify_ringsetting[0].centerStoneFit;
        } else {
          var cookieshape = getshapeselected;
        }
      }
    } else {
      var cookieshape = getshapeselected;
    }

    // console.log("cookieshape");
    // console.log(cookieshape);

    try {
      var url = `https://api.jewelcloud.com/api/RingBuilder/GetPairDiamond?DealerID=${window.initData.data[0].dealerid}&Shape=${cookieshape}&CaratMin=${minCarat}&CaratMax=${maxCarat}&PriceMin=${minPrice}&PriceMax=${maxPrice}&ColorId=${getSelectedColor}&DID=${getfilledsearch}&ClarityId=${getSelectedClarity}&CutGradeId=${getSelectedCut}&TableMin=${getTablemin}&TableMax=${getTablemax}&DepthMin=${minDepth}&DepthMax=${maxDepth}&FluorescenceId=${getSelectedfluore}&OrderBy=${getpageordertypeelected}&OrderType=${getascdescordertypeelected}&PageNumber=${getselectedpageno}&PageSize=${getselectedpageSize}`;

      const res = await fetch(url);
      const settingProduct = await res.json();

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
      setloadvariable(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].settingId
    ) {
      console.log("cookie is set here");
      setsettingcookie(true);
    }

    // if (
    //   window.initData.data[0].is_api === "true" &&
    //   !getbrowsercookies.shopify_ringbackvalue &&
    //   !getsettingcookies._shopify_ringsetting
    // ) {
    //   navigate("/apps/studbuilder/settings");
    // }

    if (cookies._wpsavediamondfiltercookie && initdataload === false) {
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.shapeName
      ) {
        shapeselected(cookies._wpsavediamondfiltercookie.shapeName);
      } else {
        shapeselected("");
      }

      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedCut
      ) {
        setSelectedCut(cookies._wpsavediamondfiltercookie.selectedCut);
      } else {
        setSelectedCut("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedColor
      ) {
        setSelectedColor(cookies._wpsavediamondfiltercookie.selectedColor);
      } else {
        setSelectedColor("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedClarity
      ) {
        setSelectedClarity(cookies._wpsavediamondfiltercookie.selectedClarity);
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.caratmax
      ) {
        setCaratmax(cookies._wpsavediamondfiltercookie.caratmax);
      } else {
        setCaratmax("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.caratmin
      ) {
        setCaratmin(cookies._wpsavediamondfiltercookie.caratmin);
      } else {
        setCaratmin("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.pricemax
      ) {
        setPricemax(cookies._wpsavediamondfiltercookie.pricemax);
      } else {
        setPricemax("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.pricemin
      ) {
        setPricemin(cookies._wpsavediamondfiltercookie.pricemin);
      } else {
        setPricemin("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.orderType
      ) {
        setascdescordertypeelected(
          cookies._wpsavediamondfiltercookie.orderType
        );
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.orderbytype
      ) {
        setpageordertypeelected(cookies._wpsavediamondfiltercookie.orderbytype);
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.searchvalue
      ) {
        setfilledsearch(cookies._wpsavediamondfiltercookie.searchvalue);
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedFlour
      ) {
        setSelectedfluore(cookies._wpsavediamondfiltercookie.selectedFlour);
      } else {
        setSelectedfluore("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedPolish
      ) {
        setSelectedpolish(cookies._wpsavediamondfiltercookie.selectedPolish);
      } else {
        setSelectedpolish("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedSymmetry
      ) {
        setSelectedsymmetry(
          cookies._wpsavediamondfiltercookie.selectedSymmetry
        );
      } else {
        setSelectedsymmetry("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedmaxDept
      ) {
        setDepthmax(cookies._wpsavediamondfiltercookie.selectedmaxDept);
      } else {
        setDepthmax("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedminDept
      ) {
        setDepthmin(cookies._wpsavediamondfiltercookie.selectedminDept);
      } else {
        setDepthmin("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedmaxtable
      ) {
        setTablemax(cookies._wpsavediamondfiltercookie.selectedmaxtable);
      } else {
        setTablemax("");
      }
      if (
        cookies._wpsavediamondfiltercookie &&
        cookies._wpsavediamondfiltercookie.selectedmintable
      ) {
        setTablemin(cookies._wpsavediamondfiltercookie.selectedmintable);
      } else {
        setTablemin("");
      }
    }

    // if (
    //   getsettingcookies._shopify_ringsetting &&
    //   getsettingcookies._shopify_ringsetting[0].ringmaxcarat
    // ) {
    //   setCaratmax(getsettingcookies._shopify_ringsetting[0].ringmaxcarat);
    // } else {
    //   setCaratmax("");
    // }
    // if (
    //   getsettingcookies._shopify_ringsetting &&
    //   getsettingcookies._shopify_ringsetting[0].ringmincarat
    // ) {
    //   setCaratmin(getsettingcookies._shopify_ringsetting[0].ringmincarat);
    // } else {
    //   setCaratmin("");
    // }

    //SET BACK VALUE
  }, [
    initdataload,
    getshapeselected,
    getPricemax,
    getPricemin,
    getSelectedCut,
    getSelectedColor,
    getSelectedClarity,
    getCaratmin,
    getCaratmax,
    getDepthmin,
    getDepthmax,
    getTablemin,
    getTablemax,
    getSelectedpolish,
    getSelectedfluore,
    getSelectedsymmetry,
    getselectedpageSize,
    getselectedpageno,
    getpageordertypeelected,
    getascdescordertypeelected,
    getfilledsearch,
    getSelectedfancyColor,
    getSelectedintensity,
    gettabname,
    loaded,
    getcomparecookies,
    loadcomparedata,
    getDiamondCookie,
    getsettingcookie,
  ]);

  useEffect(() => {
    if (initdataload === false) {
      getInitFilterDiamondData(window.initData.data[0].dealerid, gettabname);
    }
  }, [initdataload]);

  const fetchData = async () => {
    if (initdataload === true) {
      await getDiamondProductsData();
      setTimeout(() => {
        setLoaded(false);
      }, 2000);
    }
  };
  useEffect(() => {
    fetchData();
  }, [
    initdataload,
    getshapeselected,
    getPricemax,
    getPricemin,
    getSelectedCut,
    getSelectedColor,
    getSelectedClarity,
    getCaratmin,
    getCaratmax,
    getDepthmin,
    getDepthmax,
    getTablemin,
    getTablemax,
    getSelectedpolish,
    getSelectedfluore,
    getSelectedsymmetry,
    getselectedpageSize,
    getselectedpageno,
    getpageordertypeelected,
    getascdescordertypeelected,
    getfilledsearch,
    getSelectedfancyColor,
    getSelectedintensity,
    gettabname,
    // getcomparecookies,
    // loadcomparedata,
    // getDiamondCookie,
    // getsettingcookie,
  ]);

  if (skeltonLoad === false) {
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
                <div className="div-right">
                  {" "}
                  <Skeleton count={8} height={60} />
                </div>
              </div>
            </div>
            <div className="skeleton-div">
              <div className="skelton-info">
                {/* <h4 className="div-left"><Skeleton /></h4> */}
                <div className="div-right-price">
                  <Skeleton height={60} />
                </div>
                <div className="div-right-metal">
                  <Skeleton height={60} />
                </div>
              </div>
            </div>
          </div>
          <div className="s_gridview">
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
            <div className="Skeleton__lists">
              <Skeleton circle={true} height={150} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
              <Skeleton height={25} width={200} />
            </div>
          </div>
          <Skeleton />
        </div>
      </>
    );
  } else {
    if (skeletoncomparedata === false && gettabname === "compare") {
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
                  <div className="div-right">
                    {" "}
                    <Skeleton count={8} height={60} />
                  </div>
                </div>
              </div>
              <div className="skeleton-div">
                <div className="skelton-info">
                  {/* <h4 className="div-left"><Skeleton /></h4> */}
                  <div className="div-right-price">
                    <Skeleton height={60} />
                  </div>
                  <div className="div-right-metal">
                    <Skeleton height={60} />
                  </div>
                </div>
              </div>
            </div>
            <div className="s_gridview">
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
              <div className="Skeleton__lists">
                <Skeleton circle={true} height={150} width={150} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
                <Skeleton height={25} width={200} />
              </div>
            </div>
            <Skeleton />
          </div>
        </>
      );
    }
    if (gettabname === "compare" && loadcomparedata === true) {
      return (
        <>
          <div className="tool-container">
            <LoadingOverlay className="_loading_overlay_wrapper">
              <Loader fullPage loading={loaded} />
            </LoadingOverlay>

            {getsettingcookie === false && getDiamondCookie === false && (
              <div className="breadCumbs">
                {DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
              </div>
            )}

            {getsettingcookie === true && getDiamondCookie === false && (
              <div className="breadCumbs">
                {DataMounting.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
              </div>
            )}

            {getsettingcookie === false && getDiamondCookie === true && (
              <div className="breadCumbs">
                {DataDiamond.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
              </div>
            )}

            {getsettingcookie === true && (
              <div className="breadCumbs">
                {DataMounting.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
              </div>
            )}

            <div className="diamond-filter">
              <Filter
                shapeName={getshapeselected}
                selectedCut={getSelectedCut}
                selectedColor={getSelectedColor}
                selectedClarity={getSelectedClarity}
                caratmin={getCaratmin}
                caratmax={getCaratmax}
                pricemin={getPricemin}
                pricemax={getPricemax}
                selectedpagecount={getselectedpageno}
                orderbytype={getpageordertypeelected}
                orderType={getascdescordertypeelected}
                searchvalue={getfilledsearch}
                selectedminDept={getDepthmin}
                selectedmaxDept={getDepthmax}
                selectedmintable={getTablemin}
                selectedmaxtable={getTablemax}
                selectedPolish={getSelectedpolish}
                selectedFlour={getSelectedfluore}
                selectedSymmetry={getSelectedsymmetry}
                selectedfancyColor={getSelectedfancyColor}
                selectedfancyIntensity={getSelectedintensity}
                callBack={saveSearch}
                callbacktab={tabvalue}
              />
            </div>
            <div className="compareitems">
              <Table responsive>
                <thead>
                  <tr>
                    <th> &nbsp; </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <th key={`product-image-${item.diamondId}`}>
                        <img
                          src={item.defaultDiamondImage}
                          alt={item.mainHeader}
                          style={{ width: "150px", height: "150px" }}
                        ></img>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>Shape </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-shape-${item.diamondId}`}>
                        {item.shape ? item.shape : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>#Sku </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-id-${item.diamondId}`}>
                        {item.diamondId ? item.diamondId : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Carat </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-carat-${item.diamondId}`}>
                        {item.caratWeight ? item.caratWeight : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Table </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-table-${item.diamondId}`}>
                        {item.table ? item.table : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Color </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-color-${item.diamondId}`}>
                        {item.color ? item.color : "NA"}
                      </td>
                    ))}
                  </tr>

                  {/* <tr>
                    <th>Polish </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-polish-${item.diamondId}`}>
                        {item.polish ? item.polish : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Symmetry </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-symmetry-${item.diamondId}`}>
                        {item.symmetry ? item.symmetry : "NA"}
                      </td>
                    ))}
                  </tr> */}

                  <tr>
                    <th>Clarity </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-clarity-${item.diamondId}`}>
                        {item.clarity ? item.clarity : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Fluorescence </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-fluorescence-${item.diamondId}`}>
                        {item.fluorescence ? item.fluorescence : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Depth </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-depth-${item.diamondId}`}>
                        {item.depth ? item.depth : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Measurement </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-measurement-${item.diamondId}`}>
                        {item.measurement ? item.measurement : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Cert </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-certificate-${item.diamondId}`}>
                        {item.certificate ? item.certificate : "NA"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Cut </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-cut-${item.diamondId}`}>
                        {item.cut ? item.cut : "NA"}{" "}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>Price </th>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={`product-price-${item.diamondId}`}>
                        {item.fltPrice === "Call for Price"
                          ? ""
                          : window.currency}
                        {item.fltPrice !== "Call for Price"
                          ? Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : "Call For Price"}
                      </td>
                    ))}
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td> &nbsp; </td>
                    {getcomparecookie.finalcompareproductcookie.map((item) => (
                      <td key={item.diamondId}>
                        <a
                          href={
                            "/apps/studbuilder/diamonds/product/" +
                            item.shape.toLowerCase().replace(/ /g, "-") +
                            "-shape-" +
                            item.caratWeight +
                            "-carat-" +
                            item.color.toLowerCase().replace(/ /g, "-") +
                            "-color-" +
                            item.clarity.toLowerCase().replace(/ /g, "-") +
                            "-clarity-" +
                            item.cut.toLowerCase().replace(/ /g, "-") +
                            "-cut-" +
                            item.certificate.toLowerCase().replace(/ /g, "-") +
                            "-cert-" +
                            item.isLabCreated +
                            "-sku-" +
                            item.diamondId
                          }
                          title="View Diamond"
                        >
                          <span>
                            <i className="fas fa-eye"></i>
                          </span>
                        </a>
                        &nbsp;
                        <a href="#" id={item.diamondId} onClick={onClickDelete}>
                          <span>
                            <i
                              id={item.diamondId}
                              className="fas fa-trash-alt"
                            ></i>
                          </span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </Table>
            </div>
            <div className="mobile-compare-view">
              {getcomparecookie.finalcompareproductcookie.map((item) => (
                <div
                  className="compare-mob-items"
                  key={`compare-mob-items-${item.diamondId}`}
                >
                  <div className="lists">
                    <div className="list-items">
                      <span className="item-image">
                        <img
                          src={item.defaultDiamondImage}
                          alt={item.mainHeader}
                        ></img>
                      </span>
                      <h5 className="item-name">
                        {item.shape ? item.shape : "NA"}
                      </h5>
                    </div>
                  </div>
                  <div className="lists">
                    <div className="list-items">
                      <h5 className="item-value">
                        {item.caratWeight ? item.caratWeight : "NA"}
                      </h5>
                      <span className="item-name">Carat</span>
                    </div>
                    <div className="list-items">
                      <h5 className="item-value">
                        {item.clarity ? item.clarity : "NA"}
                      </h5>
                      <span className="item-name">Clarity</span>
                    </div>
                  </div>
                  <div className="lists">
                    <div className="list-items">
                      <h5 className="item-value">
                        {item.color ? item.color : "NA"}
                      </h5>
                      <span className="item-name">Color</span>
                    </div>
                    <div className="list-items">
                      <h5 className="item-value">
                        {item.cut ? item.cut : "NA"}
                      </h5>
                      <span className="item-name">Cut</span>
                    </div>
                  </div>
                  <div className="lists">
                    <div className="list-items">
                      <h5 className="item-value">
                        {item.fltPrice === "Call for Price"
                          ? ""
                          : window.currency}
                        {item.fltPrice !== "Call for Price"
                          ? Number(item.fltPrice).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })
                          : "Call For Price"}
                      </h5>
                      <span className="item-name">Price</span>
                    </div>
                    <div className="list-items">
                      <h5 className="item-value">
                        <a
                          href={
                            "/apps/studbuilder/diamonds/product/" +
                            item.shape.toLowerCase().replace(/ /g, "-") +
                            "-shape-" +
                            item.caratWeight +
                            "-carat-" +
                            item.color.toLowerCase().replace(/ /g, "-") +
                            "-color-" +
                            item.clarity.toLowerCase().replace(/ /g, "-") +
                            "-clarity-" +
                            item.cut.toLowerCase().replace(/ /g, "-") +
                            "-cut-" +
                            item.certificate.toLowerCase().replace(/ /g, "-") +
                            "-cert-" +
                            item.isLabCreated +
                            "-sku-" +
                            item.diamondId
                          }
                        >
                          <span>
                            <i className="fas fa-eye"></i>
                          </span>
                        </a>
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <style>
            {`
        .diamond-filter{
          background-color:${window.initData.data[0].header_colour}; 
        }
        .product-list-viewdata .table thead{
           background-color:${window.initData.data[0].header_colour}; 
        }
        .diamond-filter .navigation_filter_left .n_filter_left li.active a {
                color: ${window.initData.data[0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li.active{
              background-color:${window.initData.data[0].hover_colour}; 
            }
            .diamond-filter .navigation_filter_left .n_filter_left li.active span i{
                color: ${window.initData.data[0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover a{
               background-color:${window.initData.data[0].hover_colour}; 
                color: ${window.initData.data[0].link_colour};
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover span{
               background-color:${window.initData.data[0].hover_colour}; 
            }
            .diamond-filter .navigation_filter_left .n_filter_left li:hover span i{
              color: ${window.initData.data[0].link_colour};
            }
            .diamond-filter .save-reset-filter .navigation_right li a:hover{
              color: ${window.initData.data[0].hover_colour};
            }
            .shapes ul .shapes_lists .shape_box:hover {
              background-color: ${window.initData["data"][0].hover_colour};                 
          }
          .shapes ul .active .shape_box{
              background-color: ${window.initData["data"][0].hover_colour} !important;
          }
        .range-slider_diamond .noUi-connect , .range-slider_diamond .noUi-horizontal .noUi-handle{
                background-color: ${window.initData.data[0].slider_colour};
            }
            .diamond-change-view ul .active a.grid-view-four , .diamond-change-view ul .active a.listview , .diamond-change-view ul li a:hover , .search-bar .search-btn{
              background-color: ${window.initData.data[0].hover_colour};
            }
            .search-product-listing .product-grid-view li.product-listing:hover a{
              color: ${window.initData.data[0].hover_colour};
            }
            .diamond-product-pagination .pagination .active .page-link ,  .diamond-product-pagination .pagination li a.page-link:hover{
               background-color:${window.initData.data[0].hover_colour};
                  border-color: ${window.initData.data[0].hover_colour};
                  color: ${window.initData.data[0].link_colour};
            }
            .btn-compare .btn{
               background-color:${window.initData.data[0].button_colour};
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
            @media screen and (max-width: 991px) { 
              .shapes ul .shapes_lists .shape_box:hover {
                  background-color: inherit;
              }
          }
            `}
          </style>
          <div className="tool-container">
            <LoadingOverlay className="_loading_overlay_wrapper">
              <Loader fullPage loading={loaded} />
            </LoadingOverlay>

            {getsettingcookie === false && getDiamondCookie === false && (
              <div className="breadCumbs milan">
                {Data.map((item) => (
                  <Breadcumb Data={item} key={item.key} />
                ))}
              </div>
            )}

            {getsettingcookie === true && getDiamondCookie === true && (
              <div className="breadCumbs">
                {window.initData.data[0].is_api === "true" &&
                  Data.map((item) => <Breadcumb Data={item} key={item.key} />)}

                {window.initData.data[0].is_api === "false" ||
                  (window.initData.data[0].is_api === false &&
                    DataDiamond.map((item) => (
                      <Breadcumb Data={item} key={item.key} />
                    )))}
              </div>
            )}

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
                  DataMounting.map((item) => (
                    <Breadcumb Data={item} key={item.key} />
                  ))}
                {window.initData.data[0].is_api === "false" &&
                  DataDiamond.map((item) => (
                    <Breadcumb Data={item} key={item.key} />
                  ))}
              </div>
            )}

            <div className="diamond-filter">
              <Filter
                shapeName={getshapeselected}
                selectedCut={getSelectedCut}
                selectedColor={getSelectedColor}
                selectedClarity={getSelectedClarity}
                caratmin={getCaratmin}
                caratmax={getCaratmax}
                pricemin={getPricemin}
                pricemax={getPricemax}
                selectedpagecount={getselectedpageno}
                orderbytype={getpageordertypeelected}
                orderType={getascdescordertypeelected}
                searchvalue={getfilledsearch}
                selectedminDept={getDepthmin}
                selectedmaxDept={getDepthmax}
                selectedmintable={getTablemin}
                selectedmaxtable={getTablemax}
                selectedPolish={getSelectedpolish}
                selectedFlour={getSelectedfluore}
                selectedSymmetry={getSelectedsymmetry}
                selectedfancyColor={getSelectedfancyColor}
                selectedfancyIntensity={getSelectedintensity}
                callBack={saveSearch}
                callbacktab={tabvalue}
              />
            </div>
            <div className="filter-main-div">
              <div className="shapes">
                <DiamondShape
                  shapeData={shape}
                  callBack={shapeName}
                  selectedShape={getshapeselected}
                />
              </div>
              {gettabname !== "fancycolor" && (
                <div className="rangeSlider ui-sliders">
                  <CutSlider
                    cutSliderData={getDiamondCut}
                    callBack={cutName}
                    defaultCut={inticutname}
                    setSelectedCutData={getSelectedCut}
                  />
                  <ColorSlider
                    colorSliderData={getDiamondColor}
                    callBack={colorName}
                    defaultColor={inticolorname}
                    setSelectedColorData={getSelectedColor}
                  />
                </div>
              )}
              {gettabname === "fancycolor" && getFancyStatus === true && (
                <div className="rangeSlider ui-sliders">
                  <FancyColorSlider
                    fancycolorSliderData={getFancyColor}
                    callBack={fancyColorName}
                    setSelectedFancyColorData={getSelectedfancyColor}
                  />
                  <FancyIntensity
                    getIntensityData={getIntensity}
                    callBack={fancyintensityname}
                    setSelectedIntensityData={getSelectedintensity}
                  />
                </div>
              )}
              <div className="rangeSlider ui-sliders">
                <ClaritySlider
                  claritySliderData={getDiamondClarity}
                  callBack={clarityName}
                  defaultClarity={inticlarityname}
                  setSelectedClarityData={getSelectedClarity}
                />
                <div className="slider__diamond">
                  <div className="slide_left slider-div">
                    <CaratSlider
                      caratSliderData={getDiamondCarat}
                      minCarat={getCaratmin}
                      maxCarat={getCaratmax}
                      callBack={caratSliderValue}
                      callbacktab={gettabname}
                    />
                  </div>
                  <div className="slide_right slider-div">
                    {getShowPriceFilter === true && (
                      <PriceSlider
                        pricerangeData={getpriceRange}
                        pricemindata={getPricemin}
                        pricemaxdata={getPricemax}
                        callBack={priceSliderValue}
                        callbacktab={gettabname}
                      />
                    )}
                  </div>
                </div>

                {window.initData.data[0]
                  .show_Advance_options_as_Default_in_Diamond_Search ===
                  "1" && (
                  <div className="advance-slider">
                    <div
                      className={`advance-heading ${
                        getgrid === true ? "active" : ""
                      }`}
                    >
                      <div className="heading" onClick={onOpenGrid}>
                        <span>
                          <i className="fas fa-plus"></i>
                        </span>
                        Advance Search
                      </div>
                    </div>
                    <div
                      className={`advance-search-sliders ${
                        getlist === true ? "active" : ""
                      }`}
                    >
                      <div className="advance-heading-div" onClick={onOpenList}>
                        <div className="heading">
                          <span>
                            <i className="fas fa-minus"></i>
                          </span>
                          Advance Search
                        </div>
                      </div>
                      <div className="slider__diamond">
                        <div className="slide_left slider-div">
                          <DepthSlider
                            depthSliderData={getDepth}
                            depthmin={getDepthmin}
                            depthmax={getDepthmax}
                            callBack={depthSliderValue}
                            callbacktab={gettabname}
                          />
                        </div>
                        <div className="slide_right slider-div">
                          <TableSlider
                            tableSliderData={getTable}
                            tablemin={getTablemin}
                            tablemax={getTablemax}
                            callBack={tableSliderValue}
                            callbacktab={gettabname}
                          />
                        </div>
                      </div>
                      {/* <PolishSlider
                        polishSliderData={getPolish}
                        callBack={polishName}
                        defaultCut={intpolishname}
                        setSelectedPolishData={getSelectedpolish}
                      /> */}
                      <FluorescenceSlider
                        fluorescenceSliderData={getfluorescenceRangeData}
                        callBack={fluoreName}
                        defaultCut={intfluore}
                        setSelectedFluoreData={getSelectedfluore}
                      />
                      {/* <SymmetrySlider
                        symmetrySliderData={getsymmetry}
                        callBack={symmetryName}
                        defaultCut={initsymmetry}
                        setSelectedSymData={getSelectedsymmetry}
                      /> */}
                      {window.initData.data[0]
                        .show_Certificate_in_Diamond_Search === "1" &&
                        getcertificate === "" && (
                          <Certificates certificateData={getcertificate} />
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="SettingsContainer" id="ringbuilderScrollUp">
              <DiamondSettingsProducts
                getDataSettingProductData={getDataSettingProduct}
                productCount={getProductCount}
                pagesize={pagesizevalue}
                currentpageno={currentpagevalue}
                totalPages={getTotalPage}
                startPage={getStartPage}
                endPage={getEndPage}
                orderbytype={pageorderbytype}
                orderType={ascdesctype}
                searchvalue={searchValueCurrent}
                tabvalue={gettabname}
                shapeName={getshapeselected}
                selectedCut={getSelectedCut}
                selectedColor={getSelectedColor}
                selectedClarity={getSelectedClarity}
                caratmin={getCaratmin}
                caratmax={getCaratmax}
                pricemin={getPricemin}
                pricemax={getPricemax}
                selectedpagecount={getselectedpageno}
                selectedminDept={getDepthmin}
                selectedmaxDept={getDepthmax}
                selectedmintable={getTablemin}
                selectedmaxtable={getTablemax}
                selectedPolish={getSelectedpolish}
                selectedFlour={getSelectedfluore}
                selectedSymmetry={getSelectedsymmetry}
                selectedfancyColor={getSelectedfancyColor}
                selectedfancyIntensity={getSelectedintensity}
              />
            </div>
          </div>
        </>
      );
    }
  }
};

export default DiamondtoolSetting;
