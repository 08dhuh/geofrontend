import React from 'react';

const CasingStageTable = ({ casingData }) => (
    <>
        <h3>Casing Stage Table</h3>
        <table>
            <thead>
                <tr>
                    <th>Stage</th>
                    <th>Top</th>
                    <th>Bottom</th>
                    <th>Casing</th>
                    <th>Drill Bit</th>
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
