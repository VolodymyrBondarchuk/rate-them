import React, {useEffect} from "react";
import MainMenu from "../../components/main-menu/main-menu";
import Button from "@material-ui/core/Button";
import RatingItem from "../../components/rating-item/rating-item";
import InputItem from "../../components/input-item/input-item";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReviewApi from "../../api/ReviewApi";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";
import Footer from "../../components/footer/footer";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import CityApi from "../../api/CityApi";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CompanyApi from "../../api/CompanyApi";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        minWidth: 200
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

const AddReview = ({reviewsHover}) => {

    const [vacancyName, setVacancyName] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [cityName, setCityName] = React.useState("");

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const [hrPersonName, setHrPersonName] = React.useState("");
    const [techInterviewerPersonName, setTechInterviewerPersonName] = React.useState("");

    //HR Start
    const [hrIceBrakeValue, setHrIceBrakeValue] = React.useState(0);
    const [hrIceBrakeHover, setHrIceBrakeHover] = React.useState(0);

    const [hrAttitudeValue, setHrAttitudeValue] = React.useState(0);
    const [hrAttitudeHover, setHrAttitudeHover] = React.useState(0);

    const [hrPunctualityValue, setHrPunctualityValue] = React.useState(0);
    const [hrPunctualityHover, setHrPunctualityHover] = React.useState(0);

    const [hrImpressionValue, setHrImpressionValue] = React.useState(0);
    const [hrImpressionHover, setHrImpressionHover] = React.useState(0);

    const [hrComment, setHrComment] = React.useState("");
    //HR End

    //Tech Start
    const [techIceBrakeValue, setTechIceBrakeValue] = React.useState(0);
    const [techIceBrakeHover, setTechIceBrakeHover] = React.useState(0);

    const [techAttitudeValue, setTechAttitudeValue] = React.useState(0);
    const [techAttitudeHover, setTechAttitudeHover] = React.useState(0);

    const [techQuestionsQualityValue, setTechQuestionsQualityValue] = React.useState(0);
    const [techQuestionsQualityHover, setTechQuestionsQualityHover] = React.useState(0);

    const [techImpressionValue, setTechImpressionValue] = React.useState(0);
    const [techImpressionHover, setTechImpressionHover] = React.useState(0);

    const [techComment, setTechComment] = React.useState("");
    //Tech End

    //Feedback Start
    const [feedbackOnTimeValue, setFeedbackOnTimeValue] = React.useState(0);
    const [feedbackOnTimeHover, setFeedbackOnTimeHover] = React.useState(0);

    const [feedbackDetalizationValue, setFeedbackDetalizationValue] = React.useState(0);
    const [feedbackDetalizationHover, setFeedbackDetalizationHover] = React.useState(0);

    const [feedbackComment, setFeedbackComment] = React.useState("");
    //Feedback End

    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("Something went wrong");

    const [cities, setCities] = React.useState([]);
    const [companies, setCompanies] = React.useState([]);

    const [activeCityId, setActiveCityId] = React.useState(0);
    const [activeCompanyId, setActiveCompanyId] = React.useState(0);

    const [companyQuickSearch, setCompanyQuickSearch] = React.useState("");

    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        //setIceBrakeValue(hr.ice_brake)
        CityApi().getAllCities().then(
            (res) => {
                setCities(res.data);
                console.log('Cities Fetched Success!');
                //debugger
            }
        ).catch(error => {
            console.log('Error loading cities url: '+error)
        });

        fetchCompanies(companyQuickSearch);

    }, [])

    let fetchCompanies = (chars)=>{
        CompanyApi().findCompanyByNameLike(chars).then(
            (res) => {
                setCompanies(res.data);
                console.log('Companies Fetched Success!');
                //debugger
            }
        ).catch(error => {
            console.log('Error loading companies url: '+error)
        });
    }

    let handleCompanyNameChange = (event) => {
        console.log("Company name changed: "+event.target.value)
        fetchCompanies( event.target.value)
    }

    let handleCompanyNameReset = (event) => {
        console.log("Company name Reset: "+event.target.value)

    }

    let handleCompanyNameSelected = (event) => {
        let companyNameSelected = event.target.value;
        let companyIdSelected = 0;

        setCompanyName(companyNameSelected);
        setActiveCompanyId(companyIdSelected);


        for(const prop in companies) {
            if(companies[prop].name === companyNameSelected){
                companyIdSelected = companies[prop].id;
                setActiveCompanyId(companyIdSelected);
                break
            }
        }

        if(companyNameSelected === "") {
            fetchCompanies("");
        }
        console.log("Company Name selected: "+companyNameSelected)
        console.log("Company ID Selected: "+companyIdSelected)

    }

    let handleSaveReview = (e)=>{
        e.preventDefault();
        let  review = {
            vacancyName: vacancyName,
            //TODO: remove companyName and use companyId instead
            companyName: companyName,
            companyId: activeCompanyId,
            //TODO: remove cityName and use cityId instead
            cityName: cityName,
            cityId: activeCityId,
            startDate: startDate,
            endDate: endDate,
            hr: {
                name: hrPersonName,
                iceBrake: hrIceBrakeValue,
                attitude: hrAttitudeValue,
                punctuality: hrPunctualityValue,
                impression: hrImpressionValue,
                comment: hrComment
            },
            tech: {
                interviewerName: techInterviewerPersonName,
                iceBrake: techIceBrakeValue,
                attitude: techAttitudeValue,
                questionsQuality: techQuestionsQualityValue,
                impression: techImpressionValue,
                comment: techComment
            },
            feedback: {
                onTime: feedbackOnTimeValue,
                detailization: feedbackDetalizationValue,
                comment: feedbackComment
            }
        }

        ReviewApi().addReview(review)
            .then((res) => {
                setIsSuccess(true);
                setIsError(false);
                console.log('Saved success!')

                setTimeout(function() { //Start the timer
                    history.push('/added-success') //After 1 second, set render to true
                }.bind(this), 2000)

            })
            .catch((error) => {
                //debugger
                setIsSuccess(false);
                setIsError(true);

                let message = "";
                if(error.response !== undefined
                    && error.response.data !== undefined) {
                    message += error.response.data.message;
                } else {
                    message += error.message;
                }
                setErrorMessage(message);
                console.log('Saved false')
            });

        //stores in redux
        //addReview(review);
    }

    let handleClose = () => {
        setIsError(false);
        setErrorMessage("Something went wring");
    }

    const handleCityChange = (event) => {
        console.log("Active city ID:"+event.target.value)
        let cityId = parseInt(event.target.value, 10);
        let city = "";
        setActiveCityId(cityId);

        //TODO: remove this once backend will be abl to resolve city by id
        for(const prop in cities) {
            if(cities[prop].id === cityId) {
                city = cities[prop].name;
                setCityName(city);
                break;
            }
        }

        console.log("city name: "+city)
    };
    return (
        <>
            <MainMenu title="Add Review"/>
            <h1 className='review-h1'>Add Review</h1>

            <br/>

            <div className="review-container">
                <div className='review-body'>
                    {/*//TOOD: change it to dropdown list*/}
                    <InputItem title='Позиція'
                               name="vacancy-name"
                               placeholder='Java Developer'
                               setValueMethod={setVacancyName}
                    />

                    <br/>

                    <div className='review-item-body'>
                        <span className='review-lable'>Компанія</span>
                        <div style={{width: 200, display: "inline-block"}}>
                            <Autocomplete
                                id="auto-complete"
                                options={companies.map((company) => company.name)}
                                freeSolo

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Start typing..."
                                        margin="normal"
                                        size="small"
                                        onSelect={handleCompanyNameSelected}
                                        onChange={handleCompanyNameChange}
                                        onReset={handleCompanyNameReset}
                                    />
                                )}
                            />
                        </div>

                    </div>
                    <br/>

                    <div className='review-item-body'>
                        <span className='review-lable'>Місто</span>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="city-input-id">City</InputLabel>

                            <Select
                                labelId="city-input-id"
                                id="city-select-id"
                                value={activeCityId}
                                onChange={handleCityChange}
                            >
                                <MenuItem value={0}><i style={{color:"rgba(0, 0, 0, 0.54)"}}>Select city</i></MenuItem>
                                {cities.map((el, i) => {
                                    return (
                                        <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                                        )})}

                            </Select>
                        </FormControl>

                    </div>
                    <br/>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Дата початку інтерв'ю</span>
                        <DatePicker selected={startDate} onChange={setStartDate} />
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Дата завершення інтерв'ю</span>
                        <DatePicker selected={endDate} onChange={setEndDate} />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Hr інтерв'ю</h3>

                    <InputItem title='ПІБ HR-a'
                               name="hr-name"
                               placeholder='Олена Давидова'
                               setValueMethod={setHrPersonName}
                    />
                    <br/>
                    <RatingItem title="Ice brake (якість, наявність)"
                                ratingName='hr-ice-brake'
                                value={hrIceBrakeValue}
                                setValueMethod={setHrIceBrakeValue}
                                setHoverMethod={setHrIceBrakeHover}
                                reviewsHover={reviewsHover}
                                hover={hrIceBrakeHover}
                    />

                    <br/>
                    <RatingItem title="Відношення HR до Вас (софт скіл)"
                                ratingName='hr-attitude'
                                value={hrAttitudeValue}
                                setValueMethod={setHrAttitudeValue}
                                setHoverMethod={setHrAttitudeHover}
                                reviewsHover={reviewsHover}
                                hover={hrAttitudeHover}
                    />
                    <br/>
                    <RatingItem title="Пунктуальність (все вчасно як домовились чи були провтики)"
                                ratingName='hr-punctuality'
                                value={hrPunctualityValue}
                                setValueMethod={setHrPunctualityValue}
                                setHoverMethod={setHrPunctualityHover}
                                reviewsHover={reviewsHover}
                                hover={hrPunctualityHover}
                    />
                    <br/>
                    <RatingItem title="Враження після спілкування (осадочок, позитив)"
                                ratingName='hr-impression'
                                value={hrImpressionValue}
                                setValueMethod={setHrImpressionValue}
                                setHoverMethod={setHrImpressionHover}
                                reviewsHover={reviewsHover}
                                hover={hrImpressionHover}
                    />
                    <br/>
                    <InputItem title='Коментар'
                               name="hr-comment"
                               placeholder=''
                               setValueMethod={setHrComment}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <h3>Тех інтерв'ю</h3>

                    <InputItem title='ПІБ Tech Інтервювера'
                               name="tech-interviewer-name"
                               placeholder='Олег Данилюк'
                               setValueMethod={setTechInterviewerPersonName}
                    />
                    <br/>
                    <RatingItem title="Ice brake (якість, наявність)"
                                ratingName='tech-ice-brake'
                                value={techIceBrakeValue}
                                setValueMethod={setTechIceBrakeValue}
                                setHoverMethod={setTechIceBrakeHover}
                                reviewsHover={reviewsHover}
                                hover={techIceBrakeHover}
                    />
                    <br/>
                    <RatingItem title="Відношення інтерв'ювера до Вас (софт скіл)"
                                ratingName='tech-attitude'
                                value={techAttitudeValue}
                                setValueMethod={setTechAttitudeValue}
                                setHoverMethod={setTechAttitudeHover}
                                reviewsHover={reviewsHover}
                                hover={techAttitudeHover}
                    />
                    <br/>
                    <RatingItem title="Продуманість тех питань (якість питань)"
                                ratingName='tech-questions-quality'
                                value={techQuestionsQualityValue}
                                setValueMethod={setTechQuestionsQualityValue}
                                setHoverMethod={setTechQuestionsQualityHover}
                                reviewsHover={reviewsHover}
                                hover={techQuestionsQualityHover}
                    />
                    <br/>
                    <RatingItem title="Враження після спілкування (осадочок, позитив)"
                                ratingName='tech-impression'
                                value={techImpressionValue}
                                setValueMethod={setTechImpressionValue}
                                setHoverMethod={setTechImpressionHover}
                                reviewsHover={reviewsHover}
                                hover={techImpressionHover}
                    />
                    <br/>

                    <InputItem title='Коментар'
                               name="tech-comment"
                               placeholder=''
                               setValueMethod={setTechComment}
                    />

                    <br/>
                    <br/>
                    <br/>
                    <h3>Фідбек</h3>
                    <RatingItem title="Своєчасність фідбеку"
                                ratingName='feedback-on-time'
                                value={feedbackOnTimeValue}
                                setValueMethod={setFeedbackOnTimeValue}
                                setHoverMethod={setFeedbackOnTimeHover}
                                reviewsHover={reviewsHover}
                                hover={feedbackOnTimeHover}
                    />
                    <br/>
                    <RatingItem title="Розгорнутість фідбеку (причина, рекомендації)"
                                ratingName='feedback-detalization'
                                value={feedbackDetalizationValue}
                                setValueMethod={setFeedbackDetalizationValue}
                                setHoverMethod={setFeedbackDetalizationHover}
                                reviewsHover={reviewsHover}
                                hover={feedbackDetalizationHover}
                    />
                    <br/>
                    <InputItem title='Коментар'
                               name="feedback-comment"
                               placeholder=''
                               setValueMethod={setFeedbackComment}
                    />

                    <br/>
                    <br/>
                    <br/>

                    <Button variant="contained" color="primary" onClick={handleSaveReview}>Save</Button>
                    <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="warning">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Saved Successfully
                        </Alert>
                    </Snackbar>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AddReview;