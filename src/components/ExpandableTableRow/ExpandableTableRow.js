import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from "react";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/StarBorder';
import "./ExpandableTableRow.css";
import TextField from "@material-ui/core/TextField";

const ExpandableTableRow = ({ children, expandComponent, el, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    let getStarColor = (value) => {
        if(value < 3) {
            return "red"
        } else if(value >= 4){
            return "green"
        }
        return ""
    }

    return (
        <>
            <TableRow {...otherProps} onClick={() => setIsExpanded(!isExpanded)}
                style={{"cursor":"pointer"}}>
                <TableCell padding="checkbox">
                    <IconButton>
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>

            {/*TODO: fix fix fix this and optimize*/}
            <CSSTransition
                in={isExpanded}
                timeout={600}
                classNames="my-node"
                unmountOnExit
                /* onEnter={() => setShowButton(false)}*/
                 onExited={() => setIsExpanded(false)}
            >
                <TableRow  className={isExpanded?"show-row":"hidden-row"}>

                    <TableCell padding="checkbox" />

                    <TableCell colSpan="25">

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{"width":"170px", "borderBottom":"0px"}}></TableCell>
                                    <TableCell style={{"width":"230px", "border-bottom":"0px"}}>Рекрутер</TableCell>
                                    <TableCell style={{"border-bottom":"0px"}} ></TableCell>
                                    <TableCell style={{"width":"170px", "borderBottom":"0px"}}></TableCell>
                                    <TableCell style={{"width":"230px", "border-bottom":"0px"}}>Тех. Інтерв'ювер</TableCell>
                                    <TableCell style={{"border-bottom":"0px"}}></TableCell>
                                    <TableCell style={{"width":"170px", "borderBottom":"0px"}}></TableCell>
                                    <TableCell style={{"width":"230px", "border-bottom":"0px"}}>Фідбек</TableCell>
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
                                                className={getStarColor(el.hr.iceBrake)}
                                                size="small"
                                                color="red"
                                                precision={0.1}
                                                disabled={true}
                                                value={el.hr.iceBrake}
                                        />
                                    </TableCell>

                                    <TableCell></TableCell>
                                    <TableCell>Ice brake (якість, наявність)</TableCell>
                                    <TableCell>
                                        <Rating name="tech-ice-brake"
                                                className={getStarColor(el.tech.iceBrake)}
                                                size="small"
                                                precision={0.1}
                                                disabled={true}
                                                value={el.tech.iceBrake}
                                        />
                                    </TableCell>

                                    <TableCell></TableCell>

                                    <TableCell>Своєчасність фідбеку</TableCell>
                                    <TableCell>
                                        <Rating name="feedback-on-time"
                                                className={getStarColor(el.feedback.onTime)}
                                                size="small"
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
                                                className={getStarColor(el.hr.attitude)}
                                                size="small"
                                                precision={0.1}
                                                disabled={true}
                                                value={el.hr.attitude}
                                        />
                                    </TableCell>

                                    <TableCell></TableCell>

                                    <TableCell>Відношення інтерв'ювера до Вас (софт скіл)</TableCell>
                                    <TableCell>
                                        <Rating name="tech-attitude"
                                                className={getStarColor(el.tech.attitude)}
                                                size="small"
                                                precision={0.1}
                                                disabled={true}
                                                value={el.tech.attitude}
                                        />
                                    </TableCell>

                                    <TableCell></TableCell>

                                    <TableCell>Розгорнутість фідбеку (причина, рекомендації)</TableCell>
                                    <TableCell>
                                        <Rating name="feedback-detalization"
                                                className={getStarColor(el.feedback.detailization)}
                                                size="small"
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
                                                className={getStarColor(el.hr.punctuality)}
                                                size="small"
                                                precision={0.1}
                                                disabled={true}
                                                value={el.hr.punctuality}
                                        />
                                    </TableCell>

                                    <TableCell></TableCell>

                                    <TableCell>Продуманість тех питань (якість питань)</TableCell>
                                    <TableCell>
                                        <Rating name="tech-questions-quality"
                                                className={getStarColor(el.tech.questionsQuality)}
                                                size="small"
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
                                                className={getStarColor(el.hr.impression)}
                                                size="small"
                                                precision={0.1}
                                                disabled={true}
                                                value={el.hr.impression}
                                        />
                                    </TableCell>

                                    <TableCell></TableCell>

                                    <TableCell>Враження після спілкування (осадочок, позитив)</TableCell>
                                    <TableCell>
                                        <Rating name="tech-impression"
                                                className={getStarColor(el.tech.impression)}
                                                precision={0.1}
                                                size="small"
                                                disabled={true}
                                                value={el.tech.impression}
                                        />
                                    </TableCell>
                                </TableRow>
                                <br/>
                                <br/>
                                <TableRow>

                                    <TableCell style={{
                                        "border-bottom":"0px solid",
                                        "font-family": "Courier New, monospace"}}>
                                        Коментар про Рекрутера
                                    </TableCell>
                                    <TableCell style={{"border-bottom":"0px solid"}}><i>{el.hr.comment}</i></TableCell>

                                    <TableCell style={{"border-bottom":"0px solid"}}></TableCell>
                                    <TableCell style={{
                                        "border-bottom":"0px solid",
                                        "font-family": "Courier New, monospace"}}>
                                        Коментар про Технічного Інтерв'ювера
                                    </TableCell>
                                    <TableCell style={{"border-bottom":"0px solid"}}><i>{el.tech.comment}</i></TableCell>

                                    <TableCell style={{"border-bottom":"0px solid"}}></TableCell>
                                    <TableCell style={{
                                        "border-bottom":"0px solid",
                                        "font-family": "Courier New, monospace"}}>
                                        Коментар про Фідбек
                                    </TableCell>
                                    <TableCell style={{"border-bottom":"0px solid"}}><i>{el.feedback.comment}</i></TableCell>
                                </TableRow>
                                <br/>
                                <br/>
                                <br/>
                                <br/>

                            </TableBody>
                        </Table>

                    </TableCell>


                </TableRow>

            </CSSTransition>

        </>
    );
};

export default ExpandableTableRow;