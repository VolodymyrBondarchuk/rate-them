import {config} from "./const/backend-url";
import axios from "axios";

const EmailSubscriptionApi = () => {
    return {
        addEmailSubscription: (payload) => axios.post(`${config.backendDev}`+"/api/email/subscription/add", payload)
    }
};

export default EmailSubscriptionApi;
