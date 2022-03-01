import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
} from "@material-ui/core";
import "./Screen.css";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Add, Close } from "@material-ui/icons";
import * as firebase from "firebase";
import { toast } from "react-toastify";
import { GET_SECTION, SET_SECTION } from "../Actions/Actions";
import * as Actionlist from "../Actions/ActionsList";
const Section8 = (props) => {
  const [state, setState] = useState([
    {
      day: "Monday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
    {
      day: "Tuesday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
    {
      day: "Wednesday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
    {
      day: "Thursday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
    {
      day: "Friday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
    {
      day: "Saturday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
    {
      day: "Sunday",
      from: new Date(),
      to: new Date(),
      checked: true,
    },
  ]);

  const [tempclose, settempclose] = useState("");
  const [list, setList] = useState([]);

  const [auth, setAuth] = useState();

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        props.history.push("/");
      } else {
        setAuth(user);
      }
    });
    if (GET_SECTION(Actionlist.SECTION_8) !== null) {
      let i = GET_SECTION(Actionlist.SECTION_8);
      setState(i.daily);
      settempclose(i.temporarily);
      setList(i.special_Holiday);
    }
  }, [props]);

  const handleChange = (event, i) => {
    let s = [...state];
    console.log("ll", s);
    s[i].checked = event.target.checked;
    setState(s);
    console.log(state);
  };
  const handlelistChange = (event, i) => {
    let s = [...list];
    s[i].checked = event.target.checked;
    setList(s);
  };

  const handlelistChangedate = (date, i) => {
    let s = [...list];
    s[i].type = date;
    setList(s);
  };

  const handleDateChangefrom = (date, i) => {
    let s = [...state];
    s[i].from = date;
    setState(s);
  };
  const handleDateChangeto = (date, i) => {
    let s = [...state];
    s[i].to = date;
    setState(s);
  };
  const handlelistDateChangefrom = (date, i) => {
    let s = [...list];
    s[i].from = date;
    setList(s);
  };
  const handlelistDateChangeto = (date, i) => {
    let s = [...list];
    s[i].to = date;
    setList(s);
  };
  return (
    <div className="section8" style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: 15,
          padding: 15,
        }}
      >
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
              Section 8
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
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <Typography style={{ fontWeight: "bold" }}>
            Daily
            <span
              style={{
                color: "#ff1744",
                marginRight: 30,
                alignSelf: "center",
              }}
            >
              *
            </span>
          </Typography>
          <Typography>Only Selected Days will be selected.</Typography>
          {state.map((item, i) => (
            <div
              className="S8"
              key={i}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                marginBottom: 20,
              }}
            >
              <Typography style={{ width: 100 }}>{item.day}</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.checked}
                      onChange={(e) => handleChange(e, i)}
                      color="primary"
                      name="checkedB"
                      inputProps={{ "aria-label": "primary checkbox" + i }}
                    />
                  }
                  label={item.checked ? "Open" : "Close"}
                />
              </FormGroup>

              <Typography style={{ width: 80, textAlign: "center" }}>
                from
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  inputVariant="standard"
                  margin="normal"
                  emptyLabel="--:--"
                  disabled={!item.checked}
                  id={"time-picker" + i}
                  value={item.from}
                  onChange={(event) => {
                    handleDateChangefrom(event, i);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
              <Typography style={{ width: 80, textAlign: "center" }}>
                to
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  inputVariant="standard"
                  id={"time-picker" + i}
                  value={item.to}
                  disabled={!item.checked}
                  onChange={(event) => {
                    handleDateChangeto(event, i);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button color="primary" disabled={!item.checked}>
                Add Hours
              </Button>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            margin: 10,
          }}
        >
          <div>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Temporarily Closed
            </Typography>
            <FormControl component="fieldset">
              <FormGroup
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        tempclose === "Temporarily Closed" ? true : false
                      }
                      onChange={() => {
                        settempclose("Temporarily Closed");
                      }}
                      name="Temporarily Closed"
                    />
                  }
                  label="Temporarily Closed"
                />
                <FormControlLabel
                  style={{ width: "100%" }}
                  control={
                    <Checkbox
                      checked={
                        tempclose === "Reopen temporarily closed location"
                          ? true
                          : false
                      }
                      onChange={() => {
                        settempclose("Reopen temporarily closed location");
                      }}
                      name="Reopen temporarily closed location"
                    />
                  }
                  label="Reopen temporarily closed location"
                />
              </FormGroup>
            </FormControl>
          </div>
          <div>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", marginTop: 20 }}
            >
              Special/Holidays Hours
            </Typography>
            <Typography variant="body1" style={{ marginTop: 20 }}>
              Only Selected dates will be updated
            </Typography>
            {list.map((item, i) => (
              <div
                className="S8"
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ marginRight: 20 }}
                    autoOk
                    allowKeyboardControl={false}
                    value={item.date}
                    onChange={(date) => handlelistChangedate(date, i)}
                  />
                </MuiPickersUtilsProvider>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={item.checked}
                        onChange={(e) => handlelistChange(e, i)}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" + i }}
                      />
                    }
                    label={item.checked ? "Open" : "Close"}
                  />
                </FormGroup>

                <Typography style={{ width: 80, textAlign: "center" }}>
                  from
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    inputVariant="standard"
                    margin="normal"
                    emptyLabel="--:--"
                    disabled={!item.checked}
                    id={"time-picker" + i}
                    value={item.from}
                    onChange={(event) => {
                      handlelistDateChangefrom(event, i);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Typography style={{ width: 80, textAlign: "center" }}>
                  to
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    inputVariant="standard"
                    id={"time-picker" + i}
                    value={item.to}
                    disabled={!item.checked}
                    onChange={(event) => {
                      handlelistDateChangeto(event, i);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Button color="primary" disabled={!item.checked}>
                  Add Hours
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() =>
                    setList(list.filter((item, index) => index !== i))
                  }
                >
                  <Close
                    style={{
                      backgroundColor: "#ff1744",
                      color: "#ffff",
                      fontSize: 26,
                    }}
                  />
                </IconButton>
              </div>
            ))}
            <div>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                style={{ marginTop: 20 }}
                onClick={() =>
                  setList([
                    ...list,
                    {
                      date: new Date(),
                      from: new Date(),
                      to: new Date(),
                      checked: true,
                    },
                  ])
                }
              >
                <Add
                  style={{
                    backgroundColor: "#ff1744",
                    color: "#ffff",
                    fontSize: 26,
                  }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: 15,
          padding: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            transform: "rotateZ(180deg)",
          }}
          onClick={() => {
            let data = {
              daily: state,
              temporarily: tempclose,
              special_Holiday: list,
            };
            SET_SECTION(Actionlist.SECTION_8, data);
            props.history.push("/additional");
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
            let data = {
              daily: state,
              temporarily: tempclose,
              special_Holiday: list,
            };
            firebase.default
              .firestore()
              .collection(auth.uid)
              .doc("section8")
              .set(data)
              .then((res) => {
                toast.success(
                  SET_SECTION(Actionlist.SECTION_8, data) + " Adding Section 8"
                );
                props.history.push("/credentials");
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

export default Section8;
