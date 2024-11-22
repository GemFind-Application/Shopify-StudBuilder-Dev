import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
// import PageItem from 'react-bootstrap/PageItem';
import Modal from "react-bootstrap/Modal";
// import ModalBody from 'react-bootstrap/ModalBody';
import "react-responsive-modal/styles.css";
import MyPagination from "./Pagination";
import ImageLoader from "react-load-image";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

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

const SettingsProduct = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [getGridClass, setGridClass] = useState("grid-col-three");
  const [getlithreeClass, setlithreeClass] = useState("active");
  const [getprouductClass, setprouductClass] = useState();
  const [getlifourClass, setlifourClass] = useState("inactive");
  const [getpaginationpagecount, setpaginationpagecount] = useState("12");
  const [currPage, setCurrPage] = useState(1);
  const [getSearch, setSearch] = useState("");
  const [getclose, setClose] = useState("false");
  const [getVideo, setVideo] = useState("");
  const [getvideoloader, setvideoloader] = useState("true");
  const [getbrowsercookies, setbrowsercookies] = useCookies([
    "shopify_ringbackvalue",
  ]);
  const [getproductselected, productselected] = useState();

  const navigate = useNavigate();
  const spinner = () => {
    // setTimeout(() => {
    setvideoloader("false");
    // }, 500);
  };

  console.log("setting data");
  console.log(props);

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
    props.currentpageno(page_number);
    document.getElementById("ringbuilderSettingScrollUp").scrollIntoView({
      behavior: "smooth",
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
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
    setSearch("");
    props.searchvalue("");
    setClose("false");
  };

  useEffect(() => {
    if (getbrowsercookies.shopify_ringbackvalue) {
      if (
        getbrowsercookies.shopify_ringbackvalue &&
        getbrowsercookies.shopify_ringbackvalue[0].settingId
      ) {
        productselected(getbrowsercookies.shopify_ringbackvalue[0].settingId);
      }
    }
    setprouductClass(getproductselected);
  }, [getproductselected]);

  const handleModel = async (event) => {
    setvideoloader("true");
    try {
      const res = await fetch(
        `${window.initData.data[0].getvideoapi}InventoryID=${event.target.id}&Type=Jewelry`
      );
      const geturl = await res.json();
      setVideo(geturl.videoURL);
      setModalShow(true);
      //setvideoloader("false");
    } catch (error) {
      console.log(error);
    }
  };

  const closehandleModel = async (event) => {
    setModalShow(false);
  };

  const handleSetBackValue = (item, e) => {
    e.preventDefault();
    console.log("selecetd product");
    console.log(item);

    // var settingCollection = item.collections[0].collectionName;

    if (props.currentMinPrice === "" && props.currentMaxPrice === "") {
      var minpricedata = props.getpriceRangedata.minPrice;
      var maxpricedata = props.getpriceRangedata.maxPrice;
    } else {
      minpricedata = props.currentMinPrice;
      maxpricedata = props.currentMaxPrice;
    }
    console.log(props.currentMinPrice);
    console.log(props.currentMaxPrice);
    var finalSetBackValue = [];
    finalSetBackValue.push({
      collection: item.collectionName,
      metaltype: item.metalType,
      price: item.finalPrice,
      settingId: item.gfInventoryID,
      priceSettingId: item.priceSettingId,
      color: item.metalColor,
      productname: item.productName,
      stylenumber: item.styleNumber,
    });

    setbrowsercookies("shopify_ringbackvalue", finalSetBackValue, {
      path: "/",
      maxAge: 604800,
    });

    // if (props.currentMetalType) {
    //   navigate(
    //     "/apps/studbuilder/" +
    //       navsettingurl +
    //       settingCollection.replace(/\s+/g, "-").toLowerCase() +
    //       "/" +
    //       props.currentMetalType.replace(/\s+/g, "-").toLowerCase() +
    //       "-sku-" +
    //       item.priceSettingId
    //   );
    // } else {
    //  var navsettingurl = "settings/";
    // navigate(
    //   "/apps/studbuilder/" +
    //     navsettingurl +
    //     item.collectionName +
    //     "/" +
    //     item.metalType +
    //     "-sku-" +
    //     item.finalPrice
    // );

    // navigate("/apps/studbuilder/completeearring");

    var productName = item.productName;

    const metalType = item.configList[0].metalType;
    const values = metalType.split(","); // Split the string by commas
    const metalFirstValue = values[0]; // Get the first value

    console.log(metalFirstValue);

    navigate(
      "/apps/studbuilder/settings/" +
        productName.replace(/\s+/g, "-").toLowerCase() +
        "/" +
        metalFirstValue.replace(/\s+/g, "-").toLowerCase() +
        "-sku-" +
        item.priceSettingId
    );

    //}
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
                  "/images/ring.gif"
                }
                style={{ width: "200px", height: "200px" }}
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

      <div className="searching-result">
        <div className="result-number">
          <p>
            {props.productCount} <strong>SIMILAR DIAMOND PAIRS</strong>
          </p>
        </div>
        <div className="search-details">
          <div className="search-bar">
            <form onSubmit={onSubmit}>
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
            </form>
          </div>
        </div>
      </div>
      {/* product listing starting */}

      <div className="search-product-listing">
        <ul className={`product-grid-view ${getGridClass}`} id="grid-mode">
          {props.getDataSettingProductData.map((item) => (
            <li
              className={`product-listing ${
                getprouductClass === item.gfInventoryID ? "active" : ""
              }`}
              key={item.$id}
              id={item.gfInventoryID}
            >
              <a href="#">
                <div className="product-images">
                  <ImageLoader src={item.imagePath}>
                    <img />
                    <div>Error!</div>
                    <div className="image_loaader">
                      <Preloader />
                    </div>
                  </ImageLoader>
                </div>
                <div className="product-details">
                  <span className="product-name"> STYLE# {item.styleNumber} </span>
                  <h2 className="product-name">
                    <strong> {item.productName}</strong>
                  </h2>

                  <h5 className="product-price">
                    {window.currency}
                    {Number(item.finalPrice).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </h5>
                </div>
              </a>
              <br></br>
              <div className="diamond-btn">
                <button
                  type="submit"
                  title="Submit"
                  onClick={(e) => handleSetBackValue(item, e)}
                  className="btn btn-tryon"
                >
                  Choose This Mounting
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="result-pagination">
        <div className="result-bottom">
          <h2>
            {props.startPage} to {props.endPage} of {props.productCount} Diamond
            Pairs
          </h2>
        </div>
        <div className="product-pagination">
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

export default SettingsProduct;
