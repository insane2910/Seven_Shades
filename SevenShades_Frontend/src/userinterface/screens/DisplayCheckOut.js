import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { Grid } from "@mui/material";
import PaymentFooterComponent from "../components/PaymentFooterComponent";
import { serverURL } from "../../services/FetchDjangoApiService";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { postData } from "../../services/FetchDjangoApiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://sevenshades.com/">
        sevenshades.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLOgin() {
  var navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("CHECKOUT", user);
  const userData = Object.values(user)[0];

  const cartData = useSelector((state) => state.product);
  const items = Object.values(cartData);

  var totalamount = items?.reduce((item1, item2) => {
    var amt = item1 + item2.price * item2.qty;
    return amt;
  }, 0);

  var actualamount = items?.reduce((item1, item2) => {
    var amt =
      item1 +
      (item2.offerprice > 0
        ? item2.offerprice * item2.qty
        : item2.price * item2.qty);
    return amt;
  }, 0);

  var saveamount = totalamount - actualamount;

  const [firstname, setFirstName] = useState(userData?.firstname);
  const [lastname, setLastName] = useState(userData?.lastname);
  const [mobileno, setMobileno] = useState(userData?.mobileno);
  const [country, setCountry] = useState("IN");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostCode] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [open, setOpen] = useState(false);

  ///********Payment Gateway********** */
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: actualamount * 100, //  = INR 1
    name: "SevenShades",
    description: "some description",
    image: `${serverURL}/static/logo.jpg`,
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: userData?.firstname,
      contact: userData?.mobileno,
      email: userData?.email,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const handlePayment = async () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /*************************************** */

  const fetchUserAddress = async () => {
    var result = await postData("fetch_user_address", {
      mobile: userData?.mobileno,
    });
    if (result.status) {
      setAddressList(result.data);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    fetchUserAddress();
  }, []);

  const showAddressList = () => {
    return addressList?.map((item) => {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{item.address}</div>
          <div>
            {item.city},{item.country}
          </div>
          <div>{item.postcode}</div>
        </div>
      );
    });
  };

  const addressComponent = () => {
    return (
      <div style={{ width: "90%", backgroundColor: "white", padding: "1%" }}>
        <ThemeProvider theme={defaultTheme}>
          <Container maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                marginTop: "5%",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Box sx={{ mt: 1 }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "1.5vw",
                    marginTop: "5%",
                    marginBottom: "5%",
                  }}
                >
                  DELIVERY ADDRESS
                </div>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "1.2vw",
                    marginTop: "5%",
                    marginBottom: "5%",
                  }}
                >
                  ADD ADDRESS
                </div>

                <label
                  style={{ width: "100%", fontWeight: "bold", color: "#999" }}
                >
                  FIRST NAME :
                </label>
                <TextField
                  margin="normal"
                  fullWidth
                  id="firstname"
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label
                  style={{ width: "100%", fontWeight: "bold", color: "#999" }}
                >
                  LAST NAME :
                </label>
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastname"
                  name="lastname"
                  autoComplete="lastname"
                  value={lastname}
                  autoFocus
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label
                  style={{ width: "100%", fontWeight: "bold", color: "#999" }}
                >
                  MOBILE :
                </label>
                <TextField
                  margin="normal"
                  fullWidth
                  id="mobile"
                  name="mobile"
                  autoComplete="mobile"
                  autoFocus
                  value={mobileno}
                  onChange={(e) => setMobileno(e.target.value)}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label style={{ fontWeight: "bold", color: "#999" }}>
                    COUNTRY:
                  </label>
                  <div style={{ width: "100%" }}>
                    <FormControl style={{ width: "100%" }}>
                      <Select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        style={{ width: "100%" }}
                      >
                        <MenuItem value="AF">Afghanistan</MenuItem>
                        <MenuItem value="AX">Aland Islands</MenuItem>
                        <MenuItem value="AL">Albania</MenuItem>
                        <MenuItem value="DZ">Algeria</MenuItem>
                        <MenuItem value="AS">American Samoa</MenuItem>
                        <MenuItem value="AD">Andorra</MenuItem>
                        <MenuItem value="AO">Angola</MenuItem>
                        <MenuItem value="AI">Anguilla</MenuItem>
                        <MenuItem value="AQ">Antarctica</MenuItem>
                        <MenuItem value="AG">Antigua and Barbuda</MenuItem>
                        <MenuItem value="AR">Argentina</MenuItem>
                        <MenuItem value="AM">Armenia</MenuItem>
                        <MenuItem value="AW">Aruba</MenuItem>
                        <MenuItem value="AU">Australia</MenuItem>
                        <MenuItem value="AT">Austria</MenuItem>
                        <MenuItem value="AZ">Azerbaijan</MenuItem>
                        <MenuItem value="BS">Bahamas</MenuItem>
                        <MenuItem value="BH">Bahrain</MenuItem>
                        <MenuItem value="BD">Bangladesh</MenuItem>
                        <MenuItem value="BB">Barbados</MenuItem>
                        <MenuItem value="BY">Belarus</MenuItem>
                        <MenuItem value="BE">Belgium</MenuItem>
                        <MenuItem value="BZ">Belize</MenuItem>
                        <MenuItem value="BJ">Benin</MenuItem>
                        <MenuItem value="BM">Bermuda</MenuItem>
                        <MenuItem value="BT">Bhutan</MenuItem>
                        <MenuItem value="BO">
                          Bolivia, Plurinational State of
                        </MenuItem>
                        <MenuItem value="BQ">
                          Bonaire, Sint Eustatius and Saba
                        </MenuItem>
                        <MenuItem value="BA">Bosnia and Herzegovina</MenuItem>
                        <MenuItem value="BW">Botswana</MenuItem>
                        <MenuItem value="BR">Brazil</MenuItem>
                        <MenuItem value="IO">
                          British Indian Ocean Territory
                        </MenuItem>
                        <MenuItem value="BN">Brunei Darussalam</MenuItem>
                        <MenuItem value="BG">Bulgaria</MenuItem>
                        <MenuItem value="BF">Burkina Faso</MenuItem>
                        <MenuItem value="BI">Burundi</MenuItem>
                        <MenuItem value="KH">Cambodia</MenuItem>
                        <MenuItem value="CM">Cameroon</MenuItem>
                        <MenuItem value="CA">Canada</MenuItem>
                        <MenuItem value="CV">Cape Verde</MenuItem>
                        <MenuItem value="KY">Cayman Islands</MenuItem>
                        <MenuItem value="CF">Central African Republic</MenuItem>
                        <MenuItem value="TD">Chad</MenuItem>
                        <MenuItem value="CL">Chile</MenuItem>
                        <MenuItem value="CN">China</MenuItem>
                        <MenuItem value="CX">
                          Christmas Island (Australia)
                        </MenuItem>
                        <MenuItem value="CC">Cocos (Keeling) Islands</MenuItem>
                        <MenuItem value="CO">Colombia</MenuItem>
                        <MenuItem value="KM">Comoros</MenuItem>
                        <MenuItem value="CD">
                          Congo, the Democratic Republic of the
                        </MenuItem>
                        <MenuItem value="CG">Congo, the Republic of</MenuItem>
                        <MenuItem value="CK">Cook Islands</MenuItem>
                        <MenuItem value="CR">Costa Rica</MenuItem>
                        <MenuItem value="CI">Cote d'Ivoire</MenuItem>
                        <MenuItem value="HR">Croatia</MenuItem>
                        <MenuItem value="CU">Cuba</MenuItem>
                        <MenuItem value="CW">Curacao</MenuItem>
                        <MenuItem value="CY">Cyprus</MenuItem>
                        <MenuItem value="CZ">Czech Republic</MenuItem>
                        <MenuItem value="KP">
                          Democratic People's Republic of Korea (North)
                        </MenuItem>
                        <MenuItem value="DK">Denmark</MenuItem>
                        <MenuItem value="DJ">Djibouti</MenuItem>
                        <MenuItem value="DM">Dominica</MenuItem>
                        <MenuItem value="DO">Dominican Republic</MenuItem>
                        <MenuItem value="EC">Ecuador</MenuItem>
                        <MenuItem value="EG">Egypt</MenuItem>
                        <MenuItem value="SV">El Salvador</MenuItem>
                        <MenuItem value="GQ">Equatorial Guinea</MenuItem>
                        <MenuItem value="ER">Eritrea</MenuItem>
                        <MenuItem value="EE">Estonia</MenuItem>
                        <MenuItem value="SZ">Eswatini</MenuItem>
                        <MenuItem value="ET">Ethiopia</MenuItem>
                        <MenuItem value="FK">
                          Falkland Islands (Malvinas)
                        </MenuItem>
                        <MenuItem value="FO">Faroe Islands</MenuItem>
                        <MenuItem value="FJ">Fiji</MenuItem>
                        <MenuItem value="FI">Finland</MenuItem>
                        <MenuItem value="FR">France</MenuItem>
                        <MenuItem value="GF">French Guiana (Guyane)</MenuItem>
                        <MenuItem value="PF">French Polynesia</MenuItem>
                        <MenuItem value="TF">
                          French Southern Territories
                        </MenuItem>
                        <MenuItem value="GA">Gabon</MenuItem>
                        <MenuItem value="GM">Gambia</MenuItem>
                        <MenuItem value="GE">Georgia</MenuItem>
                        <MenuItem value="DE">Germany</MenuItem>
                        <MenuItem value="GH">Ghana</MenuItem>
                        <MenuItem value="GI">Gibraltar</MenuItem>
                        <MenuItem value="GR">Greece</MenuItem>
                        <MenuItem value="GL">Greenland</MenuItem>
                        <MenuItem value="GD">Grenada</MenuItem>
                        <MenuItem value="GP">Guadeloupe</MenuItem>
                        <MenuItem value="GU">Guam</MenuItem>
                        <MenuItem value="GT">Guatemala</MenuItem>
                        <MenuItem value="GN">Guinea</MenuItem>
                        <MenuItem value="GW">Guinea-Bissau</MenuItem>
                        <MenuItem value="GY">
                          Guyana, Co-operative Republic of
                        </MenuItem>
                        <MenuItem value="HT">Haiti</MenuItem>
                        <MenuItem value="VA">
                          Holy See (Vatican City State)
                        </MenuItem>
                        <MenuItem value="HN">Honduras</MenuItem>
                        <MenuItem value="HK">Hong Kong</MenuItem>
                        <MenuItem value="HU">Hungary</MenuItem>
                        <MenuItem value="IS">Iceland</MenuItem>
                        <MenuItem value="IN">India</MenuItem>
                        <MenuItem value="ID">Indonesia</MenuItem>
                        <MenuItem value="IR">
                          Iran, Islamic Republic of
                        </MenuItem>
                        <MenuItem value="IQ">Iraq</MenuItem>
                        <MenuItem value="IE">Ireland, Republic of</MenuItem>
                        <MenuItem value="IL">Israel</MenuItem>
                        <MenuItem value="IT">Italy</MenuItem>
                        <MenuItem value="JM">Jamaica</MenuItem>
                        <MenuItem value="JP">Japan</MenuItem>
                        <MenuItem value="JO">Jordan</MenuItem>
                        <MenuItem value="KZ">Kazakhstan</MenuItem>
                        <MenuItem value="KE">Kenya</MenuItem>
                        <MenuItem value="KI">Kiribati</MenuItem>
                        <MenuItem value="KR">
                          Korea, Republic of (South Korea)
                        </MenuItem>
                        <MenuItem value="XK">Kosovo</MenuItem>
                        <MenuItem value="KW">Kuwait</MenuItem>
                        <MenuItem value="KG">Kyrgyzstan</MenuItem>
                        <MenuItem value="LA">
                          Lao People's Democratic Republic
                        </MenuItem>
                        <MenuItem value="LV">Latvia</MenuItem>
                        <MenuItem value="LB">Lebanon</MenuItem>
                        <MenuItem value="LS">Lesotho</MenuItem>
                        <MenuItem value="LR">Liberia</MenuItem>
                        <MenuItem value="LY">Libya</MenuItem>
                        <MenuItem value="LI">Liechtenstein</MenuItem>
                        <MenuItem value="LT">Lithuania</MenuItem>
                        <MenuItem value="LU">Luxembourg</MenuItem>
                        <MenuItem value="MO">Macao</MenuItem>
                        <MenuItem value="MG">Madagascar</MenuItem>
                        <MenuItem value="MW">Malawi</MenuItem>
                        <MenuItem value="MY">Malaysia</MenuItem>
                        <MenuItem value="MV">Maldives</MenuItem>
                        <MenuItem value="ML">Mali</MenuItem>
                        <MenuItem value="MT">Malta</MenuItem>
                        <MenuItem value="MH">Marshall Islands</MenuItem>
                        <MenuItem value="MQ">Martinique</MenuItem>
                        <MenuItem value="MR">Mauritania</MenuItem>
                        <MenuItem value="MU">Mauritius</MenuItem>
                        <MenuItem value="YT">Mayotte</MenuItem>
                        <MenuItem value="MX">Mexico</MenuItem>
                        <MenuItem value="FM">
                          Micronesia, Federated States of
                        </MenuItem>
                        <MenuItem value="MD">Moldova, Republic of</MenuItem>
                        <MenuItem value="MC">Monaco</MenuItem>
                        <MenuItem value="MN">Mongolia</MenuItem>
                        <MenuItem value="ME">Montenegro</MenuItem>
                        <MenuItem value="MS">Montserrat</MenuItem>
                        <MenuItem value="MA">Morocco</MenuItem>
                        <MenuItem value="MZ">Mozambique</MenuItem>
                        <MenuItem value="MM">Myanmar</MenuItem>
                        <MenuItem value="NA">Namibia</MenuItem>
                        <MenuItem value="NR">Nauru</MenuItem>
                        <MenuItem value="NP">Nepal</MenuItem>
                        <MenuItem value="NL">Netherlands</MenuItem>
                        <MenuItem value="NC">New Caledonia</MenuItem>
                        <MenuItem value="NZ">New Zealand</MenuItem>
                        <MenuItem value="NI">Nicaragua</MenuItem>
                        <MenuItem value="NE">Niger</MenuItem>
                        <MenuItem value="NG">Nigeria</MenuItem>
                        <MenuItem value="NU">Niue</MenuItem>
                        <MenuItem value="NF">Norfolk Island</MenuItem>
                        <MenuItem value="MK">North Macedonia</MenuItem>
                        <MenuItem value="MP">Northern Mariana Islands</MenuItem>
                        <MenuItem value="NO">Norway</MenuItem>
                        <MenuItem value="OM">Oman</MenuItem>
                        <MenuItem value="PK">Pakistan</MenuItem>
                        <MenuItem value="PW">Palau</MenuItem>
                        <MenuItem value="PS">Palestine</MenuItem>
                        <MenuItem value="PA">Panama</MenuItem>
                        <MenuItem value="PG">Papua New Guinea</MenuItem>
                        <MenuItem value="PY">Paraguay</MenuItem>
                        <MenuItem value="PE">Peru</MenuItem>
                        <MenuItem value="PH">Philippines</MenuItem>
                        <MenuItem value="PN">Pitcairn</MenuItem>
                        <MenuItem value="PL">Poland</MenuItem>
                        <MenuItem value="PT">Portugal</MenuItem>
                        <MenuItem value="PR">Puerto Rico</MenuItem>
                        <MenuItem value="QA">Qatar</MenuItem>
                        <MenuItem value="RE">Reunion</MenuItem>
                        <MenuItem value="RO">Romania</MenuItem>
                        <MenuItem value="RU">Russia</MenuItem>
                        <MenuItem value="RW">Rwanda</MenuItem>
                        <MenuItem value="BL">Saint Barthelemy</MenuItem>
                        <MenuItem value="SH">
                          Saint Helena, Ascension and Tristan da Cunha
                        </MenuItem>
                        <MenuItem value="KN">Saint Kitts and Nevis</MenuItem>
                        <MenuItem value="LC">Saint Lucia</MenuItem>
                        <MenuItem value="MF">
                          Saint Martin (French part)
                        </MenuItem>
                        <MenuItem value="PM">
                          Saint Pierre and Miquelon
                        </MenuItem>
                        <MenuItem value="VC">
                          Saint Vincent and the Grenadines
                        </MenuItem>
                        <MenuItem value="WS">Samoa</MenuItem>
                        <MenuItem value="SM">San Marino</MenuItem>
                        <MenuItem value="ST">Sao Tome and Principe</MenuItem>
                        <MenuItem value="SA">Saudi Arabia</MenuItem>
                        <MenuItem value="SN">Senegal</MenuItem>
                        <MenuItem value="RS">Serbia</MenuItem>
                        <MenuItem value="SC">Seychelles</MenuItem>
                        <MenuItem value="SL">Sierra Leone</MenuItem>
                        <MenuItem value="SG">Singapore</MenuItem>
                        <MenuItem value="SX">
                          Sint Maarten (Dutch part)
                        </MenuItem>
                        <MenuItem value="SK">Slovakia</MenuItem>
                        <MenuItem value="SI">Slovenia</MenuItem>
                        <MenuItem value="SB">Solomon Islands</MenuItem>
                        <MenuItem value="SO">Somalia</MenuItem>
                        <MenuItem value="ZA">South Africa</MenuItem>
                        <MenuItem value="GS">
                          South Georgia and the South Sandwich Islands
                        </MenuItem>
                        <MenuItem value="SS">South Sudan</MenuItem>
                        <MenuItem value="ES">Spain</MenuItem>
                        <MenuItem value="LK">Sri Lanka</MenuItem>
                        <MenuItem value="SD">Sudan</MenuItem>
                        <MenuItem value="SR">Suriname</MenuItem>
                        <MenuItem value="SJ">Svalbard and Jan Mayen</MenuItem>
                        <MenuItem value="SE">Sweden</MenuItem>
                        <MenuItem value="CH">Switzerland</MenuItem>
                        <MenuItem value="SY">Syrian Arab Republic</MenuItem>
                        <MenuItem value="TW">Taiwan</MenuItem>
                        <MenuItem value="TJ">Tajikistan</MenuItem>
                        <MenuItem value="TZ">
                          Tanzania, United Republic of
                        </MenuItem>
                        <MenuItem value="TH">Thailand</MenuItem>
                        <MenuItem value="TL">Timor-Leste</MenuItem>
                        <MenuItem value="TG">Togo</MenuItem>
                        <MenuItem value="TK">Tokelau</MenuItem>
                        <MenuItem value="TO">Tonga</MenuItem>
                        <MenuItem value="TT">Trinidad and Tobago</MenuItem>
                        <MenuItem value="TN">Tunisia</MenuItem>
                        <MenuItem value="TR">Turkey</MenuItem>
                        <MenuItem value="TM">Turkmenistan</MenuItem>
                        <MenuItem value="TC">Turks and Caicos Islands</MenuItem>
                        <MenuItem value="TV">Tuvalu</MenuItem>
                        <MenuItem value="UG">Uganda</MenuItem>
                        <MenuItem value="GB">UK</MenuItem>
                        <MenuItem value="UA">Ukraine</MenuItem>
                        <MenuItem value="AE">United Arab Emirates</MenuItem>
                        <MenuItem value="US">United States</MenuItem>
                        <MenuItem value="UM">
                          United States Minor Outlying Islands
                        </MenuItem>
                        <MenuItem value="UY">Uruguay</MenuItem>
                        <MenuItem value="UZ">Uzbekistan</MenuItem>
                        <MenuItem value="VU">Vanuatu</MenuItem>
                        <MenuItem value="VE">
                          Venezuela, Bolivarian Republic of
                        </MenuItem>
                        <MenuItem value="VN">Vietnam</MenuItem>
                        <MenuItem value="VG">Virgin Islands, British</MenuItem>
                        <MenuItem value="VI">Virgin Islands, U.S.</MenuItem>
                        <MenuItem value="WF">Wallis and Futuna</MenuItem>
                        <MenuItem value="EH">Western Sahara</MenuItem>
                        <MenuItem value="YE">Yemen</MenuItem>
                        <MenuItem value="ZM">Zambia</MenuItem>
                        <MenuItem value="ZW">Zimbabwe</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <label
                  style={{ width: "100%", fontWeight: "bold", color: "#999" }}
                >
                  ADDRESS :
                </label>
                <TextField
                  margin="normal"
                  fullWidth
                  name="address"
                  type="address"
                  id="address"
                  autoComplete="address"
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label
                  style={{ width: "100%", fontWeight: "bold", color: "#999" }}
                >
                  CITY :
                </label>
                <TextField
                  margin="normal"
                  fullWidth
                  name="address"
                  type="address"
                  id="address"
                  autoComplete="address"
                  onChange={(e) => setCity(e.target.value)}
                />

                <label
                  style={{ width: "100%", fontWeight: "bold", color: "#999" }}
                >
                  POSTCODE :
                </label>
                <TextField
                  margin="normal"
                  fullWidth
                  name="address"
                  type="address"
                  id="address"
                  autoComplete="address"
                  onChange={(e) => setPostCode(e.target.value)}
                />

                <Button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  DELIVER TO THIS ADDRESS
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>
    );
  };

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append("country", country);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("postcode", postcode);
    formData.append("mobileno", userData.mobileno);

    var result = await postData("address_submit", formData);
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
      setOpen(false);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    }
  };

  const showTotal = () => {
    return (
      <div
        style={{
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          margin: "5%",
        }}
      >
        <div style={{}}>
          <div style={{ fontWeight: 1000 }}>TOTAL</div>
          <hr
            style={{
              width: "100%",
              borderTop: "1px solid #ececec",
              margin: "20px 0",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ fontWeight: "bold", flex: "1", textAlign: "left" }}>
                Total Amount:
              </div>
              <div style={{ flex: "1", textAlign: "right" }}>
                &#8377;{totalamount}
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <div style={{ fontWeight: "bold", flex: "1", textAlign: "left" }}>
                Amount to Pay:
              </div>
              <div style={{ flex: "1", textAlign: "right" }}>
                &#8377;{actualamount}
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <div style={{ fontWeight: "bold", flex: "1", textAlign: "left" }}>
                You Save:
              </div>
              <div style={{ flex: "1", textAlign: "right" }}>
                &#8377;{saveamount}
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <div style={{ fontWeight: "bold", flex: "1", textAlign: "left" }}>
                Delivery:
              </div>
              <div style={{ flex: "1", textAlign: "right" }}>&#8377;{0}</div>
            </div>
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #2d2d2d",
                margin: "10px 0",
              }}
            />
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <div style={{ fontWeight: "bold", flex: "1", textAlign: "left" }}>
                Net Amount:
              </div>

              <div style={{ flex: "1", textAlign: "right" }}>
                &#8377;{actualamount}
              </div>
            </div>
          </div>
          <hr
            style={{
              width: "100%",
              borderTop: "1px solid #2d2d2d",
              margin: "10px 0",
            }}
          />
          <div
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <button
              style={{
                alignContent: "center",
                backgroundColor: "#018849",
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 16,
                paddingBlock: 4,
                justifyContent: "space-evenly",
                paddingRight: 10,
                paddingLeft: 10,
                width: "100%",
                borderBlockColor: "#018849",
              }}
              onClick={handlePayment}
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const showAddress = () => {
    return addressList.map((item) => {
      return (
        <div>
          <div>{userData?.address} </div>
          <div>
            {userData?.city}, {userData?.country},{userData?.postcode}{" "}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#ececec",
        justifyContent: "left",
        padding: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "left",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <Grid container spacing={2} style={{ alignItems: "left" }}>
          <Grid item xs={12} md={8}>
            <div
              style={{
                padding: "1%",
                color: "#000",
                fontWeight: "bold",
                justifyContent: "space-evenly",
                textAlign: "left",
                fontSize: "2vw",
                fontFamily: "League Gothic",
                letterSpacing: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "none", textAlign: "left" }}>SevenShades</div>
              <div
                style={{
                  fontSize: "2vw",
                  marginLeft: "1%",
                  textAlign: "right",
                }}
              >
                CHECK OUT
              </div>
            </div>

            <div
              style={{
                width: "90%",
                backgroundColor: "white",
                padding: "1%",
                marginBottom: "5%",
                paddingLeft: "5%",
                paddingTop: "2%",
                marginTop: "5%",
              }}
            >
              <Box sx={{ mt: 1 }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "1.3vw",
                    marginBottom: "2%",
                  }}
                >
                  Delivery Address
                </div>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "1vw",
                    marginBottom: "2%",
                  }}
                >
                  {userData?.firstname} {userData?.lastname}
                  {showAddressList()}
                </div>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: ".8vw",
                    marginBottom: "2%",
                  }}
                >
                  {addressList.length == 0 ? (
                    <div>
                      <Button>ADD NEW ADDRESS</Button>
                    </div>
                  ) : (
                    showAddress()
                  )}
                </div>
              </Box>
            </div>

            {open ? addressComponent() : <></>}

            <div
              style={{ width: "90%", display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  width: "90%",
                  backgroundColor: "white",
                  paddingLeft: "5%",

                  marginTop: "5%",
                }}
              >
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "1.3vw",
                    marginTop: "5",
                    marginBottom: "1%",
                  }}
                >
                  PAYMENT
                </div>
              </div>

              <div
                style={{
                  width: "90%",
                  padding: "2%",
                  fontWeight: "bold",

                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#a2a6a4",
                  alignItems: "left",
                  justifyContent: "center",
                  textAlign: "center",
                  paddigLeft: "-2%",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginTop: "1%",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  WE ACCEPT:
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {showAllPayItems()}
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: "5%",
                marginTop: "27.5%",
              }}
            >
              {showTotal()}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const payitems = [
  { id: "1", icon: "f21.png" },
  { id: "2", icon: "f22.png" },
  { id: "3", icon: "f23.png" },
  { id: "4", icon: "f24.png" },
  { id: "5", icon: "f25.png" },
];

const showAllPayItems = () => {
  return payitems.map((item) => (
    <div
      key={item.id}
      style={{
        width: "30px",
        height: "20px",
        marginBottom: 1,
        backgroundColor: "#f2f2f2",
        margin: 5,
      }}
    >
      <img
        src={`${serverURL}/static/${item.icon}`}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  ));
};
