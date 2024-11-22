import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const CaratSlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.caratSliderData;
  const [startValue, setstartValue] = useState(Number(props.minCarat));
  const [lastValue, setlastValue] = useState(Number(props.maxCarat));
  const [getMinValue, setMinValue] = useState();
  const [getMaxValue, setMaxValue] = useState();

  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  // console.log("props");
  // console.log(props);

  if (getsettingcookies._shopify_ringsetting) {
    // console.log(getsettingcookies._shopify_ringsetting[0].ringmincarat);
    // console.log(getsettingcookies._shopify_ringsetting[0].ringmaxcarat);
  }

  // console.log(window.initData.data[0].settings_carat_ranges);

  const rangeSelector = (newValue) => {
    setstartValue(Number(newValue[0]));
    setlastValue(Number(newValue[1]));

    let sliderSelection = [];
    // sliderSelection.push(Number(newValue[0]));
    // sliderSelection.push(Number(newValue[1]));
  };

  const rangeSelectorprops = (newValue) => {
    setstartValue(Number(newValue[0]));
    setlastValue(Number(newValue[1]));
    // console.log("rangeslider");
    // console.log(Number(newValue[0]));
    let sliderSelection = [];
    sliderSelection.push(Number(newValue[0]));
    sliderSelection.push(Number(newValue[1]));
    // props.callBack(newValue);
    props.callBack(sliderSelection);
  };

  const startValueOnChange = (event) => {
    const intValue = parseInt(event.target.value);
    if (Number.isInteger(intValue) && intValue >= 0 && intValue <= 100) {
      // console.log(event.target.value);
      // setTimeout(() => {
      setstartValue(event.target.value);
      let sliderSelection = [];
      sliderSelection.push(event.target.value);
      sliderSelection.push(lastValue);
      props.callBack(sliderSelection);
    } else {
      alert("Please Enter Valid Value");
      return;
    }
    // }, 1000);
  };

  const endValueOnChange = (event) => {
    const intValue = parseInt(event.target.value);
    if (Number.isInteger(intValue) && intValue >= 0 && intValue <= 100) {
      // console.log(event.target.value);
      // setTimeout(() => {
      // input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/);
      setlastValue(event.target.value);
      let sliderSelection = [];
      sliderSelection.push(startValue);
      sliderSelection.push(event.target.value);
      props.callBack(sliderSelection);
    } else {
      alert("Please Enter Valid Value");
      return;
    }
  };

  useEffect(() => {
    setLoaded(true);

    // console.log(startValue);
    // console.log(lastValue);

    if (props.minCarat === "" && props.maxCarat === "") {
      setstartValue(Number(props.caratSliderData[0].minCarat));
      setlastValue(Number(props.caratSliderData[0].maxCarat));
    }

    if (getsettingcookies._shopify_ringsetting) {
      setMinValue(
        Number(getsettingcookies._shopify_ringsetting[0].ringmincarat)
      );
      setMaxValue(
        Number(getsettingcookies._shopify_ringsetting[0].ringmaxcarat)
      );
    }
  }, [props]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading diamond_heading">
            CARAT
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
                Carat is a unit of measurement to determine a diamond’s weight.
                Typically, a higher carat weight means a larger looking diamond,
                but that is not always the case. Look for the mm measurements of
                the diamond to determine its visible size.
              </p>
              <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/carat.jpg"
                }
                alt="Carat"
                className="popup-image"
              ></img>
            </div>
          </Modal>

          <div className="diamond-ui-slider diamond-small-slider">
            <Nouislider
              connect
              behaviour={"tap"}
              start={[
                getMinValue ? getMinValue : startValue,
                getMaxValue ? getMaxValue : lastValue,
              ]}
              range={{
                min: getMinValue ? getMinValue : Number(marks[0].minCarat),
                max: getMaxValue ? getMaxValue : Number(marks[0].maxCarat),
              }}
              tooltips={true}
              //onUpdate={rangeSelector}
              onChange={rangeSelectorprops}
            />
          </div>
        </div>
        <div className="input-value dia-input-value">
          <div className="input-value-left">
            <input
              type="text"
              value={getMinValue ? getMinValue : startValue}
              onChange={startValueOnChange}
            />{" "}
          </div>
          <div className="input-value-right">
            <input
              type="text"
              value={getMaxValue ? getMaxValue : lastValue}
              onChange={endValueOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CaratSlider;
