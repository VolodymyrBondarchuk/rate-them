import React, {useEffect, useState} from "react";
import './RepositoryList.css';
import Pagination from "react-js-pagination";
/*import 'bootstrap/dist/css/bootstrap.css';*/
import SearchInput, {createFilter} from 'react-search-input'
import MainMenu from "../../components/main-menu/main-menu";
import ReviewApi from "../../api/ReviewApi";
import Rating from "@material-ui/lab/Rating";

let RepositoryList = () => {

    const KEYS_TO_FILTERS = ['name', 'description', 'owner.login', 'owner.repos_url']

    const [repositories, setRepositories] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setitemsCountPerPage] = useState(5);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
    const [sliceFrom, setSliceFrom] = useState(0);
    const [sliceTo, setSliceTo] = useState(5);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {

        /*RepositoryListApi().then(response => {
            setRepositories(response.data)
            setFilteredEmails(response.data)
            setTotalItemsCount(response.data.length);
            setIsLoaded(true);
        })
            .catch(error => {
                console.log('Error loading data from git url: '+error)
                setIsLoaded(true);
                setIsError(true)
            });*/

        ReviewApi().getLastAddedReviews({page: sliceFrom, amount: sliceTo})
            .then((res) => {
                setRepositories(res.data.reviews)
                setFilteredEmails(res.data.reviews)
                setTotalItemsCount(res.data.totalItems);
                setIsLoaded(true);
                console.log('Reviews Fetched Success!');
                //debugger
            })
            .catch(error => {
                setIsLoaded(true);
                setIsError(true)
                console.log('Error loading data from git url: '+error);
            });

        console.log("repositories: " + repositories);

    }, []);

    let handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        setSliceFrom((pageNumber - 1) * itemsCountPerPage)
        setSliceTo((pageNumber - 1) * itemsCountPerPage /*sliceFrom*/ + itemsCountPerPage)
        //debugger
        console.log('Page change');
    }

    let searchUpdated = (term) => {
        //filter
        term = term === undefined ? '' : term
        const filtered = repositories.filter(createFilter(term, KEYS_TO_FILTERS));
        setFilteredEmails(filtered);

        //set pagination indexes
        setTotalItemsCount(filtered.length);
        setActivePage(1);
        setSliceFrom(0)
        setSliceTo(5)
    }

    let formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    //owner profile picture on the first column, then owner name, repo name, repo url, and description

    return (
        <>
            <MainMenu/>
                <span>
                    <SearchInput className="search-input" onChange={searchUpdated}/>

                    <table className='table'>
                        <thead className='table-header'>
                        <tr>
                            <th>#</th>
                            <th>Company</th>
                            <th>HR</th>
                            <th>Interviewer</th>
                            <th>Feedback</th>

                            {/*<th>Rating</th>*/}
                            <th>Vacancy</th>
                            <th>Start Date</th>
                            <th>End Date</th>

                        </tr>
                        </thead>
                        <tbody>
                         {filteredEmails.slice(sliceFrom, sliceTo).map((el, i) => {
                             return (
                                 <tr key={i}>
                                     <td className='table-num-col'>{sliceFrom + i + 1}</td>
                                     <td>
                                         {el.companyName} <br/>
                                         <Rating name="company-rating-total"
                                                 precision={0.1}
                                                 disabled={true}
                                                 value={el.companyRatingTotal}
                                         />
                                         {Math.round((el.companyRatingTotal + Number.EPSILON) * 100) / 100}
                                     </td>
                                     <td>
                                         {el.hr.name} <br/>
                                         <Rating name="hr-rating-total"
                                                 precision={0.1}
                                                 disabled={true}
                                                 value={el.hrRatingTotal}
                                         />
                                         {el.hrRatingTotal}
                                     </td>
                                     <td>
                                         {el.tech.interviewerName} <br/>
                                         <Rating name="tech-rating-total"
                                                 precision={0.1}
                                                 disabled={true}
                                                 value={el.techRatingTotal}
                                         />
                                         {el.techRatingTotal}
                                     </td>
                                     <td>
                                         <Rating name="feedback-rating-total"
                                                 precision={0.1}
                                                 disabled={true}
                                                 value={el.feedbackRatingTotal}
                                         />
                                         {el.feedbackRatingTotal}
                                     </td>
                                     <td>{el.vacancyName}</td>
                                     <td>{formatDate(el.startDate)}</td>
                                     <td>{formatDate(el.endDate)}</td>

                                     {/*<td>{el.hr.iceBrake}</td>*/}
                                     {/*<td>{el.feedbackRatingTotal}</td>*/}

                                 </tr>
                             )
                         })}
                        </tbody>
                    </table>

                    {!isLoaded ? <h3>Loading...</h3> :
                             isError ? <h3 style={{color: 'red'}}>Error fetching the data...</h3> :

                                 filteredEmails === undefined || filteredEmails.length === 0 ?
                                     <h3>Results not found</h3> : ''}

                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={pageRangeDisplayed}
                        onChange={handlePageChange}
                    />

                </span>


        </>
    )
}

export default RepositoryList;