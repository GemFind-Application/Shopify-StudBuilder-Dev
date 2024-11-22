import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import "react-responsive-modal/styles.css";
import MyPagination from "./Pagination";
import ListDataTable from "./ListDataTable";
import { useCookies } from "react-cookie";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [getGridClass, setGridClass] = useState("grid-view-four");
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
  const [getvideoloader, setvideoloader] = useState("true");
  const [getShapeOrderType, setShapeOrderType] = useState("");
  const [getPriceOrderType, setPriceOrderType] = useState("");
  const [getCaratOrderType, setCaratOrderType] = useState("");
  const [getColorOrderType, setColorOrderType] = useState("");
  const [getClarityOrderType, setClarityOrderType] = useState("");
  const [getCutOrderType, setCutOrderType] = useState("");
  const [getDepthOrderType, setDepthOrderType] = useState("");
  const [getTableOrderType, setTableOrderType] = useState("");
  const [getPolishOrderType, setPolishOrderType] = useState("");
  const [getSymmetryOrderType, setSymmetryOrderType] = useState("");
  const [getMeasurementOrderType, setMeasurementOrderType] = useState("");
  const [getCertificateOrderType, setCertificateOrderType] = useState("");

  const spinner = () => {
    // setTimeout(() => {
    setvideoloader("false");
    // }, 500);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log("getSearch");
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
    console.log(event);
    props.changedpagesize(event.target.value);
    setpaginationpagecount(event.target.value);
  };

  const handleorderbytype = (event) => {
    console.log(event);
    props.orderbytype(event.target.value);
  };

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    props.currentpageno(page_number);
    document.getElementById("diamondDetailScrollUp").scrollIntoView({
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
      console.log(error);
    }
  };

  const handleOrderClass = (event) => {
    event.preventDefault();
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

  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const onOpenInfo = (e) => {
    e.preventDefault();
    var currentId = e.target.id;
    var c = currentId.split("-");
    setInfo(c[1]);
    if (getInfo === c[1]) {
      setInfo("");
    }
  };

  const hideInfo = (e) => {
    setInfo("");
  };

  const handleCompare = (e) => {
    if (e.target.checked === false) {
      var index = window.compareproduct.indexOf(e.target.value);
      if (index !== -1) {
        window.compareproduct.splice(index, 1);
      }
    }
    if (window.compareproduct.length < 6) {
      if (e.target.checked === true) {
        window.compareproduct.push(e.target.value);
      }
    } else {
      toast("You can not add more than 6 products.");
      e.target.checked = false;
    }
    setCompareCount(window.compareproduct.length);
  };

  const handlefilterprice = (e) => {
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

  const handlecarat = (e) => {
    props.orderbytype("Size");
    if (getOrderType === "ASC") {
      setOrderType("DESC");
    } else {
      setOrderType("ASC");
    }
    props.orderType(getOrderType);
  };

  const handleColor = (e) => {
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

  console.log("props.getDataSettingProductData");
  console.log(props.getDataSettingProductData);

  useEffect(() => {
    setlistClass();
  }, []);

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
      {/* <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      <div className="diamond-searching-result">
        <div className="result-number">
          <p>
            {props.productCount} <strong>SIMILAR DIAMOND PAIRS</strong>
          </p>
        </div>

        <div className="diamond-search-lists">
          <div className="search-bar">
            {/* <form onSubmit={onSubmit}>
              <input
                type="text"
                name="searchdidfield"
                id="searchdidfield"
                placeholder="Search Setting#"
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
            </form> */}
          </div>
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
          filterPrice={handlefilterprice}
          filtershape={handleshape}
          filterCarat={handlecarat}
          filterColor={handleColor}
          filterIntensity={handleIntensity}
          filterClarity={handleclarity}
          filterCut={handlecutgrade}
          filterCertificate={handlecertificate}
          filterMeasurement={handlemeasurements}
          filterPolish={handlepolish}
          filterTable={handletablemeasure}
          filterDepth={handledepth}
          filterSummery={handlesymmetry}
          tabname={props.tabvalue}
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
