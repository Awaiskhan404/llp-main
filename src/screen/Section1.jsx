import { FormControl, Select, TextField, Typography } from '@material-ui/core';
import './Screen.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { GET_SECTION, SET_SECTION } from '../Actions/Actions';
import * as Actionlist from '../Actions/ActionsList';
const PaymentScreen = (props) => {
  const [state, setState] = React.useState({
    country: 'United States',
    full_name: '',
    last_name: '',
    billing_address_line_1: '',
    billing_address_line_2: '',
    credit_number: '',
    state: '',
    zip_code: '',
    email: '',
    mm: '',
    yy: '',
    csc: '',
    city: '',
    ph: '',
    plan: { amount: 0, type: '' },
  });
  let list = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  const [auth, setAuth] = useState();
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (!user) {
        props.history.push('/');
      } else {
        setAuth(user);
      }
    });
    if (GET_SECTION(Actionlist.SECTION_2) !== null) {
      setState(GET_SECTION(Actionlist.SECTION_2));
    }
  }, [props]);

  const sectionschema = Yup.object({
    country: Yup.string().required(),
    full_name: Yup.string().required(),
    last_name: Yup.string().required(),
    credit_number: Yup.string().required(),
    mm: Yup.number().required(),
    yy: Yup.number().required(),
    csc: Yup.number().required(),
    billing_address_line_1: Yup.string().required(),
    billing_address_line_2: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip_code: Yup.number().required(),
    ph: Yup.string().required(),
    email: Yup.string().required(),
    // plan: Yup.object({
    //   amount: Yup.number().required(),
    //   type: Yup.string().required(),
    // }).required(),
  });

  const form = [
    {
      label: 'Country',
      component: (
        <FormControl variant="outlined" style={{ width: 300, height: 30 }}>
          <Select
            native
            style={{ height: 30 }}
            value={state.country}
            onChange={handleChange}
            inputProps={{
              name: 'country',
              id: 'outlined-country-native-simple',
            }}
          >
            <option aria-label="None" value="United State">
              United States
            </option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'First Name:',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.full_name}
          onChange={handleChange}
          inputProps={{
            name: 'full_name',
            id: 'outlined-full_name-native-simple',
          }}
        />
      ),
    },
    {
      label: 'Last Name:',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.last_name}
          onChange={handleChange}
          inputProps={{
            name: 'last_name',
            id: 'outlined-last_name-native-simple',
          }}
        />
      ),
    },
    {
      label: 'Credit Number:',
      component: (
        <div style={{ marginTop: 18 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={state?.credit_number}
            onChange={handleChange}
            inputProps={{
              name: 'credit_number',
              id: 'outlined-credit_number-native-simple',
            }}
          />
          <Typography variant="subtitle2" style={{ color: '#bdbdbd' }}>
            xxx-xxx-xxxx
          </Typography>
        </div>
      ),
    },
    {
      label: 'Payment:',
      component: (
        <img
          src="/pay.png"
          style={{ height: 50, width: 305 }}
          alt="Payment Methods"
        />
      ),
    },
    {
      label: 'Expiration Date:',
      component: (
        <div
          style={{
            height: 50,
            width: 305,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          className="exp"
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            placeholder="mm"
            value={state?.mm}
            onChange={handleChange}
            inputProps={{
              name: 'mm',
              id: 'outlined-mm-native-simple',
            }}
          />
          <Typography variant="subtitle1" style={{ margin: 7 }}>
            /
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            placeholder="yy"
            value={state?.yy}
            onChange={handleChange}
            inputProps={{
              name: 'yy',
              id: 'outlined-yy-native-simple',
            }}
          />
          <Typography variant="subtitle1" style={{ marginLeft: 7 }}>
            CSC:
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={state?.csc}
            onChange={handleChange}
            inputProps={{
              name: 'csc',
              id: 'outlined-csc-native-simple',
            }}
          />
          <Link to="#">
            <Typography variant="subtitle2" style={{ paddingLeft: 7 }}>
              What's This?
            </Typography>
          </Link>
        </div>
      ),
    },
    {
      label: 'Billing Address Line 1:',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.billing_address_line_1}
          onChange={handleChange}
          inputProps={{
            name: 'billing_address_line_1',
            id: 'outlined-billing_address_line_1-native-simple',
          }}
        />
      ),
    },
    {
      label: 'Billing Address Line 2: ',
      sub: '(Optional)',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.billing_address_line_2}
          onChange={handleChange}
          inputProps={{
            name: 'billing_address_line_2',
            id: 'outlined-billing_address_line_2-native-simple',
          }}
        />
      ),
    },
    {
      label: 'City:',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.city}
          onChange={handleChange}
          inputProps={{
            name: 'city',
            id: 'outlined-city-native-simple',
          }}
        />
      ),
    },
    {
      label: 'State:',
      component: (
        <FormControl variant="outlined" style={{ width: 300, height: 30 }}>
          <Select
            native
            style={{ height: 30, width: 120 }}
            value={state?.state}
            onChange={handleChange}
            inputProps={{
              name: 'state',
              id: 'outlined-state-native-simple',
            }}
          >
            <option aria-label="None">Select</option>
            {list.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Zip Code:',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.zip_code}
          onChange={handleChange}
          inputProps={{
            name: 'zip_code',
            id: 'outlined-zip_code-native-simple',
          }}
        />
      ),
    },
    {
      label: 'Telephone:',
      component: (
        <div style={{ marginTop: 18 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={state?.ph}
            onChange={handleChange}
            inputProps={{
              name: 'ph',
              id: 'outlined-ph-native-simple',
            }}
          />
          <Typography variant="subtitle2" style={{ color: '#bdbdbd' }}>
            (xxx) xxx-xxxx
          </Typography>
        </div>
      ),
    },
    {
      label: 'Email:',
      component: (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          value={state?.email}
          onChange={handleChange}
          inputProps={{
            name: 'email',
            id: 'outlined-mail-native-simple',
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              borderColor: '#000',
              borderWidth: 1,
              borderStyle: 'solid',
              background: '#ffab00',
              borderRadius: 7,
              padding: 10,
              cursor: 'pointer',
              width: 200,
              color: '#fff',
            }}
          >
            <Typography align="center" style={{ width: '100%' }}>
              Section 2
            </Typography>
          </div>
        </div>
        <Typography style={{ fontWeight: 'bold' }}>
          <span
            style={{
              color: '#ff1744',
              marginRight: 7,
            }}
          >
            *
          </span>
          Required Field
        </Typography>
      </div>
      <div style={{ marginLeft: 20, marginTop: 30 }}>
        <Typography variant="h6" style={{ color: '#3d5afe' }}>
          Pay with Credit Card or Log In
        </Typography>
        <Typography variant="caption" style={{ color: '#ffab00' }}>
          Enter Your Billing information
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexGrow: 4 }}>
          {form.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
              }}
            >
              <Typography
                style={{
                  color: '#ff1744',
                  marginRight: 30,
                }}
              >
                {item.label !== 'Billing Address Line 2: ' ? '*' : ' '}
              </Typography>
              <div
                style={{
                  flexGrow: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {item.label !== 'Billing Address Line 2: ' ? (
                  <Typography style={{ fontWeight: 'bold' }}>
                    {item.label}
                  </Typography>
                ) : (
                  <Typography style={{ fontWeight: 'bold', marginLeft: 8 }}>
                    {item.label}
                  </Typography>
                )}

                {item.sub && (
                  <Typography
                    style={{
                      color: '#bdbdbd',
                      fontWeight: 'bold',
                      marginLeft: 8,
                    }}
                  >
                    {item.sub}
                  </Typography>
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {item.component}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            flexGrow: 5,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <div>
            <Typography
              align="center"
              style={{
                width: '100%',
                margin: 10,
                fontWeight: 'bold',
                fontSize: 22,
              }}
            >
              <span
                style={{
                  color: '#ff1744',
                  marginRight: 7,
                }}
              >
                *
              </span>
              Select Your Billing Plan
            </Typography>
            <div
              style={{
                borderColor: '#2F528F',
                borderWidth: 1,
                borderStyle: 'solid',
                background: '#DAE3F3',
                borderRadius: 7,
                padding: 10,
                cursor: 'pointer',
              }}
              onClick={() => {
                toast.info(
                  ' Monthly Recurring Payments = $40/month is selected'
                );
                setState({
                  ...state,
                  plan: { amount: 40, type: 'Monthly Plan' },
                });
              }}
            >
              <Typography
                align="center"
                style={{ width: '100%', fontSize: 28 }}
              >
                Monthly Recurring Payments = <strong>$40/month</strong>
              </Typography>
            </div>
            <div
              style={{
                borderColor: '#2F528F',
                borderWidth: 1,
                borderStyle: 'solid',
                background: '#DAE3F3',
                borderRadius: 7,
                padding: 10,
                marginTop: 30,
                cursor: 'pointer',
              }}
              onClick={() => {
                toast.info('One Time Annual Payment = $400/yr is selected');
                setState({
                  ...state,
                  plan: { amount: 400, type: 'Year Plan' },
                });
              }}
            >
              <Typography
                align="center"
                style={{ width: '100%', fontSize: 28 }}
              >
                One Time Annual Payment = <strong>$400/yr</strong>
              </Typography>
            </div>
            <Typography
              align="center"
              style={{
                width: '100%',
                margin: 3,
                color: '#bdbdbd',
                fontWeight: 'bold',
                fontSize: 22,
              }}
            >
              Save $80 per year = Save 2 months FREE
            </Typography>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            transform: 'rotateZ(180deg)',
          }}
          onClick={() => {
            SET_SECTION(Actionlist.SECTION_2, state);
            props.history.push('/payment-information');
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
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
          onClick={() => {
            sectionschema
              .validate(state, { abortEarly: false })
              .then((u) => {
                firebase.default
                  .firestore()
                  .collection(auth.uid)
                  .doc('section2')
                  .set(u)
                  .then((res) => {
                    toast.success(
                      SET_SECTION(Actionlist.SECTION_2, state) +
                        ' Adding Section 2'
                    );
                    props.history.push('/payment-done');
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

export default PaymentScreen;
