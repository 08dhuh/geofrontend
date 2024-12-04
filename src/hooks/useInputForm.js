import { useState } from 'react';
import { DEFAULT_INPUT_VALUES } from '../utils/constants';

const useInputForm = () => {
    const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES);
    const [isProductionPump, setIsProductionPump] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleToggleChange = () => {
        setIsProductionPump(prevState => !prevState);
    };

    return {
        inputValues,
        isProductionPump,
        handleInputChange,
        handleToggleChange,
    };
};

export default useInputForm;
