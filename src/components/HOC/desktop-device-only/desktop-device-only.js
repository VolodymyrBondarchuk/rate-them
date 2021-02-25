import Warning from "../../warning/warning";
import React, {useEffect, useState} from "react";
import {isMobile} from 'react-device-detect';

const DesktopDeviceOnly = ({ showMobileAnyway, setShowMobileHandler, children }) => {

    const message = "Ця аплікація дозволяє оцінити ІТ інтерв'ювера після проходження технічної співбесіди. "
    +"На даний момент сайт працює лише для Desktop пристроїв. "
    +"Mobile версія з'явиться через декілька місяців. "
    +"Дякую за розуміння"
    return (
        <>
            {!isMobile || showMobileAnyway ? children : <Warning setShowMobile={setShowMobileHandler} message={message}/>  }
        </>
        )

}

export default DesktopDeviceOnly