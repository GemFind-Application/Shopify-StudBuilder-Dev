import React, { useState } from "react";
// import ReactDOM from 'react-dom';
import { Modal } from "react-responsive-modal";
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

const Shape = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [itemId, selectedItemId] = useState("-1");
  const toggleActive = (id) => {
    console.log(props.selectedShape);
    selectedItemId(id);

    if (props.selectedShape !== "") {
      selectedItemId(id);
    }
    selectedItemId("-1");
  };

  return (
    <>
      <style>
        {`.setting_shapes ul .shapes_lists .shape_box:hover , .setting_shapes ul .active .shape_box{
                background-color: ${window.initData.data[0].hover_colour};
            }`}
      </style>
      <h4 className="f_heading ">
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
                  <img
                    src={round}
                    alt="Round"
                    style={{ width: "26px", height: "26px" }}
                  ></img>
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

      <ul>
        {props.shapeData.map((item) => (
          <li
            onClick={() => props.callBack(item.shapeName)}
            key={item.$id}
            className={`shapes_lists ${item.shapeName} ${
              itemId === item.$id ? "active" : ""
            } ${item.isActive !== "1" ? "disabled" : ""} ${
              props.selectedShape === item.shapeName ? "active" : ""
            }`}
          >
            <div className="shape_box">
              <input
                onChange={() => toggleActive(item.$id)}
                type="radio"
                disabled={item.isActive !== "1" ? true : false}
                value={item.shapeName}
                name="ring_shape"
                id={"ring_shape_" + item.shapeName}
              />
            </div>
            <span>{item.shapeName}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Shape;
