import {config} from "./const/backend-url";
import axios from "axios";

const ReviewApi = () => {
    return {
        addReview: (payload) => axios.post(`${config.backendDev}`+"/api/review/add", payload)
    }
};

export default ReviewApi;
