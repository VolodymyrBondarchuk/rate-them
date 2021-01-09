import './App.css';
import WelcomeScreen from "./pages/welcome-screen/welcome-screen";
import AddReview from "./pages/add-review/add-review";
import {Switch, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import RepositoryList from "./pages/repository-list/RepositoryList";


function App({state, addReview}) {
    let review = state.reviews[state.reviews.length-1]; //get last review
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={WelcomeScreen}/>
                <Route exact path="/add-review" component={() =>
                    <AddReview
                        reviewsHover={state.reviewsHover}
                        hr={review ? review.hr: {}}
                        tech={review ? review.tech : {}}
                        feedback={review ? review.feedback : {}}
                        addReview={addReview}/>}
                />
                <Route exact path="/list" component={RepositoryList}/>
            </Switch>
        </BrowserRouter>

    );
}

export default App;
