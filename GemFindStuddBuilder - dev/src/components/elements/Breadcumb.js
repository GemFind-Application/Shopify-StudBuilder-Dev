import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Breadcumb = (props) => {
  const location = useLocation();
  var settingsurl = location.pathname.includes("settings");
  var diamondtoolurl = location.pathname.includes("diamonds");
  var compareurl = location.pathname.includes("compare");
  var completeringurl = location.pathname.includes("completeearring");
  var labgownurl = location.pathname.includes("navfancycolored");
  var fancycolorurl = location.pathname.includes("navlabgrown");
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);

  const [getDiamondViewPath, setDiamondViewPath] = useState("");
  const [getRingViewPath, setRingViewPath] = useState("");
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "shopify_ringbackvalue",
  ]);
  const navigate = useNavigate();
  //console.log(props.Data.urlkey);

  var currentNavValue = "diamonds";
  if (settingsurl) {
    currentNavValue = "settings";
  }
  if (diamondtoolurl) {
    currentNavValue = "diamonds";
  }
  if (labgownurl) {
    currentNavValue = "diamonds";
  }
  if (fancycolorurl) {
    currentNavValue = "diamonds";
  }
  if (completeringurl) {
    currentNavValue = "completeearring";
  }
  if (compareurl) {
    currentNavValue = "diamonds";
  }
  // console.log("props.Data.urlkey");
  //console.log(props);

  //Navigation fo View And Edit
  //console.log(getdiamondcookies._shopify_diamondsetting[0].diamondpath);
  const handleview = (e) => {
    if (getdiamondcookies._shopify_diamondsetting[0].diamondpath) {
      if (window.initData.data[0].is_api === "true") {
        // removeCookie("_shopify_ringsetting", { path: "/" });
        removeCookie("_shopify_diamondsetting", { path: "/" });
        navigate(
          "/apps/studbuilder/" +
            getdiamondcookies._shopify_diamondsetting[0].diamondpath
        );
      } else {
        removeCookie("_shopify_diamondsetting", { path: "/" });
        navigate(
          "/apps/studbuilder/" +
            getdiamondcookies._shopify_diamondsetting[0].diamondpath
        );
      }
    }
  };

  const handlRingeview = (e) => {
    if (getsettingcookies._shopify_ringsetting[0].ringpath) {
      // console.log("test Condition");
      removeCookie("_shopify_ringsetting", { path: "/" });
      //removeCookie("_shopify_diamondsetting", { path: "/" });
      navigate(
        "/products/" + getsettingcookies._shopify_ringsetting[0].ringpath
      );
    }
  };

  const handlenavigation = (e) => {
    e.preventDefault();
    // console.log("e.target.id");
    // console.log(e.target.id);
    if (e.target.id === "completeearring") {
      if (getDiamondCookie === true && getsettingcookie === true) {
        navigate("/apps/studbuilder/completeearring");
      }
    }
    if (e.target.id === "settings") {
      if (window.initData.data[0].is_api === "false") {
        window.location.href = "/collections/studbuilder-settings";
      } else {
        navigate("/apps/studbuilder/" + e.target.id);
      }

      //Remove diamond cookies on tab toggling
      if (
        getsettingcookies._shopify_ringsetting &&
        getsettingcookies._shopify_ringsetting[0].setting_id
      ) {
        removeCookie("_shopify_ringsetting", { path: "/" });
      }
      if (cookies.shopify_ringbackvalue) {
        removeCookie("shopify_ringbackvalue", { path: "/" });
      }
    }
    if (e.target.id === "diamonds") {
      //console.log("test");
      //Remove ring setting cookies on tab toggling
      if (window.initData.data[0].is_api === "true") {
        if (
          getdiamondcookies._shopify_diamondsetting &&
          getdiamondcookies._shopify_diamondsetting[0].diamondId
        ) {
          removeCookie("_shopify_diamondsetting", { path: "/" });
          //removeCookie("_shopify_ringsetting", { path: "/" });
        }
      } else {
        if (
          getdiamondcookies._shopify_diamondsetting &&
          getdiamondcookies._shopify_diamondsetting[0].diamondId
        ) {
          removeCookie("_shopify_diamondsetting", { path: "/" });
        }
        navigate("/apps/studbuilder/" + e.target.id);
      }

      if (
        getdiamondcookies.shopify_diamondbackvalue &&
        getdiamondcookies.shopify_diamondbackvalue[0].diamondId
      ) {
        removeCookie("shopify_diamondbackvalue", { path: "/" });
      }
      navigate("/apps/studbuilder/" + e.target.id);
    }
    if (e.target.id === "settings") {
      //Remove ring setting cookies on tab toggling
      if (
        getdiamondcookies._shopify_diamondsetting &&
        getdiamondcookies._shopify_diamondsetting[0].diamondId
      ) {
        removeCookie("_shopify_ringsetting", { path: "/" });
      }

      if (
        getdiamondcookies.shopify_diamondbackvalue &&
        getdiamondcookies.shopify_diamondbackvalue[0].diamondId
      ) {
        removeCookie("shopify_diamondbackvalue", { path: "/" });
      }
      navigate("/apps/studbuilder/" + e.target.id);
    }
    if (
      e.target.value ===
      getdiamondcookies._shopify_diamondsetting[0].diamondpath
    ) {
      //console.log("test Condition");
      removeCookie("_shopify_ringsetting", { path: "/" });
      removeCookie("_shopify_diamondsetting", { path: "/" });
    }
  };

  useEffect(() => {
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].settingId
    ) {
      setsettingcookie(true);
    }

    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].setting_id
    ) {
      setsettingcookie(true);
    }

    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }

    if (getdiamondcookies._shopify_diamondsetting) {
      setDiamondViewPath(
        getdiamondcookies._shopify_diamondsetting[0].diamondpath
      );
    }

    if (getsettingcookies._shopify_ringsetting) {
      setRingViewPath(getsettingcookies._shopify_ringsetting[0].ringpath);
    }
  }, []);

  // console.log(getsettingcookie);
  // console.log(props.Data.urlkey);

  return (
    <>
      <style>
        {`.breadCumbs .active div {
                background-color: ${window.initData.data[0].header_colour};
                
            }
            // .breadCumbs .breadCumb.active h2{
            // color: ${window.initData.data[0].link_colour};
            // }
            // .breadCumbs .active a p.subTitle{
            //   color: ${window.initData.data[0].link_colour};
            // }
            .breadCumbs .active div::before , .breadCumbs .active div::after{
              border-left-color:${window.initData.data[0].header_colour};
            }
            `}
      </style>

      <div
        className={`breadCumb ${
          currentNavValue === props.Data.urlkey ? "active" : ""
        }`}
      >
        <div id={`${props.Data.urlkey}`}>
          <span id={`${props.Data.urlkey}`} className="breadcumb-title">
            <p className="subTitle" id={`${props.Data.urlkey}`}>
              {props.Data.subTitle}
            </p>

            <h2 className="btitle" id={`${props.Data.urlkey}`}>
              {props.Data.title}
            </h2>
          </span>

          <h6 className="view-edit-btn">
            {/* <span>|</span> */}
            <span className="view-setting">
              {getDiamondCookie === true &&
                props.Data.urlkey !== "settings" &&
                props.Data.urlkey !== "completeearring" &&
                currentNavValue !== props.Data.urlkey &&
                window.initData.data[0].is_api === "true" && (
                  <a
                    href={`/apps/studbuilder/${props.Data.urlkey}`}
                    id={`${props.Data.urlkey}`}
                    onClick={handlenavigation}
                  >
                    View
                  </a>
                )}

              {
                /* {getDiamondCookie === true &&
                props.Data.urlkey !== "settings" &&*/
                props.Data.urlkey !== "completeearring" &&
                  //currentNavValue !== props.Data.urlkey &&
                  window.initData.data[0].is_api === "false" && (
                    <a
                      href={`/apps/studbuilder/${props.Data.urlkey}`}
                      id={`${props.Data.urlkey}`}
                      onClick={handlenavigation}
                    >
                      View
                    </a>
                  )
              }
              {getsettingcookie === true &&
                props.Data.urlkey !== "diamonds" &&
                props.Data.urlkey !== "completeearring" &&
                window.initData.data[0].is_api === "true" && (
                  <a
                    href={`/apps/studbuilder/${props.Data.urlkey}`}
                    id={`${props.Data.urlkey}`}
                    onClick={handlenavigation}
                  >
                    View
                  </a>
                )}

              {/* For Mounting view edit */}
              {getsettingcookie === true &&
                props.Data.urlkey !== "diamonds" &&
                props.Data.urlkey !== "completeearring" &&
                currentNavValue !== props.Data.urlkey &&
                window.initData.data[0].is_api === "false" && (
                  <a href={getRingViewPath} onClick={handlRingeview}>
                    <span className="view-pattern">|</span> Edit
                  </a>
                )}

              {getsettingcookie === true &&
                props.Data.urlkey !== "diamonds" &&
                props.Data.urlkey !== "completeearring" &&
                currentNavValue !== props.Data.urlkey &&
                window.initData.data[0].is_api === "true" && (
                  <a href={getRingViewPath} onClick={handlRingeview}>
                    <span className="view-pattern">|</span> Edit
                  </a>
                )}

              {/* {getsettingcookie === true &&
                props.Data.urlkey !== "diamonds" &&
                props.Data.urlkey !== "completeearring" &&
                window.initData.data[0].is_api === "false" && (
                  <a
                    href={`/collections/studbuilder-settings/`}
                    id={`${props.Data.urlkey}`}
                    onClick={handlenavigation}
                  >
                    View
                  </a>
                )} */}
            </span>
            <span className="edit-setting edit1">
              {getDiamondCookie === true &&
                props.Data.urlkey !== "settings" &&
                props.Data.urlkey !== "completeearring" &&
                currentNavValue !== props.Data.urlkey &&
                window.initData.data[0].is_api === "true" && (
                  <a href={getDiamondViewPath} onClick={handleview}>
                    <span className="view-pattern">|</span> Edit
                  </a>
                )}

              {getDiamondCookie === true &&
                props.Data.urlkey !== "settings" &&
                props.Data.urlkey !== "completeearring" &&
                currentNavValue !== props.Data.urlkey &&
                window.initData.data[0].is_api === "false" && (
                  <a href={getDiamondViewPath} onClick={handleview}>
                    <span className="view-pattern">|</span> Edit
                  </a>
                )}
            </span>
          </h6>
          <a
            href={`/apps/studbuilder/${props.Data.urlkey}`}
            id={`${props.Data.urlkey}`}
            onClick={handlenavigation}
          >
            <i className={props.Data.image} id={`${props.Data.urlkey}`}></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Breadcumb;
