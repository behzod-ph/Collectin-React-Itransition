import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SearchAppBar from "./SearchBar";
import {ACCESS_TOKEN} from "../../util/constants";
import {useState} from "react";
import {FormControlLabel, Switch} from "@mui/material";
import {styled} from "@mui/material/styles";
import {ENG} from "../../util/constants/language";
import WidgetsIcon from '@mui/icons-material/Widgets';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Language = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            text: 'en',
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

function Header({tags, title, mode, choose_tag, changeLan, user, lan, setMode}) {

    console.log('user-from-main-header',user)
    const [auth, setAuth] = useState(!localStorage.getItem(ACCESS_TOKEN))
    const [dark, setPage] = useState(mode)

    const handeDark = () =>{
        setPage(!mode)
        setMode(p => !p)
    }

    function logout() {
        localStorage.removeItem(ACCESS_TOKEN)
        setAuth(true)
    }


    return (
        <div className={mode ? 'p-4 bg-dark text-white' : 'p-4 text-dark'}>
            <React.Fragment>
                <Typography style={{marginLeft: '40px', marginBottom: '10px'}}
                            component="h5"
                            variant="h5"
                            color="inherit"
                            align="left"
                            noWrap
                    // sx={{flex: 1}}
                >
                    {title}
                </Typography>

                <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                    {auth ? (
                        <div>
                            <Button href='/' variant='outlined' className='mx-1' size="small"
                                    startIcon={<MenuOpenIcon/>}>
                                {lan === ENG ? 'Menu' : 'Меню'}
                            </Button>
                            <Button href='/login' variant='outlined' className='mx-1' size="small"
                                    startIcon={<LoginIcon/>}>
                                {lan === ENG ? 'Sign in' : 'Войти'}
                            </Button>
                            <Button href='/register' variant='outlined' className='mx-1' size="small"
                                    startIcon={<AppRegistrationIcon/>}>
                                {lan === ENG ? 'Sign up' : 'Зарегистрироваться'}
                            </Button>
                        </div>
                    ) : (<div>
                        <div>
                            <Button href='/' variant='outlined' className='mx-1' size="small"
                                    startIcon={<MenuOpenIcon/>}>
                                {lan === ENG ? 'Menu' : 'Меню'}
                            </Button>
                            <Button href='/dashboard' variant='outlined' className='mx-1' size="small"
                                    startIcon={<WidgetsIcon/>}>
                                {lan === ENG ? 'Dashboard' : 'Панель'}
                            </Button>
                            <Button onClick={logout} variant='outlined' className='mx-1'
                                    size="small" startIcon={<LogoutIcon/>}>
                                {lan === ENG ? 'Logout' : 'Выйти'}
                            </Button>
                        </div>
                    </div>)
                    }
                    <Typography
                        component="h3"
                        variant="h5"
                        color="inherit"
                        align="left"
                        margin-left={'10px'}
                        noWrap
                        sx={{flex: 1}}
                    />


                    {
                        user.id && <FormControlLabel
                            control={<Language onChange={changeLan} sx={{m: 1}} defaultChecked/>}
                            label={lan}
                        />
                    }

                    <SearchAppBar mode={mode} lan={lan}/>

                    <IconButton sx={{ml: 1}} onClick={handeDark} color="inherit">
                        {dark ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>


                    {/*<LightMode onChange={() => setMode(p => !p)} sx={{m: 1}}/>*/}
                </Toolbar>
                <Toolbar
                    component="nav"
                    variant="dense"
                    sx={{justifyContent: 'center', overflowX: 'auto'}}
                >
                    {
                        tags && tags.map(tag => (
                            <Link
                                color="inherit"

                                noWrap
                                className='text-decoration-none'
                                key={tag.id}
                                variant="body2"
                                sx={{p: 1, flexShrink: 0,fontFamily:'monospace'}}
                                onClick={() => choose_tag(tag.id)}
                            >
                                {'#'+tag.name}
                            </Link>
                        ))}
                </Toolbar>
            </React.Fragment>
        </div>
    );
}

Header.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;




