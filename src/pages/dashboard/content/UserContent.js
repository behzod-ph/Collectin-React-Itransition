import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Avatar from "@mui/material/Avatar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {connect} from "react-redux";
import {getUsers, makeRequestAction, changeRole} from "../../../store/reducer/user";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Checkbox} from "@mui/material";
import Modal from "../../../component/modal/Modal";
import {
    UN_BLOCK,
    BLOCK,
    DELETE,
    ACCESS_TOKEN,
    GIVE_PERMISSION,
    GET_PERMISSION,
    LANGUAGE
} from "../../../util/constants";
import {ENG} from "../../../util/constants/language";

function UserContent({users, user, getUsers, makeRequestAction, changeRole}) {

    const navigate = useNavigate()


    const [items, setItems] = useState([])
    const [checkedItems, setCheckedItems] = useState([])
    const [open, setOpen] = useState(false)
    const [crtAction, setCrtAction] = useState(UN_BLOCK)


    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        setItems(users)
    }, [users])


    function toggle() {
        setOpen(p => !p)
    }

    function reload() {
        getUsers()
    }

    function tickUser(id, checked) {
        items.forEach(item => {
            if (item.id === id)
                setCheckedItems(prev => checked ? [...prev, id] : prev.filter(pr => pr !== id))
        })
    }

    function tickAll(checked) {
        setCheckedItems(checked ? items.map(item => item.id) : [])
    }

    function searchUser(value) {
        let search = []
        items.forEach(item => {
            if (item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.email.toLowerCase().includes(value.toLowerCase()))
                search.push(item)
        })
        setItems(value === '' ? users : search)
    }

    function startAction(action) {
        setCrtAction(action)
        if (checkUser(action))
            makeAction(action)
    }

    function checkUser(action) {
        if ((action === DELETE || action === BLOCK || action === GET_PERMISSION) && checkedItems.includes(user.id)) {
            setOpen(true)
            return false;
        }
        return true;
    }

    function makeActionWithDelete(action) {
        makeAction(action)
        localStorage.removeItem(ACCESS_TOKEN)
        navigate('/')
    }

    function makeAction(action) {
        isChangeRole(action) ?
            changeUsersRole(action)
            : changeStatus(action)

    }

    function isChangeRole(action) {
        return action === GIVE_PERMISSION || action === GET_PERMISSION
    }

    function changeUsersRole(action) {
        const set_as_admin = action === GIVE_PERMISSION
        changeRole({
            set_as_admin,
            content: checkedItems
        })
        setItems(items.map(item => checkedItems.includes(item.id) ? {
            ...item,
            role: [set_as_admin ? 'ROLE_ADMIN' : 'ROLE_USER']
        } : item))
    }

    function changeStatus(action) {
        makeRequestAction({action, content: checkedItems})
        setItems(action === DELETE ? items.filter(item => !checkedItems.includes(item.id)) :
            items.map(item => checkedItems.includes(item.id) ? {...item, status: action} : item))
    }

    const lan = localStorage.getItem(LANGUAGE)

    return (
        <Paper sx={{maxWidth: 936, margin: 'auto', overflow: 'hidden'}}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{display: 'block'}}/>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                onChange={({target: {value}}) => searchUser(value)}
                                fullWidth
                                placeholder={lan===ENG?"Search by name, email address or phone number":'Поиск по имени, адресу электронной почты или номеру телефона'}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" sx={{mr: 1}} onClick={() => startAction(UN_BLOCK)}>
                                {UN_BLOCK}
                            </Button>
                            <Button variant="contained" color={"warning"} sx={{mr: 1}}
                                    onClick={() => startAction(BLOCK)}>
                                {BLOCK}
                            </Button>
                            <Button variant="contained" color={"success"} sx={{mr: 1}}
                                    onClick={() => startAction(crtAction !== GIVE_PERMISSION ? GIVE_PERMISSION : GET_PERMISSION)}>
                                {crtAction !== GIVE_PERMISSION ? GIVE_PERMISSION : GET_PERMISSION}
                            </Button>
                            <Button variant="contained" color={"error"} sx={{mr: 1}}
                                    onClick={() => startAction(DELETE)}>
                                {DELETE}
                            </Button>
                            <Tooltip title="Reload" onClick={reload}>
                                <IconButton>
                                    <RefreshIcon color="inherit" sx={{display: 'block'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Typography color="text.secondary" align="center" component='span'>
                <Paper sx={{width: '100%'}}>
                    <TableContainer sx={{maxHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table"
                               className='table table-bordered table-hover table-light'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'center'}><h6>#</h6></TableCell>
                                    <TableCell align={'center'}>
                                        <Checkbox onClick={({target: {checked}}) => tickAll(checked)}/>
                                    </TableCell>
                                    <TableCell align={'center'}>Name</TableCell>
                                    <TableCell align={'center'}>Mail/Phone</TableCell>
                                    <TableCell align={'center'}>Language</TableCell>
                                    <TableCell align={'center'}>Role</TableCell>
                                    <TableCell align={'center'}>Status</TableCell>
                                    <TableCell align={'center'}>Picture</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    items[0] && items.map((user, index) => (
                                        <TableRow key={user.id}>
                                            <TableCell align={'center'}>{index + 1}</TableCell>
                                            <TableCell align={'center'}>
                                                <Checkbox checked={checkedItems.includes(user.id)}
                                                          onClick={({target: {checked}}) => tickUser(user.id, checked)}
                                                          size={"small"}/>
                                            </TableCell>
                                            <TableCell align={'center'}>{user.name}</TableCell>
                                            <TableCell align={'center'}>{user.email}</TableCell>
                                            <TableCell align={'center'}>{user.language}</TableCell>
                                            <TableCell
                                                align={'center'}>{user.role.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER'}</TableCell>
                                            <TableCell align={'center'}>{user.status}</TableCell>
                                            <TableCell align={'center'}>
                                                <IconButton color="inherit" sx={{p: 0.5}} className=''>
                                                    <Avatar
                                                        src={user.image_url ? user.image_url : "/static/images/avatar/1.jpg"}
                                                        alt="My Avatar"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Typography>
            <Modal open={open} toggle={toggle} action={crtAction} makeAction={makeActionWithDelete}/>
        </Paper>
    );
}

export default connect(({user: {users}}) => ({users}),
    ({getUsers, makeRequestAction, changeRole}))(UserContent)