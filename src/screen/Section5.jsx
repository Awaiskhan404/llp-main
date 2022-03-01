import { IconButton, Typography } from "@material-ui/core";
import "./Screen.css";
import React, { useEffect, useState } from "react";
import { Add } from "@material-ui/icons";
import * as firebase from "firebase";
import { toast } from "react-toastify";
import { GET_SECTION, SET_SECTION } from "../Actions/Actions";
import * as Actionlist from "../Actions/ActionsList";
const Section5 = (props) => {
  const [state, setState] = useState({
    set_logo: null,
    add_general_images: [],
  });
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const [auth, setAuth] = useState();

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        props.history.push("/");
      } else {
        setAuth(user);
      }
    });
    if (GET_SECTION(Actionlist.SECTION_5) !== null) {
      setState(GET_SECTION(Actionlist.SECTION_5));
    }
  }, [props]);

  const form = [
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Set Logo
          <span
            style={{
              color: "#ff1744",
            }}
          >
            *
          </span>
        </Typography>
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
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  getBase64(e.target.files[0], (result) => {
                    setState({ ...state, set_logo: result });
                  });
                }
              }}
            />
            <label
              htmlFor="icon-button-file"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {state.set_logo === null ? (
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
                    setState({ ...state, set_logo: null });
                  }}
                >
                  <img
                    src={state.set_logo}
                    alt="next"
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

  const user = [
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Add General Images
        </Typography>
      ),
      component: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#9e9e9e",
            borderStyle: "solid",
            width: "-webkit-fill-available",
          }}
        >
          <div style={{ margin: 20, width: "93%", flexDirection: "row" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file2"
              type="file"
              onChange={(e) => {
                if (
                  e.target.files[0] &&
                  state.add_general_images.length <= 25
                ) {
                  getBase64(e.target.files[0], (result) => {
                    setState({
                      ...state,
                      add_general_images: [...state.add_general_images, result],
                    });
                  });
                  console.log(state);
                }
              }}
            />
            <label
              htmlFor="icon-button-file2"
              style={{ display: "flex", justifyContent: "center" }}
            >
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
                  }}
                />
              </IconButton>
            </label>
            {state.add_general_images.length > 0 && (
              <div>
                <div>
                  {state.add_general_images.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        let iu = state.add_general_images.filter(
                          (it, i) => i !== index
                        );
                        setState({
                          ...state,
                          add_general_images: iu,
                        });
                      }}
                    >
                      <img
                        src={item}
                        alt="next"
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
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        margin: 25,
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
              Section 5
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
            width: 300,
          }}
        >
          <div style={{ width: "inherit" }}>
            {form.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 20,
                }}
              >
                <div style={{ flexGrow: 1 }}>{item.label}</div>
                {item.component}
              </div>
            ))}
          </div>
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
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                  }}
                >
                  {item.label}
                </div>
                {item.component}
                <div
                  style={{
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      color: "#9e9e9e",
                      fontSize: 16,
                      width: 300,
                    }}
                  >
                    Maximum of 25 photos, including those already saved to
                    locations. When the maximum number is reached, the newest
                    ones will be displayed and the oldest ones will be discarded
                    from each location.
                  </Typography>
                </div>
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
            SET_SECTION(Actionlist.SECTION_5, state);
            props.history.push("/business_description");
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
            if (state.set_logo !== null) {
              firebase.default
                .firestore()
                .collection(auth.uid)
                .doc("section5")
                .set(state)
                .then((res) => {
                  toast.success(
                    SET_SECTION(Actionlist.SECTION_5, state) +
                      " Adding Section 5"
                  );
                  props.history.push("/keywords");
                });
            } else {
              toast.error("Photo not found");
            }
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

export default Section5;
