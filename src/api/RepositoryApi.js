import {config} from "./const/backend-url";
import axios from "axios";

const RepositoryListApi = async () => {

    try {
        let listRepositoriesUrl = `${config.git}${config.repositories}`;

        console.log('listRepositoriesUrl: '+listRepositoriesUrl);

        return await axios.get(listRepositoriesUrl);
    } catch (error) {
        throw new Error(error);
    }
};

export default RepositoryListApi;

window.RepositoryListApi = RepositoryListApi;