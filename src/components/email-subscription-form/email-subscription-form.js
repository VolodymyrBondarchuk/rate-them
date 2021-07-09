import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EmailSubscriptionApi from "../../api/EmailSubscriptionApi";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const EmailSubscriptionForm = () => {

    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Something went wrong");
    const [email, setEmail] = React.useState("");

    const emailValidationRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const emailValidationErrorUA = "Будь ласка, введіть коректну емейл адресу";
    const emailValidationSuccessUA = "Ви успішно підписалися на емейл розсилку:)";

    const emailSubscriptionFailedEN = 'Email subscription failed';
    const emailSubscriptionSuccessEN = 'Email subscription success!';

    const defaultErrorMessage = "Something went wrong";

    let handleEmailSubscription = (e) => {
        console.log("Subscribed")

        if (emailValidationRegex.test(email)) {
            //if email is valid then store it at backend
            EmailSubscriptionApi().addEmailSubscription(email)
                .then((res) => {
                    setIsSuccess(true);
                    setIsError(false);
                    console.log(emailSubscriptionSuccessEN);
                })
                .catch((error) => {
                    //debugger
                    setIsSuccess(false);
                    setIsError(true);

                    let message = "";
                    if (error.response !== undefined
                        && error.response.data !== undefined) {
                        message += error.response.data.message;
                    } else {
                        message += error.message;
                    }
                    setErrorMessage(message);
                    console.log(emailSubscriptionFailedEN)
                });
        } else {
            setIsError(true);
            setIsSuccess(false);
            setErrorMessage(emailValidationErrorUA);
        }
    }

    let handleSnackClose = () => {
        setIsError(false);
        setErrorMessage(defaultErrorMessage);
    }

    return (

        <>
            <div className='email-subscription-body'>
                <div className='email-subscription-headings'>
                    <div className='email-subscription-title'>Дізнавайтеся новини першими</div>
                    <div className='email-subscription-subtitle'>Отримуйте апдейти аплікації та цікаві відгуки
                        кандидатів на пошту
                    </div>
                </div>
                <TextField id="standard-basic"
                           label="Email*"
                           onChange={(event) => {
                               setEmail(event.target.value);
                           }}/>
                <Button variant="outlined"
                        color="primary"
                        onClick={handleEmailSubscription}
                        disabled={isSuccess}>Підписатися</Button>

            </div>
            <Snackbar open={isError} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="warning">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={isSuccess} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success">
                    {emailValidationSuccessUA}
                </Alert>
            </Snackbar>
        </>
    )
}

export default EmailSubscriptionForm;