import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import round from "../../../images/round.png";
import Modal from "react-bootstrap/Modal";
import spinn from "../../../images/spinner.gif";
import { useCookies } from "react-cookie";
import Checkbox from "rc-checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import { LoadingOverlay, Loader } from "react-overlay-loader";
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

const ListDataTable = (props) => {
  const [getshow, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [getDiamondID, setDiamondID] = useState("");
  const [getShape, setShape] = useState("");
  const [getCarat, setCarat] = useState("");
  const [getColor, setColor] = useState("");
  const [getClarity, setClarity] = useState("");
  const [getDepth, setDepth] = useState("");
  const [getTable, setTable] = useState("");
  const [getPolish, setPolish] = useState("");
  const [getMeasurement, setMeasurement] = useState("");
  const [getCertificate, setCertificate] = useState("");
  const [getCertificateURL, setCertificateURL] = useState("");
  const [getPrice, setPrice] = useState("");
  const [getSymmetry, setSymmetry] = useState("");
  const [getCut, setCut] = useState("");
  const [getSecondDiamondID, setSecondDiamondID] = useState("");
  const [getSecondShape, setSecondShape] = useState("");
  const [getSecondCarat, setSecondCarat] = useState("");
  const [getSecondColor, setSecondColor] = useState("");
  const [getSecondClarity, setSecondClarity] = useState("");
  const [getSecondDepth, setSecondDepth] = useState("");
  const [getSecondTable, setSecondTable] = useState("");
  const [getSecondPolish, setSecondPolish] = useState("");
  const [getSecondMeasurement, setSecondMeasurement] = useState("");
  const [getSecondCertificate, setSecondCertificate] = useState("");
  const [getSecondCertificateURL, setSecondCertificateURL] = useState("");
  const [getSecondPrice, setSecondPrice] = useState("");
  const [getSecondSymmetry, setSecondSymmetry] = useState("");
  const [getSecondCut, setSecondCut] = useState("");
  const [getVideo, setVideo] = useState(true);
  const [getView, setView] = useState(true);
  const [getRow, setRow] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [getCompareCount, setCompareCount] = useState(0);
  const [getvideoloader, setvideoloader] = useState("true");
  const [getShapeOrderType, setShapeOrderType] = useState("");
  const [getOrderType, setOrderType] = useState("");
  const [getPriceOrderType, setPriceOrderType] = useState("");
  const [getCaratOrderType, setCaratOrderType] = useState("");
  const [getColorOrderType, setColorOrderType] = useState("");
  const [getIntensityOrderType, setIntensityOrderType] = useState("");
  const [getClarityOrderType, setClarityOrderType] = useState("");
  const [getCutOrderType, setCutOrderType] = useState("");
  const [getDepthOrderType, setDepthOrderType] = useState("");
  const [getTableOrderType, setTableOrderType] = useState("");
  const [getPolishOrderType, setPolishOrderType] = useState("");
  const [getSymmetryOrderType, setSymmetryOrderType] = useState("");
  const [getMeasurementOrderType, setMeasurementOrderType] = useState("");
  const [getCertificateOrderType, setCertificateOrderType] = useState("");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const onClickShape = (e) => {
    console.log(getShapeOrderType);
    if (getShapeOrderType === "ASC") {
      setShapeOrderType("DESC");
    } else {
      setShapeOrderType("ASC");
    }
    props.filtershape(e);
  };

  const onClickPrice = (e) => {
    e.preventDefault();
    if (getPriceOrderType === "ASC") {
      setPriceOrderType("DESC");
    } else {
      setPriceOrderType("ASC");
    }
    props.filterPrice(e);
  };

  const onClickCarat = (e) => {
    e.preventDefault();
    if (getCaratOrderType === "ASC") {
      setCaratOrderType("DESC");
    } else {
      setCaratOrderType("ASC");
    }
    props.filterCarat(e);
  };

  const onClickColor = (e) => {
    e.preventDefault();
    if (getColorOrderType === "ASC") {
      setColorOrderType("DESC");
    } else {
      setColorOrderType("ASC");
    }
    props.filterColor(e);
  };

  const onClickClarity = (e) => {
    e.preventDefault();
    if (getClarityOrderType === "ASC") {
      setClarityOrderType("DESC");
    } else {
      setClarityOrderType("ASC");
    }
    props.filterClarity(e);
  };

  const onClickDepth = (e) => {
    e.preventDefault();
    if (getDepthOrderType === "ASC") {
      setDepthOrderType("DESC");
    } else {
      setDepthOrderType("ASC");
    }
    props.filterDepth(e);
  };
  const onClickTable = (e) => {
    e.preventDefault();
    if (getTableOrderType === "ASC") {
      setTableOrderType("DESC");
    } else {
      setTableOrderType("ASC");
    }
    props.filterTable(e);
  };
  const onClickPolish = (e) => {
    e.preventDefault();
    if (getPolishOrderType === "ASC") {
      setPolishOrderType("DESC");
    } else {
      setPolishOrderType("ASC");
    }
    props.filterPolish(e);
  };
  const onClickMeasurement = (e) => {
    e.preventDefault();
    if (getMeasurementOrderType === "ASC") {
      setMeasurementOrderType("DESC");
    } else {
      setMeasurementOrderType("ASC");
    }
    props.filterMeasurement(e);
  };
  const onClickCertificate = (e) => {
    e.preventDefault();
    if (getCertificateOrderType === "ASC") {
      setCertificateOrderType("DESC");
    } else {
      setCertificateOrderType("ASC");
    }
    props.filterCertificate(e);
  };
  const onClickCut = (e) => {
    e.preventDefault();
    if (getCutOrderType === "ASC") {
      setCutOrderType("DESC");
    } else {
      setCutOrderType("ASC");
    }
    props.filterCut(e);
  };

  const onClickSymmetry = (e) => {
    e.preventDefault();
    if (getSymmetryOrderType === "ASC") {
      setSymmetryOrderType("DESC");
    } else {
      setSymmetryOrderType("ASC");
    }
    props.filterSummery(e);
  };

  const onClickView = (e) => {
    e.preventDefault();
    setRow(true);
  };

  const handlePopupClose = () => {
    console.log("close");
    setShow(false);
    console.log(getshow);
    setLoaded(false);
  };

  const handleShow = async (item, e) => {
    setLoaded(true);
    e.preventDefault();
    setTimeout(() => {
      setDiamondID(item.diamondID1);
      setShape(item.cut1);
      setCarat(item.size1);
      setColor(item.color1);
      setClarity(item.clarity1);
      setDepth(item.depth1);
      setCut(item.cutGrade1);
      setTable(item.tableMeasure1);
      setPolish(item.polish1);
      setMeasurement(item.measurements1);
      setCertificate(item.certificate1);
      setCertificateURL(item.certificateUrl1);
      setPrice(item.fltPrice1);
      setSymmetry(item.symmetry1);

      setSecondDiamondID(item.diamondID2);
      setSecondShape(item.cut2);
      setSecondCarat(item.size2);
      setSecondColor(item.color2);
      setSecondClarity(item.clarity2);
      setSecondDepth(item.depth2);
      setSecondCut(item.cutGrade2);
      setSecondTable(item.tableMeasure2);
      setSecondPolish(item.polish2);
      setSecondMeasurement(item.measurements2);
      setSecondCertificate(item.certificate2);
      setSecondCertificateURL(item.certificateUrl2);
      setSecondPrice(item.fltPrice2);
      setSecondSymmetry(item.symmetry2);

      setShow(true);
    }, 2000);
  };

  const handleSetBackValue = (item, e) => {
    e.preventDefault();

    console.log("coming here");

    navigate(
      "/apps/studbuilder/diamonds/product/" +
        item.cut1.replace(/\s+/g, "-").toLowerCase() +
        "-shape-" +
        item.color1.replace(/\s+/g, "-").toLowerCase() +
        "-color-" +
        item.clarity1.replace(/\s+/g, "-").toLowerCase() +
        "-clarity1-" +
        item.cutGrade1.replace(/\s+/g, "-").toLowerCase() +
        "-cut-" +
        item.certificate1.replace(/\s+/g, "-").toLowerCase() +
        "-cert-" +
        "-pairID-" +
        item.pairID
    );
    window.location.reload();
  };

  const functionWithSwitch = (param) => {
    //console.log(param);
    switch (param) {
      case "Good":
        return "G";
      case "Very good":
        return "VG";
      case "Excellent":
        return "Ex";
      case "Fair":
        return "F";
      case "Ideal":
        return "I";
      default:
        return "-";
    }
  };
  const handleUrl = (e) => {};

  console.log(props.listviewData);

  return (
    <>
      <LoadingOverlay className="_loading_overlay_wrapper">
        <Loader fullPage loading={loaded} />{" "}
      </LoadingOverlay>
      <div className="product-list-viewdata">
        <Table responsive="sm">
          <thead>
            <tr>
              <th
                scope="col"
                className={`table-sort ${getShapeOrderType}`}
                title="Shape"
                id="Cut"
                onClick={onClickShape}
              >
                Shape
              </th>
              <th
                scope="col"
                className={`table-sort ${getCaratOrderType}`}
                title="Carat"
                id="Size"
                onClick={onClickCarat}
              >
                Carat
              </th>
              <th
                scope="col"
                className={`table-sort ${getColorOrderType}`}
                title="Color"
                id="Color"
                onClick={onClickColor}
              >
                Color
              </th>
              <th
                scope="col"
                className={`table-sort ${getClarityOrderType}`}
                title="Clarity"
                id="ClarityID"
                onClick={onClickClarity}
              >
                Clarity
              </th>
              <th
                scope="col"
                className={`table-sort ${getCutOrderType}`}
                title="Cut"
                id="CutGrade"
                onClick={onClickCut}
              >
                Cut
              </th>
              <th
                scope="col"
                className={`table-sort ${getDepthOrderType}`}
                id="Depth"
                title="Depth"
                onClick={onClickDepth}
              >
                Depth
              </th>
              <th
                scope="col"
                className={`table-sort ${getTableOrderType}`}
                id="TableMeasure"
                title="Table"
                onClick={onClickTable}
              >
                Table
              </th>
              {/* <th
                scope="col"
                className={`table-sort ${getCertificateOrderType}`}
                id="Polish"
                title="Polish"
                onClick={onClickCertificate}
              >
                Polish
              </th>
              <th
                scope="col"
                className={`table-sort ${getSymmetryOrderType}`}
                id="Symmetry"
                title="Symmetry"
                onClick={onClickSymmetry}
              >
                Sym.
              </th> */}
              <th
                scope="col"
                className={`table-sort ${getMeasurementOrderType}`}
                id="Measurements"
                title="Measurement"
                onClick={onClickMeasurement}
              >
                Measurement
              </th>{" "}
              <th
                scope="col"
                className={`table-sort ${getCertificateOrderType}`}
                id="Certificate"
                title="Certificate"
                onClick={onClickCertificate}
              >
                Cert.
              </th>
              <th
                scope="col"
                className={`table-sort ${getPriceOrderType}`}
                id="FltPrice"
                title="Price"
                onClick={onClickPrice}
              >
                Price
              </th>
              <th
                scope="col"
                className="view-data"
                id="dia_view"
                onClick={onClickView}
              >
                View
              </th>
              {/* <th scope="col" className="all-data" id="diamond-data-icon"></th> */}
            </tr>
          </thead>
          {props.listviewData ? (
            <tbody>
              {props.listviewData.map((item) => (
                <tr key={item.$id} onClick={handleUrl}>
                  <td
                    id={item.pairID}
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div id={item.diamondID1} className="Cutcol">
                      <img src={item.diamondImage1} width="20" height="20" />
                      <span className="shape-name">
                        {item.cut1 ? item.cut1 : "-"}
                      </span>
                    </div>
                    <div id={item.diamondID1} className="Cutcol">
                      <img src={item.diamondImage2} width="20" height="20" />
                      <span className="shape-name">
                        {item.cut2 ? item.cut2 : "-"}
                      </span>
                    </div>
                  </td>
                  <td onClick={(e) => handleSetBackValue(item, e)}>
                    <div className="Sizecol">
                      {item.size1 ? item.size1 : "-"}
                    </div>
                    <div className="Sizecol">
                      {item.size2 ? item.size2 : "-"}
                    </div>
                  </td>
                  <td onClick={(e) => handleSetBackValue(item, e)}>
                    <div className="Colorcol">
                      {item.color1 ? item.color1 : "-"}
                    </div>
                    <div className="Colorcol">
                      {item.color2 ? item.color2 : "-"}
                    </div>
                  </td>
                  <td onClick={(e) => handleSetBackValue(item, e)}>
                    <div className="ClarityIDcol">
                      {item.clarity1 ? item.clarity1 : "-"}
                    </div>
                    <div className="ClarityIDcol">
                      {item.clarity2 ? item.clarity2 : "-"}
                    </div>
                  </td>
                  <td onClick={(e) => handleSetBackValue(item, e)}>
                    <div className="CutGradecol">
                      {item.cutGrade1 ? item.cutGrade1 : "-"}
                    </div>
                    <div className="CutGradecol">
                      {item.cutGrade2 ? item.cutGrade2 : "-"}
                    </div>
                  </td>
                  <td
                    className="HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div className="Depthcol">
                      {item.depth1 ? item.depth1 : "-"}
                    </div>
                    <div className="Depthcol">
                      {item.depth1 ? item.depth2 : "-"}
                    </div>
                  </td>
                  <td
                    className="HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div className="TableMeasurecol">
                      {item.tableMeasure1 ? item.tableMeasure1 : "-"}
                    </div>
                    <div className="TableMeasurecol">
                      {item.tableMeasure2 ? item.tableMeasure2 : "-"}
                    </div>
                  </td>
                  {/* <td
                    className="HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div className="Polishcol">
                      {item.polish1 ? item.polish1 : "-"}
                    </div>
                    <div className="Polishcol">
                      {item.polish2 ? item.polish2 : "-"}
                    </div>
                  </td>
                  <td
                    className="HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div className="Symmetrycol">
                      {item.symmetry1 ? item.symmetry1 : "-"}
                    </div>
                    <div className="Symmetrycol">
                      {item.symmetry2 ? item.symmetry2 : "-"}
                    </div>
                  </td> */}
                  <td
                    className="HiddenCol"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div className="Measurementscol">
                      {item.measurements1 ? item.measurements1 : "-"}
                    </div>
                    <div className="Measurementscol">
                      {item.measurements2 ? item.measurements2 : "-"}
                    </div>
                  </td>
                  <td>
                    <div
                      className="Certificatecol"
                      onClick={(e) => handleSetBackValue(item, e)}
                    >
                      {item.certificate1 ? item.certificate1 : "-"}
                    </div>
                    <div className="Certificatecol">
                      {item.certificate2 ? item.certificate2 : "-"}
                    </div>
                  </td>

                  <td
                    className="diamond-list_price"
                    onClick={(e) => handleSetBackValue(item, e)}
                  >
                    <div className="FltPricecol">
                      {item.totalPrice === "Call for Price"
                        ? ""
                        : window.currency}
                      {item.totalPrice !== "Call for Price"
                        ? Number(item.totalPrice).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })
                        : "Call For Price"}
                    </div>
                  </td>

                  <td className="ellipsis-data">
                    <div className="info-diamond">
                      <i className="fas fa-ellipsis-v"></i>
                    </div>
                    <div className="icon-hover">
                      <div className="view-icon">
                        <a
                          href="javascript:;"
                          onClick={(e) => handleSetBackValue(item, e)}
                          data-tip="View Diamond Details"
                          title="View Diamond Details"
                        >
                          <i className="fas fa-eye"></i>
                        </a>
                        <ReactTooltip />
                      </div>

                      <div
                        className="info-icon"
                        // onClick={handleShow(item.diamondID1, item.diamondID2)}
                        onClick={(e) => handleShow(item, e)}
                      >
                        <>
                          <i
                            id={item.diamondID1}
                            className="fas fa-info"
                            data-tip="Quick View"
                            value={item.diamondID2}
                          ></i>
                          <ReactTooltip />
                        </>
                      </div>
                      <Modal
                        show={getshow}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter "
                        centered
                        className="additional-info"
                      >
                        <Modal.Header closeButton onClick={handlePopupClose}>
                          <Modal.Title>Additional Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="diamond-information">
                            <ul className="diamond-spacification-list">
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Diamond ID</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getDiamondID ? getDiamondID : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Diamond ID </p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondDiamondID
                                      ? getSecondDiamondID
                                      : "NA"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Shape</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getShape ? getShape : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Shape</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondShape ? getSecondShape : "NA"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Carat</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getCarat ? getCarat : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Carat</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondCarat ? getSecondCarat : "NA"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Color</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getColor ? getColor : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Color</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondColor ? getSecondColor : "NA"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Clarity</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getClarity ? getClarity : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Clarity</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondClarity ? getSecondClarity : "NA"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Cut</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getCut ? getCut : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Cut</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getSecondCut ? getSecondCut : "NA"}</p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Depth %</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getDepth ? getDepth : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Depth %</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondDepth ? getSecondDepth : "NA"}
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Table %</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getTable ? getTable : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Table %</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondTable ? getSecondTable : "NA"}
                                  </p>
                                </div>
                              </li>
                              {/* <li>
                                <div className="diamonds-details-title">
                                  <p>Polish</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getPolish ? getPolish : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Polish</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondPolish ? getSecondPolish : "NA"}
                                  </p>
                                </div>
                              </li> */}
                              {/* <li>
                                <div className="diamonds-details-title">
                                  <p>Symmetry</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>{getSymmetry ? getSymmetry : "NA"}</p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Symmetry</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondSymmetry
                                      ? getSecondSymmetry
                                      : "NA"}
                                  </p>
                                </div>
                              </li> */}
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Measurement</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getMeasurement ? getMeasurement : "NA"}
                                  </p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Measurement</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondMeasurement
                                      ? getSecondMeasurement
                                      : "NA"}
                                  </p>
                                </div>
                              </li>
                              {/* <li>
                                <div className="diamonds-details-title">
                                  <p>Certificate</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    <a
                                      href={
                                        getCertificateURL
                                          ? getCertificateURL
                                          : "#"
                                      }
                                      target="_blank"
                                    >
                                      {getCertificate ? getCertificate : "NA"}
                                    </a>
                                  </p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Certificate</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    <a
                                      href={
                                        getSecondCertificateURL
                                          ? getSecondCertificateURL
                                          : "#"
                                      }
                                      target="_blank"
                                    >
                                      {getSecondCertificate
                                        ? getSecondCertificate
                                        : "NA"}
                                    </a>
                                  </p>
                                </div>
                              </li> */}
                              <li>
                                <div className="diamonds-details-title">
                                  <p>Price</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getPrice === "Call for Price"
                                      ? ""
                                      : window.initData.data[0].currency +
                                        getPrice}
                                  </p>
                                </div>
                                <div className="diamonds-details-title">
                                  <p>Second Diamond Price</p>
                                </div>
                                <div className="diamonds-info">
                                  <p>
                                    {getSecondPrice === "Call for Price"
                                      ? ""
                                      : window.initData.data[0].currency +
                                        getSecondPrice}
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="result-bottom">
              <h4> {"No Data Found"} </h4>
            </div>
          )}
        </Table>
      </div>
    </>
  );
};

export default ListDataTable;
