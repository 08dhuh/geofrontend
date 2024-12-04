import React from 'react';
import { useGlobalConfig } from '../../context/GlobalConfigContext';

const ErrorDisplay = () => {
    const { error } = useGlobalConfig();
    if (!error) return null;

    return (
        <div className="error-message">
            <p>{error}</p>
        </div>
    );
};

export default ErrorDisplay;
