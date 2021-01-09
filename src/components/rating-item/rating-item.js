import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import React from "react";


const RatingItem = ({title, value, setValueMethod, setHoverMethod, reviewsHover, hover, ratingName}) => {

    return (


        <>
            <div className='review-item-body'>
                <span className='review-lable'>{title}</span>
                <Rating
                    name={ratingName}
                    precision={0.5}
                    value={value}
                    onChange={(event, newValue) => {
                        setValueMethod(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHoverMethod(newHover);
                    }}
                />
                {value !== null && <Box className='review-popup' ml={2}>{reviewsHover.hr.ice_brake[hover !== -1 ? hover : value]}</Box>}
            </div>
        </>
    )
}

export default RatingItem;