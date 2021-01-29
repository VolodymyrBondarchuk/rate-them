import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';



const MainMenu = ({title}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            color: '#ffffff'
        },
        login: {
            flexGrow: 1
        }
    }));

    const classes = useStyles();
    return (


        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>

                    {/*<Typography variant="h6" className={classes.title}>
                        <Link style={{color:'white'}} to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link style={{color:'white'}} to="/add-review">Add review</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link style={{color:'white'}} to="/reviews">Reviews</Link>
                    </Typography>*/}

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Link to="/">Home</Link> <br/>
            <Link to="/add-review">Add review</Link><br/>
            <Link to="/reviews">Reviews</Link><br/><br/>
        </>
    )
}

export default MainMenu;