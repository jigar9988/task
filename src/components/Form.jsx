import React, { useEffect } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import "./formInput.css";
import csc from "country-state-city";

const Form = () => {
    const addressFromik = useFormik({
        initialValues: {
            country: "India",
            state: null,
            city: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))
    });
    const countries = csc.getAllCountries();

    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country
    }));
    const updatedStates = (countryId) =>
        csc
            .getStatesOfCountry(countryId)
            .map((state) => ({ label: state.name, value: state.id, ...state }));
    const updatedCities = (stateId) =>
        csc
            .getCitiesOfState(stateId)
            .map((city) => ({ label: city.name, value: city.id, ...city }));

    const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

    useEffect(() => { }, [values]);
    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="formInput">
                <Select
                    id="country"
                    name="country"
                    placeholder="select counrty"
                    label="country"
                    className="formInput selectLocation"
                    options={updatedCountries}
                    value={values.country}
                    onChange={(value) => {
                        setValues({ country: value, state: null, city: null }, false);
                    }}
                />
                <Select
                    id="state"
                    name="state"
                    placeholder="select state"
                    className="formInput selectLocation"
                    options={updatedStates(values.country ? values.country.value : null)}
                    value={values.state}
                    onChange={(value) => {
                        setValues({ state: value, city: null }, false);
                    }}
                />
                <Select
                    id="city"
                    name="city"
                    placeholder="select city"
                    className="formInput selectLocation"
                    options={updatedCities(values.state ? values.state.value : null)}
                    value={values.city}
                    onChange={(value) => setFieldValue("city", value)}
                />
                <p>{JSON.stringify(csc.get)}</p>
            </form>
        </div>
    );
}

export default Form



