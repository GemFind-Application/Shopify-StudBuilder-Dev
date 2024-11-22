import React, { useEffect, useState } from "react";
import Breadcumb from "../elements/Breadcumb";
import Data from "../elements/data";
import DataDiamond from "../elements/data-diamond";
import DataMounting from "../elements/data-mounting";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const Compare = () => {
  return (
    <>
      <div className="tool-container">
        <div className="breadCumbs">
          {window.initData.data[0].is_api === "true" &&
            Data.map((item) => <Breadcumb Data={item} key={item.key} />)}{" "}
          {window.initData.data[0].is_api === "false" &&
            DataDiamond.map((item) => <Breadcumb Data={item} key={item.key} />)}
        </div>
        <div className="product-info"></div>
      </div>
    </>
  );
};

export default Compare;
