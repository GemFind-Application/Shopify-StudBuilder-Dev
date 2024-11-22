import {
    CalloutCard,
    List,
    Button,
    Card,
    FormLayout,
    Frame,
    TextField,
    Toast,
    Heading,
    Checkbox,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import ImportFunctions from "./ImportFunctions";
import SettingsForm from "./SettingsForm";

function Customer() {
    //SHOW CUSTOMER
    const [showCustomer, setShowCustomer] = useState(0);
    const [showTable, setShowTable] = useState();
    const [importType, setImportType] = useState();

    //CHECK IF CUSTOMER EXISTS

    useEffect(() => {
        const getCustomer = async () => {
            const res = await fetch(
                "/api/ifCustomerExists/" +
                    document.getElementById("shopOrigin").value,
                {
                    method: "GET",
                }
            );
            const customer = await res.json();
            setShowCustomer(customer);
            setShowTable(true);
        };
        getCustomer();
    }, []);

    useEffect(() => {
        //GET SETTINGS API
        const getSettingsData = async () => {
            const res = await fetch(
                "/api/getSettingsData/" +
                    document.getElementById("shopOrigin").value,
                {
                    method: "GET",
                }
            );
            const settingProduct = await res.json();
            setImportType(settingProduct.type_1);
            setShowTable(true);
        };
        getSettingsData();
    }, []);

    const [loading, setLoading] = useState(false);
    //toast for success
    const [toastContent, setToastContent] = useState();
    const [toastActive, setToastActive] = useState(false);
    const toggleToastActive = () => {
        setToastActive(!toastActive);
    };
    const toggleActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        []
    );
    const toastMarkup = toastActive ? (
        <Toast content={toastContent} onDismiss={toggleToastActive} />
    ) : null;

    //toast for error
    const [toastContent1, setToastContent1] = useState();
    const [toastActive1, setToastActive1] = useState(false);
    const toggleToastActive1 = () => {
        setToastActive1(!toastActive1);
    };
    const toggleActive1 = useCallback(
        () => setToastActive1((toastActive1) => !toastActive1),
        []
    );
    const toastMarkup1 = toastActive1 ? (
        <Toast content={toastContent1} error onDismiss={toggleToastActive1} />
    ) : null;

    //CUSTOMER FORM FIELDS
    const [business, setBusiness] = useState("");
    const handleBusiness = useCallback((value) => setBusiness(value), []);
    const [fullname, setFullname] = useState("");
    const handleFullname = useCallback((value) => setFullname(value), []);
    const [address, setAddress] = useState("");
    const handleAddress = useCallback((value) => setAddress(value), []);
    const [state, setState] = useState("");
    const handleState = useCallback((value) => setState(value), []);
    const [city, setCity] = useState("");
    const handleCity = useCallback((value) => setCity(value), []);
    const [zipcode, setZipcode] = useState("");
    const handleZipcode = useCallback((value) => setZipcode(value), []);
    const [telephone, setTelephone] = useState("");
    const handleTelephone = useCallback((value) => setTelephone(value), []);
    const [website, setWebsite] = useState("");
    const handleWebsite = useCallback((value) => setWebsite(value), []);
    const [country, setCountry] = useState("");
    const handleCountry = useCallback((value) => setCountry(value), []);
    const [email, setEmail] = useState("");
    const handleEmail = useCallback((value) => setEmail(value), []);
    const [notes, setNotes] = useState("");
    const handleNotes = useCallback((value) => setNotes(value), []);
    const [checked, setChecked] = useState(false);
    const handleCertificate = useCallback(
        (newChecked) => setChecked(newChecked),
        []
    );

    //SAVE CUSTOMER API
    let handleCustomer = async (e) => {
        try {
            let payLoad = {
                shopDomain: document.getElementById("shopOrigin").value,
                business: business,
                fullname: fullname,
                address: address,
                state: state,
                city: city,
                zipcode: zipcode,
                website: website,
                country: country,
                telephone: telephone,
                email: email,
                notes: notes,
                jicertified: checked,
            };
            setLoading(true);
            let response = await axios.post("/api/saveCustomer", {
                data: payLoad,
            });
            let customer = 1;
            console.log(response);
            if (response.data.status == "success") {
                setToastContent(response.data.message);
                setShowCustomer(customer);
                toggleActive();
                window.location.reload(false);
            } else {
                setToastContent1(response.data.message);
                toggleActive1();
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    console.log(showCustomer);

    if (showCustomer === 1) {
        return <SettingsForm />;
    } else {
        return (
            <div>
                <Frame>
                    <h3 className="cr-heading">Customer Registration</h3>
                    <Card sectioned>
                        <FormLayout.Group condensed>
                            <TextField
                                label="Name of Business*"
                                value={business}
                                onChange={handleBusiness}
                                autoComplete="off"
                            />
                            <TextField
                                label="Primary Contact (First & Last Name)*"
                                value={fullname}
                                onChange={handleFullname}
                                autoComplete="off"
                            />
                        </FormLayout.Group>
                        <FormLayout.Group condensed>
                            <TextField
                                label="Email Address*"
                                value={email}
                                onChange={handleEmail}
                                autoComplete="off"
                            />
                            <TextField
                                label="Telephone*"
                                value={telephone}
                                onChange={handleTelephone}
                                autoComplete="off"
                            />
                        </FormLayout.Group>
                        <FormLayout.Group condensed>
                            <TextField
                                label="Address*"
                                value={address}
                                onChange={handleAddress}
                                autoComplete="off"
                            />

                            <TextField
                                label="City*"
                                value={city}
                                onChange={handleCity}
                                autoComplete="off"
                            />
                        </FormLayout.Group>
                        <FormLayout.Group condensed>
                            <TextField
                                label="State*"
                                value={state}
                                onChange={handleState}
                                autoComplete="off"
                            />

                            <TextField
                                label="Country*"
                                value={country}
                                onChange={handleCountry}
                                autoComplete="off"
                            />
                        </FormLayout.Group>
                        <FormLayout.Group>
                            <TextField
                                label="Zipcode*"
                                value={zipcode}
                                onChange={handleZipcode}
                                autoComplete="off"
                            />
                            <TextField
                                label="Website Url*"
                                value={website}
                                onChange={handleWebsite}
                                autoComplete="off"
                            />
                        </FormLayout.Group>

                        <FormLayout.Group>
                            <Checkbox
                                label="Are you in the Jewelry Industry with a business license?*"
                                checked={checked}
                                onChange={handleCertificate}
                            />

                            <TextField
                                label="Notes"
                                value={notes}
                                onChange={handleNotes}
                                multiline={4}
                                autoComplete="off"
                            />
                        </FormLayout.Group>

                        <FormLayout.Group>
                            <Button
                                loading={loading}
                                onClick={() => handleCustomer()}
                                primary
                            >
                                Save
                            </Button>
                            {toastMarkup}
                            {toastMarkup1}
                        </FormLayout.Group>
                    </Card>
                </Frame>
            </div>
        );
    }
}

export default Customer;
