import React from "react";
import StickyFooter from 'react-sticky-footer';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';

const Footer = () => {


    return (


        <>
            <StickyFooter
                bottomThreshold={50}
                normalStyles={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#999999",
                    padding: "2rem",
                    color: "white"
                }}
                stickyStyles={{
                    backgroundColor: "rgba(255,255,255,.8)",
                    padding: "2rem",
                    display: "none"
                }}
            >
                Rate Them App - Copyright (c) - 2021

                <a href="https://www.facebook.com/Rate-Them-App-115719183884865" target="_blank"
                   style={{"color":"white", "margin-left":"10px"}}>
                    <FacebookIcon />
                </a>
                <a href="https://t.me/rate_them_channel" target="_blank"
                   style={{"color":"white", "margin-left":"10px"}}>
                    <TelegramIcon/>
                </a>
            </StickyFooter>
        </>
    )
}

export default Footer;