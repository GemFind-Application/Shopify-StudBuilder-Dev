import React, { useEffect, useState } from "react";
// import Typography from '@material-ui/core/Typography';
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import Skeleton from "react-loading-skeleton";
import "nouislider/distribute/nouislider.css";
import color from "../../../images/color.jpg";

const ColorSlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const marks1 = props.colorSliderData;
  const [getstartColor, setstartColor] = useState(Number(marks1[0].colorId));
  const [getendColor, setendColor] = useState(
    Number(marks1[marks1.length - 1].colorId)
  );
  const [loaded, setLoaded] = useState(false);
  const [loadedfirst, setloadedfirst] = useState(false);

  const CssClasses = {
    target: "target",
    base: "base",
    origin: "origin",
    handle: "handle",
    handleLower: "handle-lower",
    handleUpper: "handle-upper",
    touchArea: "touch-area",
    horizontal: "horizontal",
    vertical: "vertical",
    background: "background",
    connect: "connect",
    connects: "connects",
    ltr: "ltr",
    rtl: "rtl",
    textDirectionLtr: "txt-dir-ltr",
    textDirectionRtl: "txt-dir-rtl",
    draggable: "draggable",
    drag: "state-drag",
    tap: "state-tap",
    active: "active",
    tooltip: "tooltip",
    pips: "pips",
    pipsHorizontal: "pips-horizontal",
    pipsVertical: "pips-vertical",
    marker: "marker",
    markerHorizontal: "marker-horizontal",
    markerVertical: "marker-vertical",
    markerNormal: "marker-normal",
    markerLarge: "marker-sub",
    markerSub: "marker-sub",
    value: "value",
    valueHorizontal: "value-horizontal",
    valueVertical: "value-vertical",
    valueNormal: "value-normal",
    valueLarge: "value-sub",
    valueSub: "value-sub",
  };
  //console.log(props);

  const handlecolorSlider = (e) => {
    props.callBack(e);
    props.defaultColor(true);
  };

  function colorDiamond(value) {
    var res = props.colorSliderData.filter(function (v) {
      return v.colorId == value;
    });
    return res[0].colorName;
  }

  useEffect(() => {
    const markData = props.colorSliderData;
    if (props.setSelectedColorData === "") {
      //console.log("Selected Color");
      setstartColor(Number(markData[0].colorId));
      setendColor(Number(markData[markData.length - 1].colorId));
    }

    // if (loadedfirst === false) {
    if (props.setSelectedColorData !== "") {
      //console.log(props.colorSliderData);
      var selectedColorCookies = props.setSelectedColorData.split(",");
      //console.log(selectedColorCookies[0]);

      // console.log();"selected color");
      var colorval = selectedColorCookies[selectedColorCookies.length - 1];
      //console.log(colorval);

      var res = markData.findIndex(function (v) {
        return v.colorId == colorval;
      });
      //console.log(res);

      var finalcolorval = res + 1;
      // console.log(props.colorSliderData[finalcolorval].colorId);

      var colorvaldata = props.colorSliderData[finalcolorval].colorId;

      setstartColor(Number(selectedColorCookies[0]));
      setendColor(Number(colorvaldata));
      setloadedfirst(true);
    }
    //}
    setLoaded(true);
  }, [props]);

  if (loaded === false) {
    return <Skeleton height={80} />;
  } else {
    return (
      <div className="range-slider_diamond">
        <div className="slider">
          <h4 className="f_heading diamond_heading dia_heading">
            Color
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
                The color scale measures the degree of colorlessness in a
                diamond. D is the highest and most colorless grade, but also the
                most expensive. To get the most value for your budget, look for
                an eye colorless stone. For most diamonds, this is in the F-H
                range.
              </p>
              <img
                src={
                  window.initData.data[0].server_url +
                  process.env.PUBLIC_URL +
                  "/images/color.jpg"
                }
                alt="Color"
                className="popup-image"
              ></img>
            </div>
          </Modal>
          <div className="diamond-ui-slider">
            <Nouislider
              connect
              behaviour={"none"}
              start={[getstartColor, getendColor]}
              cssClasses={CssClasses}
              pips={{
                mode: "steps",
                stepped: true,
                density: marks1.length + 1,
                format: {
                  to: function (value) {
                    return colorDiamond(value);
                  },
                },
              }}
              clickablePips
              step={1}
              range={{
                min: Number(marks1[0].colorId),
                max: Number(marks1[marks1.length - 1].colorId),
              }}
              onChange={handlecolorSlider}
              onUpdate={handlecolorSlider}
            />
          </div>
        </div>
      </div>
    );
  }
};
export default ColorSlider;
