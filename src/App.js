import './App.css';
import WelcomeScreen from "./pages/welcome-screen/welcome-screen";
import AddReview from "./pages/add-review/add-review";
import {Switch, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import RepositoryList from "./pages/repository-list/RepositoryList";
import store from "./redux/store";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={WelcomeScreen}/>
                <Route exact path="/add-review" component={() =>
                    <AddReview reviewsHover={store.getState().reviewsHover}
                    />}
                />
                <Route exact path="/list" component={RepositoryList}/>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
