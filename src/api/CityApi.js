import {config} from "./const/backend-url";
import axios from "axios";

const CityApi = () => {
    return {
        getAllCities: (payload) => axios.get(`${config.backendDev}`+"/api/city/all")
    }
};

export default CityApi;