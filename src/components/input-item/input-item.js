import {Input} from "@material-ui/core";
import React from "react";

const InputItem = ({title, name, placeholder, setValueMethod}) => {

    return (

        <>
            <div className='review-item-body'>
                <span className='review-lable'>{title}</span>
                <Input name={name} placeholder={placeholder}
                       onChange={(event, newValue) => {
                           setValueMethod(newValue);
                       }}/>
            </div>
        </>
    )
}

export default InputItem;