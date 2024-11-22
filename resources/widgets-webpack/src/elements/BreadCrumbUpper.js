import React, { useEffect, useState } from "react";
import Breadcumb from "./Breadcrumb";
import Data from "../elements/data";
import { useCookies } from "react-cookie";
import DataDiamond from "./data-diamond";
import styles from "./breadcrumb.module.css";
import { filter } from "lodash";

function BreadCrumbUpper() {
    const [getsettingcookies, setsettingcookies] = useCookies([
        "_shopify_ringsetting",
    ]);
    const [getdiamondcookies, setdiamondcookies] = useCookies([
        "_shopify_diamondsetting",
    ]);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [getDiamondCookie, setDiamondCookie] = useState(false);
    const [getsettingcookie, setsettingcookie] = useState(false);

    const handleReset = (e) => {
        if (getsettingcookies._shopify_ringsetting) {
            removeCookie("_shopify_ringsetting", { path: "/" });
            removeCookie("_shopify_diamondsetting", { path: "/" });
        }

        if (getdiamondcookies._shopify_diamondsetting) {
            removeCookie("_shopify_ringsetting", { path: "/" });
            removeCookie("_shopify_diamondsetting", { path: "/" });
        }
        window.location.reload();
    };

    useEffect(() => {
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
    }, []);

    return (
        <div className={`page-width ${styles.ringbuilderTabSection}`}>
            <ul className={styles.tabUl}>
                {getDiamondCookie === false &&
                    Data.map((item) => (
                        <Breadcumb Data={item} key={item.key} />
                    ))}

                {getDiamondCookie === true &&
                    DataDiamond.map((item) => (
                        <Breadcumb Data={item} key={item.key} />
                    ))}
            </ul>
            <div className={styles.save_reset_filter}>
                <a href="#" onClick={handleReset}>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" />
                        </svg>
                    </span>
                    Reset
                </a>
            </div>
        </div>
    );
}

export default BreadCrumbUpper;
