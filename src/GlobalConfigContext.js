import React, { createContext, useContext, useState } from 'react';
import { LABELS, CASING_STAGES } from './constants';
import { flattenResponseData } from './components/Utils';

const GlobalConfigContext = createContext();

export const GlobalConfigProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [coordinates, setCoordinates] = useState([-38.1950, 146.5400]);

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
