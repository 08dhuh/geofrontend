import React, { useState } from 'react';
import axios from 'axios';
import InteractiveMap from './InteractiveMap';

import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const InputForm = () => {
    const [coordinates, setCoordinates] = useState([-38.1950, 146.5400]);
    const [inputValues, setInputValues] = useState({
        required_flow_rate: 4320,
        hydraulic_conductivity: 5,
        average_porosity: 0.25,
        bore_lifetime_year: 30,
        long_term_decline_rate: 1,
        allowable_drawdown: 25,
        safety_margin: 25,

    });

    const [isProductionPump, setIsProductionPump] = useState(true);

    const [responseData, setResponseData] = useState(null);

    const [error, setError] = useState(null);

    const labels = {
        required_flow_rate: "Required flow rate (m³/s)",
        hydraulic_conductivity: "Aquifer hydraulic conductivity (m/day)",
        average_porosity: "Average reservoir porosity (0 - 1)",
        bore_lifetime_year: "Bore/project lifetime (years)",
        long_term_decline_rate: "Long-term decline rate in water level (m/year)",
        allowable_drawdown: "Allowable drawdown (m)",
        safety_margin: "Safety margin (m)",
    };


    const handleInputChange = e => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleToggleChange = () => {
        setIsProductionPump(!isProductionPump);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            coordinates: coordinates,
            crs_type: "wgs84",
            min_resolution: 100,
            pixels: [100, 100],
            initial_input_values: {
                required_flow_rate: Number(inputValues.required_flow_rate),
                hydraulic_conductivity: Number(inputValues.hydraulic_conductivity),
                average_porosity: Number(inputValues.average_porosity),
                bore_lifetime_year: Number(inputValues.bore_lifetime_year),
                long_term_decline_rate: Number(inputValues.long_term_decline_rate),
                allowable_drawdown: Number(inputValues.allowable_drawdown),
                safety_margin: Number(inputValues.safety_margin),
            },
            is_production_pump: isProductionPump.toString(),
        };
        try {
            const response = await axios.post('http://localhost:8000/api/calculate-wellbore', data);
            setResponseData(response.data);
            setError(null);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setResponseData(null);
        }
    }

    const casingStages = [
        'Pre-collar',
        'Superficial Casing',
        'Pump Chamber Casing',
        'Intermediate Casing',
        'Screen Riser',
        'Screen'
    ];

    const flattenResponseData = (data) => {
        const flattenedData = {};
    
        //installation results
        const installationResults = data.data.installation_results;
        for (const key in installationResults) {
            if (typeof installationResults[key] !== 'object' || installationResults[key] === null) {
                flattenedData[key] = installationResults[key];
            }
        }
    
        //casing_stage_table
        const casingStagesData = installationResults.casing_stage_table;
        flattenedData['casing_stage_table'] = casingStagesData.top.map((_, index) => ({
            stage: casingStages[index], 
            top: casingStagesData.top[index],
            bottom: casingStagesData.bottom[index],
            casing: casingStagesData.casing[index],
            drill_bit: casingStagesData.drill_bit[index],
        }));
    
        //cost estimation table
        const costResults = data.data.cost_results.cost_estimation_table;
        flattenedData['cost_estimation_table'] = costResults.map(item => ({
            stage: item.stage,
            component: item.components,
            low: Math.round(item.low),
            base: Math.round(item.base),
            high: Math.round(item.high),
        }));
    
        return flattenedData;
    };
    


    const downloadPDF = () => {
        const doc = new jsPDF();

        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        const lineHeight = 10;
        let yPosition = margin;

        
        const text = JSON.stringify(responseData, null, 2);
        const lines = doc.splitTextToSize(text, doc.internal.pageSize.width - margin * 2); // Split text into lines

        
        lines.forEach((line) => {
            if (yPosition + lineHeight > pageHeight - margin) {
                doc.addPage(); 
                yPosition = margin; 
            }
            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
        });
        //doc.text(JSON.stringify(responseData, null, 2), 10, 10);
        doc.save('response_data.pdf');
    };

    const downloadExcel = () => {
        // const flattenedData = flattenResponseData(responseData);
        // const excelData = [
        //     ...flattenedData.casing_stage_table,
        //     ...flattenedData.cost_estimation_table,
        // ];
        const flattenedData = flattenObject(responseData);
        const excelData = Object.keys(flattenedData).map((key) => {
            return { Parameter: key, Value: flattenedData[key] };
        });
        const worksheet = XLSX.utils.json_to_sheet([excelData]);
        //const worksheet = XLSX.utils.json_to_sheet([responseData]);
        //const worksheet = XLSX.utils.json_to_sheet(transposedData);
        //const worksheet = XLSX.utils.json_to_sheet([flattenedData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ResponseData");
        XLSX.writeFile(workbook, 'response_data.xlsx');
    };

    const renderTotalCostTable = () => {
        if (!responseData) return null;

        const totalCostTable = responseData.data.cost_results.total_cost_table;
        const stages = ["Drilling Rates", "Materials", "Others", "Time Rates", "Total Cost"];
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
                    {stages.map((stage, index) => (
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

    return (
        <>
            <div>
                <div class="map-wrapper">
                    <InteractiveMap setCoordinates={setCoordinates} />
                </div>
                <h5>Current Coordinates: {coordinates[0]}, {coordinates[1]}</h5>
                <form onSubmit={handleSubmit}>
                    {Object.keys(inputValues).map((key) => (
                        <div key={key} className="form-group">
                            <label>{labels[key]}</label>
                            <input
                                type="text"
                                name={key}
                                value={inputValues[key]}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Production Pump:</label>
                        <input
                            type="checkbox"
                            checked={isProductionPump}
                            onChange={handleToggleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                {responseData && (
                    <div className="response-data">
                        <h3>Total Cost Table(AUD)</h3>
                        {renderTotalCostTable()}


                        <div className="buttons">
                            <h4>Download detailed cost breakdown and wellbore specifications:</h4>
                            <button onClick={downloadPDF}>Download as PDF</button>
                            <button onClick={downloadExcel}>Download as Excel</button>
                        </div>                        

                    </div>
                )}
                </div>
                <div>
                {responseData && (
                    <div className="response-data">
                        <ResultDisplay flattenedData={flattenResponseData(responseData)} />
                        </div>
                )}
                {/* {responseData && (
                <div className="response-data">
                    <h3>Response Data:</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>{renderTableRows(responseData)}</tbody>
                        </table>
                    </div>
                </div>
            )} */}

                {/* {responseData && (
                <div className="response-data">
                    <h3>Response Data:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )} */}
            </div>
            <div>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </>
    );

}

const flattenObject = (obj, parentKey = '', res = {}) => {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const propName = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach((item, index) => {
                        flattenObject(item, `${propName}.${index}`, res);
                    });
                } else {
                    flattenObject(obj[key], propName, res); 
                }
            } else {
                res[propName] = obj[key];
            }
        }
    }
    return res;
};

const ResultDisplay = ({ flattenedData }) => {
    return (
        <div>

            <h3>Installation Results</h3>
            <table>
                <tbody>
                    {Object.keys(flattenedData).filter(key => !Array.isArray(flattenedData[key])).map((key, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{flattenedData[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


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
                    {flattenedData.casing_stage_table.map((stage, index) => (
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
                    {flattenedData.cost_estimation_table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.stage}</td>
                            <td>{item.component}</td>
                            <td>{item.low}</td>
                            <td>{item.base}</td>
                            <td>{item.high}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// const renderTableRows = (data, parentKey = '') => {
//     const rows = [];

//     for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//             const value = data[key];

//             if (Array.isArray(value)) {
//                 // If the value is an array, check if it contains objects (special case for cost_estimation_table)
//                 if (parentKey + key === 'data.cost_results.cost_estimation_table') {
//                     // If it's the cost_estimation_table, iterate over the array
//                     value.forEach((item, index) => {
//                         rows.push(
//                             <React.Fragment key={`${parentKey}${key}.${index}`}>
//                                 <tr>
//                                     <th colSpan="2">Cost Estimation - Item {index + 1}</th>
//                                 </tr>
//                                 {Object.entries(item).map(([subKey, subValue]) => (
//                                     <tr key={`${parentKey}${key}.${index}.${subKey}`}>
//                                         <td>{subKey}</td>
//                                         <td>{subValue === null ? 'N/A' : subValue}</td>
//                                     </tr>
//                                 ))}
//                             </React.Fragment>
//                         );
//                     });
//                 } else {
//                     // If it's a regular array, display its items in a single cell
//                     rows.push(
//                         <tr key={parentKey + key}>
//                             <td>{parentKey + key}</td>
//                             <td>{value.map((item) => (item === null ? 'N/A' : item)).join(', ')}</td>
//                         </tr>
//                     );
//                 }
//             } else if (typeof value === 'object' && value !== null) {
//                 // If the value is an object, add a header row and recursively render its children
//                 rows.push(
//                     <tr key={parentKey + key}>
//                         <th colSpan="2">{parentKey + key}</th>
//                     </tr>
//                 );
//                 rows.push(...renderTableRows(value, `${parentKey}${key}.`));
//             } else {
//                 // For primitive values (number, string, etc.), render directly
//                 rows.push(
//                     <tr key={parentKey + key}>
//                         <td>{parentKey + key}</td>
//                         <td>{value === null ? 'N/A' : value}</td>
//                     </tr>
//                 );
//             }
//         }
//     }

//     return rows;
// };


// const renderTableRows = (data, parentKey = '') => {
//     const rows = [];

//     for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//             const value = data[key];

//             if (Array.isArray(value)) {
//                 rows.push(
//                     <tr key={parentKey + key}>
//                         <td>{parentKey + key}</td>
//                         <td>{value.map((item) => (item === null ? 'N/A' : item)).join(', ')}</td>
//                     </tr>
//                 );
//             } else if (typeof value === 'object' && value !== null) {
//                 // **for cost_estimation_table:**
//                 if (parentKey === 'cost_results.cost_estimation_table.') {
//                     // If it's the cost_estimation_table, iterate over the array
//                     return value.map((item, index) => (
//                         <React.Fragment key={index}>
//                             {Object.entries(item).map(([subKey, subValue]) => (
//                                 <tr key={`${parentKey}${index}.${subKey}`}>
//                                     <td>{subKey}</td>
//                                     <td>{subValue}</td>
//                                 </tr>
//                             ))}
//                         </React.Fragment>
//                     ));
//                 } else {
//                     //other nested objects
//                     rows.push(
//                         <tr key={parentKey + key}>
//                             <th colSpan="2">{parentKey + key}</th>
//                         </tr>
//                     );
//                     rows.push(...renderTableRows(value, `${key}.`));
//                 }
//             } else {
//                 rows.push(
//                     <tr key={parentKey + key}>
//                         <td>{parentKey + key}</td>
//                         <td>{value === null ? 'N/A' : value}</td>
//                     </tr>
//                 );
//             }
//         }
//     }

//     return rows;
// };


export default InputForm;