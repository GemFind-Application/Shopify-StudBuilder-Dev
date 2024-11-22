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
import Print from "../../../images/print_icon.gif";
import { propTypes } from "react-bootstrap/esm/Image";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { LoadingOverlay, Loader } from "react-overlay-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import ReCAPTCHA from "react-google-recaptcha";

function formatprice(finalprice) {
  finalprice = finalprice.toString();
  var lastThree = finalprice.substring(finalprice.length - 3);
  var otherNumbers = finalprice.substring(0, finalprice.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

const CompleteRingInfo = (props) => {
  const [open, setOpen] = useState(false);
  let errors = {};
  let formIsValid = true;
  const [loaded, setLoaded] = useState(false);

  const [getSelectedDiamondId, setSelectedDiamondId] = useState("");
  const locationurl = useLocation();

  const onOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  if (window.initData.data[0].is_api === "true") {
    var ringprice = Number(props.settingDetailsData.cost);
  } else {
    var ringprice = Number(props.settingDetailsData.finalPrice);
  }

  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  var listMetal = [];
  console.log("uniqueNames");
  console.log(props.settingDetailsData);
  if (window.initData.data[0].is_api === "true") {
    // const listItems = props.settingDetailsData.configList.map(
    //   (val) => listMetal.push(val.metalType)
    //   // listMetal.push(val.gfInventoryId)
    // );
    var uniqueNames = Array.from(new Set(listMetal));
    console.log(uniqueNames);
  }
  //const currentSelectedMetaltype = props.settingDetailsData.gfInventoryID;

  if (window.initData.data[0].is_api === "false") {
    var currentSelectedMetaltype = props.settingDetailsData.settingId;
  } else {
    var currentSelectedMetaltype = props.settingDetailsData.metalType;
  }

  console.log("currentSelectedMetaltype");
  console.log(currentSelectedMetaltype);
  const [getDefaultMetalType, setDefaultMetalType] = useState(
    currentSelectedMetaltype
  );

  // var diamondprice = Number(props.diamondDetailsData.fltPrice);
  // console.log(ringprice);
  // console.log(diamondprice);

  const handlemetalType = (event) => {
    console.log(event.target.value);
    setDefaultMetalType(event.target.value);
    //removeCookie("_shopify_ringsetting", { path: "/" });

    if (props.settingDetailsData.configList) {
      var res = props.settingDetailsData.configList.filter(function (v) {
        return (
          v.metalType.replace(/\s+/g, "-").toLowerCase() == event.target.value
        );
      });

      console.log(res[0]);
      console.log(event.target.value);
      if (res[0]) {
        var gfid = res[0].gfInventoryID;
        var finalSetBackValue = [];
        finalSetBackValue.push({
          collection: props.settingDetailsData.collectionName,
          metaltype: event.target.value,
          price: props.settingDetailsData.finalPrice,
          settingId: gfid,
          color: props.settingDetailsData.metalColor,
          productname: props.settingDetailsData.productName,
          stylenumber: props.settingDetailsData.styleNumber,
          customAttribute: res[0].customAttribute,
        });

        setsettingcookies("_shopify_ringsetting", finalSetBackValue, {
          path: "/",
          maxAge: 604800,
        });
        window.location.reload();
      } else {
        window.location.reload();
      }
    } else {
    }
  };

  const handleRecaptchaChange = (response) => {
    setRecaptchaToken(response);
    setIsRecaptchaVerified(true); // Set verification status
  };

  var diamondTotalPrice = Number(props.diamondDetailsData.totalPrice);

  var finalprice = ringprice + diamondTotalPrice;

  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const [openFive, setOpenFive] = useState(false);
  const [openOne, setOpenOne] = useState(false);
  const [getsettingcookies, setsettingcookies] = useCookies([
    "_shopify_ringsetting",
  ]);
  const [getdiamondcookies, setdiamondcookies] = useCookies([
    "_shopify_diamondsetting",
  ]);
  const [getSelectedRingSize, setSelectedRingSize] = useState("");
  const [getSelectedStyleNumber, setSelectedStyleNumber] = useState("");
  const [getSelectedMetalType, setSelectedMetalType] = useState("");
  const [getSelectedMetalColor, setSelectedMetalColor] = useState("");
  const [getSelectedBackingType, setSelectedBackingType] = useState("");
  const [getSecondSelectedDiamondId, setSecondSelectedDiamondId] = useState("");
  const [getblankvalue, setblankvalue] = useState([""]);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [getDiamondName, setDiamondName] = useState([""]);
  const [getSelectedSettingId, setSelectedSettingId] = useState([""]);

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

  const onOpenThirdModal = (e) => {
    e.preventDefault();
    setreqname("");
    setreqemail("");
    setreqphone("");
    setreqmsg("");
    setreqcp("");
    setOpenThird(true);
  };

  const onOpenFourthModal = (e) => {
    e.preventDefault();
    setname("");
    setemail("");
    setfrndname("");
    setfrndemail("");
    setfrndmessage("");
    setOpenFour(true);
  };

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

  // const handleSettings = (e) => {
  //   e.preventDefault();
  //   var diamondData = [];
  //   var data = {};

  //   data.diamondId = props.productDetailsData.diamondId;
  //   data.diamondid2 = props.secondProductDetailsData.diamondId;
  //   data.centerStone = props.productDetailsData.shape;
  //   data.carat = props.productDetailsData.caratWeight;
  //   data.centerstonemincarat =
  //     Number(props.productDetailsData.caratWeight) - 0.1;
  //   data.centerstonemaxcarat =
  //     Number(props.productDetailsData.caratWeight) + 0.1;
  //   data.isLabCreated = props.productDetailsData.isLabCreated;
  //   data.diamondpath = locationurl.pathname;
  //   diamondData.push(data);
  //   setCookie("_shopify_diamondsetting", JSON.stringify(diamondData), {
  //     path: "/",
  //     maxAge: 604800,
  //   });
  //   navigate("/apps/studbuilder/settings");
  // };

  useEffect(() => {
    if (
      getsettingcookies._shopify_ringsetting &&
      getsettingcookies._shopify_ringsetting[0].customAttribute
    ) {
      setSelectedRingSize(
        getsettingcookies._shopify_ringsetting[0].customAttribute
      );
    }

    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondId
    ) {
      setSelectedDiamondId(
        getdiamondcookies._shopify_diamondsetting[0].diamondId
      );
    }
    if (
      getdiamondcookies._shopify_diamondsetting &&
      getdiamondcookies._shopify_diamondsetting[0].diamondid2
    ) {
      setSecondSelectedDiamondId(
        getdiamondcookies._shopify_diamondsetting[0].diamondid2
      );
    }

    if (window.initData.data[0].is_api === "false") {
      setSelectedBackingType(props.settingDetailsData.backingType);
      setSelectedMetalColor(props.settingDetailsData.metalColor);
      setSelectedMetalType(props.settingDetailsData.metalType);
      setSelectedStyleNumber(props.settingDetailsData.styleNumber);
      setSelectedSettingId(props.selectedSettingId);
    } else {
      setSelectedBackingType(
        getsettingcookies._shopify_ringsetting[0].customAttribute
      );
      setSelectedMetalColor(
        getsettingcookies._shopify_ringsetting[0].metalColor
      );
      setSelectedMetalType(getsettingcookies._shopify_ringsetting[0].metalType);
      setSelectedStyleNumber(
        getsettingcookies._shopify_ringsetting[0].styleNumber
      );
      setSelectedSettingId(
        getsettingcookies._shopify_ringsetting[0].setting_id
      );
    }

    console.log(props);
    console.log("props.selectedSettingId");

    setDiamondName(props.diamondDetailsData.mainHeader);
    // console.log(diamondName.replace(/[^a-z\s]+/gi, ""));
  }, []);
  console.log("settingDetailsData");
  console.log(props.settingDetailsData);
  console.log(props.diamondDetailsData);
  console.log(props.diamondDetailsData);
  console.log(props.selectedSettingId);

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
      console.log(errors);
      seterror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: getyourname,
        email: getyouremail,
        hint_Recipient_name: getrecipientname,
        hint_Recipient_email: getrecipientemail,
        reason_of_gift: getgiftreason,
        hint_message: gethintmessage,
        deadline: getgiftdeadline,
        ring_url: window.location.href,
        settingid: getSelectedSettingId ? getSelectedSettingId : "NA",
        islabsettings: props.settingDetailsData.isLabSetting
          ? props.settingDetailsData.isLabSetting
          : "NA",
        diamondurl: window.location.href,
        diamondid: props.diamondDetailsData.diamondID1,
        seconddiamondid: props.diamondDetailsData.diamondID2,
        pair_id: props.diamondDetailsData.pairID,
        diamondtype: props.diamondDetailsData.isLabCreated,
        completering: "completeearring",
        shopurl: window.initData.data[0].shop,
        price: props.settingDetailsData.cost
          ? props.settingDetailsData.cost
          : "NA",
        styleNumber: getSelectedStyleNumber ? getSelectedStyleNumber : "NA",
        metalType: getSelectedMetalType ? getSelectedMetalType : "NA",
        color: getSelectedMetalColor ? getSelectedMetalColor : "NA",
        backingType: getSelectedBackingType ? getSelectedBackingType : "NA",
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/crDropHintApi`,
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
    } catch (error) {
      console.log(error);
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
    setreqname(event.target.value);
  };
  const handleReqemail = (event) => {
    setreqemail(event.target.value);
  };
  const handleReqphone = (event) => {
    setreqphone(event.target.value);
  };
  const handleReqmsg = (event) => {
    console.log("required message");
    console.log(event.target.value);
    setreqmsg(event.target.value);
  };
  const handleReqcp = (event) => {
    setreqcp(event.target.value);
  };

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
      errors["yourreqmsg"] = "Please enter your message";
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
      console.log(errors);
      setreqerror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: getreqname,
        email: getreqemail,
        phone_no: getreqphone,
        req_message: getreqmsg,
        contact_preference: getreqcp,
        ring_url: window.location.href,
        settingid: getSelectedSettingId ? getSelectedSettingId : "NA",
        islabsettings: props.settingDetailsData.isLabSetting
          ? props.settingDetailsData.isLabSetting
          : "NA",
        diamondurl: window.location.href,
        diamondid: props.diamondDetailsData.diamondID1,
        seconddiamondid: props.diamondDetailsData.diamondID2,
        pair_id: props.diamondDetailsData.pairID,
        diamondtype: props.diamondDetailsData.isLabCreated,
        completering: "completeearring",
        shopurl: window.initData.data[0].shop,
        price: props.settingDetailsData.cost
          ? props.settingDetailsData.cost
          : "NA",
        styleNumber: getSelectedStyleNumber ? getSelectedStyleNumber : "NA",
        metalType: getSelectedMetalType ? getSelectedMetalType : "NA",
        color: getSelectedMetalColor ? getSelectedMetalColor : "NA",
        backingType: getSelectedBackingType ? getSelectedBackingType : "NA",
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/crReqInfoApi`,
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
    } catch (error) {
      console.log(error);
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
      errors["yourfrnname"] = "Please enter your friend name";
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
      console.log(errors);
      setfrnderror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: getname,
        email: getemail,
        frnd_name: getfrndname,
        frnd_email: getfrndemail,
        frnd_message: getfrndmessage,
        ring_url: window.location.href,
        settingid: getSelectedSettingId ? getSelectedSettingId : "NA",
        islabsettings: props.settingDetailsData.isLabSetting
          ? props.settingDetailsData.isLabSetting
          : "NA",
        diamondurl: window.location.href,
        diamondid: props.diamondDetailsData.diamondID1,
        seconddiamondid: props.diamondDetailsData.diamondID2,
        pair_id: props.diamondDetailsData.pairID,
        diamondtype: props.diamondDetailsData.isLabCreated,
        completering: "completeearring",
        shopurl: window.initData.data[0].shop,
        price: props.settingDetailsData.cost
          ? props.settingDetailsData.cost
          : "NA",
        styleNumber: getSelectedStyleNumber ? getSelectedStyleNumber : "NA",
        metalType: getSelectedMetalType ? getSelectedMetalType : "NA",
        color: getSelectedMetalColor ? getSelectedMetalColor : "NA",
        backingType: getSelectedBackingType ? getSelectedBackingType : "NA",
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/crEmailFriendApi`,
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
    } catch (error) {
      console.log(error);
    }
  };

  //SCHEDULE VIWING SUBMIT BUTTON

  const [getschdname, setschdname] = useState("");
  const [getschdemail, setschdemail] = useState("");
  const [getschdphone, setschdphone] = useState("");
  const [getschdmsg, setschdmsg] = useState("");
  const [getschddate, setschddate] = useState("");
  const [getschdtime, setschdtime] = useState("");
  const [location, setLocation] = useState("");

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
    setschdtime(event.target.value);
  };
  const handleChange = (event) => {
    setLocation(event.target.value);
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
      console.log(errors);
      setschderror(errors);
      setLoaded(false);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: getschdname,
        email: getschdemail,
        phone_no: getschdphone,
        schl_message: getschdmsg,
        location: location,
        availability_date: getschddate,
        appnt_time: getschdtime,
        ring_url: window.location.href,
        settingid: getSelectedSettingId ? getSelectedSettingId : "NA",
        islabsettings: props.settingDetailsData.isLabSetting
          ? props.settingDetailsData.isLabSetting
          : "NA",
        diamondurl: window.location.href,
        diamondid: props.diamondDetailsData.diamondID1,
        seconddiamondid: props.diamondDetailsData.diamondID2,
        pair_id: props.diamondDetailsData.pairID,
        diamondtype: props.diamondDetailsData.isLabCreated,
        completering: "completeearring",
        shopurl: window.initData.data[0].shop,
        price: props.settingDetailsData.cost
          ? props.settingDetailsData.cost
          : "NA",
        styleNumber: getSelectedStyleNumber ? getSelectedStyleNumber : "NA",
        metalType: getSelectedMetalType ? getSelectedMetalType : "NA",
        color: getSelectedMetalColor ? getSelectedMetalColor : "NA",
        backingType: getSelectedBackingType ? getSelectedBackingType : "NA",
        recaptchaToken: recaptchaToken,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/crScheViewApi`,
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
    } catch (errors) {
      console.log(errors);
    }
  };

  //Print API
  const handlePrintDetails = async (e) => {
    e.preventDefault();
    // setLoaded(true);

    var url =
      `${window.serverurl}/api/printDiamondandStud/` +
      window.initData.data[0].shop +
      "/" +
      props.diamondDetailsData.pairID +
      "/" +
      getSelectedSettingId;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Diamond-${props.diamondDetailsData.pairID}-Stud-${getSelectedSettingId}.pdf`
    );

    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    link.parentNode.removeChild(link);
    setLoaded(false);
  };

  const handlevirtual = (e) => {
    console.log(getsettingcookies._shopify_ringsetting[0].styleNumber);
    var styleNumber = getsettingcookies._shopify_ringsetting[0].styleNumber;

    e.preventDefault();
    Fancybox.show([
      {
        type: "iframe",
        src: `https://cdn.camweara.com/gemfind/index_client.php?company_name=Gemfind&ringbuilder=1&skus=${styleNumber}&buynow=0`,
        iframe: {
          tpl: '<iframe id="tryoniFrameID" allowfullscreen class="fancybox-iframe" scrolling="auto" width="1200" height="800" allow="camera"></iframe>',
        },
        width: "100%",
        height: "100%",
      },
    ]);
  };

  //Add To Cart
  const handleAddToCart = async (e) => {
    setLoaded(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop_domain: window.initData.data[0].shop,
        diamond_id: getSelectedDiamondId,
        second_diamond_id: getSecondSelectedDiamondId,
        setting_id: getSelectedSettingId ? getSelectedSettingId : "NA",
        dealer_id: window.initData.data[0].dealerid,
        metaltype: props.settingDetailsData.metalType,
        productDescription: props.settingDetailsData.productDescription,
        productName: props.settingDetailsData.productName,
        finalPrice: props.settingDetailsData.cost,
        imagePath: props.settingDetailsData.imagePath,
        is_lab: getdiamondcookies._shopify_diamondsetting[0].isLabCreated,
        sidestonequalityvalue:
          getsettingcookies._shopify_ringsetting[0].sideStoneQuality,
        ringsizesettingonly: getSelectedRingSize,
        centerstonesizevalue:
          getsettingcookies._shopify_ringsetting[0].centerStoneSize,
        type: window.initData.data[0].type_1,
        pair_id: props.diamondDetailsData.pairID,
      }),
    };
    try {
      const res = await fetch(
        `${window.serverurl}/api/addToCart`,
        requestOptions
      );

      const addtocartData = await res.json();
      window.location.href = addtocartData;

      console.log("addtocartData");
      console.log(addtocartData);

      if (addtocartData) {
        removeCookie("shopify_diamondbackvalue", { path: "/" });
        removeCookie("_wpsaveringfiltercookie", { path: "/" });
        removeCookie("_wpsavediamondfiltercookie", { path: "/" });
        removeCookie("_wpsavedcompareproductcookie", { path: "/" });
        removeCookie("_shopify_diamondsetting", { path: "/" });
        removeCookie("shopify_ringbackvalue", { path: "/" });
        removeCookie("_shopify_ringsetting", { path: "/" });
      }
    } catch (errors) {
      console.log(errors);
    }
  };

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
      {/* Diamond info    */}
      <div className="ring-descreption">
        <div className="product-info__title stud-product-title">
          <h2> {"Your Diamond Pair"} </h2>
          <h5>{getDiamondName}</h5>
        </div>
        <div className="product-info__descreption">
          <p>{props.diamondDetailsData.subHeader}</p>
        </div>
        <div className="diamond-sku stud-diamond-sku">
          <div>
            <span>SKU#</span>
            {props.diamondDetailsData.diamondID1}
          </div>
          <div>
            <span>SKU#</span>
            {props.diamondDetailsData.diamondID2}
          </div>
        </div>

        {props.diamondDetailsData.fltPrice1 !== "Call for Price" && (
          <div className="dia-ring-price">
            Diamond Pair:
            <span className="complete_setting_price">
              {props.diamondDetailsData.fltPrice1 === "Call for Price"
                ? ""
                : window.currency}
              {props.diamondDetailsData.fltPrice1 === "Call for Price"
                ? "Call for Price"
                : Number(diamondTotalPrice).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
            </span>
          </div>
        )}
      </div>

      {/* Ring Info */}

      <div className="ring-descreption">
        <LoadingOverlay className="_loading_overlay_wrapper">
          <Loader fullPage loading={loaded} />
        </LoadingOverlay>
        <div className="product-info__title stud-product-title">
          <h2> {"Your Mounting"}</h2>
          <h5>{props.settingDetailsData.productName}</h5>
        </div>
        <div className="product-info__descreption">
          <p>{props.settingDetailsData.productDescription}</p>
        </div>
        <div className="diamond-sku stud-diamond-sku">
          <div>
            <span>styleNumber# </span>
            {props.settingDetailsData.styleNumber}
          </div>
        </div>
        {window.initData.data[0].is_api === "true" && (
          <div className="diaomnd-info">
            <div className="metaltype product-dropdown">
              <span>Metal Type</span>
              <span className="ringdropdown">
                {getsettingcookies._shopify_ringsetting[0].metalType}
              </span>
            </div>

            <div className="stonesize product-dropdown">
              <span>Shape</span>
              <span className="stonesizedropdown">
                {getsettingcookies._shopify_ringsetting[0].centerStoneFit}
              </span>
            </div>

            <div className="ringsize product-dropdown">
              <span>Center Stone Size - Min</span>
              <span className="ringdropdown">
                {getsettingcookies._shopify_ringsetting[0].ringmincarat
                  ? getsettingcookies._shopify_ringsetting[0].ringmincarat
                  : "NA"}
              </span>
            </div>

            <div className="ringsize product-dropdown">
              <span>Center Stone Size - Max</span>
              <span className="ringdropdown">
                {getsettingcookies._shopify_ringsetting[0].ringmaxcarat
                  ? getsettingcookies._shopify_ringsetting[0].ringmaxcarat
                  : "NA"}
              </span>
            </div>
          </div>
        )}
        {window.initData.data[0].is_api === "false" && (
          <div className="diaomnd-info">
            <div className="metaltype product-dropdown">
              <span>Metal Type</span>
              <span className="ringdropdown">
                {props.settingDetailsData.metalType}
              </span>
            </div>

            <div className="stonesize product-dropdown">
              <span>Metal Color</span>
              <span className="stonesizedropdown">
                {props.settingDetailsData.metalColor}
              </span>
            </div>
            <div className="ringsize product-dropdown">
              <span>Backing Type:</span>
              <span className="ringdropdown">
                {props.settingDetailsData.backingType
                  ? props.settingDetailsData.backingType
                  : "NA"}
              </span>
            </div>
          </div>
        )}

        <div className="dia-ring-price">
          Mounting:
          <span className="complete_setting_price">
            {window.currency}
            {Number(props.settingDetailsData.cost).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </span>
        </div>

        <div className="product-controller diamond-product-controller">
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
                          focused
                          variant="outlined"
                          value={getrecipientname}
                          onChange={handleRecipientname}
                        />
                        <p> {geterror.yourrpname} </p>
                        <TextField
                          id="drophint_rec_email"
                          type="email"
                          label="Hint Recipient's E-mail"
                          focused
                          variant="outlined"
                          value={getrecipientemail}
                          onChange={handleRecipientemail}
                        />
                        <p> {geterror.youremail} </p>
                        <TextField
                          id="dgift_reason"
                          label="Reason For This Gift"
                          focused
                          variant="outlined"
                          value={getgiftreason}
                          onChange={handleGiftreason}
                        />
                        <p> {geterror.yourreason} </p>
                        <TextField
                          id="drophint_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
                          variant="outlined"
                          value={gethintmessage}
                          onChange={handleHintmessage}
                        />
                        <p> {geterror.yourmsg} </p>
                        <TextField
                          label="Gift Deadline"
                          focused
                          id="date"
                          type="date"
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
                          variant="outlined"
                          value={getreqname}
                          onChange={handleReqname}
                        />
                        <p> {getreqerror.yourname} </p>

                        <TextField
                          id="request_email"
                          type="email"
                          label="Your E-mail"
                          variant="outlined"
                          value={getreqemail}
                          onChange={handleReqemail}
                        />
                        <p> {getreqerror.youremail} </p>

                        <TextField
                          id="request_phone"
                          label="Your Phone Number"
                          variant="outlined"
                          value={getreqphone}
                          onChange={handleReqphone}
                        />
                        <p> {getreqerror.yourphone} </p>

                        <TextField
                          id="req_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here ..."
                          variant="outlined"
                          value={getreqmsg}
                          onChange={handleReqmsg}
                        />
                        <p> {getreqerror.yourreqmsg} </p>

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
                          <p> {getreqerror.yourcp}</p>
                        </div>
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

                  <div className="Diamond-form--small Diamond-form--xx-small">
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
                          variant="outlined"
                          focused
                          value={getfrndname}
                          onChange={handleFrndname}
                        />
                        <p> {getfrnderror.yourfrnname} </p>

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
                          rows={3}
                          label="Add A Personal Message Here.."
                          focused
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
            <li>
              <a href="#!" onClick={handlePrintDetails}>
                <span>
                  <i className="fas fa-print"></i>
                </span>
                Print Details
              </a>
            </li>
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
                          variant="outlined"
                          value={getschdname}
                          onChange={handleSchdname}
                        />
                        <p> {getschderror.yourname} </p>

                        <TextField
                          id="schedule_email"
                          type="email"
                          label="Your E-mail Address"
                          variant="outlined"
                          value={getschdemail}
                          onChange={handleSchdemail}
                        />
                        <p> {getschderror.youremail} </p>

                        <TextField
                          id="schedule_num"
                          label="Your Phone Number"
                          variant="outlined"
                          value={getschdphone}
                          onChange={handleSchdphone}
                        />
                        <p> {getschderror.yourphone} </p>

                        <TextField
                          id="drophint_message"
                          multiline
                          rows={3}
                          label="Add A Personal Message Here ..."
                          variant="outlined"
                          value={getschdmsg}
                          onChange={handleSchdmsg}
                        />
                        <p> {getschderror.yourmsg} </p>

                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="select_schedule"
                          value={location}
                          onChange={handleChange}
                          label="Location"
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
                          id="date"
                          type="date"
                          inputformat="MM/dd/yyyy"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={getschddate}
                          onChange={handleSchddate}
                          fullWidth
                        />

                        <p> {getschderror.yourdate} </p>

                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="select_time"
                          value={getschdtime}
                          onChange={handleSchdtime}
                          label="Time"
                          variant="outlined"
                        >
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
        </div>
      </div>

      <div className="diamond-tryon">
        <span>
          {props.diamondDetailsData.fltPrice === "Call for Price"
            ? ""
            : window.currency}
          {props.diamondDetailsData.fltPrice === "Call for Price"
            ? "Call for Price"
            : Number(finalprice).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
        </span>

        <div className="diamond-btn">
          {props.diamondDetailsData.fltPrice !== "Call for Price" && (
            <button
              type="submit"
              title="Submit"
              onClick={handleAddToCart}
              className="btn btn-diamond"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CompleteRingInfo;
