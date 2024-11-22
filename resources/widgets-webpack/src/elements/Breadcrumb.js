import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./breadcrumb.module.css";

const Breadcumb = (props) => {
    const [getInitData, setGetInitData] = useState([]);
    const [getsettingcookies, setsettingcookies] = useCookies([
        "_shopify_ringsetting",
    ]);
    const [getdiamondcookies, setdiamondcookies] = useCookies([
        "_shopify_diamondsetting",
    ]);
    const [getDiamondCookie, setDiamondCookie] = useState(false);
    const [getsettingcookie, setsettingcookie] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [getDiamondViewPath, setDiamondViewPath] = useState("");

    // const navigate = useNavigate();

    var currentNavValue = "settings";
    //console.log(currentNavValue);

    const handleview = (e) => {
        if (getdiamondcookies._shopify_diamondsetting[0].diamondpath) {
            removeCookie("_shopify_diamondsetting", { path: "/" });
            window.location.href =
                "/apps/studbuilder/" +
                getdiamondcookies._shopify_diamondsetting[0].diamondpath;
        }
    };
    const getInitTool = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shop_domain: window.Shopify.shop }),
        };
        try {
            const res = await fetch(
                "http://studbuilder.gemfind.us/api/initToolApi",
                requestOptions
            );
            const initData = await res.json();
            console.log(initData);
            setGetInitData(initData.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (getdiamondcookies._shopify_diamondsetting) {
            setDiamondViewPath(
                getdiamondcookies._shopify_diamondsetting[0].diamondpath
            );
        }

        if (
            getsettingcookies._shopify_ringsetting &&
            getsettingcookies._shopify_ringsetting[0].settingId
        ) {
            setsettingcookie(true);
        }
        if (
            getdiamondcookies._shopify_diamondsetting &&
            getdiamondcookies._shopify_diamondsetting[0].diamondId
        ) {
            setDiamondCookie(true);
        }
        getInitTool();
    }, []);

    const handlenavigation = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        if (e.target.id === "completeearring") {
            if (getDiamondCookie === true && getsettingcookie === true) {
                var redirect_url =
                    "https://" +
                    window.Shopify.shop +
                    "/apps/studbuilder/completeearring";
                window.location.href = redirect_url;
            }
        }
        if (e.target.id === "settings") {
            if (getInitData.is_api === "false") {
                window.location.href = "/collections/studbuilder-settings";
            } else {
                // navigate("/apps/ringbuilderadvance/" + e.target.id);
            }

            //Remove diamond cookies on tab toggling
            if (
                getsettingcookies._shopify_ringsetting &&
                getsettingcookies._shopify_ringsetting[0].settingId
            ) {
                removeCookie("_shopify_ringsetting", { path: "/" });
            }
        }
        if (e.target.id === "diamonds") {
            //Remove ring setting cookies on tab toggling
            if (
                getdiamondcookies._shopify_diamondsetting &&
                getdiamondcookies._shopify_diamondsetting[0].diamondId
            ) {
                removeCookie("_shopify_diamondsetting", { path: "/" });
            }
            window.location.href = "/apps/studbuilder/" + e.target.id;
        }
    };

    return (
        <>
            <li
                className={`${styles.tabLi} ${
                    currentNavValue === props.Data.urlkey ? styles.active : ""
                }`}
            >
                <div className={styles.breadCumbs}>
                    <div
                        class={styles.breadcumbs_links}
                        id={`${props.Data.urlkey}`}
                    >
                        <span
                            id={`${props.Data.urlkey}`}
                            className={styles.tabTitle}
                        >
                            {props.Data.subTitle}{" "}
                            <strong id={`${props.Data.urlkey}`}>
                                {" "}
                                {props.Data.title}
                            </strong>
                        </span>
                        <h6 className={styles.view_edit_btn}>
                            <span className={styles.view_setting}>
                                {getDiamondCookie === true &&
                                    props.Data.urlkey !== "settings" &&
                                    props.Data.urlkey !== "completeearring" &&
                                    currentNavValue !== props.Data.urlkey && (
                                        <a
                                            href={getDiamondViewPath}
                                            onClick={handleview}
                                        >
                                            Edit
                                            <span
                                                className={styles.view_pattern}
                                            >
                                                |
                                            </span>
                                        </a>
                                    )}
                            </span>

                            <span className={styles.edit_setting}>
                                {
                                    /* {getDiamondCookie === true &&
                  props.Data.urlkey !== "settings" && */
                                    props.Data.urlkey !== "completeearring" && (
                                        <a
                                            href={`/apps/studbuilder/${props.Data.urlkey}`}
                                            id={`${props.Data.urlkey}`}
                                            // onClick={handlenavigation}
                                        >
                                            View
                                        </a>
                                    )
                                }
                            </span>
                        </h6>
                        {props.Data.image === "ringIcon" && (
                            <a
                                href={`/apps/studbuilder/${props.Data.urlkey}`}
                                id={`${props.Data.urlkey}`}
                            >
                                <i
                                    className={`${styles.ringIcon} ${styles.tabIcon}`}
                                    id={`${props.Data.urlkey}`}
                                ></i>
                            </a>
                        )}
                        {props.Data.image === "diamondIcon" && (
                            <a
                                href={`/apps/studbuilder/${props.Data.urlkey}`}
                                id={`${props.Data.urlkey}`}
                            >
                                <i
                                    className={`${styles.diamondIcon} ${styles.tabIcon}`}
                                    id={`${props.Data.urlkey}`}
                                ></i>
                            </a>
                        )}
                        {props.Data.image === "finalringIcon" && (
                            <i
                                className={`${styles.finalringIcon} ${styles.tabIcon}`}
                                id={`${props.Data.urlkey}`}
                            ></i>
                        )}
                    </div>
                </div>
            </li>
        </>
    );
};

export default Breadcumb;
