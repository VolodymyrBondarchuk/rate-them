import {config} from "./const/backend-url";
import axios from "axios";

const CompanyApi = () => {
    return {
        findCompanyByNameLike: (payload) => axios.post(`${config.backendDev}`+"/api/company/name/contains", payload)
    }
};

export default CompanyApi;