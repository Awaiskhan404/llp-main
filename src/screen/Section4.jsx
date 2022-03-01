import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import "./Screen.css";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { GET_SECTION, SET_SECTION } from "../Actions/Actions";
import * as Actionlist from "../Actions/ActionsList";
const Section4 = (props) => {
  const [state, setState] = useState({
    primary_category: "",
    primary_website: "",
    alternate_website: "",
    business_name: "",
    country: "",
    street_address: "",
    state: "",
    zip: "",
    suite: "",
    city: "",
    main_phone: "",
    alternate_phone: "",
    business_description: "",
    business_owner: "",
    business_email: "",
    business_fax: "",
    year_established: "",
    payment_type: "",
  });

  const sectionschema = Yup.object({
    primary_category: Yup.string().required(),
    business_name: Yup.string().required(),
    primary_website: Yup.string().required(),
    alternate_website: Yup.string(),
    country: Yup.string().required(),
    street_address: Yup.string().required(),
    suite: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.number().required(),
    main_phone: Yup.string().required(),
    alternate_phone: Yup.string(),
    business_description: Yup.string().required(),
    business_owner: Yup.string().required(),
    business_email: Yup.string().required().email(),
    business_fax: Yup.string(),
    year_established: Yup.number(),
    payment_type: Yup.string().required(),
  });

  const [auth, setAuth] = useState();
  const [fill, setFill] = useState(false);
  const [sec_1, setSec_1] = useState(null);

  useEffect(() => {
    setSec_1(GET_SECTION(Actionlist.SECTION_1));
    setFill(true);
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        props.history.push("/");
      } else {
        setAuth(user);
      }
    });
    if (GET_SECTION(Actionlist.SECTION_4) !== null) {
      setState(GET_SECTION(Actionlist.SECTION_4));
    } else {
      setFill(true);
    }
  }, [props]);

  if (fill) {
    let auto = sec_1;
    let s = { ...state };
    s.business_email = auto?.business_email;
    s.business_owner = auto?.owner_name;
    s.business_name = auto?.business_name;
    s.street_address = auto?.business_address;
    s.state = auto?.state;
    s.zip = auto?.zip;
    s.suite = auto?.suite;
    s.city = auto?.city;
    s.main_phone = auto?.business_phone;
    setState(s);
    setFill(false);
  }
  const generate = ["Visa", "Mastercard", "Discover", "Cash", "Amex", "Check"];

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
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>
          Primary Category (Google)
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Category"
          value={state.primary_category}
          onChange={handleChange}
          inputProps={{
            name: "primary_category",
            id: "outlined-Primary-Category-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Business Name
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Business Name"
          value={state.business_name}
          onChange={handleChange}
          inputProps={{
            name: "business_name",
            id: "outlined-Business Name-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>
          Primary Website
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Primary Website"
          value={state.primary_website}
          onChange={handleChange}
          inputProps={{
            name: "primary_website",
            id: "outlined-Primary-Website-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>
          Alternate Website
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Alternate Website"
          value={state.alternate_website}
          onChange={handleChange}
          inputProps={{
            name: "alternate_website",
            id: "outlined-alternate_website-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Country
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Country"
          value={state.country}
          onChange={handleChange}
          inputProps={{
            name: "country",
            id: "outlined-country-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>
          Street Address
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Street Address"
          value={state.street_address}
          onChange={handleChange}
          inputProps={{
            name: "street_address",
            id: "outlined-street_address-native-simple",
          }}
        />
      ),
    },
    {
      label: <Typography style={{ fontWeight: "bold" }}>Suite</Typography>,
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Suite"
          value={state.suite}
          onChange={handleChange}
          inputProps={{
            name: "suite",
            id: "outlined-Suite-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          City
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="City"
          value={state.city}
          onChange={handleChange}
          inputProps={{
            name: "city",
            id: "outlined-City-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>
          State
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="State"
          value={state.state}
          onChange={handleChange}
          inputProps={{
            name: "state",
            id: "outlined-State-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Zip
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Zip"
          value={state.zip}
          onChange={handleChange}
          inputProps={{
            name: "zip",
            id: "outlined-zip-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Main Phone
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Main Phone"
          value={state.main_phone}
          onChange={handleChange}
          inputProps={{
            name: "main_phone",
            id: "outlined-main_phone-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>Alternate Phone</Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Alternate Phone"
          value={state.alternate_phone}
          onChange={handleChange}
          inputProps={{
            name: "alternate_phone",
            id: "outlined-alternate_phone-native-simple",
          }}
        />
      ),
    },
  ];

  const user = [
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Business Description
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Business Description"
          value={state.business_description}
          onChange={handleChange}
          inputProps={{
            name: "business_description",
            id: "outlined-business_description-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Business Owner
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Business Owner"
          value={state.business_owner}
          onChange={handleChange}
          inputProps={{
            name: "business_owner",
            id: "outlined-Select-Password-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Business Email
        </Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Business Email"
          value={state.business_email}
          onChange={handleChange}
          inputProps={{
            name: "business_email",
            id: "outlined-business_email-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>Business Fax</Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Business Fax"
          value={state.business_fax}
          onChange={handleChange}
          inputProps={{
            name: "business_fax",
            id: "outlined-business_fax-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold" }}>Year Established</Typography>
      ),
      component: (
        <TextField
          variant="filled"
          size="small"
          placeholder="Year Established"
          value={state.year_established}
          onChange={handleChange}
          inputProps={{
            name: "year_established",
            id: "outlined-year_established-native-simple",
          }}
        />
      ),
    },
    {
      label: (
        <Typography style={{ fontWeight: "bold", marginRight: 3 }}>
          <span
            style={{
              color: "#ff1744",
              marginRight: 3,
            }}
          >
            *
          </span>{" "}
          Payment Types
        </Typography>
      ),
      component: (
        <div
          style={{
            borderWidth: 1,
            borderColor: "#757575",
            borderStyle: "solid",
            width: "61%",
            cursor: "pointer",
            color: "#757575",
          }}
        >
          <List>
            {generate.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  toast.info(item + " payment selected");
                  setState({
                    ...state,
                    payment_type: item,
                  });
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
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
              Section 4
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
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 20,
                  flexWrap: "wrap",
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
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 20,
                  flexWrap: "wrap",
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
            SET_SECTION(Actionlist.SECTION_4, state);
            props.history.push("/categories");
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
                  .doc("section4")
                  .set(u)
                  .then((res) => {
                    toast.success(
                      SET_SECTION(Actionlist.SECTION_4, state) +
                        " Adding Section 4"
                    );
                    props.history.push("/cover");
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

export default Section4;
