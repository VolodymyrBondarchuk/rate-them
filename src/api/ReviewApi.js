import {config} from "./const/backend-url";
import axios from "axios";

const ReviewApi = () => {
    return {
        addReview: (payload) => axios.post(`${config.backendDev}`+"/api/review/add", payload),
        getLastAddedReviews: (payload) => axios.get(`${config.backendDev}`+"/api/review/getLastAdded/"+payload.page+"/"+payload.amount)
    }
};

export default ReviewApi;
