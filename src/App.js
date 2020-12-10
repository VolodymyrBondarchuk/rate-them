import './App.css';
import WelcomeScreen from "./pages/welcome-screen/welcome-screen";
import AddReview from "./pages/add-review/add-review";
import {Switch, Route} from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={WelcomeScreen}/>
                <Route exact path="/add-review" component={AddReview}/>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
