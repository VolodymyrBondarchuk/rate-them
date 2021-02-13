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
                            <TableCell>Company</TableCell>
                            <TableCell>HR</TableCell>
                            <TableCell>Tech</TableCell>
                            <TableCell>Total Rating</TableCell>
                            <TableCell>Vacancy</TableCell>
                            <TableCell>Start date</TableCell>

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

const top100Films = [
    { title: 'Epam Systems', year: 1994 },
    { title: 'Soft Serve', year: 1972 },
    { title: 'Global Logic', year: 1974 },
    { title: 'Intellias', year: 2008 },
    { title: 'Edvantis', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];