import {Link} from "react-router-dom";

const MainMenu = () => {

    return (

        <>
            <Link to="/">Home</Link> <br/>
            <Link to="/add-review">Add review</Link><br/><br/>
        </>
    )
}

export default MainMenu;