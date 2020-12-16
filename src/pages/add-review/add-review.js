import React, {useEffect} from "react";
import MainMenu from "../../components/main-menu/main-menu";
import Rating from '@material-ui/lab/Rating';
import {Input} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';

const AddReview = ({hr, tech, feedback, reviewsHover, addReview}) => {

    const [HRIceBrakeValue, setHRIceBrakeValue] = React.useState(hr.ice_brake);
    const [HRiceBrakeHover, setHRIceBrakeHover] = React.useState(0);

    const [HRattitudeValue, setHRattitudeValue] = React.useState(hr.attitude);
    const [attitudeHover, setAttitudeHover] = React.useState(0);

    const [punctualityValue, setPunctualityValue] = React.useState(hr.punctuality);
    const [punctualityHover, setPunctualityHover] = React.useState(0);

    const [impressionValue, setImpressionValue] = React.useState(hr.impression);
    const [impressionHover, setImpressionHover] = React.useState(0);



    useEffect(() => {
        //setIceBrakeValue(hr.ice_brake)
    })

    let handleSaveReview = (e)=>{
        e.preventDefault();
        let  review = {
            hr: {
                ice_brake: HRIceBrakeValue,
                attitude: HRattitudeValue,
                punctuality: punctualityValue,
                impression: impressionValue,
                comment: "Клас"
            },
            tech: {
                ice_brake: 1,
                attitude: 2,
                tech_questions_quality: 4,
                impression: 3,
                comment: "Таке собі"
            },
            feedback: {
                feedback_on_time: 3,
                feedback_detalization: 1,
                comment: "Фігня"
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
                    <h3>Hr інтерв'ю</h3>
                    <div className='review-item-body'>
                        <span className='review-lable'>Ice brake (якість, наявність)</span>
                        <Rating
                            name="hr-ice-brake"
                            precision={0.5}
                            value={HRIceBrakeValue}
                            onChange={(event, newValue) => {
                                setHRIceBrakeValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHRIceBrakeHover(newHover);
                            }}
                        />
                        {HRIceBrakeValue !== null && <Box className='review-popup' ml={2}>{reviewsHover.hr.ice_brake[HRiceBrakeHover !== -1 ? HRiceBrakeHover : HRIceBrakeValue]}</Box>}
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Відношення HR до Вас (софт скіл)</span>
                        <Rating
                            name="hr-attitude"
                            precision={0.5}
                            value={HRattitudeValue}
                            onChange={(event, newValue) => {
                                setHRattitudeValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setAttitudeHover(newHover);
                            }}
                        />
                        {HRattitudeValue !== null && <Box className='review-popup' ml={2}>{reviewsHover.hr.attitude[attitudeHover !== -1 ? attitudeHover : HRattitudeValue]}</Box>}
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Пунктуальність (все вчасно як домовились чи були провтики)</span>
                        <Rating
                            name="hr-punctuality"
                            precision={0.5}
                            value={punctualityValue}
                            onChange={(event, newValue) => {
                                setPunctualityValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setPunctualityHover(newHover);
                            }}
                        />
                        {punctualityValue !== null && <Box className='review-popup' ml={2}>{reviewsHover.hr.punctuality[punctualityHover !== -1 ? punctualityHover : punctualityValue]}</Box>}
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Враження після спілкування (осадочок, позитив)</span>
                        <Rating
                            name="hr-impression"
                            precision={0.5}
                            value={impressionValue}
                            onChange={(event, newValue) => {
                                setImpressionValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setImpressionHover(newHover);
                            }}
                        />
                        {impressionValue !== null && <Box className='review-popup' ml={2}>{reviewsHover.hr.impression[impressionHover !== -1 ? impressionHover : impressionValue]}</Box>}
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input name="hr-comment" placeholder={reviewsHover.hr.comment}/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Тех інтерв'ю</h3>
                    <div className='review-item-body'>
                        <span className='review-lable'>Ice brake (якість, наявність)</span>
                        <Rating name="tech-ice-brake" value={tech.ice_brake}/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Відношення інтервювера до Вас (софт скіл)</span>
                        <Rating name="tech-attitude" value={tech.attitude}/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Продуманіссть тех питань (якість питань)</span>
                        <Rating name="tech-questions-quality" value={tech.tech_questions_quality}/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Враження після спілкування (осадочок, позитив)</span>
                        <Rating name="tech-impression" value={tech.impression}/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input name="tech-comment" value={tech.comment}/>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <h3>Фідбек</h3>
                    <div className='review-item-body'>
                        <span className='review-lable'>Своєчасність фідбеку</span>
                        <Rating name="feedback-on-time" value={feedback.feedback_on_time}/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Розгорнутість фідбеку (причина, рекомендації)</span>
                        <Rating name="feedback-detalization"  value={feedback.feedback_detalization}/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input name='feedback-comment' value={feedback.comment}/>
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