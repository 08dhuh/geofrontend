import React from "react";
import InstallationResultsTable from './InstallationResultsTable';
import CasingStageTable from './CasingStageTable';
import CostBreakdownTable from './CostBreakdownTable';


const DetailedBreakdownTable = ({ flattenedData }) => {
    return (
        <div>

            <InstallationResultsTable data={flattenedData} />


            <CasingStageTable casingData={flattenedData.casing_stage_table} />
            <CostBreakdownTable costData={flattenedData.cost_estimation_table} />
        </div>
    );
};

export default DetailedBreakdownTable;