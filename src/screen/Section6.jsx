import { IconButton, TextField, Typography } from "@material-ui/core";
import "./Screen.css";
import React, { useEffect, useState } from "react";
import { Add, Delete } from "@material-ui/icons";
import * as firebase from "firebase";
import { toast } from "react-toastify";
import { GET_SECTION, SET_SECTION } from "../Actions/Actions";
import * as Actionlist from "../Actions/ActionsList";
const Section6 = (props) => {
  const [state, setState] = useState();
  const [total, setTotal] = useState([]);
  const [total2, setTotal2] = useState([]);
  const handleChange = (event) => {
    const [name, field] = event.target.name.split(".");
    console.log(name, field);
    let val = { ...state };
    val[name][field] = event.target.value;
    setState(val);
  };

  const missing = (T, arr, s) => {
    let a = [];
    for (var i = s; i < T + 1; i++) {
      let b = { number: i, hit: false };
      a.push(b);
    }
    console.log(a);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (a[i].number === arr[j]) {
          a[i].hit = true;
          break;
        }
      }
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i].hit !== true) {
        return a[i];
      }
    }
    return { hit: true };
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
    if (GET_SECTION(Actionlist.SECTION_6) !== null) {
      setState(GET_SECTION(Actionlist.SECTION_6));
      let l = GET_SECTION(Actionlist.SECTION_6);
      console.log(l);
      let b = [];
      let c = [];
      for (var obj in l) {
        if (l[obj].index < 10) {
          b.push(l[obj].index);
        } else {
          c.push(l[obj].index);
        }
      }
      setTotal(b);
      setTotal2(c);
    }
  }, [props]);
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
              Section 6
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
      <div style={{ marginTop: 20 }}>
        <Typography style={{ fontWeight: "bold" }}>
          Additional Keyword Tracking
        </Typography>
        <Typography style={{ color: "#A8A6B4" }}>
          Your location’s rankings will be monitored when people search for
          these terms or phrases
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
            {total.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                }}
                key={index}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  {index + 1}
                </Typography>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    setTotal(total.filter((val) => val !== item));
                    let i = { ...state };
                    delete i[`keywords${item}`];
                    setState(i);
                  }}
                >
                  <Delete
                    style={{
                      color: "#ff9100",
                      fontSize: 38,
                    }}
                  />
                </IconButton>
                <TextField
                  style={{ marginRight: 7 }}
                  variant="filled"
                  size="small"
                  value={
                    state[`keywords${state[`keywords${item}`]?.index}`]?.in1
                  }
                  onChange={handleChange}
                  inputProps={{
                    name: "keywords" + item + ".in1",
                    id: "outlined-Primary-" + item + "-native-simple-1",
                  }}
                />
                <TextField
                  variant="filled"
                  size="small"
                  value={
                    state[`keywords${state[`keywords${item}`]?.index}`]?.in2
                  }
                  onChange={handleChange}
                  inputProps={{
                    name: "keywords" + item + ".in2",
                    id: "outlined-Primary-Category" + item + "-native-simple-2",
                  }}
                />
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
            {total2.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                key={index}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  {index + total.length + 1}
                </Typography>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    setTotal2(total2.filter((val) => val !== item));
                    let i = { ...state };
                    delete i[`keywords${item}`];
                    setState(i);
                  }}
                >
                  <Delete
                    style={{
                      color: "#ff9100",
                      fontSize: 38,
                    }}
                  />
                </IconButton>
                <TextField
                  style={{ marginRight: 7 }}
                  variant="filled"
                  size="small"
                  value={
                    state[`keywords${state[`keywords${item}`]?.index}`]?.in1
                  }
                  onChange={handleChange}
                  inputProps={{
                    name: `keywords${item}.in1`,
                    id: "outlined-Primary-Category" + item + "-native-simple",
                  }}
                />
                <TextField
                  variant="filled"
                  size="small"
                  value={
                    state[`keywords${state[`keywords${item}`]?.index}`]?.in2
                  }
                  onChange={handleChange}
                  inputProps={{
                    name: `keywords${item}.in2`,
                    id: "outlined-Primary-Category" + item + "-native-simple2",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          let K =
            total[total.length - 1] !== undefined
              ? total[total.length - 1]
              : -1;
          let k2 =
            total2[total2.length - 1] !== undefined
              ? total2[total2.length - 1]
              : 9;
          let T = total.length;
          let T2 = total2.length;
          console.log(K, k2, total, total2);
          if (!missing(K, total, 0).hit && K !== -1) {
            console.log("K");
            let miss = missing(K, total, 0);
            setState({
              ...state,
              [`keywords${miss.number}`]: {
                in1: "",
                in2: "",
                index: miss.number,
              },
            });
            let d = [...total];
            d.push(miss.number);
            d.sort();
            setTotal(d);
          } else if (!missing(k2, total2, 10).hit && k2 !== 9) {
            console.log("k2", missing(k2, total, 10), k2, total2);
            let miss = missing(k2, total2, 10);
            setState({
              ...state,
              [`keywords${miss.number}`]: {
                in1: "",
                in2: "",
                index: miss.number,
              },
            });
            let d = [...total2];
            d.push(miss.number);
            d.sort();
            setTotal2(d);
          } else if (T + T2 < 20) {
            console.log("N");
            K <= 8
              ? setState({
                  ...state,
                  [`keywords${K + 1}`]: { in1: "", in2: "", index: K + 1 },
                })
              : setState({
                  ...state,
                  [`keywords${k2 + 1}`]: {
                    in1: "",
                    in2: "",
                    index: k2 + 1,
                  },
                });
            if (K <= 8) {
              K = K + 1;
              let i = [...total];
              i.push(K);
              setTotal(i);
            } else {
              k2 = k2 + 1;
              setTotal2([...total2, k2]);
            }
          }
          console.log(K, k2, total, total2);
        }}
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
        <Typography variant="h6" style={{ color: "#2979ff" }}>
          Up to 20 Keywords
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          margin: 29,
          height:
            total.length > 7 && total2.length > 7
              ? "unset"
              : total.length > 4 && total2.length > 4
              ? window.screen.availHeight / 5.75
              : total.length > 2 && total2.length > 2
              ? window.screen.availHeight / 2.25
              : window.screen.availHeight / 1.75,
        }}
      >
        <div
          style={{
            display: "flex",
            transform: "rotateZ(180deg)",
          }}
          onClick={() => {
            console.log(state);
            SET_SECTION(Actionlist.SECTION_6, state);
            props.history.push("/cover");
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
            marginLeft: 30,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          onClick={() => {
            if (total.length > 0 && total.length + total2.length < 20) {
              firebase.default
                .firestore()
                .collection(auth.uid)
                .doc("section6")
                .set(state)
                .then((res) => {
                  toast.success(
                    SET_SECTION(Actionlist.SECTION_6, state) +
                      " Adding Section 6"
                  );
                  props.history.push("/additional");
                });
            } else {
              toast.error("Keywords are required!");
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

export default Section6;
