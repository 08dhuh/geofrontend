import React from "react";
import InstallationResultsTable from './InstallationResultsTable';
import CasingStageTable from './CasingStageTable';
import CostBreakdownTable from './CostBreakdownTable';

const DetailedBreakdownTable = ({ flattenedData }) => {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-3 mb-4 bg-white rounded">
        <InstallationResultsTable data={flattenedData} />
      </div>
      <div className="card shadow-sm p-3 mb-4 bg-white rounded">
        <CasingStageTable casingData={flattenedData.casing_stage_table} />
      </div>
      <div className="card shadow-sm p-3 bg-white rounded">
        <CostBreakdownTable costData={flattenedData.cost_estimation_table} />
      </div>
    </div>
  );
};

export default DetailedBreakdownTable;
