import React, { useState } from 'react';
import axios from 'axios';
import InteractiveMap from './InteractiveMap';

const InputForm = () => {
    const [coordinates, setCoordinates] = useState([-38.1950, 146.5400]);
    const [inputValues, setInputValues] = useState({
        required_flow_rate: 4320,
        hydraulic_conductivity: 5,
        average_porosity: 0.25,
        bore_lifetime_year: 30,
        long_term_decline_rate: 1,
        allowable_drawdown: 25,
        safety_margin: 25,

    });

    const [isProductionPump, setIsProductionPump] = useState(true);

    const [responseData, setResponseData] = useState(null);

    const [error, setError] = useState(null);

    const labels = {
        required_flow_rate: "Required flow rate (m³/s)",
        hydraulic_conductivity: "Aquifer hydraulic conductivity (m/day)",
        average_porosity: "Average reservoir porosity (0 - 1)",
        bore_lifetime_year: "Bore/project lifetime (years)",
        long_term_decline_rate: "Long-term decline rate in water level (m/year)",
        allowable_drawdown: "Allowable drawdown (m)",
        safety_margin: "Safety margin (m)",
    };


    const handleInputChange = e => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleToggleChange = () => {
        setIsProductionPump(!isProductionPump);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            coordinates: coordinates,
            crs_type: "wgs84",
            min_resolution: 100,
            pixels: [100, 100],
            initial_input_values: {
                required_flow_rate: Number(inputValues.required_flow_rate),
                hydraulic_conductivity: Number(inputValues.hydraulic_conductivity),
                average_porosity: Number(inputValues.average_porosity),
                bore_lifetime_year: Number(inputValues.bore_lifetime_year),
                long_term_decline_rate: Number(inputValues.long_term_decline_rate),
                allowable_drawdown: Number(inputValues.allowable_drawdown),
                safety_margin: Number(inputValues.safety_margin),
            },
            is_production_pump: isProductionPump.toString(),
        };
        try {
            //Update the API endpoint URL in the frontend code (e.g., in `InputForm.js`) to match the address of your running GeoBackend API.
            const response = await axios.post('http://localhost:8000/api/calculate-wellbore', data);
            setResponseData(response.data);
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setResponseData(null);
        }
    }
    return (
        <div>
            <div class="map-wrapper">
                <InteractiveMap setCoordinates={setCoordinates} /></div>
            <h5>Current Coordinates: {coordinates[0]}, {coordinates[1]}</h5>
            <form onSubmit={handleSubmit}>
                {Object.keys(inputValues).map((key) => (
                    <div key={key} className="form-group">
                        <label>{labels[key]}</label>
                        <input
                            type="text"
                            name={key}
                            value={inputValues[key]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
                <div className="form-group">
                    <label>Production Pump:</label>
                    <input
                        type="checkbox"
                        checked={isProductionPump}
                        onChange={handleToggleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {responseData && (
                <div className="response-data">
                    <h3>Response Data:</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(responseData)}</tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* {responseData && (
                <div className="response-data">
                    <h3>Response Data:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )} */}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );

}

const renderTableRows = (data, parentKey = '') => {
    const rows = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];

            if (Array.isArray(value)) {
                rows.push(
                    <tr key={parentKey + key}>
                        <td>{parentKey + key}</td>
                        <td>{value.map((item) => (item === null ? 'N/A' : item)).join(', ')}</td>
                    </tr>
                );
            } else if (typeof value === 'object' && value !== null) {
                rows.push(
                    <tr key={parentKey + key}>
                        <th colSpan="2">{parentKey + key}</th>
                    </tr>
                );
                rows.push(...renderTableRows(value, `${key}.`));
            } else {
                rows.push(
                    <tr key={parentKey + key}>
                        <td>{parentKey + key}</td>
                        <td>{value === null ? 'N/A' : value}</td>
                    </tr>
                );
            }
        }
    }

    return rows;
};


export default InputForm;