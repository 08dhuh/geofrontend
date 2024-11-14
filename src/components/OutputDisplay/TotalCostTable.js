import React from 'react';
import { COST_STAGES } from '../../utils/constants';

const TotalCostTable = ({ totalCostTable }) => {
    if (!totalCostTable) return null;

    //const COST_STAGES = ["Drilling Rates", "Materials", "Others", "Time Rates", "Total Cost"];

    return (
        <table>
            <thead>
                <tr>
                    <th>Stage</th>
                    <th>Low</th>
                    <th>Base</th>
                    <th>High</th>
                </tr>
            </thead>
            <tbody>
                {COST_STAGES.map((stage, index) => (
                    <tr key={stage}>
                        <td>{stage}</td>
                        <td>{Math.round(totalCostTable.low[index])}</td>
                        <td>{Math.round(totalCostTable.base[index])}</td>
                        <td>{Math.round(totalCostTable.high[index])}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TotalCostTable;
