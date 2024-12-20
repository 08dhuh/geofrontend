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
        <div className="container mt-4">
          {responseData && (
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <h3 className="card-title mb-3">Total Cost Table (AUD)</h3>
              <TotalCostTable totalCostTable={responseData.cost_results.total_cost_table} />
              <div className="mt-3">
                <DownloadButtons />
              </div>
            </div>
          )}
    
          {aquiferLayers && (
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">

              <AquiferTable aquiferLayers={aquiferLayers} />
            </div>
          )}
    
          {installationResults && (
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <h3 className="card-title mb-3">Detailed Breakdown</h3>
              <DetailedBreakdownTable flattenedData={installationResults} />
            </div>
          )}
    
          <ErrorDisplay />
        </div>
      );
    };


export default CalculationResultDisplay;
