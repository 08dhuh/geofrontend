import React from 'react';
import { COST_STAGES } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/Utils';
const TotalCostTable = ({ totalCostTable }) => {
    if (!totalCostTable) return null;

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
                        <td>{formatCurrency(totalCostTable.low[index])}</td>
                        <td>{formatCurrency(totalCostTable.base[index])}</td>
                        <td>{formatCurrency(totalCostTable.high[index])}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TotalCostTable;
