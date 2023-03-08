import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {LANGUAGE, PAGE_AUTHENTICATION} from "../../../util/constants";
import {ADD_COLLECTION, ADD_ITEM, COLLECTION_LIST} from "../../../util/constants/pages";
import {ENG, RUS} from "../../../util/constants/language";
import {SHADE_BLUE} from "../../../util/constants/color";


const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header({crtPage, collectionPageVal, onDrawerToggle, user, setCollectionPageVal}) {

    const lan = localStorage.getItem(LANGUAGE)

    const user_page = <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0, bgcolor:SHADE_BLUE}}>
        <Tabs value={0} textColor="inherit">
            <Tab label={lan === RUS ? 'ПОЛЬЗОВАТЕЛИ' : "USERS"}/>
        </Tabs>
    </AppBar>

    const collection_page = <AppBar component="div" position="static" elevation={0} sx={{zIndex: 0,bgcolor: SHADE_BLUE}}>
        <Tabs value={collectionPageVal} textColor="inherit">
            <Tab label={lan === RUS ? 'КОЛЛЕКЦИЯ' : "COLLECTIONS"}
                 onClick={() => setCollectionPageVal(COLLECTION_LIST)}/>
            <Tab label={lan === RUS ? '➕ КОЛЛЕКЦИЮ' : "➕ COLLECTION"}
                 onClick={() => setCollectionPageVal(ADD_COLLECTION)}/>
            <Tab label={lan === RUS ? '➕ ЭЛЕМЕНТ' : "➕ ITEM"} onClick={() => setCollectionPageVal(ADD_ITEM)}/>
        </Tabs>
    </AppBar>


    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0} sx={{bgcolor:SHADE_BLUE}}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{display: {sm: 'none', xs: 'block'}}} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                            <IconButton color="inherit" sx={{p: 0.5}} className=''>
                                <h5 className='m-2'>{user.name}</h5>
                                <Avatar src={user.image_url} alt=""/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{zIndex: 0,bgcolor:SHADE_BLUE}}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {crtPage}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {/*<Button*/}
                            {/*    sx={{borderColor: lightColor}}*/}
                            {/*    variant="outlined"*/}
                            {/*    color="inherit"*/}
                            {/*    size="small"*/}
                            {/*    href='/'*/}
                            {/*>*/}
                            {/*    {lan===ENG?'Menu':'Меню'}*/}
                            {/*</Button>*/}
                        </Grid>
                        <Grid item>
                            {/*<Tooltip title="Help">*/}
                            {/*    <IconButton color="inherit">*/}
                            {/*        <HelpIcon/>*/}
                            {/*    </IconButton>*/}
                            {/*</Tooltip>*/}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {crtPage === PAGE_AUTHENTICATION ? user_page : collection_page}
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};


export default Header;
