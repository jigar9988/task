import { useState } from "react";
import "./app.css";
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import Form from "./components/Form";
import FormInput from "./components/FormInput";

const App = () => {
  const [country, setCountry] = useState("")
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="app">
        <form onSubmit={handleSubmit} className>
          <h1>Register</h1>
          <div className="box">
          <div className="inputs">
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            
          </div>
          <div className="location">
            <Form />
          </div>
          </div>
          <div className="monum">
              <select
                value={country}
                className="formInput code"
                onChange={event => setCountry(event.target.value || undefined)}>
                <option value="">
                  {en['ZZ']}
                </option>
                {getCountries().map((country) => (
                  <option key={country} value={getCountryCallingCode}>
                    {en[country]} +{getCountryCallingCode(country)}
                  </option>
                ))}
              </select>
              <input
                onChange={onChange}
                type="tel"
                placeholder="Mobile Number"
              />
            </div>
          <button type="submit">Submit</button>

        </form>

      </div>
    </>
  );
};

export default App;
