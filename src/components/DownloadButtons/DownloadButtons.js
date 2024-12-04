import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import * as XLSX from 'xlsx';


import { useGlobalConfig } from '../../context/GlobalConfigContext';
import leafletImage from 'leaflet-image';

export const DownloadButtons = () => {
    const { coordinates, mapInstance, responseData, flattenResponseData } = useGlobalConfig();
    const downloadPDF = async () => {
        const doc = new jsPDF();
        //set text parameters
        const margin = 10;
        const lineHeight = 10;
        const pageWidth = doc.internal.pageSize.width / 2
        let yPosition = margin;

        //image parameters
        const width = 600;
        const height = 400;
        const imgWidth = 180;
        const imgHeight = (imgWidth * height) / width;

        const installationResults = flattenResponseData(responseData);

        //Title
        doc.setFontSize(18);
        doc.text("Wellbore Infrastructure and Installation Cost Report", pageWidth, yPosition, { align: 'center' });
        yPosition += lineHeight;

        //location coordinates
        doc.setFontSize(12);
        doc.text(`Location (EPSG:4326 Coordinates): [${coordinates}]`,
            pageWidth,
            yPosition,
            { align: 'center' }
        );
        yPosition += lineHeight;

        try {
            const mapImage = await captureMapImage();
            doc.addImage(mapImage, 'PNG', margin, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + lineHeight;
        } catch (error) {
            console.error("Error capturing map image:", error);
        }


        //groundwater layer table
        doc.setFontSize(15);
        doc.text("Groundwater layers", margin, yPosition);
        yPosition += lineHeight;

        const aquiferLayers = installationResults.aquifer_table.map(layer => [
            layer.aquifer_layer,
            layer.depth_to_base
        ]);
        doc.autoTable({
            head: [['Aquifer/Aquitard', 'Depth to base(m)']],
            body: aquiferLayers,
            startY: yPosition,
            margin: { top: lineHeight },
            theme: 'grid',
        });
        yPosition = doc.autoTable.previous.finalY + lineHeight;

        // Numeric results
        doc.text("Installation Results", margin, yPosition);
        yPosition += lineHeight;

        const installationData = Object.keys(installationResults)
            .filter(key => !Array.isArray(installationResults[key]))
            .map(key => [`${key}: ${installationResults[key]}`]);
        doc.autoTable({
            body: installationData,
            startY: yPosition,
            margin: { top: lineHeight },
            theme: 'grid',
        });
        yPosition = doc.autoTable.previous.finalY + lineHeight;

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
            margin: { top: lineHeight },
            theme: 'grid',
        });
        yPosition = doc.autoTable.previous.finalY + lineHeight;

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
            margin: { top: lineHeight },
            theme: 'grid',
        });

        //save the result
        doc.save('response_data.pdf');
    };


    const downloadExcel = (responseData) => {
        const installationResults = flattenResponseData(responseData);

        const aquiferLayers = installationResults.aquifer_table.map(layer => ({
            "Groundwater Layer": layer.aquifer_layer,
            "Depth to Base(m)": layer.depth_to_base
        }));


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

        const aquiferWorksheet = XLSX.utils.json_to_sheet(aquiferLayers);
        XLSX.utils.book_append_sheet(workbook, aquiferWorksheet, "Groundwater Layers");


        XLSX.writeFile(workbook, 'response_data.xlsx');
    }

    const captureMapImage = () => {
        return new Promise((resolve, reject) => {
            if (mapInstance) {
                leafletImage(mapInstance, (err, canvas) => {
                    if (err) return reject(err);
                    const imgData = canvas.toDataURL('image/png');
                    resolve(imgData);
                });
            } else {
                reject(new Error("Map instance is not available."));
            }
        });
    };

    return (
        <div>
            <button onClick={downloadPDF}>Download as PDF</button>
            <button onClick={downloadExcel}>Download as Excel</button>
        </div>
    )
};

export default DownloadButtons;