import React, { createContext, useContext, useState } from 'react';
import { LABELS, CASING_STAGES, DEFAULT_COORDINATES } from '../utils/constants';
import { flattenResponseData } from '../utils/Utils';

const GlobalConfigContext = createContext();

export const GlobalConfigProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES);

    const casingStages = CASING_STAGES;
    const labels = LABELS;

    return (
        <GlobalConfigContext.Provider value={{ 
            labels,
            casingStages, 
            mapInstance, setMapInstance, 
            responseData, setResponseData,
            coordinates, setCoordinates,
            flattenResponseData }}>
            {children}
        </GlobalConfigContext.Provider>
    );
};


export const useGlobalConfig = () => useContext(GlobalConfigContext);
