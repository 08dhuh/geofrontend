import { CASING_STAGES as casingStages } from "./constants";

export const flattenAquiferData = (aquiferTable) => {

    if (aquiferTable) {
        const flattenedAquiferData = aquiferTable.aquifer_layer.map((layer, index) => ({
            layer: layer,
            depth: aquiferTable.depth_to_base[index],
        }));
        return flattenedAquiferData;
    }

};


export const flattenCalculationResultData = (data) => {

    //installation results
    const installationResults = data.installation_results;

    const flattenedData = {};

    for (const key in installationResults) {
        if (typeof installationResults[key] !== 'object' || installationResults[key] === null) {
            let val = installationResults[key];
            flattenedData[key + "(m)"] = Number.isInteger(val) ? val : Number(val.toPrecision(4));
        }
    }
    // aquifer_table
    //const aquiferTableData = installationResults.aquifer_table;

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
    const costResults = data.cost_results.cost_estimation_table;
    flattenedData['cost_estimation_table'] = costResults.map(item => ({
        stage: item.stage,
        component: item.components,
        low: Math.round(item.low),
        base: Math.round(item.base),
        high: Math.round(item.high),
    }));

    return flattenedData;
};

export const formatCurrency = (value, decimalPlaces = 0) => {
    if (value === undefined || value === null) return '';

    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(value);
};