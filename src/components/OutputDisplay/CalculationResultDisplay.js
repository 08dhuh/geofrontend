import React from 'react';
import TotalCostTable from './TotalCostTable';
import DetailedBreakdownTable from './DetailedBreakdownTable';
import DownloadButtons from '../DownloadButtons/DownloadButtons';
import ErrorDisplay from './ErrorDisplay';
import { useGlobalConfig } from '../../context/GlobalConfigContext';

const CalculationResultDisplay = () => {
    const { responseData, flattenResponseData } = useGlobalConfig();
    return (
        <div>
            {responseData && (
                <div className="response-data">
                    <h3>Total Cost Table (AUD)</h3>
                    <TotalCostTable totalCostTable={responseData.data.cost_results.total_cost_table} />
                    <DownloadButtons />
                </div>
            )}

            {responseData && (
                <div id="result-display" className="response-data">
                    <DetailedBreakdownTable flattenedData={flattenResponseData(responseData)} />
                </div>
            )}

            <ErrorDisplay />
        </div>
    );
};

export default CalculationResultDisplay;
