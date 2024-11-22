import React, { useState } from "react";

const Type = (props) => {
  const [itemId, selectedItemId] = useState("-1");
  const toggleActive = (id) => {
    console.log(id);
    if (props.selectedCollection !== "") {
      selectedItemId(id);
    }
    selectedItemId("-1");
  };

  console.log(props.typedata);
  return (
    <>
      <style>
        {`.Type ul li:hover , .Type ul .active {
               border-bottom-color:  ${window.initData.data[0].hover_colour};
            }`}
      </style>
      <ul>
        {props.typedata.map((item) => (
          <li
            onClick={() => props.callBack(item.collectionName)}
            key={item.$id}
            className={`type_list ${itemId === item.$id ? "active" : ""} ${
              props.selectedCollection === item.collectionName ? "active" : ""
            }`}
          >
            <div className="type_box">
              <input
                onChange={() => toggleActive(item.$id)}
                type="radio"
                value={item.collectionName}
                name="ring_collection"
                id={"ring_collection_" + item.collectionName}
              />
              <img src={item.collectionImage} alt={item.collectionImage}></img>
              <span>{item.collectionName}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Type;
