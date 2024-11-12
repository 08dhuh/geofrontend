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