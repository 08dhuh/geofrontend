import React, { createContext, useContext, useState, useMemo } from 'react';
import { LABELS, CASING_STAGES, DEFAULT_COORDINATES } from '../utils/constants';
import { flattenResponseData } from '../utils/Utils';

const GlobalConfigContext = createContext();

export const GlobalConfigProvider = ({ children }) => {
    const [responseData, setResponseData] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES);
    const [error, setError] = useState(null);  

    const casingStages = CASING_STAGES;
    const labels = LABELS;

    const installationResults = useMemo(() => 
        responseData ? flattenResponseData(responseData) : null, 
        [responseData]
    );

    const aquiferLayers = useMemo(() => 
        installationResults?.aquifer_table?.map(layer => [
            layer.aquifer_layer,
            layer.depth_to_base
        ]) || null, 
        [installationResults]
    );

    return (
        <GlobalConfigContext.Provider value={{ 
            labels,
            casingStages, 
            mapInstance, setMapInstance, 
            responseData, setResponseData,
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
