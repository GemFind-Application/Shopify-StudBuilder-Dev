import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FacebookProvider, Like } from "react-facebook";
import { Scrollbars } from "rc-scrollbars";
import ReCAPTCHA from "react-google-recaptcha";

const ProductInformation = (props) => {
  let errors = {};
  let formIsValid = true;
  const [loaded, setLoaded] = useState(false);
  const locationurl = useLocation();
  const [cookies, setCookie] = useCookies(["_shopify_ringsetting"]);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getbrowsercookies, setbrowsercookies, removeCookie] = useCookies([
    "shopify_ringbackvalue",
  ]);
  const [getDiamondCookie, setDiamondCookie] = useState(false);
  const [getsettingcookie, setsettingcookie] = useState(false);
  const [getcaratmin, setcaratmin] = useState("");
  const [getcaratmax, setcaratmax] = useState("");
  const [getstone, setstone] = useState("");
  const [getNavUrl, setNavUrl] = useState("/apps/studbuilder/diamonds");
  const [getnavmenu, setnavmenu] = useState([]);

  const [open, setOpen] = useState(false);
  const onOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  const [openSecond, setOpenSecond] = useState(false);
  const onOpenSecondModal = (e) => {
    e.preventDefault();
    setyourname("");
    setyouremail("");
    setrecipientname("");
    setrecipientemail("");
    setgiftreason("");
    sethintmessage("");
    setgiftdeadline("");
    setOpenSecond(true);
  };
  const [openThird, setOpenThird] = useState(false);
  const onOpenThirdModal = (e) => {
    e.preventDefault();
    setreqname("");
    setreqemail("");
    setreqphone("");
    setreqmsg("");
    setreqcp("");
    setOpenThird(true);
  };
  const [openFour, setOpenFour] = useState(false);
  const onOpenFourthModal = (e) => {
    e.preventDefault();
    setname("");
    setemail("");
    setfrndname("");
    setfrndemail("");
    setfrndmessage("");
    setOpenFour(true);
  };
  const [openFive, setOpenFive] = useState(false);
  const onOpenFifthModal = (e) => {
    e.preventDefault();
    setschdname("");
    setschdemail("");
    setschdphone("");
    setschdmsg("");
    setschddate("");
    setschdtime("");
    setLocation("");
    setOpenFive(true);
  };
  const [virtualtryon, setvirtualtryon] = useState(false);
  const handelvirtualtryon = (e) => {
    e.preventDefault();
    setvirtualtryon(true);
  };
  const onCloseVirtualModal = () => setvirtualtryon(false);
  //console.log(props.currenturl);

  var listMetal = [];

  if (props.productDetailsData.configList) {
    const listItems = props.productDetailsData.configList.map(
      (val) => listMetal.push(val.metalType)
      // listMetal.push(val.gfInventoryId)
    );
  }

  var listMetal1 = [];
  const listItems1 = props.centerstoneData.map((x, i) =>
    listMetal1.push(x.stonesize)
  );

  const uniqueCenterStone = Array.from(new Set(listMetal1));
  console.log("uniqueNames123");
  console.log(uniqueCenterStone);

  const uniqueNames = Array.from(new Set(listMetal));

  console.log(props.productDetailsData.metalType);

  const currentSelectedMetaltype = props.currenturl.split("-sku");

  const [getDefaultMetalType, setDefaultMetalType] = useState(
    currentSelectedMetaltype[0]
  );

  const [getDefaultMetalColor, setDefaultMetalColor] = useState(
    props.productDetailsData.metalColor
  );

  const navigate = useNavigate();
  const handlemetalType = (event) => {
    console.log(event.target.value);
    const selectedMetalType = event.target.value;
    var productName = props.productDetailsData.productName;
    setDefaultMetalType(selectedMetalType);
    var res = props.productDetailsData.configList.filter(function (v) {
      return (
        // v.customAttribute == getstone &&
        v.metalType.replace(/\s+/g, "-").toLowerCase() == selectedMetalType
      );
    });

    setstone(res[0].customAttribute);

    if (res[0]) {
      var gfid = res[0].gfInventoryID;
      navigate(
        productName.replace(/\s+/g, "-").toLowerCase() +
          "/" +
          selectedMetalType +
          "-sku-" +
          gfid
      );
      window.location.reload();
    } else {
      toast.error(
        "This match is not available for selected metal type and centerstone",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
    props.callback(props);
  };

  const handleCorner = (event) => {
    setstone(event.target.value);

    var productName = props.productDetailsData.productName;
    var res = props.productDetailsData.configList.filter(function (v) {
      return (
        v.customAttribute == event.target.value &&
        v.metalType.replace(/\s+/g, "-").toLowerCase() == getDefaultMetalType
      );
    });

    if (res[0]) {
      var gfid = res[0].gfInventoryID;
      navigate(
        productName.replace(/\s+/g, "-").toLowerCase() +
          "/" +
          getDefaultMetalType +
          "-sku-" +
          gfid
      );
      window.location.reload();
    } else {
      window.location.reload();
    }
  };
  const [location, setLocation] = React.useState("");

  const handleChange = (event) => {
    // console.log(event.target.value);
    setLocation(event.target.value);
  };
  const onclickpopup = (e) => {
    e.preventDefault();
  };

  const [getRingSize, setRingSize] = useState("");

  const handleRingSize = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setRingSize(e.target.value);
  };

  const handlevirtual = (e) => {
    //console.log(props.productDetailsData.styleNumber);
    var styleNumber = props.productDetailsData.styleNumber
      .split("-")
      .map((item) => item.trim());

    // console.log(styleNumber[0]);

    e.preventDefault();
    Fancybox.show([
      {
        type: "iframe",
        src: `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${styleNumber[0]}&buynow=0`,
        iframe: {
          tpl: '<iframe id="tryoniFrameID" allowfullscreen class="fancybox-iframe" scrolling="auto" width="1200" height="800" allow="camera"></iframe>',
        },
        width: "100%",
        height: "100%",
      },
    ]);
  };

  //console.log(props);

  const handleRecaptchaChange = (response) => {
    setRecaptchaToken(response);
    setIsRecaptchaVerified(true); // Set verification status
  };

  const handleadddiamonds = (e) => {
    e.preventDefault();
    //console.log("getRingSize");
    //console.log(getRingSize);

    var ringData = [];
    var data = {};
    var styleNumber = props.productDetailsData.styleNumber
      .split("-")
      .map((item) => item.trim());

    //console.log(styleNumber[0]);
    // if (getRingSize === "" || getRingSize === 0) {
    //   alert("Please Select Ring Size");
    //   return;
    // } else {
    //   data.ringsizewithdia = getRingSize;
    // }

    console.log("getstone");
    console.log(getstone);

    var currentValue = parseFloat(getstone);

    // Calculate min and max values
    var minValue = (currentValue - 0.05).toFixed(2);
    var maxValue = (currentValue + 0.05).toFixed(2);

    // Log the results (you can use these values as needed)
    console.log("Min Value:", minValue);
    console.log("Max Value:", maxValue);

    data.ringmaxcarat = maxValue;
    data.ringmincarat = minValue;
    data.centerStoneFit = props.productDetailsData.centerStoneFit.replace(
      /\s/g,
      ""
    );
    data.centerStoneSize =
      props.productDetailsData.centerStoneMaxCarat +
      "-" +
      props.productDetailsData.centerStoneMinCarat;
    // data.sideStoneQuality = props.productDetailsData.sideStoneQuality[0];
    data.metalType = getDefaultMetalType;
    data.metalColor = getDefaultMetalColor;
    data.setting_id = props.productDetailsData.gfInventoryID;
    data.isLabSetting = props.productDetailsData.isLabSetting;
    data.ringpath = locationurl.pathname;
    data.styleNumber = styleNumber[0];
    //console.log(data);
    ringData.push(data);
    setCookie("_shopify_ringsetting", JSON.stringify(ringData), {
      path: "/",
      maxAge: 604800,
    });
    navigate(getNavUrl);
  };

  const handleCompletering = (e) => {
    e.preventDefault();

    //console.log("props.productDetailsData");

    //console.log(props.productDetailsData);
    var ringData = [];
    var data = {};
    // if (getRingSize === "" || getRingSize === 0) {
    //   alert("Please Select Ring Size");
    //   return;
    // } else {
    //   data.ringsizewithdia = getRingSize;
    // }
    data.ringmaxcarat = props.productDetailsData.centerStoneMaxCarat;
    data.ringmincarat = props.productDetailsData.centerStoneMinCarat;
    data.centerStoneFit = props.productDetailsData.centerStoneFit;
    data.metalType = getDefaultMetalType;
    data.metalColor = getDefaultMetalColor;

    data.centerStoneSize =
      props.productDetailsData.centerStoneMaxCarat +
      "-" +
      props.productDetailsData.centerStoneMinCarat;
    // data.sideStoneQuality = props.productDetailsData.sideStoneQuality[0];
    data.setting_id = props.productDetailsData.gfInventoryID;
    data.isLabSetting = props.productDetailsData.isLabSetting;
    data.ringpath = locationurl.pathname;
    //console.log(data);
    ringData.push(data);
    setCookie("_shopify_ringsetting", JSON.stringify(ringData), {
      path: "/",
      maxAge: 604800,
    });
    navigate("/apps/studbuilder/completeearring");
  };

  //console.log(props);

  //DROP HINT SUBMIT BUTTON
  const [getyourname, setyourname] = useState("");
  const [getyouremail, setyouremail] = useState("");
  const [getrecipientname, setrecipientname] = useState("");
  const [getrecipientemail, setrecipientemail] = useState("");
  const [getgiftreason, setgiftreason] = useState("");
  const [gethintmessage, sethintmessage] = useState("");
  const [getgiftdeadline, setgiftdeadline] = useState("");

  const [geterror, seterror] = useState([""]);

  const handleYourname = (event) => {
    setyourname(event.target.value);
  };
  const handleYouremail = (event) => {
    setyouremail(event.target.value);
  };
  const handleRecipientname = (event) => {
    setrecipientname(event.target.value);
  };
  const handleRecipientemail = (event) => {
    setrecipientemail(event.target.value);
  };
  const handleGiftreason = (event) => {
    setgiftreason(event.target.value);
  };
  const handleHintmessage = (event) => {
    sethintmessage(event.target.value);
  };
  const handleGiftdeadline = (event) => {
    setgiftdeadline(event.target.value);
  };

  const handledrophintSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getyourname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }
    if (getrecipientname === "") {
      errors["yourrpname"] = "Please enter your recipient name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getyouremail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }
    if (regex.test(getrecipientemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Reason
    if (getgiftreason === "") {
      errors["yourreason"] = "Please enter your reason";
      formIsValid = false;
    }

    //Message
    if (gethintmessage === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    //Deadline
    if (getgiftdeadline === "") {
      errors["yourdeadline"] = "Please enter your deadline";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      //console.log(errors);
      seterror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getyourname,
        email: getyouremail,
        hint_Recipient_name: getrecipientname,
        hint_Recipient_email: getrecipientemail,
        reason_of_gift: getgiftreason,
        hint_message: gethintmessage,
        deadline: getgiftdeadline,
        ring_url: window.location.href,
        settingid: props.productDetailsData.gfInventoryID,
        islabsettings: props.productDetailsData.isLabSetting,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/dropHintApi`,
        requestOptions
      );

      const hintData = await res.json();
      setOpenSecond(false);
      toast("Email Send Successfully");
      setLoaded(false);
      setyourname("");
      setyouremail("");
      setrecipientname("");
      setrecipientemail("");
      setgiftreason("");
      sethintmessage("");
      setgiftdeadline("");
      seterror("");
      //console.log(hintData);
    } catch (error) {
      //console.log();
    }
  };

  //REQUEST MORE INFORMATION SUBMIT BUTTON

  const [getreqname, setreqname] = useState("");
  const [getreqemail, setreqemail] = useState("");
  const [getreqphone, setreqphone] = useState("");
  const [getreqmsg, setreqmsg] = useState("");
  const [getreqcp, setreqcp] = useState("");

  const [getreqerror, setreqerror] = useState([""]);

  const handleReqname = (event) => {
    //console.log(event.target.value);
    setreqname(event.target.value);
  };
  const handleReqemail = (event) => {
    setreqemail(event.target.value);
  };
  const handleReqphone = (event) => {
    setreqphone(event.target.value);
  };
  const handleReqmsg = (event) => {
    setreqmsg(event.target.value);
  };
  const handleReqcp = (event) => {
    setreqcp(event.target.value);
  };
  //console.log(openThird);

  const handlereginfoSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getreqname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getreqemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Phone no.
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(getreqphone)) {
      errors["yourphone"] = "Please enter only number";
      formIsValid = false;
    } else if (getreqphone.length != 10) {
      errors["yourphone"] = "Please enter valid phone number.";
      formIsValid = false;
    }

    //Message
    if (getreqmsg === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    //Contact Preference
    if (getreqcp === "") {
      errors["yourcp"] = "Please select contact preference";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourreqrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      //console.log(errors);
      setreqerror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getreqname,
        email: getreqemail,
        phone_no: getreqphone,
        message: getreqmsg,
        contact_preference: getreqcp,
        ring_url: window.location.href,
        settingid: props.productDetailsData.gfInventoryID,
        islabsettings: props.productDetailsData.isLabSetting,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/reqInfoApi`,
        requestOptions
      );

      const reqData = await res.json();
      setOpenThird(false);
      toast("Email Send Successfully");
      setLoaded(false);
      setreqname("");
      setreqemail("");
      setreqphone("");
      setreqmsg("");
      setreqcp("");
      setreqerror("");
      //console.log(reqData);
    } catch (error) {
      //console.log();
    }
  };

  //EMAIL A FRIENDS SUBMIT BUTTON
  const [getname, setname] = useState("");
  const [getemail, setemail] = useState("");
  const [getfrndname, setfrndname] = useState("");
  const [getfrndemail, setfrndemail] = useState("");
  const [getfrndmessage, setfrndmessage] = useState("");

  const [getfrnderror, setfrnderror] = useState([""]);

  const handleName = (event) => {
    setname(event.target.value);
  };
  const handleEmail = (event) => {
    setemail(event.target.value);
  };
  const handleFrndname = (event) => {
    setfrndname(event.target.value);
  };
  const handleFrndemail = (event) => {
    setfrndemail(event.target.value);
  };
  const handleFrndmessage = (event) => {
    setfrndmessage(event.target.value);
  };

  const handleemailfrndSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }

    if (getfrndname === "") {
      errors["yourfrndname"] = "Please enter your friend name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }
    if (regex.test(getfrndemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Message
    if (getfrndmessage === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourfrndrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      //console.log(errors);
      setfrnderror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getname,
        email: getemail,
        frnd_name: getfrndname,
        frnd_email: getfrndemail,
        frnd_message: getfrndmessage,
        ring_url: window.location.href,
        settingid: props.productDetailsData.gfInventoryID,
        islabsettings: props.productDetailsData.isLabSetting,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/emailFriendApi`,
        requestOptions
      );

      const frndData = await res.json();
      setOpenFour(false);
      toast("Email Send Successfully");
      setLoaded(false);
      setname("");
      setemail("");
      setfrndname("");
      setfrndemail("");
      setfrndmessage("");
      setfrnderror("");
      //console.log(frndData);
    } catch (error) {
      //console.log();
    }
  };

  //SCHEDULE VIWING SUBMIT BUTTON

  const [getschdname, setschdname] = useState("");
  const [getschdemail, setschdemail] = useState("");
  const [getschdphone, setschdphone] = useState("");
  const [getschdmsg, setschdmsg] = useState("");
  const [getschddate, setschddate] = useState("");
  const [getschdtime, setschdtime] = useState("");

  const [getschderror, setschderror] = useState([""]);

  const handleSchdname = (event) => {
    setschdname(event.target.value);
  };
  const handleSchdemail = (event) => {
    setschdemail(event.target.value);
  };
  const handleSchdphone = (event) => {
    setschdphone(event.target.value);
  };
  const handleSchdmsg = (event) => {
    setschdmsg(event.target.value);
  };
  const handleSchddate = (event) => {
    setschddate(event.target.value);
  };
  const handleSchdtime = (event) => {
    //console.log(event.target.value);
    setschdtime(event.target.value);
  };

  const handleschdSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    //Validation

    //Name
    if (getschdname === "") {
      errors["yourname"] = "Please enter your name";
      formIsValid = false;
    }

    //Email
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(getschdemail) === false) {
      errors["youremail"] = "Please enter valid email";
      formIsValid = false;
    }

    //Phone no.
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(getschdphone)) {
      errors["yourphone"] = "Please enter only number";
      formIsValid = false;
    } else if (getschdphone.length != 10) {
      errors["yourphone"] = "Please enter valid phone number.";
      formIsValid = false;
    }

    //Message
    if (getschdmsg === "") {
      errors["yourmsg"] = "Please enter your message";
      formIsValid = false;
    }

    //Location
    if (location === "") {
      errors["yourlocation"] = "Please select your location";
      formIsValid = false;
    }

    //Availibilty Date
    if (getschddate === "") {
      errors["yourdate"] = "Please select your availibility date";
      formIsValid = false;
    }

    if (
      window.initData.data[0].site_key &&
      window.initData.data[0].secret_key
    ) {
      if (recaptchaToken === "") {
        errors["yourscrecaptcha"] = "The recaptcha token field is required.";
        formIsValid = false;
      }
    }

    if (formIsValid == false) {
      // console.log(errors);
      setschderror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getschdname,
        email: getschdemail,
        phone_no: getschdphone,
        schl_message: getschdmsg,
        location: location,
        availability_date: getschddate,
        appnt_time: getschdtime,
        ring_url: window.location.href,
        settingid: props.productDetailsData.gfInventoryID,
        islabsettings: props.productDetailsData.isLabSetting,
        shopurl: window.initData.data[0].shop,
        currency: window.currency,
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/scheViewApi`,
        requestOptions
      );

      const schdData = await res.json();
      setOpenFive(false);
      toast("Email Send Successfully");
      setLoaded(false);
      setschdname("");
      setschdemail("");
      setschdphone("");
      setschdmsg("");
      setschddate("");
      setschdtime("");
      setLocation("");
      setschderror("");

      //console.log(schdData);
    } catch (error) {
      //console.log();
    }
  };

  const getNavigationData = async () => {
    try {
      var url =
        `http://api.jewelcloud.com/api/RingBuilder/GetRBNavigation?DealerID=` +
        window.initData.data[0].dealerid;

      const res = await fetch(url);
      // console.log("navigation url");
      //console.log(url);

      const acrualRes = await res.json();

      var navarray = [];

      if (
        acrualRes[0].navMinedSetting &&
        acrualRes[0].navMinedSetting === "Mined Setting"
      ) {
        navarray.push("Mined");
      }

      if (
        acrualRes[0].navLabSetting &&
        acrualRes[0].navLabSetting === "Lab Setting"
      ) {
        navarray.push("Lab Grown");
      }

      setnavmenu(navarray);
      //console.log(getnavmenu);

      //console.log(getminedsetting);
      //console.log(getlabsetting);
      // console.log(acrualRes[0].navLabSetting);
      // console.log(acrualRes[0].navMinedSetting);
    } catch (error) {
      //console.log(error);
    }
  };

  const handleNavigation = (e) => {
    //console.log(e.target.value);
    if (e.target.value === "Mined") {
      setNavUrl("/apps/studbuilder/diamonds");
    } else if (e.target.value === "Lab Grown") {
      setNavUrl("/apps/studbuilder/navlabgrown");
    }
  };

  useEffect(() => {
    getNavigationData();
    // console.log(getbrowsercookies.shopify_ringbackvalue[0].tab);
    // if (
    //   getbrowsercookies.shopify_ringbackvalue &&
    //   getbrowsercookies.shopify_ringbackvalue[0].tab === "labgrown"
    // ) {
    //   getbrowsercookies.shopify_ringbackvalue[0].tab;
    // }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setDiamondCookie(true);
    }
    if (
      cookies._shopify_ringsetting &&
      cookies._shopify_ringsetting[0].setting_id
    ) {
      setsettingcookie(true);
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].centerstonemincarat
    ) {
      setcaratmin(
        getdiamondcookies._shopify_diamondsetting[0].centerstonemincarat
      );
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].centerstonemaxcarat
    ) {
      setcaratmax(
        getdiamondcookies._shopify_diamondsetting[0].centerstonemaxcarat
      );
    }

    // console.log(props.centerstoneData);
    // console.log(props.selectedCenterStone);

    if (props.selectedCenterStone === "") {
      toast.error(
        "This match is not available for selected metal type and centerstone",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
    if (props.selectedCenterStone) {
      setstone(props.selectedCenterStone);
    }
    window.onpopstate = () => {
      window.location.reload();
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="ring-descreption">
        <div className="product-info__title">
          <h2>{props.productDetailsData.productName}</h2>
          <h4 className="ring-spacifacation">
            <a href="#" onClick={onOpenModal}>
              <span>
                <i className="far fa-edit"></i>
              </span>
              Stud Specification
            </a>
          </h4>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "popup_Overlay",
              modal: "popup_product",
            }}
          >
            <div className="popup_content">
              <div className="diamond-information">
                <div className="spacification-info">
                  <h2>SETTING DETAILS</h2>
                </div>
                <ul>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Setting Number</p>
                    </div>
                    <div className="diamonds-info">
                      <p>{props.productDetailsData.styleNumber}</p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Price</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.cost === "Call for Price"
                          ? ""
                          : window.currency}
                        {props.productDetailsData.cost === "Call for Price"
                          ? "Call for Price"
                          : Number(
                              props.productDetailsData.cost
                            ).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                        {/* {window.currency}
                        {Number(props.productDetailsData.cost).toLocaleString(
                          undefined,
                          { maximumFractionDigits: 2 }
                        )} */}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="diamonds-details-title">
                      <p>Metal Type</p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.metalType
                          ? props.productDetailsData.metalType
                          : "NA"}
                      </p>
                    </div>
                  </li>
                  {props.productDetailsData.metalColor && (
                    <li>
                      <div className="diamonds-details-title">
                        <p>Metal Color</p>
                      </div>
                      <div className="diamonds-info">
                        <p>
                          {props.productDetailsData.metalColor
                            ? props.productDetailsData.metalColor
                            : "NA"}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
                <div className="spacification-info">
                  <h2>CAN BE SET WITH</h2>
                </div>
                <ul>
                  <li>
                    <div className="diamonds-details-title">
                      <p>
                        {props.productDetailsData.centerStoneFit
                          ? props.productDetailsData.centerStoneFit
                          : "NA"}
                      </p>
                    </div>
                    <div className="diamonds-info">
                      <p>
                        {props.productDetailsData.centerStoneMinCarat
                          ? props.productDetailsData.centerStoneMinCarat
                          : "NA"}
                        -
                        {props.productDetailsData.centerStoneMaxCarat
                          ? props.productDetailsData.centerStoneMaxCarat
                          : "NA"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        <div className="product-info__descreption">
          <p>{props.productDetailsData.productDescription}</p>
        </div>
        <div className="diaomnd-info">
          <div className="metaltype product-dropdown">
            <span>Metal Type</span>
            <select
              className="metaldropdown"
              defaultValue={getDefaultMetalType}
              select={getDefaultMetalType}
              name="metal_type"
              id="metal_type"
              onChange={handlemetalType}
            >
              {uniqueNames.map((item) => (
                <option
                  key={item}
                  data-id={item.gfInventoryID}
                  value={item.replace(/\s+/g, "-").toLowerCase()}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="metaltype product-dropdown">
            <span>Metal Type</span>
            <select
              className="metaldropdown"
              defaultValue={currentSelectedMetaltype[0]}
              name="metal_type"
              id="metal_type"
              onChange={handlemetalType}
            >
              {uniqueNames.map((item) => (
                <option
                  key={item}
                  data-id={item.gfInventoryId}
                  value={item.replace(/\s+/g, "-").toLowerCase()}
                >
                  {item}
                </option>
              ))}
            </select>
          </div> */}
          {/* <div className="stonesize product-dropdown">
            <span className={`${getstone}`}>Center Stone Size </span>
            <select
              className="stonesizedropdown"
              defaultValue={props.selectedCenterStone}
              name="stone_Size"
              id="stone_Size"
              onChange={handleCorner}
            >
              {props.centerstoneData.map((item) => (
                <option key={item.configid} value={item.stonesize}>
                  {item.stonesize}
                </option>
              ))}
            </select>
          </div> */}

          <div className="stonesize product-dropdown">
            <span className={`${getstone}`}>Center Stone Size </span>
            <select
              className="stonesizedropdown"
              defaultValue={props.selectedCenterStone}
              name="stone_Size"
              id="stone_Size"
              onChange={handleCorner}
            >
              {uniqueCenterStone.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="ringsize product-dropdown">
            <span> Carat Size </span>
           

            <select
              className="metaldropdown"
              defaultValue={props.selectedCenterStone}
              name="metal_color"
              id="metal_color"
              onChange={handleCorner}
            >
              {uniqueNamesColor.map((item) => (
                <option
                  key={item}
                  data-id={item.gfInventoryID}
                  value={item.replace(/\s+/g, "-").toLowerCase()}
                >
                  {item}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <p className="image-note">
          NOTE: All metal color images may not be available.
        </p>

        {window.initData.data[0].announcement_text_rbdetail && (
          <div className="diamond-details-text">
            <span>{window.initData.data[0].announcement_text_rbdetail}</span>
          </div>
        )}
        <div className="product-controller">
          <ul>
            {window.initData.data[0].enable_hint === "1" && (
              <li>
                <a href="#!" onClick={onOpenSecondModal}>
                  <span>
                    <i className="fas fa-gift"></i>
                  </span>
                  Drop A Hint
                </a>
                <Modal
                  open={openSecond}
                  onClose={() => setOpenSecond(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form",
                  }}
                >
                  <LoadingOverlay className="_loading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>

                  <div className="Diamond-form">
                    <div className="requested-form">
                      <h2>Drop A Hint</h2>
                      <p>Because you deserve this.</p>
                    </div>
                    <form
                      onSubmit={handledrophintSubmit}
                      className="drop-hint-form"
                    >
                      <div className="form-field">
                        <TextField
                          id="drophint_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getyourname}
                          onChange={handleYourname}
                        />
                        <p> {geterror.yourname} </p>
                        <TextField
                          id="drophint_email"
                          type="email"
                          label="Your E-mail"
                          focused
                          variant="outlined"
                          value={getyouremail}
                          onChange={handleYouremail}
                        />
                        <p> {geterror.youremail} </p>
                        <TextField
                          id="drophint_rec_name"
                          label="Hint Recipient's Name"
                          variant="outlined"
                          focused
                          value={getrecipientname}
                          onChange={handleRecipientname}
                        />
                        <p> {geterror.yourrpname} </p>
                        <TextField
                          id="drophint_rec_email"
                          type="email"
                          focused
                          label="Hint Recipient's E-mail"
                          variant="outlined"
                          value={getrecipientemail}
                          onChange={handleRecipientemail}
                        />
                        <p> {geterror.youremail} </p>
                        <TextField
                          id="dgift_reason"
                          label="Reason For This Gift"
                          variant="outlined"
                          focused
                          value={getgiftreason}
                          onChange={handleGiftreason}
                        />
                        <p> {geterror.yourreason} </p>

                        <TextField
                          id="drophint_message"
                          multiline
                          rows={3}
                          focused
                          label="Add A Personal Message Here.."
                          variant="outlined"
                          value={gethintmessage}
                          onChange={handleHintmessage}
                        />

                        <p> {geterror.yourmsg} </p>

                        <TextField
                          label="Gift Deadline"
                          id="date"
                          type="date"
                          focused
                          inputformat="MM/dd/yyyy"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={getgiftdeadline}
                          onChange={handleGiftdeadline}
                        />
                        <p> {geterror.yourdeadline} </p>

                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />

                                  <p> {geterror.yourrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="btn preference-btn"
                            >
                              <span>Drop Hint</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
            {window.initData.data[0].enable_more_info === "1" && (
              <li>
                <a href="#!" onClick={onOpenThirdModal}>
                  <span>
                    <i className="fas fa-info"></i>
                  </span>
                  Request More Info
                </a>
                <Modal
                  open={openThird}
                  onClose={() => setOpenThird(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form",
                  }}
                >
                  <LoadingOverlay className="_loading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>
                  <div className="Diamond-form--small">
                    <div className="requested-form">
                      <h2> REQUEST MORE INFORMATION</h2>
                      <p>Our specialists will contact you.</p>
                    </div>
                    <form
                      onSubmit={handlereginfoSubmit}
                      className="request-form"
                    >
                      <div className="form-field">
                        <TextField
                          id="request_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getreqname}
                          onChange={handleReqname}
                        />
                        <p> {getreqerror.yourname} </p>
                        <TextField
                          id="request_email"
                          type="email"
                          label="Your E-mail"
                          focused
                          variant="outlined"
                          value={getreqemail}
                          onChange={handleReqemail}
                        />
                        <p> {getreqerror.youremail} </p>
                        <TextField
                          id="request_phone"
                          label="Your Phone Number"
                          focused
                          variant="outlined"
                          value={getreqphone}
                          onChange={handleReqphone}
                        />
                        <p> {getreqerror.yourphone} </p>
                        <TextField
                          id="req_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
                          variant="outlined"
                          value={getreqmsg}
                          onChange={handleReqmsg}
                        />

                        <p> {getreqerror.yourmsg} </p>

                        <div className="contact-prefrtence">
                          <span>Contact Preference:</span>
                          <div className="pref_container">
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={getreqcp}
                                onChange={handleReqcp}
                              >
                                <FormControlLabel
                                  value="By Email"
                                  name="contact_pref"
                                  control={<Radio />}
                                  label="By Email"
                                />
                                <FormControlLabel
                                  value="By Phone"
                                  name="contact_pref"
                                  control={<Radio />}
                                  label="By Phone"
                                />
                              </RadioGroup>
                            </FormControl>
                          </div>
                        </div>
                        <p> {getreqerror.yourcp}</p>
                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />
                                  <p> {getreqerror.yourreqrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="btn preference-btn"
                            >
                              <span>Request</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
            {window.initData.data[0].enable_email_friend === "1" && (
              <li>
                <a href="#!" onClick={onOpenFourthModal}>
                  <span>
                    <i className="fas fa-envelope"></i>
                  </span>
                  E-Mail A Friend
                </a>
                <Modal
                  open={openFour}
                  onClose={() => setOpenFour(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form-extra-small",
                  }}
                >
                  <LoadingOverlay className="_loading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>
                  <div className="Diamond-form--xx-small">
                    <div className="requested-form">
                      <h2> E-MAIL A FRIEND</h2>
                    </div>
                    <form
                      onSubmit={handleemailfrndSubmit}
                      className="email-form"
                    >
                      <div className="form-field">
                        <TextField
                          id="your_name"
                          label="Your Name"
                          focused
                          variant="outlined"
                          value={getname}
                          onChange={handleName}
                        />
                        <p> {getfrnderror.yourname} </p>
                        <TextField
                          id="your_email"
                          type="email"
                          label="Your E-mail"
                          focused
                          variant="outlined"
                          value={getemail}
                          onChange={handleEmail}
                        />
                        <p> {getfrnderror.youremail} </p>
                        <TextField
                          id="fri_name"
                          label="Your Friend's Name"
                          focused
                          variant="outlined"
                          value={getfrndname}
                          onChange={handleFrndname}
                        />
                        <p> {getfrnderror.yourfrndname} </p>
                        <TextField
                          id="f_email"
                          type="email"
                          label="Your Friend's E-mail"
                          focused
                          variant="outlined"
                          value={getfrndemail}
                          onChange={handleFrndemail}
                        />
                        <p> {getfrnderror.youremail} </p>
                        <TextField
                          id="email-fri_message"
                          multiline
                          focused
                          rows={3}
                          label="Add A Personal Message Here.."
                          variant="outlined"
                          value={getfrndmessage}
                          onChange={handleFrndmessage}
                        />

                        <p> {getfrnderror.yourmsg} </p>

                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />

                                  <p> {getfrnderror.yourfrndrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="btn preference-btn"
                            >
                              <span>Send To Friend</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
            {window.initData.data[0].enable_schedule_viewing === "1" && (
              <li>
                <a href="#!" onClick={onOpenFifthModal}>
                  <span>
                    <i className="far fa-calendar-alt"></i>
                  </span>
                  Schedule Viewing
                </a>
                <Modal
                  open={openFive}
                  onClose={() => setOpenFive(false)}
                  center
                  classNames={{
                    overlay: "popup_Overlay",
                    modal: "popup-form",
                  }}
                >
                  <LoadingOverlay className="_loading_overlay_wrapper">
                    <Loader fullPage loading={loaded} />
                  </LoadingOverlay>

                  <div className="Diamond-form">
                    <div className="requested-form">
                      <h2>SCHEDULE A VIEWING</h2>
                      <p>See This Item And More In Our Store.</p>
                    </div>
                    <form onSubmit={handleschdSubmit} className="schedule-form">
                      <div className="form-field">
                        <TextField
                          id="schedule_name"
                          label="Your Name"
                          focused
                          value={getschdname}
                          onChange={handleSchdname}
                        />
                        <p> {getschderror.yourname} </p>

                        <TextField
                          id="schedule_email"
                          type="email"
                          label="Your E-mail Address"
                          focused
                          variant="outlined"
                          value={getschdemail}
                          onChange={handleSchdemail}
                        />
                        <p> {getschderror.youremail} </p>

                        <TextField
                          id="schedule_num"
                          label="Your Phone Number"
                          focused
                          variant="outlined"
                          value={getschdphone}
                          onChange={handleSchdphone}
                        />
                        <p> {getschderror.yourphone} </p>

                        <TextField
                          id="drophint_message"
                          multiline
                          focused
                          rows={3}
                          label="Add A Personal Message Here.."
                          variant="outlined"
                          value={getschdmsg}
                          onChange={handleSchdmsg}
                        />
                        <p> {getschderror.yourmsg} </p>

                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          // defaultValue={10}
                          value={location}
                          onChange={handleChange}
                          label="Location"
                          focused
                          variant="outlined"
                        >
                          <MenuItem value={"Test"}>Test</MenuItem>
                          <MenuItem value={"Newport beach123"}>
                            Newport beach123
                          </MenuItem>
                        </Select>
                        <p> {getschderror.yourlocation} </p>

                        <TextField
                          label="When are you available?"
                          focused
                          id="date"
                          type="date"
                          inputformat="MM/dd/yyyy"
                          variant="outlined"
                          value={getschddate}
                          onChange={handleSchddate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <p> {getschderror.yourdate} </p>

                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="select_time"
                          label="Time"
                          variant="outlined"
                          focused
                          value={getschdtime}
                          onChange={handleSchdtime}
                        >
                          {/* {props.productDetailsData.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))} */}
                          <MenuItem value={"08:00 AM"}>08:00 AM</MenuItem>
                          <MenuItem value={"08:30 AM"}>08:30 AM</MenuItem>
                          <MenuItem value={"09:00 AM"}>09:00 AM</MenuItem>
                          <MenuItem value={"09:30 AM"}>09:30 AM</MenuItem>
                          <MenuItem value={"10:00 PM"}>10:00 PM</MenuItem>
                          <MenuItem value={"10:30 PM"}>10:30 PM</MenuItem>
                          <MenuItem value={"11:00 PM"}>11:00 PM</MenuItem>
                          <MenuItem value={"11:30 PM"}>11:30 PM</MenuItem>
                        </Select>

                        <div className="prefrence-action">
                          <div className="prefrence-action action moveUp">
                            {window.initData.data[0].site_key &&
                              window.initData.data[0].secret_key && (
                                <div className="gf-grecaptcha">
                                  <ReCAPTCHA
                                    sitekey={window.initData.data[0].site_key}
                                    onChange={handleRecaptchaChange}
                                  />

                                  <p> {getschderror.yourscrecaptcha} </p>
                                </div>
                              )}
                            <button
                              type="submit"
                              title="Submit"
                              className="btn preference-btn"
                            >
                              <span>Request</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal>
              </li>
            )}
          </ul>
          {/* {getcaratmax < props.productDetailsData.centerStoneMinCarat ||
            (getcaratmax > props.productDetailsData.centerStoneMaxCarat && (
              <span style={{ color: "red" }}>
                This ring will not properly fit with selected diamond.
              </span>
            ))} */}
        </div>
        <div className="diamond-tryon">
          <span>
            {props.productDetailsData.cost === "Call for Price"
              ? ""
              : window.currency}
            {props.productDetailsData.cost === "Call for Price"
              ? "Call for Price"
              : Number(props.productDetailsData.cost).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 0 }
                )}
            {/* {window.currency}
            {Number(props.productDetailsData.cost).toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })} */}
          </span>
          <div className="diamond-btn">
            {getsettingcookie === true && getDiamondCookie === true && (
              <button
                type="submit"
                title="Submit"
                onClick={handleCompletering}
                className="btn btn-diamond"
              >
                Complete Your Earring
              </button>
            )}

            {getDiamondCookie === true && (
              <button
                type="submit"
                title="Submit"
                onClick={handleCompletering}
                className="btn btn-tryon"
              >
                Complete Your Earring
              </button>
            )}

            {getDiamondCookie === false && (
              <button
                type="submit"
                title="Submit"
                onClick={handleadddiamonds}
                className="btn btn-diamond"
              >
                Add Your Diamond
              </button>
            )}

            {window.initData.data[0].display_tryon === 1 &&
              props.productDetailsData.tryon === true && (
                <a className="btn btn-tryon" onClick={handlevirtual} href="#">
                  Virtual Tryon
                </a>
              )}
          </div>
        </div>
        <div className="social-icons">
          <ul className="social-share">
            {window.initData.data[0].show_Pinterest_Share === "1" && (
              <li>
                <a
                  target="_blank"
                  href={`https://www.pinterest.com/pin/create/button/?url=${window.location.href}&media=${props.productDetailsData.mainImageURL}&description=${props.productDetailsData.description}`}
                  className="red"
                >
                  <i className="fab fa-pinterest-p"></i>
                  <span>Save</span>
                </a>
              </li>
            )}
            {window.initData.data[0].show_Twitter_Share === "1" && (
              <li>
                <a
                  target="_blank"
                  href={`https://twitter.com/share?ref_src=${window.location.href}`}
                  className="sky-blue"
                >
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
              </li>
            )}
            {window.initData.data[0].show_Facebook_Share === "1" && (
              <li>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  className="blue"
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>share</span>
                </a>
              </li>
            )}
            {window.initData.data[0].show_Facebook_Like === "1" && (
              <li>
                <FacebookProvider appId="2069310279975989">
                  <Like
                    language="en_US"
                    href={window.location.href}
                    colorScheme="dark"
                    layout="button_count"
                  />
                </FacebookProvider>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductInformation;
