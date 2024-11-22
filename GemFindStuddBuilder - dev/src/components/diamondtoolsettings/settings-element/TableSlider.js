import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";
import { useCookies } from "react-cookie";

const TableSlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const marks = props.tableSliderData;
  const [startValue, setstartValue] = useState(props.tablemin);
  const [lastValue, setlastValue] = useState(props.tablemax);
  const [getfancycookies, setfancycookies] = useCookies([
    "_wpsavedfancydiamondfiltercookie",
  ]);

  // Changing State when volume increases/decreases
  const rangeSelector = (newValue) => {
    setstartValue(Number(newValue[0]));
    setlastValue(Number(newValue[1]));
    //props.callBack(newValue);
  };
  const rangeSelectorprops = (newValue) => {
    setstartValue(Number(newValue[0]));
    setlastValue(Number(newValue[1]));
    props.callBack(newValue);
  };

  // const startValueOnChange = (event) => {
  //   setstartValue(event.target.value);
  //   let sliderSelection = [];
  //   sliderSelection.push(parseInt(event.target.value));
  //   sliderSelection.push(lastValue);
  //   props.callBack(sliderSelection);
  // };

  // const endValueOnChange = (event) => {
  //   setlastValue(event.target.value);
  //   let sliderSelection = [];
  //   sliderSelection.push(startValue);
  //   sliderSelection.push(event.target.value);
  //   props.callBack(sliderSelection);
  // };

  const startValueOnChange = (event) => {
    const intValue = parseInt(event.target.value);
    if (Number.isInteger(intValue) && intValue >= 0 && intValue <= 100) {
      setstartValue(event.target.value);
      let sliderSelection = [];
      sliderSelection.push(parseInt(event.target.value));
      sliderSelection.push(lastValue);
      props.callBack(sliderSelection);
    } else {
      alert("Please Enter Valid Value");
      return;
    }
  };

  const endValueOnChange = (event) => {
    const intValue = parseInt(event.target.value);
    if (Number.isInteger(intValue) && intValue >= 0 && intValue <= 100) {
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
    //console.log(props);
    // if (props.callbacktab === "fancycolor") {
    //   setstartValue(Number(props.depthmint));
    //   setlastValue(Number(props.depthmax));

    //   if (
    //     getfancycookies._wpsavedfancydiamondfiltercookie &&
    //     getfancycookies._wpsavedfancydiamondfiltercookie.selectedmaxtable
    //   ) {
    //     setlastValue(
    //       getfancycookies._wpsavedfancydiamondfiltercookie.selectedmaxtable
    //     );
    //   } else {
    //     setlastValue("");
    //   }
    //   if (
    //     getfancycookies._wpsavedfancydiamondfiltercookie &&
    //     getfancycookies._wpsavedfancydiamondfiltercookie.selectedmintable
    //   ) {
    //     setstartValue(
    //       getfancycookies._wpsavedfancydiamondfiltercookie.selectedmintable
    //     );
    //   } else {
    //     setstartValue("");
    //   }
    // }
    if (props.tablemin === "" && props.tablemax === "") {
      setstartValue(Number(props.tableSliderData[0].minTable));
      setlastValue(Number(props.tableSliderData[0].maxTable));
    }
  }, []);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          {/* <Typography id="range-slider" className='f_heading' gutterBottom>
        Price
      </Typography> */}
          <h4 className="f_heading">
            Table
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
                Table percentage is the width of a diamond’s largest facet the
                table divided by its overall width. It tells you how big the
                “face” of a diamond is.
              </p>
            </div>
          </Modal>

          <div className="diamond-ui-slider diamond-small-slider">
            <Nouislider
              connect
              behaviour={"tap"}
              start={[startValue, lastValue]}
              step={1}
              range={{
                min: Number(marks[0].minTable),
                max: Number(marks[0].maxTable),
              }}
              //onUpdate={rangeSelector}
              onChange={rangeSelectorprops}
            />
          </div>
        </div>
        <div className="input-value-pr">
          <div className="input-value-left">
            <input
              type="text"
              value={startValue}
              onChange={startValueOnChange}
              className="input-left"
            />
            <span className="icon">%</span>
          </div>
          <div className="input-value-right">
            <input
              type="text"
              value={lastValue}
              onChange={endValueOnChange}
              className="input-left"
            />
            <span className="icon">%</span>
          </div>
        </div>
      </div>
    );
  }
};

export default TableSlider;
