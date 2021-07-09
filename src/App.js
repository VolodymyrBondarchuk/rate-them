import './App.css';
import WelcomeScreen from "./pages/welcome-screen/welcome-screen";
import AddReview from "./pages/add-review/add-review";
import {Switch, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import ReviewsList from "./pages/ReviewList/ReviewsList";
import store from "./redux/store";
import ReviewAddedSuccessfully from "./pages/review-added-successfully/ReviewAddedSuccessfully";
import DesktopDeviceOnly from "./components/HOC/desktop-device-only/desktop-device-only";
import React from "react";
import ReactGA from 'react-ga';


function App() {

    ReactGA.initialize('G-9WS8DDL6NH');

    const [showMobile, setShowMobile] = React.useState(false);

    return (
        <DesktopDeviceOnly showMobileAnyway={showMobile} setShowMobileHandler={setShowMobile}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={WelcomeScreen}/>
                    <Route exact path="/add-review" component={() =>
                        <AddReview reviewsHover={store.getState().reviewsHover}
                        />}
                    />
                    <Route exact path="/reviews" component={ReviewsList}/>
                    <Route exact path="/added-success" component={ReviewAddedSuccessfully}/>
                </Switch>
            </BrowserRouter>
        </DesktopDeviceOnly>

    );
}

export default App;
