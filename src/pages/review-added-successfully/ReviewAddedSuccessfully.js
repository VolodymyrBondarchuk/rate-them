import MainMenu from "../../components/main-menu/main-menu";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import {Link} from "react-router-dom";


const ReviewAddedSuccessfully = () => {

    return (

        <>
            <MainMenu title='Success'/>
            <Alert severity="success">
                <AlertTitle>Успішно</AlertTitle>
                Дякуємо! <strong>Ваш відгук успішно додано!</strong> <br/>
                Натисніть, будь ласка, на посилання, щоб перейти на сторінку з усіма відгуками <Link to="/reviews">Посилання</Link>
            </Alert>

        </>
    )
}

export default ReviewAddedSuccessfully;