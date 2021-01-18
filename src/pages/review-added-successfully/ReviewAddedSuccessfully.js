import logo from '../../logo.svg';
import MainMenu from "../../components/main-menu/main-menu";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {Link} from "react-router-dom";


const ReviewAddedSuccessfully = () => {

    return (

        <>
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Thank you! <strong>Your review has been added successfully!</strong> <br/>
                Click on the link to refer the to Reviews page <Link to="/reviews">Link</Link>
            </Alert>

        </>
    )
}

export default ReviewAddedSuccessfully;