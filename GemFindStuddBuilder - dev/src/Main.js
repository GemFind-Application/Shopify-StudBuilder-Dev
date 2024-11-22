import React, { useEffect, useState } from "react";
import { Routes, Route, Router, Redirect, useLocation } from "react-router-dom";
import Setting from "./components/settings/Setting";
import SettingDetails from "./components/settings-details/SettingDetails";
import DiamondtoolSetting from "./components/diamondtoolsettings/DiamondtoolSetting";
import DiamondSettingDetails from "./components/diamondsettings-details/DiamondSettingDetails";
import CompleteringSetting from "./components/completering-details/CompleteringSetting";

import Skeleton from "react-loading-skeleton";

const Main = () => {
  const [skeltonLoad, setskeltonLoad] = useState(false);
  const { pathname } = useLocation();

  const getInitTool = async (storename) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shop_domain: storename }),
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL}` + "/initToolApi",
        requestOptions
      );
      const initData = await res.json();
      window.initData = initData;
      //  console.log(window.initData);
      window.currency = window.initData.data[0].currency;
      window.compareproduct = [];
      window.miniprice = 0;
      window.serverurl = window.initData.data[0].server_url;
      window.maxprice = 0;
      window.spinloader = "true";
      setskeltonLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //getInitTool(document.getElementById("shop_domain").value);
    //console.log("coming back ");
    if (window.location.href.indexOf("localhost") > -1) {
      getInitTool("gemfind-app-store.myshopify.com");
    } else {
      getInitTool(document.getElementById("shop_domain").value);
    }
  }, []);

  if (skeltonLoad === true) {
    //console.log("coming here for test");
    //console.log(process.env.PUBLIC_URL);
    return (
      <Routes basename={"/studbuilder"}>
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/settings`}
          element={<Setting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/settings/*`}
          element={<SettingDetails />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/labgrownsettings`}
          element={<Setting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/labgrownsettings/*`}
          element={<SettingDetails />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/diamonds`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/navlabgrown`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/compare`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/navfancycolored`}
          element={<DiamondtoolSetting />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/diamonds/product/*`}
          element={<DiamondSettingDetails />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/completeearring`}
          element={<CompleteringSetting />}
        ></Route>
      </Routes>
    );
  } else {
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
};

export default Main;
