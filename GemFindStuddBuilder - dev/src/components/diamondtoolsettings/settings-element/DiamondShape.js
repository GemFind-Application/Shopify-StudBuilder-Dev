import React, { useEffect, useState } from "react";
// import ReactDOM from 'react-dom';
import { Modal } from "react-responsive-modal";
import { useCookies } from "react-cookie";

import round from "../../../images/round.png";
import radiant from "../../../images/radiant.png";
import princess from "../../../images/princess.png";
import pear from "../../../images/pear.png";
import oval from "../../../images/oval.png";
import marquise from "../../../images/marquise.png";
import heart from "../../../images/heart.png";
import emerald from "../../../images/emerald.png";
import cushion from "../../../images/cushion.png";
import asscher from "../../../images/asscher.png";
const DiamondShape = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [userFirstClicked, setUserFirstClicked] = useState("0");
  const [finalShapeArray, setFinalShapeArray] = useState([]);
  const [itemId, selectedItemId] = useState("-1");
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getshapevalue, setshapevalue] = useState();

  let sliderSelection = [];
  let sliderSelection1 = [];

  const toggleActive = (id) => {
    selectedItemId(id);
    if (props.selectedShape === "") {
      selectedItemId("-1");
    } else {
      selectedItemId(id);
    }
  };

  const handleShape = (e) => {
    setUserFirstClicked("1");

    if (e.target.className === "") {
      const arr = props.selectedShape.split(",");
      //console.log(arr);
      arr.push(e.target.id);
      sliderSelection.push(arr);
      const initfinalinten = sliderSelection
        .map(function (m) {
          return m;
        })
        .join(",");
      props.callBack(initfinalinten);
    } else {
      let arrnew;
      const arr = props.selectedShape.split(",");
      var index = arr.indexOf(e.target.id);
      if (index !== -1) {
        arrnew = arr.splice(index, 1);
      }
      sliderSelection1.push(arr);
      const initfinalinten1 = sliderSelection1
        .map(function (m) {
          return m;
        })
        .join(",");
      props.callBack(initfinalinten1);
    }
  };
  useEffect(() => {
    {
      var finalCompareData = [];
      var i = 0;
      // if (getsettingcookies._shopify_ringsetting) {
      //   var selectedShapeArray =
      //     getsettingcookies._shopify_ringsetting[0].centerStoneFit.split(",");
      //   props.shapeData.forEach((element) => {
      //     finalCompareData.push({
      //       $id: element.$id,
      //       shapeImage: element.shapeImage,
      //       shapeName: element.shapeName,
      //       same_shape:
      //         selectedShapeArray.indexOf(element.shapeName) > -1 ? "1" : "0",
      //     });
      //     i++;
      //   });
      // } else {
      props.shapeData.forEach((element) => {
        finalCompareData.push({
          $id: element.$id,
          shapeImage: element.shapeImage,
          shapeName: element.shapeName,
          same_shape: "1",
        });
      });
      //}

      setFinalShapeArray(finalCompareData);
    }

    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].centerStoneFit
    ) {
      setsettingcookie(true);
      setshapevalue(getsettingcookies._shopify_ringsetting[0].centerStoneFit);
    }
    if (getsettingcookies._shopify_ringsetting) {
      var selectedShapeArray =
        getsettingcookies._shopify_ringsetting[0].centerStoneFit.split(",");
      setTimeout(() => {
        selectedShapeArray.forEach((element) => {
          document.getElementById(element).click();
        });
      }, 100);
    }
  }, [userFirstClicked]);

  return (
    <>
      <style>{``}</style>
      <h4 className="f_heading diamond_heading">
        Shape
        <span className="f_popup" onClick={onOpenModal}>
          <i className="fas fa-info-circle"></i>
        </span>
      </h4>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "popup_Overlay",
          modal: "popup_Modal",
        }}
      >
        <div className="popup_content">
          <p>
            A diamond’s shape is not the same as a diamond’s cut. The shape
            refers to the general outline of the stone, and not its light
            refractive qualities. Look for a shape that best suits the ring
            setting you have chosen, as well as the recipient’s preference and
            personality. Here are some of the more common shapes that Our site
            offers:
          </p>
          <div className="popup-Diamond-Table">
            <ul>
              <li>
                <span>
                  <img src={round} alt="Round"></img>
                </span>
                <span>Round</span>
              </li>
              <li>
                <span>
                  <img src={asscher} alt="asscher"></img>
                </span>
                <span>asscher</span>
              </li>
              <li>
                <span>
                  <img src={marquise} alt="marquise"></img>
                </span>
                <span>marquise</span>
              </li>
              <li>
                <span>
                  <img src={oval} alt="oval"></img>
                </span>
                <span>oval</span>
              </li>
              <li>
                <span>
                  <img src={cushion} alt="cushion"></img>
                </span>
                <span>cushion</span>
              </li>
              <li>
                <span>
                  <img src={radiant} alt="radiant"></img>
                </span>
                <span>radiant</span>
              </li>
              <li>
                <span>
                  <img src={pear} alt="pear"></img>
                </span>
                <span>pear</span>
              </li>
              <li>
                <span>
                  <img src={emerald} alt="emerald"></img>
                </span>
                <span>emerald</span>
              </li>
              <li>
                <span>
                  <img src={heart} alt="heart"></img>
                </span>
                <span>heart</span>
              </li>
              <li>
                <span>
                  <img src={princess} alt="princess"></img>
                </span>
                <span>princess</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      {getsettingcookie === false && (
        <ul>
          {finalShapeArray.map((item) => (
            <li
              onClick={handleShape}
              key={item.$id}
              id={item.shapeName}
              className={`diamond_shapes_lists shapes_lists ${
                item.shapeName
              }  ${
                props.selectedShape.indexOf(item.shapeName) > -1 ? "active" : ""
              }`}
            >
              <div className="shape_box">
                <input
                  onChange={() => toggleActive(item.$id)}
                  type="radio"
                  value={item.shapeName}
                  name="ring_shape"
                  className={`${
                    props.selectedShape.indexOf(item.shapeName) > -1
                      ? "active"
                      : ""
                  }`}
                  id={item.shapeName}
                />
              </div>
              <span>{item.shapeName}</span>
            </li>
          ))}
        </ul>
      )}

      {getsettingcookie === true && userFirstClicked === "0" && (
        <ul>
          {finalShapeArray.map((item) => (
            <li
              onClick={handleShape}
              key={item.$id}
              id={item.shapeName}
              className={`diamond_shapes_lists shapes_lists ${
                item.shapeName
              }  ${
                props.selectedShape.indexOf(item.shapeName) > -1
                  ? ""
                  : "inactive"
              }
              ${item.same_shape === "0" ? "inactive" : ""}
              `}
            >
              <div className="shape_box">
                <input
                  onChange={() => toggleActive()}
                  type="radio"
                  value={item.shapeName}
                  name="ring_shape"
                  className={`${
                    props.selectedShape.indexOf(item.shapeName) > -1
                      ? "active"
                      : ""
                  }`}
                  id={item.shapeName}
                />
              </div>
              <span>{item.shapeName}</span>
            </li>
          ))}
        </ul>
      )}
      {getsettingcookie === true && userFirstClicked === "1" && (
        <ul>
          {finalShapeArray.map((item) => (
            <li
              onClick={handleShape}
              key={item.$id}
              id={item.shapeName}
              className={`diamond_shapes_lists shapes_lists ${
                item.shapeName
              }  ${
                props.selectedShape.indexOf(item.shapeName) > -1 ? "active" : ""
              }
              ${item.same_shape === "0" ? "inactive" : ""}
              `}
            >
              <div className="shape_box">
                <input
                  onChange={() => toggleActive()}
                  type="radio"
                  value={item.shapeName}
                  name="ring_shape"
                  className={`${
                    props.selectedShape.indexOf(item.shapeName) > -1
                      ? "active"
                      : ""
                  }`}
                  id={item.shapeName}
                />
              </div>
              <span>{item.shapeName}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DiamondShape;
