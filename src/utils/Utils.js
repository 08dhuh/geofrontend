import { CASING_STAGES as casingStages} from "./constants";

export const flattenResponseData = (data) => {
    const flattenedData = {};

    //installation results
    const installationResults = data.data.installation_results;
    for (const key in installationResults) {
        if (typeof installationResults[key] !== 'object' || installationResults[key] === null) {
            let val = installationResults[key];
            flattenedData[key + "(m)"] = Number.isInteger(val) ? val : Number(val.toPrecision(4));
        }
    }
    // aquifer_table
    const aquiferTableData = installationResults.aquifer_table;
    flattenedData['aquifer_table'] = aquiferTableData.aquifer_layer.map((layer, index) => ({
        aquifer_layer: layer,
        is_aquifer: aquiferTableData.is_aquifer[index],
        depth_to_base: aquiferTableData.depth_to_base[index],
    }));
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

export const formatCurrency = (value, decimalPlaces = 0) => {
    if (value === undefined || value === null) return ''; 
    
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(value);
};