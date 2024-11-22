import React, { useEffect, useState } from "react";
// import Typography from '@material-ui/core/Typography';
import { Modal } from "react-responsive-modal";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Skeleton from "react-loading-skeleton";

const ClaritySlider = (props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);
  const [loadedfirst, setloadedfirst] = useState(false);

  const marks1 = props.claritySliderData;
  const [getstartClarity, setstartClarity] = useState(
    Number(marks1[0].clarityId)
  );
  const [getendClarity, setendClarity] = useState(
    Number(marks1[marks1.length - 1].clarityId)
  );
  //console.log(props);

  const handleclaritySlider = (e) => {
    //console.log(e);
    props.callBack(e);
    props.defaultClarity(true);
  };

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

  function clarityDiamond(value) {
    var res = props.claritySliderData.filter(function (v) {
      return v.clarityId == value;
    });
    return res[0].clarityName;
  }

  useEffect(() => {
    const markData = props.claritySliderData;
    if (props.setSelectedClarityData === "") {
      setstartClarity(Number(markData[0].clarityId));
      setendClarity(Number(markData[markData.length - 1].clarityId));
    }
    //if (loadedfirst === false) {
    if (props.setSelectedClarityData !== "") {
      var selectedClarityCookies = props.setSelectedClarityData.split(",");

      var clarityval =
        selectedClarityCookies[selectedClarityCookies.length - 1];

      var res = markData.findIndex(function (v) {
        return v.clarityId == clarityval;
      });
      var finalclarityval = res + 1;
      var clarityvaldata = props.claritySliderData[finalclarityval].clarityId;

      setstartClarity(Number(selectedClarityCookies[0]));
      setendClarity(Number(clarityvaldata));
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
            Clarity
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
                A diamond’s clarity refers to the tiny traces of natural
                elements that are trapped inside the stone. 99% of diamonds
                contain inclusions or flaws. You do not need a flawless diamond
                - they are very rare and expensive - but you want to look for
                one that is perfect to the naked eye. Depending on the shape of
                the diamond, the sweet spot for clarity is usually between VVS2
                to SI1.
              </p>
            </div>
          </Modal>
          <div className="diamond-ui-slider">
            <Nouislider
              connect
              behaviour={"none"}
              start={[getstartClarity, getendClarity]}
              cssPrefix={"noUi-"}
              cssClasses={CssClasses}
              pips={{
                mode: "steps",
                stepped: true,
                density: marks1.length + 1,
                format: {
                  to: function (value) {
                    return clarityDiamond(value);
                  },
                },
              }}
              clickablePips
              step={1}
              range={{
                min: Number(marks1[0].clarityId),
                max: Number(marks1[marks1.length - 1].clarityId),
              }}
              onChange={handleclaritySlider}
              onUpdate={handleclaritySlider}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ClaritySlider;
