import React, {useEffect, useState} from "react";
import './ReviewsList.css';
/*import 'bootstrap/dist/css/bootstrap.css';*/
import SearchInput, {createFilter} from 'react-search-input'
import MainMenu from "../../components/main-menu/main-menu";
import ReviewApi from "../../api/ReviewApi";
import Rating from "@material-ui/lab/Rating";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import Footer from "../../components/footer/footer";
import {makeStyles} from '@material-ui/core/styles';
import ExpandableTableRow from "../../components/ExpandableTableRow/ExpandableTableRow";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


let ReviewsList = () => {

    const KEYS_TO_FILTERS = ['name', 'description', 'owner.login', 'owner.repos_url']

    const [reviews, setReviews] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);

    const [itemsCountPerPage, setitemsCountPerPage] = useState(5);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
    const [sliceFrom, setSliceFrom] = useState(0);
    const [sliceTo, setSliceTo] = useState(5);

    const [activePage, setActivePage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const classes = useStyles();


    useEffect(() => {

        fetchReviews(activePage, rowsPerPage);

    }, [rowsPerPage, activePage]);

    let fetchReviews = (page, amount) => {
        ReviewApi().getLastAddedReviews({page: page, amount: amount})
            .then((res) => {
                setReviews(res.data.reviews)
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
    }

    let handlePageChange = (event, newPage) => {
        setActivePage(newPage);
        console.log('Page change');
    }

    let handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setActivePage(0);
    }

    let searchUpdated = (term) => {
        //filter
        term = term === undefined ? '' : term
        const filtered = reviews.filter(createFilter(term, KEYS_TO_FILTERS));
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
            <MainMenu title="Reviews List"/>
                <span>
                    {/*<SearchInput className="search-input" onChange={searchUpdated}/>*/}
                    {/*<div id="search-wrapper">
                        <span>Search:</span>
                        <div style={{"width":"50%"}}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={top100Films.map((option) => option.title)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Company Name"
                                        margin="normal"
                                        size="small"
                                        variant="outlined"
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                )}
                            />
                        </div>
                    </div>*/}
                    <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>#</TableCell>
                            <TableCell>Компанія</TableCell>
                            <TableCell>Рекрутер</TableCell>
                            <TableCell>Тех. Інтерв'ювер</TableCell>
                            <TableCell>Заг. рейтинг</TableCell>
                            <TableCell>Позиція</TableCell>
                            <TableCell>Дата початку</TableCell>

                          </TableRow>

                        </TableHead>
                        <TableBody>
                            {reviews.map((el, i) => {
                                return (

                                    <ExpandableTableRow
                                        key={i}
                                        el={el}
                                    >
                                        <TableCell>{activePage * rowsPerPage + i + 1}</TableCell>
                                        <TableCell>{el.companyName}</TableCell>
                                        <TableCell>{el.hr.name}</TableCell>
                                        <TableCell>{el.tech.interviewerName}</TableCell>
                                        <TableCell>
                                            <Rating name="company-rating-total"
                                                    precision={0.1}
                                                    disabled={true}
                                                    value={el.companyRatingTotal}
                                            />
                                            {/*<span>{el.feedbackRatingTotal}</span>*/}
                                        </TableCell>
                                        <TableCell>{el.vacancyName}</TableCell>
                                        <TableCell>{formatDate(el.startDate)}</TableCell>
                                    </ExpandableTableRow>

                                    )})}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalItemsCount}
                        rowsPerPage={rowsPerPage}
                        page={activePage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />

                </span>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </>
    )
}

export default ReviewsList;