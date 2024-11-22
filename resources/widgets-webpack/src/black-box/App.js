import React from "react";
import ReactDOM from "react-dom";
import { CONST } from "./constants";
import { config } from "../config";
import BreadCrumbUpper from "../elements/BreadCrumbUpper";
import ProductContainer from "../components/ProductDetail/ProductContainer";

const { TEST_BAR } = CONST;

const App = () => {
    const collectionExists = window.location.href;
    var collection = collectionExists.search("studbuilder-settings");
    const testBarStud = document.querySelector(
        "." + config[TEST_BAR].className
    );
    const addProductClass = document?.getElementById(
        "studBuilderAdvance-product-container-q78erabc"
    );
    if (
        window.meta.page.pageType === "collection" &&
        window.location.href.includes("studbuilder-settings") === true
    ) {
        if (collection !== -1) {
            return (
                <>
                    {testBarStud &&
                        ReactDOM.createPortal(<BreadCrumbUpper />, testBarStud)}
                </>
            );
        }
    }
    if (window.meta.page.pageType === "product") {
        if (window.meta.product.type === "StudBuilder") {
            return (
                <>
                    {testBarStud &&
                        ReactDOM.createPortal(<BreadCrumbUpper />, testBarStud)}
                    {addProductClass &&
                        ReactDOM.createPortal(
                            <ProductContainer />,
                            addProductClass
                        )}
                </>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default App;
