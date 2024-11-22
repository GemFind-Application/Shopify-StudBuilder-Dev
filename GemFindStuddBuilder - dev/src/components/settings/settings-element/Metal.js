import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
const Metal = (props) => {
  console.log(props);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [itemId, selectedItemId] = useState("-1");
  const toggleActive = (id) => {
    console.log(id);
    selectedItemId(id);
    if (props.selectedMetal !== "") {
      selectedItemId(id);
    }
    selectedItemId("-1");
  };

  return (
    <>
      <h4 className="f_heading">
        Metal
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
            This refer to different type of Metal Type to filter and select the
            appropriate ring as per your requirements. Look for a metal type
            best suit of your chosen ring.
          </p>
        </div>
      </Modal>
      <ul className="metal_lists">
        {props.metaldata.map((item) => (
          <li
            onClick={() => props.callBack(item.metalType)}
            key={item.$id}
            className={`metal_box ${itemId === item.$id ? "active" : ""} ${
              item.isActive != "1" ? "disabled" : ""
            } ${props.selectedMetal === item.metalType ? "active" : ""}`}
          >
            <input
              onChange={() => toggleActive(item.$id)}
              type="radio"
              disabled={item.isActive !== "1" ? true : false}
              value={item.metalType}
              name="ring_shape"
              id={"ring_shape_" + item.metalType}
            />
            <span className={`metalcolor_box ${item.metalType}`}>
              {item.metalName}
            </span>
            <span>{item.typeName}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Metal;
