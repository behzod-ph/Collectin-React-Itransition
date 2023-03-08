import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {deleteItem, getItem} from "../../store/reducer/collection";
import {getMe} from "../../store/reducer/user";
import {useEffect} from "react";
import {ITEM_DATA} from "../../util/constants";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteModal from "../modal/DeleteModal";


function ItemsByCollection({items, user, getItem, getMe, deleteItem}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [itemList, setItemList] = React.useState();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const option = {
        align: 'center',
        minWidth: '170px',
        height: '50px'
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function getCrtItem(itemId) {
        getItem(user.id, itemId)
        localStorage.setItem(ITEM_DATA, JSON.stringify({
            user: user.id,
            item: itemId
        }))
        navigate('/item')
    }

    function handleDelete(itemId) {
        deleteItem(itemId);
        let obj = {};
        Object.keys(itemList.values)
            .forEach(key => {
                if (key != itemId) obj[key] = itemList.values[key]
            })
        setItemList({types: [...itemList.types], values: {...obj}})
    }

    function toggle() {
        setOpen(!open);
    }

    function handleEdit(itemId) {
        console.log(itemId);
    }

    useEffect(() => {
        getMe()
    }, [])

    useEffect(() => {
        console.log("user", user)
        console.log("items", items)
        if (items) {
            setItemList(items);
        }
    }, [items])

    return (
        itemList ? <Paper sx={{width: '100%'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table"
                       className='table table-striped table-hover table-bordered '>
                    <TableHead>
                        <TableRow>
                            {
                                itemList.types && itemList.types.map((column) => (
                                    column.name === 'tag' ? '' : <TableCell
                                        key={column.id}
                                        align={option.align}
                                        style={{minWidth: option.minWidth, height: option.height}}
                                    >
                                        {column.name.toUpperCase()}
                                    </TableCell>
                                ))
                            }
                            {items.owner_id === user.id || user.roles > 1 ?
                                <TableCell>
                                    ACTION
                                </TableCell> : ''
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            itemList.values && Object
                                .keys(itemList.values)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(key => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                                        {
                                            itemList
                                                .types
                                                .map(column => column.name === 'tag' ? '' :
                                                    <TableCell key={column.id} align={option.align}
                                                               onClick={() => getCrtItem(key)}
                                                               style={{
                                                                   minWidth: option.minWidth,
                                                                   height: option.height
                                                               }}>
                                                        {
                                                            itemList.values[key]
                                                                .map(cell => column.id === cell.field_id ?
                                                                    column.format && typeof value === 'number'
                                                                        ? column.format(cell.value)
                                                                        : cell.value
                                                                    : '')
                                                        }
                                                    </TableCell>
                                                )
                                        }
                                        {items.owner_id === user.id || user.roles > 1 ?
                                            < TableCell key={key.length + 1}
                                                        align={option.align}
                                                        style={{
                                                            minWidth: option.minWidth,
                                                            height: option.height
                                                        }}>
                                                <div onClick={toggle}>
                                                    <IconButton aria-label="share">
                                                        <DeleteIcon/>
                                                        <DeleteModal id={key} open={open} toggle={toggle}
                                                                     givenFunction={handleDelete}
                                                                     suffix={'your item'}/>
                                                    </IconButton>
                                                </div>
                                                <IconButton aria-label="edit" onClick={() => handleEdit(key)}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </TableCell> : ''}
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={itemList.values ? Object.keys(itemList.values).length : 10}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper> : ''
    );
}

export default connect((
        {
            collection: {
                items
            }
            ,
            user: {
                user
            }
        }
    ) => (
        {
            items, user
        }
    ),
    {
        getItem, getMe, deleteItem
    }
)(ItemsByCollection)