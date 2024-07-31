// src/components/TestBackendCommunication.js
import React, { useState } from 'react';
import axios from 'axios';

const TestBackendCommunication = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const testMockData = {
        "depth_data": {
            "aquifer_layer": [
                "100qa",
                "103utqd",
                "105utaf",
                "106utd",
                "107umta",
                "108umtd",
                "109lmta",
                "111lta",
                "114bse"
            ],
            "is_aquifer": [
                true,
                false,
                true,
                false,
                true,
                false,
                true,
                true,
                false
            ],
            "depth_to_base": [
                3,
                53,
                112,
                150,
                150,
                1000,
                1000,
                1221,
                1421
            ]
        },
        "initial_input_values": {
            "required_flow_rate": 4320,
            "hydraulic_conductivity": 5,
            "average_porosity": 0.25,
            "bore_lifetime_year": 30,
            "groundwater_depth": 25,
            "long_term_decline_rate": 1,
            "allowable_drawdown": 25,
            "safety_margin": 25,
            "target_aquifer_layer": "109lmta",
            "top_aquifer_layer": "100qa"
        },
        "is_production_pump": "true"
    }

    const testWMSData = {
        loc_vicgrid: [2634140, 2366378],  // Example coordinates
        crs_type: "epsg:3111",
        min_resolution: 100,
        pixels: [100, 100],
        initial_input_values: {
            required_flow_rate: 4320,
            hydraulic_conductivity: 5,
            average_porosity: 0.25,
            bore_lifetime_year: 30,
            groundwater_depth: 25,
            long_term_decline_rate: 1,
            allowable_drawdown: 25,
            safety_margin: 25
        },
        is_production_pump: "true"
    };

    const handleClickWMS = () => {
        axios.post('http://localhost:8000/api/calculate-wellbore', testWMSData)
            .then(response => {
                setResponse(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleClickTest = () => {
        axios.post('http://localhost:8000/api/calculate-profile', testMockData)
            .then(response => {
                setResponse(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div>
            <button onClick={handleClickWMS}>Send Test Data to Backend</button>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div>
                    <h3>Error:</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default TestBackendCommunication;
