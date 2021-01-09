import React, {useEffect} from "react";
import MainMenu from "../../components/main-menu/main-menu";
import {Input} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import RatingItem from "../../components/rating-item/rating-item";
import InputItem from "../../components/input-item/input-item";

const AddReview = ({hr, tech, feedback, reviewsHover, addReview}) => {

    const [vacancyName, setVacancyName] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [cityName, setCityName] = React.useState("");

    //HR Start
    const [hrIceBrakeValue, setHrIceBrakeValue] = React.useState(hr.ice_brake);
    const [hrIceBrakeHover, setHrIceBrakeHover] = React.useState(0);

    const [hrAttitudeValue, setHrAttitudeValue] = React.useState(hr.attitude);
    const [hrAttitudeHover, setHrAttitudeHover] = React.useState(0);

    const [hrPunctualityValue, setHrPunctualityValue] = React.useState(hr.punctuality);
    const [hrPunctualityHover, setHrPunctualityHover] = React.useState(0);

    const [hrImpressionValue, setHrImpressionValue] = React.useState(hr.impression);
    const [hrImpressionHover, setHrImpressionHover] = React.useState(0);

    const [hrComment, setHrComment] = React.useState("");
    //HR End

    //Tech Start
    const [techIceBrakeValue, setTechIceBrakeValue] = React.useState(tech.ice_brake);
    const [techIceBrakeHover, setTechIceBrakeHover] = React.useState(0);

    const [techAttitudeValue, setTechAttitudeValue] = React.useState(tech.attitude);
    const [techAttitudeHover, setTechAttitudeHover] = React.useState(0);

    const [techQuestionsQualityValue, setTechQuestionsQualityValue] = React.useState(tech.tech_questions_quality);
    const [techQuestionsQualityHover, setTechQuestionsQualityHover] = React.useState(0);

    const [techImpressionValue, setTechImpressionValue] = React.useState(tech.impression);
    const [techImpressionHover, setTechImpressionHover] = React.useState(0);

    const [techComment, setTechComment] = React.useState("");
    //Tech End

    //Feedback Start
    const [feedbackOnTimeValue, setFeedbackOnTimeValue] = React.useState(feedback.feedback_on_time);
    const [feedbackOnTimeHover, setFeedbackOnTimeHover] = React.useState(0);

    const [feedbackDetalizationValue, setFeedbackDetalizationValue] = React.useState(feedback.feedback_detalization);
    const [feedbackDetalizationHover, setFeedbackDetalizationHover] = React.useState(0);

    const [feedbackComment, setFeedbackComment] = React.useState("");
    //Feedback End



    useEffect(() => {
        //setIceBrakeValue(hr.ice_brake)
    })

    let handleSaveReview = (e)=>{
        e.preventDefault();
        let  review = {
            vacancyName: vacancyName,
            companyName: companyName,
            cityName: cityName,
            hr: {
                ice_brake: hrIceBrakeValue,
                attitude: hrAttitudeValue,
                punctuality: hrPunctualityValue,
                impression: hrImpressionValue,
                comment: hrComment
            },
            tech: {
                ice_brake: techIceBrakeValue,
                attitude: techAttitudeValue,
                tech_questions_quality: techQuestionsQualityValue,
                impression: techImpressionValue,
                comment: techComment
            },
            feedback: {
                feedback_on_time: 3,
                feedback_detalization: 1,
                comment: feedbackComment
            }
        }

        addReview(review);
    }
    return (
        <>
            <MainMenu/>
            <h1 className='review-h1'>Add Review</h1>
            <div className="review-container">
                <div className='review-body'>
                    {/*//TOOD: change it to dropdown list*/}
                    <InputItem title='Позиція'
                               name="vacancy-name"
                               placeholder='Java Developer'
                               setValueMethod={setVacancyName}
                    />


                    {/*//TOOD: change it to dropdown list*/}
                    <InputItem title='Компанія'
                               name="company-name"
                               placeholder='NiX'
                               setValueMethod={setCompanyName}
                    />

                    {/*//TOOD: change it to dropdown list*/}
                    <InputItem title='Місто'
                               name="city-name"
                               placeholder='Львів'
                               setValueMethod={setCityName}
                    />

                    <h3>Hr інтерв'ю</h3>
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
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input name="hr-comment"
                               onChange={(event, newValue) => {
                                   setHrComment(newValue);
                               }}/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Тех інтерв'ю</h3>
                    <RatingItem title="Ice brake (якість, наявність)"
                                ratingName='tech-ice-brake'
                                value={techIceBrakeValue}
                                setValueMethod={setTechIceBrakeValue}
                                setHoverMethod={setTechIceBrakeHover}
                                reviewsHover={reviewsHover}
                                hover={techIceBrakeHover}
                    />
                    <br/>
                    <RatingItem title="Відношення інтервювера до Вас (софт скіл)"
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
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input name="tech-comment"
                               onChange={(event, newValue) => {
                                   setTechComment(newValue);
                               }}/>
                    </div>

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
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input name='feedback-comment'
                               onChange={(event, newValue) => {
                                   setFeedbackComment(newValue);
                               }}/>
                    </div>

                    <br/>
                    <br/>
                    <br/>

                    <Button variant="contained" color="primary" onClick={handleSaveReview}>Save</Button>
                </div>
            </div>
        </>
    )
}

export default AddReview;