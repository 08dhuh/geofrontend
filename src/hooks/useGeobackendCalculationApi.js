import axios from 'axios';
import { useGlobalConfig } from '../context/GlobalConfigContext';

const useGeobackendCalculationApi = () => {
    const { setResponseData, setError } = useGlobalConfig();  

    const submitForm = async (data) => {
        setResponseData(null); 
        setError(null); 

        try {
            const response = await axios.post(`${process.env.REACT_APP_GEOBACKEND_URL}/api/calculate-wellbore`, data);
            setResponseData(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                const { message, details } = error.response.data;
                setError(`${message} - ${details}`);
            } else {
                setError(error.message);
            }
            setResponseData(null);
        }
    };

    return { submitForm };
};

export default useGeobackendCalculationApi;
