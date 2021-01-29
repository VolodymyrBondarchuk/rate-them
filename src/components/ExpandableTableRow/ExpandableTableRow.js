import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from "react";

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

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
            {isExpanded && (
                <TableRow>
                    <TableCell padding="checkbox" />
                    {expandComponent}
                </TableRow>
            )}
        </>
    );
};

export default ExpandableTableRow;