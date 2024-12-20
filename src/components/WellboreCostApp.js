import React from "react";

import InteractiveMap from "./InteractiveMap/InteractiveMap";
import InputForm from "./InputForm/InputForm";
import CalculationResultDisplay from "./OutputDisplay/CalculationResultDisplay";
import { useGlobalConfig } from "../context/GlobalConfigContext";

const WellboreCostApp = () => {
    const { coordinates } = useGlobalConfig();

    return (
        <div className="container-fluid">

            <div className="row mb-4">
                <div className="col-lg-8 mx-auto">
                    <div id="map-container" className="text-center">
                        <div className="map-wrapper border rounded">
                            <InteractiveMap />
                        </div>
                        <h5 className="mt-3">
                            <strong>Selected Location:</strong> {Math.abs(coordinates[0])}° S, {Math.abs(coordinates[1])}° E
                        </h5>
                    </div>
                </div>
            </div>


            <div className="row mb-4">
                <div className="col-lg-8 mx-auto">
                    <div className="border p-3 rounded custom-bg">
                        <h4 className="mb-3">Input Parameters</h4>
                        <InputForm />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="border p-3 rounded bg-light shadow">
                        <h4 className="mb-3">Calculation Results</h4>
                        <CalculationResultDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WellboreCostApp;
