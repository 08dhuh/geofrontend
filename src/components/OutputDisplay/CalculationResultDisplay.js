import React from 'react';
import TotalCostTable from './tables/TotalCostTable';
import AquiferTable from './tables/AquiferTable';
import DetailedBreakdownTable from './tables/DetailedBreakdownTable';
import DownloadButtons from '../DownloadButtons/DownloadButtons';
import ErrorDisplay from './ErrorDisplay';
import { useGlobalConfig } from '../../context/GlobalConfigContext';

//entry point
const CalculationResultDisplay = () => {
    const { responseData, installationResults, aquiferLayers } = useGlobalConfig();
    return (
        <div>
            {responseData && (
                <div className="response-data">
                    <h3>Total Cost Table (AUD)</h3>
                    <TotalCostTable totalCostTable={responseData.cost_results.total_cost_table} />
                    <DownloadButtons />
                </div>
            )}

            {aquiferLayers && <div id="aquifer-display" className="response-data">
                <AquiferTable aquiferLayers={aquiferLayers} />
                </div>}

            {installationResults && (
                <div id="result-display" className="response-data">
                    <DetailedBreakdownTable flattenedData={installationResults} />
                </div>
            )}

            <ErrorDisplay />
        </div>
    );
};

export default CalculationResultDisplay;
