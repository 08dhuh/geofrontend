export const DEFAULT_COORDINATES = [-38.1950, 146.5400];

//Labels for form fields
export const LABELS = {
    required_flow_rate: "Required flow rate (m³/s)",
    hydraulic_conductivity: "Aquifer hydraulic conductivity (m/day)",
    average_porosity: "Average reservoir porosity (0 - 1)",
    bore_lifetime_year: "Bore/project lifetime (years)",
    long_term_decline_rate: "Long-term decline rate in water level (m/year)",
    allowable_drawdown: "Allowable drawdown (m)",
    safety_margin: "Safety margin (m)",
};

//Casing stages
export const CASING_STAGES = [
    'Pre-collar',
    'Superficial Casing',
    'Pump Chamber Casing',
    'Intermediate Casing',
    'Screen Riser',
    'Screen',
];

export const COST_STAGES = ["Drilling Rates", "Materials", "Others", "Time Rates", "Total Cost"];

export const vaf_mapping = {
    '100qa': 'Quaternary Alluvium (100)',
    '101utb': 'Upper Tertiary/Quaternary Basalt (101)',
    '102utqa': 'Upper Tertiary-Quaternary Aquifer (102)',
    '103utqd': 'Upper Tertiary-Quaternary Aquitard (103)',
    '104utam': 'Upper Tertiary Aquifer (marine) (104)',
    '105utaf': 'Upper Tertiary Aquifer (fluvial) (105)',
    '106utd': 'Upper Tertiary Aquitard (106)',
    '107umta': 'Upper-Mid Tertiary Aquifer (107)',
    '108umtd': 'Upper-Mid Tertiary Aquitard (108)',
    '109lmta': 'Lower-Mid Tertiary Aquifer (109)',
    '110lmtd': 'Lower-Mid Tertiary Aquitard (110)',
    '111lta': 'Lower Tertiary Aquifer (111)',
    '112ltba': 'Lower Tertiary Basalt A stage (112)',
    '112ltbb': 'Lower Tertiary Basalt B stage (112)',
    '112ltb': 'Lower Tertiary Basalt (112)',
    '113cps': 'Cretaceous & Permian Sediments (113)',
    '114bse': 'Cretaceous & Palaeozoic Basement (114)'
};


//Default form input values
export const DEFAULT_INPUT_VALUES = {
    required_flow_rate: 4320,
    hydraulic_conductivity: 5,
    average_porosity: 0.25,
    bore_lifetime_year: 30,
    long_term_decline_rate: 1,
    allowable_drawdown: 25,
    safety_margin: 25,
};