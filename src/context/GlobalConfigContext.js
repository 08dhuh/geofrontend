import React, { createContext, useContext, useState, useMemo } from 'react';
import { LABELS, CASING_STAGES, DEFAULT_COORDINATES } from '../utils/constants';
import { flattenAquiferData, flattenCalculationResultData } from '../utils/Utils';

const GlobalConfigContext = createContext();

export const GlobalConfigProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);
    const [aquiferData, setAquiferData] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES);
    const [error, setError] = useState(null);  

    const casingStages = CASING_STAGES;
    const labels = LABELS;

    const installationResults = useMemo(() => 
        responseData ? flattenCalculationResultData(responseData) : null, 
        [responseData]
    );

    const aquiferLayers = useMemo(
        () => (aquiferData ? flattenAquiferData(aquiferData) : null),
        [aquiferData]
    );

    return (
        <GlobalConfigContext.Provider value={{ 
            labels,
            casingStages, 
            mapInstance, setMapInstance, 
            responseData, setResponseData,
            aquiferData, setAquiferData,
            coordinates, setCoordinates,
            error, setError,
            //flattenResponseData,
            installationResults,
            aquiferLayers
             }}>
            {children}
        </GlobalConfigContext.Provider>
    );
};


export const useGlobalConfig = () => useContext(GlobalConfigContext);
