import React from 'react';

const CasingStageTable = ({ casingData }) => (
    <>
        <h3>Casing Stage Table</h3>
        <table>
            <thead>
                <tr>
                    <th>Stage</th>
                    <th>Top(m)</th>
                    <th>Bottom(m)</th>
                    <th>Casing(m)</th>
                    <th>Drill Bit(m)</th>
                </tr>
            </thead>
            <tbody>
                {casingData.map((stage, index) => (
                    <tr key={index}>
                        <td>{stage.stage}</td>
                        <td>{stage.top}</td>
                        <td>{stage.bottom}</td>
                        <td>{stage.casing}</td>
                        <td>{stage.drill_bit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);

export default CasingStageTable;
