import React from 'react';
import { vaf_mapping } from '../../../utils/constants';

const AquiferTable = ({ aquiferLayers }) => {
    return (
        <>
            <h3>Groundwater Layers</h3>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Aquifers and Aquitards</th>
                            <th>Depth Below Surface (m)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aquiferLayers.map(({ layer, depth }, index) => (
                            <tr key={index}>
                                <td>{vaf_mapping[layer] || `Unknown Layer (${layer})`}</td>
                                <td>{depth} m</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AquiferTable;
