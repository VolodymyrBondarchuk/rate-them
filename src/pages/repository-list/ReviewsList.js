import React, {useEffect, useState} from "react";
import './ReviewsList.css';
import Pagination from "react-js-pagination";
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
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandableTableRow from "../../components/ExpandableTableRow/ExpandableTableRow";

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

    const classes = useStyles();


    useEffect(() => {

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
            <MainMenu title="Reviews List"/>
                <span>
                    <SearchInput className="search-input" onChange={searchUpdated}/>
                    <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>#</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>HR</TableCell>
                            <TableCell>Tech</TableCell>
                            <TableCell>Interview Rating</TableCell>
                            <TableCell>Vacancy</TableCell>
                            <TableCell>Start date</TableCell>

                          </TableRow>

                        </TableHead>
                        <TableBody>
                            {filteredEmails.slice(sliceFrom, sliceTo).map((el, i) => {
                                return (

                                    <ExpandableTableRow
                                        key={i}
                                        expandComponent={
                                            <TableCell colSpan="25">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{"width":"170px", "border-bottom":"0px"}}></TableCell>
                                                        <TableCell style={{"border-bottom":"0px"}}>HR</TableCell>
                                                        <TableCell style={{"border-bottom":"0px"}} ></TableCell>
                                                        <TableCell style={{"width":"170px", "border-bottom":"0px"}}></TableCell>
                                                        <TableCell style={{"border-bottom":"0px"}}>Tech</TableCell>
                                                        <TableCell style={{"border-bottom":"0px"}}></TableCell>
                                                        <TableCell style={{"width":"170px", "border-bottom":"0px"}}></TableCell>
                                                        <TableCell style={{"border-bottom":"0px"}}>Feedback</TableCell>
                                                    </TableRow>

                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>ПІБ</TableCell>
                                                        <TableCell>{el.hr.name}</TableCell>

                                                        <TableCell></TableCell>
                                                        <TableCell>ПІБ</TableCell>
                                                        <TableCell>{el.tech.interviewerName}</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>

                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Ice brake (якість, наявність)</TableCell>
                                                        <TableCell>
                                                            <Rating name="hr-ice-brake"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.hr.iceBrake}
                                                            />
                                                        </TableCell>

                                                        <TableCell></TableCell>
                                                        <TableCell>Ice brake (якість, наявність)</TableCell>
                                                        <TableCell>
                                                            <Rating name="tech-ice-brake"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.tech.iceBrake}
                                                            />
                                                        </TableCell>

                                                        <TableCell></TableCell>

                                                        <TableCell>Своєчасність фідбеку</TableCell>
                                                        <TableCell>
                                                            <Rating name="feedback-on-time"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.feedback.onTime}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Відношення HR до Вас (софт скіл)</TableCell>
                                                        <TableCell>
                                                            <Rating name="hr-attitude"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.hr.attitude}
                                                            />
                                                        </TableCell>

                                                        <TableCell></TableCell>

                                                        <TableCell>Відношення інтерв'ювера до Вас (софт скіл)</TableCell>
                                                        <TableCell>
                                                            <Rating name="tech-attitude"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.tech.attitude}
                                                            />
                                                        </TableCell>

                                                        <TableCell></TableCell>

                                                        <TableCell>Розгорнутість фідбеку (причина, рекомендації)</TableCell>
                                                        <TableCell>
                                                            <Rating name="feedback-detalization"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.feedback.detailization}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Пунктуальність (все вчасно як домовились чи були провтики)</TableCell>
                                                        <TableCell>
                                                            <Rating name="hr-punctuality"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.hr.punctuality}
                                                            />
                                                        </TableCell>

                                                        <TableCell></TableCell>

                                                        <TableCell>Продуманість тех питань (якість питань)</TableCell>
                                                        <TableCell>
                                                            <Rating name="tech-questions-quality"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.tech.questionsQuality}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Враження після спілкування (осадочок, позитив)</TableCell>
                                                        <TableCell>
                                                            <Rating name="hr-impression"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.hr.impression}
                                                            />
                                                        </TableCell>

                                                        <TableCell></TableCell>

                                                        <TableCell>Враження після спілкування (осадочок, позитив)</TableCell>
                                                        <TableCell>
                                                            <Rating name="tech-impression"
                                                                    precision={0.1}
                                                                    disabled={true}
                                                                    value={el.tech.impression}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            </TableCell>
                                        }
                                    >
                                        <TableCell>{sliceFrom + i + 1}</TableCell>
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
                        count={10}
                        rowsPerPage={5}
                        page={1}
                        onChangePage={handlePageChange}
                        /*onChangeRowsPerPage={handleChangeRowsPerPage}*/
                    />


                      <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                          <Typography className={classes.heading}>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion disabled>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                          <Typography className={classes.heading}>Disabled Accordion</Typography>
                        </AccordionSummary>
                      </Accordion>

                </span>

            <Footer/>
        </>
    )
}

export default ReviewsList;