import axios from 'axios';
import { useGlobalConfig } from '../context/GlobalConfigContext';

const useGeobackendCalculationApi = () => {
    const { setResponseData, setError, setAquiferData } = useGlobalConfig();  

    const submitForm = async (data) => {
        setResponseData(null); 
        setError(null); 
        setAquiferData(null);

        try {
            const response = await axios.post(`${process.env.REACT_APP_GEOBACKEND_URL}/api/calculate-wellbore`, data);
            setAquiferData(response.data.data.aquifer_table);
            setResponseData({'installation_results': response.data.data.installation_results,
                'cost_results': response.data.data.cost_results}
            );
        } catch (error) {

            if (error.response && error.response.data) {
                const { message, details, data: responseData } = error.response.data;
                setError(`${message} - ${details}`);
                if (responseData) {
                    setAquiferData(responseData?.aquifer_table || null);
                    setResponseData(null);

                } else {
                    setAquiferData(null);
                    setResponseData(null); 
                }
            } else {
                setError(error.message);
                setResponseData(null);
            }
        }
    };

    return { submitForm };
};

export default useGeobackendCalculationApi;
