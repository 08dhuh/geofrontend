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
        groundwater_depth: 25,
        long_term_decline_rate: 1,
        allowable_drawdown: 25,
        safety_margin: 25,
        // min_resolution: 100,
        // pixels: "100,100",
    });

    const [isProductionPump, setIsProductionPump] = useState(true);

    const [responseData, setResponseData] = useState(null);

    const [error, setError] = useState(null);

    const labels = {
        required_flow_rate: "Required flow rate (m³/s)",
        hydraulic_conductivity: "Aquifer hydraulic conductivity (m/day)",
        average_porosity: "Average reservoir porosity (0 - 1)",
        bore_lifetime_year: "Bore/project lifetime (years)",
        groundwater_depth: "Depth of the groundwater table (m)",
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
        //const pixels = inputValues.pixels.split(',').map(Number);
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
                groundwater_depth: Number(inputValues.groundwater_depth),
                long_term_decline_rate: Number(inputValues.long_term_decline_rate),
                allowable_drawdown: Number(inputValues.allowable_drawdown),
                safety_margin: Number(inputValues.safety_margin),
            },
            is_production_pump: isProductionPump.toString(),
        };
        try {
            const response = await axios.post('http://localhost:8000/api/calculate-wellbore', data);
            //response.data to display
            setResponseData(response.data);
            setError(null);
        } catch (error) {
            //setError(error);
            console.log(error);
            setError('An error occurred while fetching the data.');
            setResponseData(null);
        }
    }
    return (
        <div>
            <InteractiveMap setCoordinates={setCoordinates} />
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
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );

    // return (
    //     <div>
    //         <InteractiveMap setCoordinates={setCoordinates} />
    //         <h5>current coordinates: {coordinates[0]}, {coordinates[1]}</h5>
    //         <form onSubmit={handleSubmit}>
    //             {Object.keys(inputValues).map((key) => (
    //                 <div key={key}>
    //                     <label>{key.replace('_', ' ')}:</label>
    //                     <input
    //                         type="text"
    //                         name={key}
    //                         value={inputValues[key]}
    //                         onChange={handleInputChange}
    //                     />
    //                 </div>
    //             ))}
    //             <div>
    //                 <label>Production Pump:</label>
    //                 <input
    //                     type="checkbox"
    //                     checked={isProductionPump}
    //                     onChange={handleToggleChange}
    //                 />
    //             </div>
    //             <button type="submit">Submit</button>
    //         </form>
    //         {responseData && (
    //             <div>
    //                 <h3>Response Data:</h3>
    //                 <pre>{JSON.stringify(responseData, null, 2)}</pre>
    //             </div>
    //         )}
    //         {/* {error && (
    //             <div>
    //                 <h4>Error</h4>
    //                 <p>{error}</p>
    //             </div>
    //         )} */}
    //     </div>
    // );
}

export default InputForm;