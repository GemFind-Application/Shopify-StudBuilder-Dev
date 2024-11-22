import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";

const PriceSlider = (props) => {
  // Our States

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.pricerangeData;
  const [startPrice, setstartPrice] = useState(Number(props.pricemindata));
  const [lastPrice, setlastPrice] = useState(Number(props.pricemaxdata));

  console.log(props);
  // Changing State when volume increases/decreases
  const rangeSelector = (newValue) => {
    setstartPrice(parseInt(newValue[0]));
    setlastPrice(parseInt(newValue[1]));

    let sliderSelection = [];
    sliderSelection.push(parseInt(newValue[0]));
    sliderSelection.push(parseInt(newValue[1]));
    // props.callBack(sliderSelection);
  };

  const rangeSelectorprops = (newValue) => {
    setstartPrice(parseInt(newValue[0]));
    setlastPrice(parseInt(newValue[1]));

    let sliderSelection = [];
    sliderSelection.push(parseInt(newValue[0]));
    sliderSelection.push(parseInt(newValue[1]));
    props.callBack(sliderSelection);
  };

  const startPriceOnChange = (event) => {
    setstartPrice(event.target.value);
    let sliderSelection = [];
    sliderSelection.push(parseInt(event.target.value));
    sliderSelection.push(lastPrice);
    props.callBack(sliderSelection);
  };

  const endValueOnChange = (event) => {
    setlastPrice(event.target.value);
    let sliderSelection = [];
    sliderSelection.push(startPrice);
    sliderSelection.push(parseInt(event.target.value));
    props.callBack(sliderSelection);
  };

  useEffect(() => {
    setLoaded(true);
    console.log(props.pricemindata);
    console.log(props.pricemaxdata);

    // setstartPrice(Number(props.pricemindata));
    // setlastPrice(Number(props.pricemaxdata));
    if (props.pricemindata === "" && props.pricemaxdata === "") {
      setstartPrice(Number(marks[0].minPrice));
      setlastPrice(Number(marks[0].maxPrice));
    }
  }, [props]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
      <style>
      {`.range-slider_diamond .noUi-connect{
                background: ${window.initData["data"][0].slider_colour};
            }`}
    </style>
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading">
            Price
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
                This refer to different type of Price to filter and select the
                appropriate ring as per your requirements. Look for best suit
                price of your chosen ring.
              </p>
            </div>
          </Modal>
          <div className="diamond-ui-slider diamond-small-slider">
            <Nouislider
              connect={true}
              behaviour={"snap"}
              start={[startPrice, lastPrice]}
              range={{
                min: Number(marks[0].minPrice),
                max: Number(marks[0].maxPrice),
              }}
              onUpdate={rangeSelector}
              onChange={rangeSelectorprops}
            />
          </div>
        </div>
        <div className="input-value">
          <div className="input-value-left">
            <span className="icon">$</span>
            <input
              type="text"
              value={startPrice}
              onChange={startPriceOnChange}
            />{" "}
          </div>
          <div className="input-value-right">
            <span className="icon">$</span>
            <input type="text" value={lastPrice} onChange={endValueOnChange} />
          </div>
        </div>
      </div>
    );
  }
};

export default PriceSlider;
