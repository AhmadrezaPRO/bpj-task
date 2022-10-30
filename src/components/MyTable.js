import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Link} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {styled, TablePagination} from "@mui/material";
import React, {useState} from "react";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import PropTypes from "prop-types";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const MyTable = ({tableContent, cols, editLink, rowContent}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{minWidth: 500}}
                    aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {cols.map(col =>(
                                <StyledTableCell key={col.id} align="left">{col.label}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow key={row.id}>
                                {rowContent.map (item  =>(
                                    <StyledTableCell align="left">{row[`${item}`]}</StyledTableCell>
                                ))}
                                {editLink && <StyledTableCell align="left">
                                    <Link to={`${editLink}${row.id}`}>
                                        <EditIcon color="primary"/>
                                    </Link>
                                </StyledTableCell>}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={tableContent.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

MyTable.defaultProps = {
    tableContent: [],
    cols: [],
    rowContent: [],
    link: ''
}

MyTable.propTypes = {
    tableContent: PropTypes.array.isRequired,
    cols: PropTypes.array.isRequired,
    rowContent: PropTypes.array.isRequired,
    link: PropTypes.string
}

export default MyTable;