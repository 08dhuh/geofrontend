import React from "react";

const InstallationResultsTable = ({data}) => (
    <>
    <h3>Installation Results</h3>
            <table>
                <tbody>
                    {Object.keys(data).filter(key => !Array.isArray(data[key])).map((key, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{data[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
);

export default InstallationResultsTable;