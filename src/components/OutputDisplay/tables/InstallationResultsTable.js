import React from "react";

const InstallationResultsTable = ({ data }) => (
    <>
        <h4>Installation Results</h4>
        <div className="table-container">
            <table className="table">
                <tbody>
                    {Object.keys(data)
                        .filter((key) => !Array.isArray(data[key]))
                        .map((key, index) => (
                            <tr key={index}>
                                <td>{key}</td>
                                <td>{data[key]}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    </>
);

export default InstallationResultsTable;
