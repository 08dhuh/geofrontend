import React from "react";

import InteractiveMap from "./InteractiveMap/InteractiveMap";
import InputForm from "./InputForm/InputForm";
import CalculationResultDisplay from "./OutputDisplay/CalculationResultDisplay";
import { useGlobalConfig } from "../context/GlobalConfigContext";


const WellboreCostApp = () => {
    const { coordinates } = useGlobalConfig();

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
            <InputForm />
            </div>
            <CalculationResultDisplay />

        </>
    );
};

export default WellboreCostApp;