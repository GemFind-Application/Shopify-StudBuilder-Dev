import React, { useEffect, useState } from "react";
// import Typography from '@material-ui/core/Typography';
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";

const FancyColorSlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const marks1 = props.fancycolorSliderData;
  const [loaded, setLoaded] = useState(false);
  const [loadedfirst, setloadedfirst] = useState(false);
  const [getstartColor, setstartColor] = useState(Number(marks1[0].$id));
  const [getendColor, setendColor] = useState(
    Number(marks1[marks1.length - 1].$id)
  );
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

  ////console.log(props);

  function colorDiamond(value) {
    var res = props.fancycolorSliderData.filter(function (v) {
      return v.$id == value;
    });
    return res[0].diamondColorName;
  }

  const handlecolorSlider = (e) => {
    //console.log(e);
    props.callBack(e);
  };

  useEffect(() => {
    const markData = props.fancycolorSliderData;
    //console.log(markData[0].$id);
    //console.log(markData[markData.length - 1].$id);
    //console.log(props.setSelectedFancyColorData);
    // if (props.setSelectedFancyColorData === "") {
    // setstartColor(Number(markData[0].$id));
    // setendColor(Number(markData[markData.length - 1].$id));
    // }
    if (props.setSelectedFancyColorData !== "") {
      var selectedColorCookies = props.setSelectedFancyColorData.split(",");
      //console.log("selected cookies");
      //console.log(selectedColorCookies);

      var colorval = selectedColorCookies[selectedColorCookies.length - 1];
      if (colorval == "Last") {
        var colorval = selectedColorCookies[selectedColorCookies.length - 2];
      }
      //console.log("last value");
      //console.log(colorval);

      var res = markData.findIndex(function (v) {
        return v.diamondColorId == colorval;
      });

      //console.log("response");
      //console.log(res);
      var finalcolorval = res + 1;

      //console.log(finalcolorval);

      var colorvaldata =
        props.fancycolorSliderData[finalcolorval].diamondColorId;

      //console.log(colorvaldata);
      var firstval = markData.filter(function (v) {
        return v.diamondColorId == selectedColorCookies[0];
      });

      var lastval = markData.filter(function (v) {
        return v.diamondColorId == colorvaldata;
      });

      //console.log(lastval);
      setstartColor(Number(firstval[0].$id));
      //console.log(firstval[0].$id);
      setendColor(Number(lastval[0].$id));
      //console.log(lastval[0].$id);
    }

    setLoaded(true);
  }, []);

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
                src="https://gemfind.net/ringbuilderdev//assets/images/color.jpg"
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
              // range={{
              //   min: [getstartColor],
              //   max: [getendColor],
              // }}
              range={{
                min: Number(marks1[0].$id),
                max: Number(marks1[marks1.length - 1].$id),
              }}
              onSlide={handlecolorSlider}
              onUpdate={handlecolorSlider}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default FancyColorSlider;
