import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import ReactTooltip from "react-tooltip";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import "react-responsive-modal/styles.css";
import spinn from "../../../images/spinner.gif";
import MyPagination from "./Pagination";
import ListDataTable from "./ListDataTable";
import { useCookies } from "react-cookie";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Preloader(props) {
  return (
    <img
      className="preloaderr"
      alt="spinner"
      src={
        window.initData.data[0].server_url +
        process.env.PUBLIC_URL +
        "/images/spinner.gif"
      }
      style={{ width: "21px", height: "24px" }}
    />
  );
}

const DiamondSettingsProducts = (props) => {
  const [text, setText] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [getVideo, setVideo] = useState("");
  const [videoLoading, setVideoLoading] = useState(true);
  const [getpaginationpagecount, setpaginationpagecount] = useState("12");
  const [currPage, setCurrPage] = useState(1);
  const [getInfo, setInfo] = useState("");
  const [getgrid, setgrid] = useState(true);
  const [getlist, setlist] = useState(false);
  // const [getGridClass, setGridClass] = useState("grid-view-four");
  const [getlistClass, setlistClass] = useState("grid-list-view");
  const [getAscClass, setAscClass] = useState("active");
  const [getDescClass, setDescClass] = useState("inactive");
  const [getOrderType, setOrderType] = useState("ASC");
  const [getSearch, setSearch] = useState("");
  const [getclose, setClose] = useState("false");
  const [cookies, setCookie] = useCookies(["_compareitems"]);
  const [getCompare, setCompare] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [getCompareCount, setCompareCount] = useState(0);
  const [getcomparecookies, setcomparecookies] = useCookies([
    "_wpsavedcompareproductcookie",
  ]);
  const [getbrowserdiamondcookies, setbrowserdiamondcookies] = useCookies([
    "shopify_diamondbackvalue",
  ]);
  const [getcpcookies, setcpcookies, removeCookie] = useCookies([
    "cookie-name",
  ]);

  const [getvideoloader, setvideoloader] = useState("true");
  const [getprouductClass, setprouductClass] = useState();
  const [getproductselected, productselected] = useState();

  const spinner = () => {
    // setTimeout(() => {
    setvideoloader("false");
    // }, 500);
  };
  const navigate = useNavigate();

  // console.log(props);
  useEffect(() => {
    setlistClass();

    setprouductClass(getproductselected);
  }, [getcomparecookies, getproductselected]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(getSearch);
    if (getSearch === "") {
      alert("Please enter your search value");
      return false;
    }
    props.searchvalue(getSearch);
    setClose("true");
  };

  const onChange = (evt) => {
    setSearch(evt.target.value);
  };

  const onClose = (evt) => {
    evt.preventDefault();
    //console.log(getSearch);
    setSearch("");
    props.searchvalue("");
    setClose("false");
  };

  const handlePageSizeChange = (event) => {
    props.pagesize(event.target.value);
    setpaginationpagecount(event.target.value);
  };

  const handleorderbytype = (event) => {
    console.log("event.target.value");
    console.log(event.target.value);
    props.orderbytype(event.target.value);
  };

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    props.currentpageno(page_number);
    document.getElementById("ringbuilderScrollUp").scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleModel = async (event) => {
    setvideoloader("true");
    try {
      const res = await fetch(
        `${window.initData.data[0].getvideoapi}InventoryID=${event.target.id}&Type=Diamond`
      );
      const geturl = await res.json();
      setVideo(geturl.videoURL);
      setModalShow(true);
    } catch (error) {
      //console.log();
    }
  };

  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const handleOrderClass = (event) => {
    event.preventDefault();
    //console.log(event.target.id);
    if (event.target.id === "asc") {
      setAscClass("inactive");
      setDescClass("active");
      setOrderType("ASC");
    } else {
      setAscClass("active");
      setDescClass("inactive");
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const onOpenInfo = (e) => {
    e.preventDefault();
    var currentId = e.target.id;
    var c = currentId.split("-");
    console.log(c[1]);
    setInfo(c[1]);
    if (getInfo === c[1]) {
      setInfo("");
    }
  };

  const hideInfo = (e) => {
    setInfo("");
  };

  // const onOpenGrid = (e) => {
  //   e.preventDefault();
  //   setgrid(true);
  //   setlist(false);
  //   setGridClass("active");
  //   setlistClass("inactive");
  // };
  // const onOpenList = (e) => {
  //   e.preventDefault();
  //   setlist(true);
  //   setgrid(false);
  //   setGridClass("inactive");
  //   setlistClass("active");
  // };

  const handlefilterprice = (e) => {
    //console.log("sc");
    props.orderbytype("FltPrice");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleshape = (e) => {
    props.orderbytype("Cut");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlesize = (e) => {
    props.orderbytype("Size");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecolor = (e) => {
    props.orderbytype("Color");
    if (getOrderType === "DESC") {
      setOrderType("ASC");
    } else {
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const handleIntensity = (e) => {
    props.orderbytype("FancyColorIntensity");
    if (getOrderType === "DESC") {
      setOrderType("ASC");
    } else {
      setOrderType("DESC");
    }
    props.orderType(getOrderType);
  };

  const handleclarity = (e) => {
    props.orderbytype("ClarityID");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecutgrade = (e) => {
    props.orderbytype("CutGrade");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handledepth = (e) => {
    props.orderbytype("Depth");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handletablemeasure = (e) => {
    props.orderbytype("TableMeasure");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlepolish = (e) => {
    props.orderbytype("Polish");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlesymmetry = (e) => {
    props.orderbytype("Symmetry");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlemeasurements = (e) => {
    props.orderbytype("Measurements");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handlecertificate = (e) => {
    props.orderbytype("Certificate");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleCheckbox = (e) => {
    setCompareCount(e);
  };

  const handleSetBackValue = (item, e) => {
    e.preventDefault();
    // console.log(props);
    // console.log(item.diamondId);
    var finalSetBackValue = [];
    finalSetBackValue.push({
      shapeName: props.shapeName,
      selectedCut: props.selectedCut,
      selectedColor: props.selectedColor,
      selectedClarity: props.selectedClarity,
      caratmin: props.caratmin,
      caratmax: props.caratmax,
      pricemin: props.pricemin,
      pricemax: props.pricemax,
      selectedFlour: props.selectedFlour,
      selectedPolish: props.selectedPolish,
      selectedfancyColor: props.selectedfancyColor,
      selectedfancyIntensity: props.selectedfancyIntensity,
      selectedmaxDept: props.selectedmaxDept,
      selectedminDept: props.selectedminDept,
      selectedmaxtable: props.selectedmaxtable,
      selectedmintable: props.selectedmintable,
      selectedSymmetry: props.selectedSymmetry,
      diamondId: item.diamondId,
    });

    setbrowserdiamondcookies("shopify_diamondbackvalue", finalSetBackValue, {
      path: "/",
      maxAge: 604800,
    });
    navigate(
      "/apps/studbuilder/diamonds/product/" +
        item.shape.replace(/\s+/g, "-").toLowerCase() +
        "-shape-" +
        item.carat.replace(/\s+/g, "-").toLowerCase() +
        "-carat-" +
        item.color.replace(/\s+/g, "-").toLowerCase() +
        "-color-" +
        item.clarity.replace(/\s+/g, "-").toLowerCase() +
        "-clarity-" +
        item.cut.replace(/\s+/g, "-").toLowerCase() +
        "-cut-" +
        item.cert.replace(/\s+/g, "-").toLowerCase() +
        "-cert-" +
        "islabgrown-" +
        item.isLabCreated +
        "-sku-" +
        item.diamondId
    );
  };

  const handleBottomCompare = (e) => {
    document.getElementById("compare").click();
  };

  return (
    <>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={closehandleModel}></Modal.Header>
        <Modal.Body>
          {getvideoloader === "true" ? (
            <div className="modal__spinner">
              <img
                className="preloaderr"
                alt="preLoad"
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/diamond.gif"
                }
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ) : null}
          <iframe
            className="modal__video-style"
            onLoad={spinner}
            width="100%"
            height="500"
            title="Video"
            src={getVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>

      <div className="diamond-searching-result">
        <div className="result-number">
          <p>
            {props.productCount} <strong>SIMILAR DIAMOND PAIRS</strong>
          </p>
        </div>

        <div className="diamond-search-lists">
          <div className="search-bar">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="searchdidfield"
                id="searchdidfield"
                placeholder="Search Diamond Stock#"
                value={getSearch}
                onChange={onChange}
                className="search-field"
              />
              <button
                type="button"
                className={`close_button ${
                  getclose === "true" ? "active" : ""
                }`}
                onClick={onClose}
              >
                x
              </button>
              <button type="submit" className={`search-btn active`}></button>
            </form>
          </div>
        </div>
      </div>
      {/* product listing starting */}

      <div className={`product-datatable ${getlistClass}`}>
        <ListDataTable
          listviewData={props.getDataSettingProductData}
          checkboxcount={handleCheckbox}
          filterPrice={handlefilterprice}
          filtershape={handleshape}
          filterCarat={handlesize}
          filterColor={handlecolor}
          filterIntensity={handleIntensity}
          filterClarity={handleclarity}
          filterDepth={handledepth}
          tabname={props.tabvalue}
          filterTable={handletablemeasure}
          filterPolish={handlepolish}
          filterMeasurement={handlemeasurements}
          filterCertificate={handlecertificate}
          filterCut={handlecutgrade}
          filterSummery={handlesymmetry}
        />
      </div>

      <div className="result-pagination">
        <div className="result-bottom">
          <h2>
            {props.startPage} to {props.endPage} of {props.productCount} Diamond
            Pairs
          </h2>
        </div>
        <div className="diamond-product-pagination">
          <MyPagination
            totPages={props.totalPages}
            currentPage={currPage}
            pageClicked={(ele) => {
              afterPageClicked(ele);
            }}
          ></MyPagination>
        </div>
      </div>
    </>
  );
};

export default DiamondSettingsProducts;
