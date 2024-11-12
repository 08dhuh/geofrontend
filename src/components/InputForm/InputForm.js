import React, { useState } from 'react';
import axios from 'axios';

//import 'jspdf-autotable'

import { useGlobalConfig } from '../../context/GlobalConfigContext';

import InteractiveMap from '../InteractiveMap/InteractiveMap';
import ResultDisplay from '../OutputDisplay/ResultDisplay';
import DownloadButtons from '../DownloadButtons/DownloadButtons';

import { DEFAULT_INPUT_VALUES } from '../../utils/constants';

const InputForm = () => {
    //inputs
    const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES);
    const [isProductionPump, setIsProductionPump] = useState(true);


    const [error, setError] = useState(null);


    const { coordinates,
        labels,
        responseData,
        setResponseData,
        flattenResponseData } = useGlobalConfig();


    const handleInputChange = e => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleToggleChange = () => {
        setIsProductionPump(!isProductionPump);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setResponseData(null);

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
            const response = await axios.post(`${process.env.REACT_APP_GEOBACKEND_URL}/api/calculate-wellbore`, data);
            setResponseData(response.data);
            setError(null);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const { message, details } = error.response.data;
                setError(`${message} - ${details}`);
            } else {
                setError(error.message);
            }
            setResponseData(null);
        }
    }


    const renderTotalCostTable = () => {
        if (!responseData) return null;

        const totalCostTable = responseData.data.cost_results.total_cost_table;
        const stages = ["Drilling Rates", "Materials", "Others", "Time Rates", "Total Cost"];
        return (
            <table>
                <thead>
                    <tr>
                        <th>Stage</th>
                        <th>Low</th>
                        <th>Base</th>
                        <th>High</th>
                    </tr>
                </thead>
                <tbody>
                    {stages.map((stage, index) => (
                        <tr key={stage}>
                            <td>{stage}</td>
                            <td>{Math.round(totalCostTable.low[index])}</td>
                            <td>{Math.round(totalCostTable.base[index])}</td>
                            <td>{Math.round(totalCostTable.high[index])}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    };

    return (
        <>
            <div>
                <div id='map-container'>
                    <div className="map-wrapper">
                        <InteractiveMap
                        />
                    </div>
                    <h5>Current Coordinates: {coordinates[0]}, {coordinates[1]}</h5>
                </div>
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
            </div>
            <div>
                {responseData && (
                    <div className="response-data">
                        <h3>Total Cost Table(AUD)</h3>
                        {renderTotalCostTable()}


                        <DownloadButtons />

                    </div>
                )}
            </div>
            <div id="result-display">
                {responseData && (
                    <div className="response-data">
                        <ResultDisplay flattenedData={flattenResponseData(responseData)} />
                    </div>
                )}

            </div>
            <div>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>

                    </div>
                )}
            </div>
        </>
    );

}




export default InputForm;