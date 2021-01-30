import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import SvgIcon from "@material-ui/core/SvgIcon";


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}


const MainMenu = ({title}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            color: '#ffffff'
        },
        login: {
            flexGrow: 1
        },
        homeLink: {
            color: 'white',
            textDecoration: 'none',
            textTransform: 'capitalize',
            marginRight: theme.spacing(4)
        },
        navLink: {
            color: 'white',
            textDecoration: 'none',
            textTransform: 'capitalize',
            marginRight: theme.spacing(2)
        }
    }));

    const classes = useStyles();
    return (


        <>
            <AppBar position="static">
                <Toolbar>

                    <Link to="/" className={classes.homeLink}>
                        <HomeIcon style={{ fontSize: 30 }}/>
                    </Link>

                    <Link to="/add-review" className={classes.navLink}>
                        <Button color="inherit">Add review</Button>
                    </Link>
                    <Link to="/reviews" className={classes.navLink}>
                        <Button color="inherit">
                            Reviews List
                        </Button>
                    </Link>
                   {/* <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>*/}
                </Toolbar>
            </AppBar>
            <br/>
            {/*<Link to="/">Home</Link> <br/>
            <Link to="/add-review">Add review</Link><br/>
            <Link to="/reviews">Reviews</Link><br/><br/>*/}
        </>
    )
}

export default MainMenu;