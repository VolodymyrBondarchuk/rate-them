import MainMenu from "../../components/main-menu/main-menu";
import Footer from "../../components/footer/footer";
import onlineSurveyImg from "../../images/online-survey.png"
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";


const WelcomeScreen = () => {

    const useStyles = makeStyles((theme) => ({
        navLink: {
            color: 'white',
            border: '1px solid white',
            textDecoration: 'none',
            textTransform: 'capitalize',
            marginRight: theme.spacing(2),
            borderRadius: '4px',
            boxShadow: '0 0 0px rgba(255,255,255,0.5)',
            '&:hover': {
                boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            },
        }
    }));

    const classes = useStyles();
    return (

        <>
            <MainMenu title='Home'/>

            <div className='first-screen'>
                <div className="div-left">
                    <p className='title'>
                        Оцінка якості ІТ інтерв'ю
                    </p>
                    <p className='sub-title'>
                        Технічні спеціалісти можуть лишити відгук та оцінити якість проведення тех інтерв'ю
                    </p>
                    <p className='sub-title-2'>
                        HR-и та власники ІТ компаній мають хороше джерело зворотнього зв'язку для покращення процесу найму
                    </p>
                    <p>
                        <div className='div-buttons'>
                            <Link to="/add-review" className={classes.navLink}>
                                <Button color="inherit" hover>Додати Відгук</Button>
                            </Link>
                            <Link to="/reviews" className={classes.navLink}>
                                <Button color="inherit">
                                    Переглянути Відгуки
                                </Button>
                            </Link>
                        </div>
                    </p>
                </div>
                <div className="div-right">
                <img src={onlineSurveyImg} className='first-screen-img' />
                </div>
            </div>
            <br/>
            <br/>
            <Footer/>
        </>
    )
}

export default WelcomeScreen;