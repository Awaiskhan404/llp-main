import { TextField, Typography } from "@material-ui/core";
import "./Screen.css";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { GET_SECTION, SET_SECTION } from "../Actions/Actions";
import * as Actionlist from "../Actions/ActionsList";
const Credentials = (props) => {
  const [state, setState] = React.useState({
    facebook_email: "",
    google_email: "",
    facebook_password: "",
    google_password: "",
  });

  const sectionschema = Yup.object({
    facebook_email: Yup.string().email().required(),
    google_email: Yup.string().email().required(),
    facebook_password: Yup.string().min(6).required(),
    google_password: Yup.string().min(6).required(),
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
    if (GET_SECTION(Actionlist.SECTION_9) !== null) {
      setState(GET_SECTION(Actionlist.SECTION_9));
    }
  }, [props]);
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
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Email Address *"
          value={state.facebook_email}
          onChange={handleChange}
          inputProps={{
            name: "facebook_email",
            id: "outlined-FEmail Address-native-simple",
          }}
        />
      ),
    },
    {
      component: (
        <TextField
          variant="filled"
          size="small"
          type="password"
          placeholder="Password *"
          value={state.facebook_password}
          onChange={handleChange}
          inputProps={{
            name: "facebook_password",
            id: "outlined-facebook_password-native-simple",
          }}
        />
      ),
    },
  ];

  const user = [
    {
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Email Address *"
          value={state.google_email}
          onChange={handleChange}
          inputProps={{
            name: "google_email",
            id: "outlined-GEmail Address-native-simple",
          }}
        />
      ),
    },
    {
      component: (
        <TextField
          variant="filled"
          size="small"
          type="password"
          placeholder="Password *"
          value={state.google_password}
          onChange={handleChange}
          inputProps={{
            name: "google_password",
            id: "outlined-google_password-native-simple",
          }}
        />
      ),
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        margin: 35,
        padding: 25,
      }}
    >
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
              Section 9
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
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            <Typography
              align="center"
              style={{ width: "100%", margin: 10, fontWeight: "bold" }}
            >
              <span
                style={{
                  color: "#ff1744",
                  marginRight: 7,
                }}
              >
                *
              </span>
              Personal Facebook Login Credentials
            </Typography>
            <div>
              {form.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  {item.component}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div>
            <Typography
              align="center"
              style={{ width: "100%", margin: 10, fontWeight: "bold" }}
            >
              <span
                style={{
                  color: "#ff1744",
                  marginRight: 7,
                }}
              >
                *
              </span>
              Google My Business Login Credentials
            </Typography>
            <div>
              {user.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 20,
                  }}
                >
                  {item.component}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: window.screen.availHeight / 2,
        }}
      >
        <div
          style={{
            display: "flex",
            transform: "rotateZ(180deg)",
            justifyContent: "flex-end",
          }}
          onClick={() => {
            SET_SECTION(Actionlist.SECTION_9, state);
            props.history.push("/daily");
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
            alignItems: "flex-end",
          }}
          onClick={() => {
            sectionschema
              .validate(state, { abortEarly: false })
              .then((u) => {
                firebase.default
                  .firestore()
                  .collection(auth.uid)
                  .doc("section9")
                  .set(u)
                  .then((res) => {
                    toast.success(
                      SET_SECTION(Actionlist.SECTION_9, state) +
                        " Adding Section 9"
                    );
                    props.history.push("/menu");
                  });
              })
              .catch((err) => {
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

export default Credentials;
