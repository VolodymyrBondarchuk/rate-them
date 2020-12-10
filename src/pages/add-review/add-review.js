import React from "react";
import MainMenu from "../../components/main-menu/main-menu";
import Rating from '@material-ui/lab/Rating';
import {Input} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';

const AddReview = () => {

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const labels = {
        1: 'Взагалі не було',
        2: 'Норм-',
        3: 'Норм',
        4: 'Норм+',
        5: 'Був класний',
    };
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
                            name="hover-feedback"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                        {value !== null && <Box className='review-popup' ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Відношення HR до Вас (софт скіл)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Пунктуальність (все вчасно як домовились чи були провтики)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Враження після спілкування (осадочок, позитив)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h3>Тех інтерв'ю</h3>
                    <div className='review-item-body'>
                        <span className='review-lable'>Ice brake (якість, наявність)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Відношення інтервювера до Вас (софт скіл)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Продуманіссть тех питань (якість питань)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Враження після спілкування (осадочок, позитив)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input/>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <h3>Фідбек</h3>
                    <div className='review-item-body'>
                        <span className='review-lable'>Своєчасність фідбеку</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Розгорнутість фідбеку (причина, рекомендації)</span>
                        <Rating name="half-rating"/>
                    </div>
                    <br/>
                    <div className='review-item-body'>
                        <span className='review-lable'>Коментар</span>
                        <Input/>
                    </div>

                    <br/>
                    <br/>
                    <br/>

                    <Button variant="contained" color="primary">Save</Button>
                </div>
            </div>
        </>
    )
}

export default AddReview;