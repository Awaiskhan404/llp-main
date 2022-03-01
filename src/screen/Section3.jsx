import { IconButton, TextField, Typography } from "@material-ui/core";
import "./Screen.css";
import React, { useEffect, useState } from "react";
import { Add } from "@material-ui/icons";
import * as firebase from "firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { GET_SECTION, SET_SECTION } from "../Actions/Actions";
import * as Actionlist from "../Actions/ActionsList";
const Section3 = (props) => {
  const [state, setState] = useState({
    about: "",
    call_tracking_phone_number: "",
    UTM_tracking_website_URL: "",
    bing_call_tracking_phone_number: "",
    bing_UTM_tracking_website_URL: "",
    cover_photo: null,
    bing_category: "",
    additional_bing_categories: "",
    apple_category: "",
    additional_apple_categories: "",
    apple_coordinates_lat: "",
    apple_coordinates_long: "",
  });

  const sectionschema = Yup.object({
    about: Yup.string(),
    call_tracking_phone_number: Yup.number().required(),
    UTM_tracking_website_URL: Yup.string(),
    bing_call_tracking_phone_number: Yup.number().required(),
    bing_UTM_tracking_website_URL: Yup.string(),
    cover_photo: null,
    bing_category: Yup.string().required(),
    additional_bing_categories: Yup.string().required(),
    apple_category: Yup.string().required(),
    additional_apple_categories: Yup.string().required(),
    apple_coordinates_lat: Yup.string(),
    apple_coordinates_long: Yup.string(),
  });

  const [auth, setAuth] = useState();

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        props.history.push("/");
      } else {
        setAuth(user);
      }
    });
    if (GET_SECTION(Actionlist.SECTION_3) !== null) {
      setState(GET_SECTION(Actionlist.SECTION_3));
    }
  }, [props]);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      toast.error("Error: " + error);
    };
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const form = [
    {
      label: <Typography style={{ fontWeight: "bold" }}>About</Typography>,
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="A description of your business for the Facebook About Us” section of a listing. 155 characters max"
          multiline
          value={state.about}
          onChange={handleChange}
          inputProps={{
            name: "about",
            id: "outlined-about-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Call Tracking Phone Number
          <span
            style={{
              color: "#ff1744",
              marginRight: 7,
            }}
          >
            *
          </span>
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Tracking Phone Number"
          value={state.call_tracking_phone_number}
          onChange={handleChange}
          inputProps={{
            name: "call_tracking_phone_number",
            id: "outlined-call_tracking_phone_number-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          UTM/Tracking Website URL
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Tracking URL"
          value={state.UTM_tracking_website_URL}
          onChange={handleChange}
          inputProps={{
            name: "UTM_tracking_website_URL",
            id: "outlined-UTM_tracking_website_URL-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>Cover Photo</Typography>
      ),
      component: (
        <div
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#9e9e9e",
            borderStyle: "solid",
          }}
        >
          <div
            style={{ margin: 20, display: "flex", justifyContent: "center" }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file2"
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  getBase64(e.target.files[0], (result) => {
                    setState({ ...state, cover_photo: result });
                  });
                }
              }}
            />
            <label
              htmlFor="icon-button-file2"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {state?.cover_photo === null ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Add
                    style={{
                      backgroundColor: "#ff9100",
                      color: "#fff",
                      borderRadius: 25,
                      borderWidth: 2,
                      borderColor: "#000",
                      borderStyle: "solid",
                    }}
                  />
                </IconButton>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setState({ ...state, cover_photo: null });
                  }}
                >
                  <img
                    src={state.cover_photo}
                    alt="Cover_Photo"
                    style={{ width: 180, height: 150 }}
                  />
                  <Typography
                    variant="caption"
                    style={{
                      color: "#2196f3",
                      cursor: "pointer",
                      fontSize: 18,
                      textDecoration: "underline",
                    }}
                  >
                    Remove
                  </Typography>
                </div>
              )}
            </label>
          </div>
        </div>
      ),
    },
  ];

  const form2 = [
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Bing Category
          <span
            style={{
              color: "#ff1744",
              marginRight: 30,
            }}
          >
            *
          </span>
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Internet Marketing Agency"
          value={state.bing_category}
          onChange={handleChange}
          inputProps={{
            name: "bing_category",
            id: "outlined-bing_category-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Additional Bing Categories
          <span
            style={{
              color: "#ff1744",
              marginRight: 30,
            }}
          >
            *
          </span>
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Advertising Agency"
          value={state.additional_bing_categories}
          onChange={handleChange}
          inputProps={{
            name: "additional_bing_categories",
            id: "outlined-additional_bing_categories-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Call Tracking Phone Number
          <span
            style={{
              color: "#ff1744",
              marginRight: 7,
            }}
          >
            *
          </span>
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Call Tracking Phone Number"
          value={state.bing_call_tracking_phone_number}
          onChange={handleChange}
          inputProps={{
            name: "bing_call_tracking_phone_number",
            id: "outlined--BING-call_tracking_phone_number-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          UTM/Tracking Website URL
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="UTM/Tracking Website URL"
          value={state.bing_UTM_tracking_website_URL}
          onChange={handleChange}
          inputProps={{
            name: "bing_UTM_tracking_website_URL",
            id: "outlined-bing_UTM_tracking_website_URL-simple",
          }}
        />
      ),
    },
  ];

  const user = [
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Apple Category
          <span
            style={{
              color: "#ff1744",
              marginRight: 30,
            }}
          >
            *
          </span>
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Advertising"
          value={state.apple_category}
          onChange={handleChange}
          inputProps={{
            name: "apple_category",
            id: "outlined-APPLE_category-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Apple Additional Categories
          <span
            style={{
              color: "#ff1744",
              marginRight: 30,
            }}
          >
            *
          </span>
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Search…."
          value={state.additional_apple_categories}
          onChange={handleChange}
          inputProps={{
            name: "additional_apple_categories",
            id: "outlined-additional_APPLE_categories-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Apple Coordinates
        </Typography>
      ),
      component: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            variant="filled"
            style={{ marginBottom: 10 }}
            size="small"
            placeholder="Latitude"
            value={state.apple_coordinates_lat}
            onChange={handleChange}
            inputProps={{
              name: "apple_coordinates_lat",
              id: "outlined-apple_coordinates_lat-native-simple",
            }}
          />
          <TextField
            variant="filled"
            size="small"
            placeholder="Longitude"
            value={state.apple_coordinates_long}
            onChange={handleChange}
            inputProps={{
              name: "apple_coordinates_long",
              id: "outlined-apple_coordinates_long-native-simple",
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        margin: 5,
        padding: 5,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            borderColor: "#2F528F",
            borderWidth: 1,
            borderStyle: "solid",
            background: "#DAE3F3",
            borderRadius: 7,
            padding: 10,
          }}
        >
          <Typography align="center" style={{ width: "100%", height: 20 }}>
            Let's Get Started
          </Typography>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              borderColor: "#000",
              borderWidth: 1,
              borderStyle: "solid",
              background: "#ffab00",
              borderRadius: 7,
              padding: 10,
              cursor: "pointer",
              width: 200,
              color: "#fff",
            }}
          >
            <Typography align="center" style={{ width: "100%" }}>
              Section 3
            </Typography>
          </div>
        </div>
        <Typography style={{ fontWeight: "bold" }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 7,
            }}
          >
            *
          </span>
          Required Field
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            {form.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ alignSelf: "flex-start" }}>{item.label}</div>
                {item.component}
              </div>
            ))}
          </div>
        </div>
        <div
          className={"R1"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            position: "relative",
            padding: 20,
          }}
        >
          <img
            src="/right-arrow.png"
            alt="next"
            style={{
              position: "absolute",
              padding: 10,
              top: 150,
              width: 80,
              height: 50,
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            {form2.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ alignSelf: "flex-start" }}>{item.label}</div>
                {item.component}
              </div>
            ))}
          </div>
        </div>
        <div
          className={"R1"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            position: "relative",
            padding: 20,
          }}
        >
          <img
            src="/right-arrow.png"
            alt="next"
            style={{
              position: "absolute",
              padding: 10,
              top: 150,
              width: 80,
              height: 50,
            }}
          />
        </div>
        <div
          style={{
            justifyContent: "flex-start",
            display: "flex",
          }}
        >
          <div>
            {user.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 20,
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                    alignSelf: "flex-start",
                  }}
                >
                  {item.label}
                </div>
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            transform: "rotateZ(180deg)",
          }}
          onClick={() => {
            SET_SECTION(Actionlist.SECTION_3, state);
            props.history.push("/payment");
          }}
        >
          <img
            src="/right-arrow.png"
            alt="next"
            style={{ width: 75, height: 45 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
          onClick={() => {
            sectionschema
              .validate(state, { abortEarly: false })
              .then((u) => {
                firebase.default
                  .firestore()
                  .collection(auth.uid)
                  .doc("section3")
                  .set(u)
                  .then((res) => {
                    toast.success(
                      SET_SECTION(Actionlist.SECTION_3, state) +
                        " Adding Section 3"
                    );
                    props.history.push("/business_description");
                  });
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.errors[0]);
              });
          }}
        >
          <img
            src="/right-arrow.png"
            alt="next"
            style={{ width: 75, height: 45 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;
