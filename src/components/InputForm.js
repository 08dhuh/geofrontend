import React, { useState } from 'react';
import axios from 'axios';
import InteractiveMap from './InteractiveMap';

import jsPDF from 'jspdf';
import 'jspdf-autotable'
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

        const margin = 10;
        const lineHeight = 10;
        let yPosition = margin;

        const installationResults = flattenResponseData(responseData);


        doc.setFontSize(18);
        doc.text("Wellbore Results", margin, yPosition);
        yPosition += lineHeight;


        doc.setFontSize(15);
        doc.text("Installation Results", margin, yPosition);
        yPosition += lineHeight;


        const installationData = Object.keys(installationResults)
        .filter(key => !Array.isArray(installationResults[key]))
        .map(key => [`${key}: ${installationResults[key]} (m)`]);
        doc.autoTable({
            body: installationData,
            startY: yPosition,
            margin: { top: 10 },
            theme: 'grid',
        });
        yPosition = doc.autoTable.previous.finalY + 10;

        // Casing Stage Table
        doc.setFontSize(15);
        doc.text("Casing Stage Table", margin, yPosition);
        yPosition += lineHeight;

        const casingStageData = installationResults.casing_stage_table.map(stage => [
            stage.stage,
            stage.top,
            stage.bottom,
            stage.casing,
            stage.drill_bit,
        ]);

        doc.autoTable({
            head: [['Stage', 'Top (m)', 'Bottom (m)', 'Casing (m)', 'Drill Bit (m)']],
            body: casingStageData,
            startY: yPosition,
            margin: { top: 10 },
            theme: 'grid',
        });


        yPosition = doc.autoTable.previous.finalY + 10; 

        // Cost Breakdown
        doc.setFontSize(15);
        doc.text("Cost Breakdown", margin, yPosition);
        yPosition += lineHeight;

        const costEstimationData = installationResults.cost_estimation_table.map(item => [
            item.stage,
            item.component,
            item.low,
            item.base,
            item.high,
        ]);

        doc.autoTable({
            head: [['Stage', 'Component', 'Low (AUD)', 'Base (AUD)', 'High (AUD)']],
            body: costEstimationData,
            startY: yPosition,
            margin: { top: 10 },
            theme: 'grid',
        });
  
        doc.save('response_data.pdf');
    };

    const downloadExcel = () => {
        const installationResults = flattenResponseData(responseData);
    

        const installationData = Object.keys(installationResults)
            .filter(key => !Array.isArray(installationResults[key]))
            .map(key => ({
                Parameter: key,
                Value: installationResults[key]
            }));


        const casingStageData = installationResults.casing_stage_table.map(stage => ({
            Stage: stage.stage,
            Top: stage.top,
            Bottom: stage.bottom,
            Casing: stage.casing,
            Drill_Bit: stage.drill_bit
        }));


        const costEstimationData = installationResults.cost_estimation_table.map(item => ({
            Stage: item.stage,
            Component: item.component,
            Low: item.low,
            Base: item.base,
            High: item.high
        }));


        const workbook = XLSX.utils.book_new();

        const installationWorksheet = XLSX.utils.json_to_sheet(installationData);
        XLSX.utils.book_append_sheet(workbook, installationWorksheet, "Installation Results");
    
        const casingStageWorksheet = XLSX.utils.json_to_sheet(casingStageData);
        XLSX.utils.book_append_sheet(workbook, casingStageWorksheet, "Casing Stage Table");
    
        const costEstimationWorksheet = XLSX.utils.json_to_sheet(costEstimationData);
        XLSX.utils.book_append_sheet(workbook, costEstimationWorksheet, "Cost Breakdown");

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
            <div id="result-display">
                {responseData && (
                    <div className="response-data">
                        <ResultDisplay flattenedData={flattenResponseData(responseData)} />
                    </div>
                )}

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


export default InputForm;