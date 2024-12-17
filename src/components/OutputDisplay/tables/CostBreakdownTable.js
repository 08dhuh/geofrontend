import React from 'react';
import { formatCurrency } from '../../../utils/Utils';
const CostBreakdownTable = ({ costData }) => (
    <>
        <h3>Cost Breakdown</h3>
        <table>
            <thead>
                <tr>
                    <th>Stage</th>
                    <th>Component</th>
                    <th>Low</th>
                    <th>Base</th>
                    <th>High</th>
                </tr>
            </thead>
            <tbody>
                {costData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.stage}</td>
                        <td>{item.component}</td>
                        <td>{formatCurrency(item.low)}</td>
                        <td>{formatCurrency(item.base)}</td>
                        <td>{formatCurrency(item.high)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);

export default CostBreakdownTable;
