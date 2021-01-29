import React from "react";
import StickyFooter from 'react-sticky-footer';


const Footer = () => {


    return (


        <>
            <StickyFooter
                bottomThreshold={50}
                normalStyles={{
                    backgroundColor: "#999999",
                    padding: "2rem",
                    textAlign: "center",
                    color: "white"
                }}
                stickyStyles={{
                    backgroundColor: "rgba(255,255,255,.8)",
                    padding: "2rem",
                    display: "none"
                }}
            >
                Rate Them App - Copyright (c) - 2021
            </StickyFooter>
        </>
    )
}

export default Footer;