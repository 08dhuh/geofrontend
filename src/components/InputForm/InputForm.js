import React from 'react';

import { useGlobalConfig } from '../../context/GlobalConfigContext';
//hooks
import useGeobackendCalculationApi from '../../hooks/useGeobackendCalculationApi';
import useInputForm from '../../hooks/useInputForm';


const InputForm = () => {
    //inputs
    const { inputValues, isProductionPump, handleInputChange, handleToggleChange } = useInputForm();
    const { submitForm } = useGeobackendCalculationApi();


    const { coordinates,
        labels} = useGlobalConfig();



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

        submitForm(data);
    }


    return (
        <>
            <div>
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
        </>
    );

}




export default InputForm;
